(function(global){
    'use strict';

    if (!Array.prototype.shuffle) {
        Array.prototype.shuffle = function() {
            let arr = this.slice();
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };
    }

    function normalizeTags(raw) {
        if (!raw) return [];
        let tags = Array.isArray(raw) ? raw : String(raw).split(/[,，\s]+/).filter(Boolean);
        return tags.map(t => String(t).trim().toLowerCase());
    }

    function generatePaper(config) {
        const inputSub = (config.subject || '').toLowerCase();
        let requestTags = normalizeTags(config.tags || []);
        const totalTarget = config.total || 10; 
        
        const subjectAlias = {
            'science': 'physics', '理化': 'physics', '物理': 'physics', '化學': 'chemistry',
            'social': 'history', '歷史': 'history', '地科': 'earth_science', 'biology': 'biology',
            '公民': 'civics', '地理': 'geography'
        };
        const mappedSub = subjectAlias[inputSub] || inputSub;

        // 💡 關鍵：定義「背景標籤」，這些標籤不參與精確單元過濾
        const backgroundTags = ['國七', '國八', '國九', '公民', '歷史', '地理', '理化', '數學', '生物', '地科', '英文', '國文'];
        
        // 取得真正的「知識點標籤」(例如：性別、媒體素養)
        const coreKnowledgeTags = requestTags.filter(t => !backgroundTags.includes(t));

        const repoMap = {
            'math': window.__MATH_REPO__,
            'physics': window.__PHYSICS_REPO__,
            'chemistry': window.__CHEMISTRY_REPO__,
            'biology': window.__BIOLOGY_REPO__,
            'earth_science': window.__EARTH_SCI_REPO__,
            'chinese': window.__CHINESE_REPO__,
            'english': window.__ENGLISH_REPO__,
            'history': window.__HISTORY_REPO__,
            'civics': window.__CIVICS_REPO__,
            'geography': window.__GEOGRAPHY_REPO__
        };

        const targetRepo = repoMap[mappedSub];
        if (!targetRepo) return [];

        let qualifiedPool = []; 

        Object.keys(targetRepo).forEach(tid => {
            const t = targetRepo[tid];
            if (!t) return;

            const itemTags = normalizeTags(t.tags || t.meta || []);
            
            // --- 嚴格過濾邏輯 ---
            // 1. 如果有指定「知識點」，則必須命中知識點（忽略年級標籤的干擾）
            if (coreKnowledgeTags.length > 0) {
                const hasCoreMatch = coreKnowledgeTags.some(rt => itemTags.includes(rt));
                if (!hasCoreMatch) return; // 沒中關鍵單元，直接剔除
            } else if (requestTags.length > 0) {
                // 如果只傳了 ['國七', '公民'] 這種背景標籤，就退回通用篩選
                const hasAnyMatch = requestTags.some(rt => itemTags.includes(rt));
                if (!hasAnyMatch) return;
            }

            qualifiedPool.push(t);
        });

        // --- 隨機抽樣：有多少出多少，絕不硬湊 ---
        const finalSelection = qualifiedPool.shuffle().slice(0, totalTarget);

        console.log(`🎯 精確單元過濾：符合關鍵字的題目共 ${qualifiedPool.length} 題，導出 ${finalSelection.length} 題。`);

        if (finalSelection.length === 0) return [];

        return finalSelection.map(t => {
            const isGroup = (t.type === 'group' || t.questions);
            if (isGroup) {
                return {
                    type: 'group',
                    context: t.context || t.q || "請根據以下內容回答問題：",
                    concept: t.concept || (t.tags ? t.tags[t.tags.length - 1] : "閱讀題組"),
                    questions: t.questions.map(sq => {
                        const opts = [sq.a, ...(sq.o || [])].shuffle();
                        return {
                            question: sq.q,
                            options: opts,
                            answer: opts.indexOf(sq.a),
                            concept: sq.t ? sq.t[sq.t.length - 1] : "子題"
                        };
                    })
                };
            } else {
                let data;
                if (typeof t.func === 'function') {
                    data = t.func();
                } else {
                    const opts = [t.a, ...(t.o || [])].shuffle();
                    data = { question: t.q, options: opts, answer: opts.indexOf(t.a) };
                }
                return {
                    type: 'normal',
                    question: data.question,
                    options: data.options,
                    answer: data.answer,
                    concept: (t.tags && t.tags.length > 0) ? t.tags[t.tags.length - 1] : "單元重點"
                };
            }
        });
    }

    global.generatePaper = generatePaper;
    console.log("✅ Paper Generator V19.0 (核心單元鎖定版) 已就緒");

})(window);
