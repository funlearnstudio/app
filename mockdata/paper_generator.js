(function(global){
    'use strict';

    // 1. 陣列隨機工具 (原地洗牌)
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

    // 2. 標籤清洗
    function normalizeTags(raw) {
        if (!raw) return [];
        let tags = Array.isArray(raw) ? raw : String(raw).split(/[,，\s]+/).filter(Boolean);
        return tags.map(t => String(t).trim().toLowerCase());
    }

    // 3. 核心生成函數
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

        // 單一候選池：所有符合條件的題目都進這裡
        let masterPool = []; 

        const repos = [
            window.__MATH_REPO__, window.__PHYSICS_REPO__, window.__CHEMISTRY_REPO__,
            window.__BIOLOGY_REPO__, window.__EARTH_SCI_REPO__, window.__CHINESE_REPO__,
            window.__ENGLISH_REPO__, window.__HISTORY_REPO__, window.__CIVICS_REPO__, window.__GEOGRAPHY_REPO__
        ].filter(Boolean);

        // --- 核心篩選 ---
        repos.forEach(repo => {
            Object.keys(repo).forEach(tid => {
                const t = repo[tid];
                if (!t) return;

                const tSub = String(t.subject || "").toLowerCase();
                // 科目匹配
                let isMatch = (tSub === inputSub || tSub === mappedSub || tSub.includes(inputSub));
                if (!isMatch) return;

                // 標籤嚴格匹配
                const itemTags = normalizeTags(t.tags || t.meta || []);
                let score = 0;
                
                if (requestTags.length === 0) {
                    score = 1; // 若沒選標籤，則包含該科目所有題
                } else {
                    const hitCount = requestTags.filter(rt => itemTags.includes(rt)).length;
                    if (hitCount > 0) score = 10 + hitCount; 
                    // 若 hitCount 為 0，score 保持為 0，此題會被排除
                }

                if (score > 0) {
                    masterPool.push({ tid, score: score + Math.random(), rawData: t });
                }
            });
        });

        // --- 取題邏輯 ---
        // 依照分數排序（優先出標籤匹配度高的）並截取
        masterPool.sort((a, b) => b.score - a.score);
        
        // 💡 關鍵：slice 多少是多少，池子不足額絕不補位
        let finalSelection = masterPool.slice(0, totalTarget).shuffle();

        console.log(`🎯 嚴格篩選：符合條件總數 ${masterPool.length} 題，實際出題 ${finalSelection.length} 題。`);

        if (finalSelection.length === 0) {
            console.error("❌ 找不到符合標籤的題目，不進行出題。");
            return [];
        }

        // --- 格式化輸出 ---
        return finalSelection.map(c => {
            const t = c.rawData;
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
    console.log("✅ Paper Generator V15.0 (單一池嚴格篩選版) 已就緒");

})(window);
