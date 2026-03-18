(function(global) {
    'use strict';

    // 課本化格式轉換器
    const TextbookFactory = {
        // 針對不同科目定義「課本側欄」小知識
        getSidebarNote(subject, concept) {
            const notes = {
                'earth_science': ["💡 知識補充：地質學家常利用地震波來觀測地球內部結構。", "🔍 觀察要點：注意圖表中的岩層截面圖。"],
                'history': ["📜 史料閱讀：當代史學家認為此時期的轉變對後世影響深遠。", "📅 時間軸：請注意此事件發生的先後順序。"],
                'physics': ["⚡ 物理公式：請熟記此單元的核心運算式。", "🧪 實驗注意：觀測數據時須注意誤差範圍。"]
            };
            const list = notes[subject] || ["📖 學習叮嚀：請結合課本圖文進行複習。"];
            return list[Math.floor(Math.random() * list.length)];
        },

        // 將題目資料轉化為正式課本段落
        formatToChapter(item, subject, idx) {
            const concept = item.concept || "核心知識";
            
            // 轉換解析為「課本本文」
            let bodyText = "";
            if (item.explanation && item.explanation.length > 0) {
                bodyText = item.explanation
                    .map(line => line.replace('✅ 正確答案：', '【核心定義】'))
                    .join('<br><br>');
            } else {
                bodyText = `本章節重點在於探討「${concept}」的演變與實際應用。`;
            }

            // 圖像佔位符 (Image of...)
            let visual = "";
            if (['earth_science', 'physics', 'chemistry', 'biology'].includes(subject)) {
                visual = `
                    <div class="my-6 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 text-center">
                        <div class="text-xs text-slate-400 mb-2 font-mono uppercase">Fig. ${idx + 1}-1 Scientific Illustration</div>
                        <div class="text-blue-500 font-bold mb-2"></div>
                        <p class="text-[10px] text-slate-400">請參考課本圖 ${idx + 1} 之結構分布圖</p>
                    </div>`;
            }

            return `
                <div class="bg-white border border-slate-200 rounded-3xl shadow-sm mb-10 overflow-hidden fade-in">
                    <div class="bg-slate-800 text-white px-6 py-2 text-[10px] tracking-[0.2em] font-bold">
                        CHAPTER SECTION ${idx + 1}
                    </div>
                    
                    <div class="p-8">
                        <div class="flex flex-col lg:flex-row gap-8">
                            <div class="flex-grow">
                                <h3 class="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
                                    <span class="text-blue-600">§</span> ${concept}
                                </h3>
                                <div class="prose prose-slate text-slate-600 leading-relaxed text-lg font-medium">
                                    ${bodyText}
                                </div>
                                ${visual}
                            </div>
                            
                            <div class="w-full lg:w-48 shrink-0">
                                <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                                    <div class="text-amber-600 font-bold text-xs mb-2">
                                        <i class="fas fa-lightbulb"></i> 課文小註解
                                    </div>
                                    <p class="text-xs text-amber-800 leading-normal">
                                        ${this.getSidebarNote(subject, concept)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 pt-6 border-t border-slate-100">
                            <div class="flex items-center gap-2 text-slate-400 text-xs font-bold mb-3 uppercase tracking-widest">
                                <i class="fas fa-check-double"></i> Summary
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                                    <strong>重點：</strong> 觀察「${item.question.substring(0, 15)}...」的現象。
                                </div>
                                <div class="bg-emerald-50 p-3 rounded-lg text-sm text-emerald-800">
                                    <strong>應用：</strong> 此概念常出現在基礎科學與日常生活中。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    };

    global.TextbookFactory = TextbookFactory;
})(window);
