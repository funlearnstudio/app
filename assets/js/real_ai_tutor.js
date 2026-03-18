/* =====================================================
 * 翰林 雲端學院 真實 AI 助教 (Gemini 連線版)
 * ===================================================== */

const RealAITutor = {
    name: "AI 助教",
    
    // 🧠 核心功能：呼叫遠端 Gemini AI
    async askGemini(title, content) {
        console.log("🧠 正在透過後端連線至 Gemini AI...");
        
        // 1. 組合問題內容
        const fullInput = `標題：${title}\n內容：${content}`;
        
        // 2. 檢查 GAS 網址是否存在 (確保 dashboard.html 有定義 GAS_URL)
        if (typeof GAS_URL === 'undefined') {
            return "⚠️ 錯誤：找不到後端連線網址 (GAS_URL)。";
        }

        try {
            // 3. 發送請求到你的 Google Apps Script 後端
            const response = await fetch(GAS_URL, {
                method: 'POST',
                body: JSON.stringify({ 
                    action: "ask_ai", 
                    prompt: fullInput 
                })
            });

            const data = await response.json();

            // 4. 處理回傳結果
            if (data.result === "success") {
                // 回傳 AI 的回答，並加上排版
                return `📘 **【AI 助教解答】**\n\n${data.reply}\n\n---\n*💡 以上內容由 Gemini AI 自動生成，僅供學習參考。*`;
            } else {
                return `❌ **AI 暫時無法回應**：\n${data.message}`;
            }

        } catch (error) {
            console.error("AI 連線失敗:", error);
            return "⚠️ 伺服器連線異常，請檢查網路或聯繫老師。";
        }
    }
};
