(function(global){
    'use strict';

    // 1. 陣列隨機工具
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
        const requestTags = normalizeTags(config.tags || []);
        const totalTarget = config.total || 10; 
        
        const subjectAlias = {
            'science': 'physics', '理化': 'physics', '物理': 'physics', '化學': 'chemistry',
            'social': 'history', '歷史': 'history', 'history': 'history',
            '地科': 'earth_science', '地球科學': 'earth_science', 'biology': 'biology'
        };
        const mappedSub = subjectAlias[inputSub] || inputSub;

        // 所有的「合格題目」池
        let qualifiedPool = []; 

        const repos = [
            window.__MATH_REPO__, window.__PHYSICS_REPO__, window.__CHEMISTRY_REPO__,
            window.__BIOLOGY_REPO__, window.__EARTH_SCI_REPO__, window.__CHINESE_REPO__,
            window.__ENGLISH_REPO__, window.__HISTORY_REPO__, window.__CIVICS_REPO__, window.__GEOGRAPHY_REPO__
        ].filter(Boolean);

        // --- 第一步：嚴格篩選 (Filtering) ---
        repos.forEach(repo => {
            Object.keys(repo).forEach(tid => {
                const t = repo[tid];
                if (!t) return;

                const tSub = String(t.subject || "").toLowerCase();
                if (!(tSub === inputSub || tSub === mappedSub || tSub.includes(inputSub))) return;

                const itemTags = normalizeTags(t.tags || t.meta || []);
                
                // 標籤檢查：如果有指定標籤，必須命中至少一個
                if (requestTags.length > 0) {
                    const hasTag = requestTags.some(rt => itemTags.includes(rt));
                    if (!hasTag) return; // 不符合標籤，直接剔除，不予補位
                }

                qualifiedPool.push(t);
            });
        });

        // --- 第二步：隨機抽樣 (Sampling) ---
        // 先將所有合格的題目打亂順序
        const shuffledPool = qualifiedPool.shuffle();
        
        // 從打亂後的池子取出要求的數量 (若池子不足 10 題，slice 會自動只取現有的數量)
        const finalSelection = shuffledPool.slice(0, totalTarget);

        console.log(`📊 篩選報告：符合標籤的總數為 ${qualifiedPool.length} 題，隨機抽選出 ${finalSelection.length} 題。`);

        if (finalSelection.length === 0) return [];

        // --- 第三步：格式化輸出 ---
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
                    concept: (t.tags && t.tags.length > 0) ? t.tags[t.tags.length - 1] : "一般題型"
                };
            }
        });
    }

    global.generatePaper = generatePaper;
    console.log("✅ Paper Generator V16.0 (公平隨機抽樣版) 已就緒");

})(window);
