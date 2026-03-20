# ☁️ 雲端學院 (Cloud Academy)

這是一個基於 HTML/JS/CSS 與 Google Apps Script (GAS) 開發的輕量化線上學習與測驗平台。透過無伺服器 (Serverless) 架構，將 Google Sheets 作為資料庫，提供學生測驗、學習診斷、遊戲化機制 (XP 與排行榜)、以及教師/家長管理功能。

## ✨ 核心功能 (Features)

### 🧑‍🎓 學生端 (Student)
* **線上測驗與練習**：支援選擇題作答與即時對答。
* **防弊機制 (Anti-Cheat)**：自動偵測測驗期間的「切換分頁次數」與「異常快轉 (作答過快)」行為。
* **學習診斷分析**：透過 Chart.js 視覺化呈現學生的歷次成績、雷達圖與作答節奏。
* **遊戲化學習 (Gamification)**：完成測驗可獲取 XP 經驗值並提升等級，支援全服排行榜。
* **AI 助教功能**：整合 Google Gemini API，提供即時的題目解析與問答服務。
* **討論區與求助中心**：可發布貼文與同學討論，或向教師發送專屬求助訊息。

### 👨‍🏫 教師端 (Teacher)
* **班級名冊與數據看板**：檢視全班學生的純淨平均分（排除遊戲/抽獎）、測驗次數與最後上線時間。
* **任務派發系統**：可針對全班或特定學生派送測驗任務。
* **自訂出題與題庫管理**：教師可新增自訂題目至雲端題庫。
* **學生求助管理**：即時接收並回覆學生的求助訊息。

### 👨‍👩‍👦 家長端 (Parent)
* **專屬數據儀表板**：綁定學生帳號後，可檢視子弟的學習歷程與測驗表現。

---

## 🛠️ 技術棧 (Tech Stack)

* **前端 (Frontend)**：HTML5, Vanilla JavaScript, CSS3
* **UI 框架與套件**：Tailwind CSS, FontAwesome, Chart.js (數據視覺化), MathJax (數學公式渲染)
* **後端 / API (Backend)**：Google Apps Script (GAS)
* **資料庫 (Database)**：Google Sheets (Google 試算表)
* **AI 整合**：Google Gemini API

---

## 📂 Google Sheets 資料表結構說明

系統會在首次運行對應功能時「自動建立」所需的工作表 (Sheet)，預設包含以下表單：
* `users`：儲存使用者帳號、密碼、身分、XP 與等級。
* `records`：儲存測驗歷程、分數、錯題與防弊數據 (JSON 格式)。
* `HelpRequests`：儲存學生發送的求助訊息與教師回覆。
* `Dispatches`：儲存教師派發的任務。
* `questions`：儲存教師自訂的題庫。
* `announcements`：儲存系統公告。
* `forum_posts`：儲存討論區的貼文與回覆。

---

## 📝 API 請求格式 (前端呼叫參考)

前端透過 `fetch` 對 GAS URL 發送 POST 或 GET 請求。
所有 POST 請求必須包含 `action` 參數以判斷行為。

**範例：儲存測驗紀錄 (POST)**
```javascript
fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify({
        action: "save_record",
        username: "student01",
        activity: "國語第一單元",
        score: 90,
        detail: {
            xpGained: 15,
            cheat: { fastCount: 0 },
            tabSwitches: 0,
            questions: [...],
            wrongList: [...]
        }
    })
})
```

---

## 🤝 貢獻與維護 (Contributing)
歡迎提出 Issue 或提交 Pull Request 來協助改善此專案。修改核心功能時，請確保前端的防呆機制與後端 GAS 的欄位對應正確。


