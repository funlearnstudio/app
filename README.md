# ☁️ 雲端學院 (E-Learn Studio)

雲端學院是一個結合 **「RPG 遊戲化」** 與 **「大數據分析」** 的無伺服器 (Serverless) 線上學習平台。前端部署於 Vercel，後端與資料庫則由 Google Apps Script (GAS) 與 Google 試算表驅動。平台提供完整的測驗、防弊、錯題檢討以及隨等級變換的動態佈景主題。

🔗 **Live Demo**: [https://efun.vercel.app/](https://efun.vercel.app/)

---

## ✨ 核心亮點功能 (Core Features)

### 🎮 1. RPG 遊戲化等級與動態視覺 (ThemeEngine)
* **經驗值與排位系統**：學生完成測驗可獲取 XP，從新手 (Novice) 一路升級至最高階的星耀/神話 (Celestial/Mythic) 級別。
* **動態佈景主題**：系統內建 `ThemeEngine`，網頁 UI 顏色與風格會根據使用者的目前的排位（共 12 階）自動變換（例如：新手為藍色、傳奇為金色）。
* **成就特效**：當 XP 達到 50,000 以上，背景會自動觸發流星雨動畫 (`shooting-star`) 增添成就感。

### 📊 2. 智慧測驗與深度診斷 (Smart Analytics)
* **五大能力雷達圖**：透過 `Chart.js`，將測驗結果拆解為「觀念理解、邏輯推演、運算能力、圖表分析、素養應用」，精準定位弱點。
* **互動式錯題本**：支援一鍵切換「全部 / 答對 / 答錯」題目，並內建 `MathJax` 完美渲染複雜數學公式。
* **跨學制課程總覽**：儀表板支援「國中 / 高中」一鍵切換，涵蓋國文、數學、英文、自然（理化/生物/地科）與社會等全科目。

### 🛡️ 3. 雲端防護與防弊機制 (Security & Anti-Cheat)
* **考試行為偵測**：自動紀錄測驗期間的「切換分頁次數」與「異常快轉 (作答過快)」並同步至雲端，提供教師防弊參考。
* **防重複存檔防呆**：採用 LocalStorage 標記 (`isSaved`) 與狀態鎖定，防止網路延遲時學生重複點擊造成資料庫寫入異常。
* **防竄改個人設定**：年級設定 (國七至高三) 採用「單次鎖定」機制，學生設定完成後即隱藏修改按鈕，確保測驗基準一致。

### 🧭 4. 學習導航生態系 (Learning Ecosystem)
* **榮譽榜 (Leaderboard)**：全服等級排行競爭。
* **錯題補救 & 重點複習**：針對個人弱點自動彙整。
* **解題論壇 & 聯絡老師**：提供學生發問與求救的管道。

---

## 🛠️ 技術架構 (Tech Stack)

* **前端 (Frontend)**：HTML5, Vanilla JavaScript, CSS3
* **UI 框架與套件**：
  * [Tailwind CSS](https://tailwindcss.com/) (介面排版)
  * [FontAwesome 6](https://fontawesome.com/) (向量圖示)
  * [Chart.js](https://www.chartjs.org/) (雷達圖與數據視覺化)
  * [MathJax](https://www.mathjax.org/) (數理化學公式渲染)
* **部署平台 (Hosting)**：Vercel
* **後端 / API (Backend)**：Google Apps Script (GAS)
* **資料庫 (Database)**：Google Sheets (Google 試算表)

---

## 📂 系統運作與 API 串接邏輯

本系統採純前端架構，透過 `fetch` 呼叫 GAS 進行 CRUD 操作。

### 關鍵資料傳遞結構 (以存檔為例)
當學生按下「儲存雲端」時，系統會將以下結構的 JSON 封裝並 POST 至 GAS：
```javascript
{
  action: "save_record",
  username: "student_id",
  activity: "數學第一單元",
  score: 85,
  detail: {
    grade: "國九",
    correctCount: 8,
    totalCount: 10,
    questions: [ /* 完整題目與選項資料 */ ],
    wrongList: [ /* 錯題陣列 */ ],
    cheat: { cheatLevel: "NORMAL", fastCount: 0 }, // 快轉防弊數據
    tabSwitches: 0,                                // 分頁防弊數據
    syncTime: "2026-03-20T10:00:00.000Z"
  }
}
