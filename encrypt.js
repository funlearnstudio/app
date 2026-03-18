const fs = require('fs');
const path = require('path');

// 🌟 設定資料夾路徑 (改這裡)
const inputDir = path.join(__dirname, 'mockdata'); // 你自己看的明文放這裡
const outputDir = path.join(__dirname, 'data');    // 加密後產出到這裡 (網頁讀取的來源)

// 如果 data 資料夾不存在，就建立一個
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// 讀取 raw_data 裡面的所有 .json 檔案
fs.readdirSync(inputDir).forEach(file => {
    if (file.endsWith('.json')) {
        // 1. 讀取明文
        const rawData = fs.readFileSync(path.join(inputDir, file), 'utf8');
        
        // 2. 加密：轉成 Base64 然後反轉字串
        const encoded = encodeURIComponent(rawData);
        const base64 = Buffer.from(encoded).toString('base64');
        const secret = base64.split('').reverse().join('');
        
        // 3. 組合出前端需要的 JS 格式
        const unitName = file.replace('.json', '');
        const outputCode = `window._DATA_VAULT = "${secret}";`;
        
        // 4. 存檔到 data 資料夾 (例如: data/math_01.js)
        fs.writeFileSync(path.join(outputDir, `${unitName}.js`), outputCode);
        console.log(`✅ 成功加密: ${file} -> data/${unitName}.js`);
    }
});
