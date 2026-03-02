 (function(global){
    'use strict';

    global.CurriculumLibrary = global.CurriculumLibrary || {};
    global.CurriculumLibrary.version = "5.4.0-TagAligned"; // ★ 版本升級
    global.CurriculumLibrary.lastUpdated = "2026-01-26";

    const fullData = {
        
        // --- 國文 (Chinese) ---
        chinese: [
            // Junior High
            {
                id: "chi_j1", name: "國七國文 (上)", stage: "junior_high", subject: "chinese", book: "Book 1",
                units: [
                    { name: "單元 1：成語運用", tags: ["國文", "成語", "國七"], topics: ["成語判讀", "成語典故"] },
                    { name: "單元 2：修辭技巧", tags: ["國文", "修辭", "國七"], topics: ["譬喻", "摹寫", "轉化"] },
                    { name: "單元 3：現代文學", tags: ["國文", "現代文", "國七"], topics: ["新詩選", "散文選"] },
                    { name: "單元 4：唐詩選讀", tags: ["國文", "唐詩", "國七"], topics: ["絕句", "律詩", "近體詩格律"] },
                    { name: "單元 5：語文常識", tags: ["國文", "年齡", "國七"], topics: ["年齡代稱", "標點符號"] }
                ]
            },
            {
                id: "chi_j2", name: "國七國文 (下)", stage: "junior_high", subject: "chinese", book: "Book 2",
                units: [
                    { name: "單元 1：經典古文", tags: ["國文", "古文", "國七"], topics: ["論語選", "兒時記趣"] },
                    { name: "單元 2：成語進階", tags: ["國文", "成語", "國七"], topics: ["成語應用"] },
                    { name: "單元 3：現代散文", tags: ["國文", "現代文", "國七"], topics: ["記敘文", "描寫文"] }
                ]
            },
            {
                id: "chi_j3", name: "國八國文 (上)", stage: "junior_high", subject: "chinese", book: "Book 3",
                units: [
                    { name: "單元 1：形音義與六書", tags: ["國文", "六書", "國八"], topics: ["象形指事", "會意形聲"] },
                    { name: "單元 2：修辭應用", tags: ["國文", "修辭", "國八"], topics: ["設問", "誇飾", "倒反"] },
                    { name: "單元 3：魏晉古文", tags: ["國文", "古文", "國八"], topics: ["世說新語", "筆記小說"] },
                    { name: "單元 4：唐詩賞析", tags: ["國文", "唐詩", "國八"], topics: ["杜甫詩選", "社會寫實詩"] }
                ]
            },
            {
                id: "chi_j4", name: "國八國文 (下)", stage: "junior_high", subject: "chinese", book: "Book 4",
                units: [
                    { name: "單元 1：成語與題辭", tags: ["國文", "成語", "國八"], topics: ["人物成語", "一般題辭"] },
                    { name: "單元 2：宋代古文", tags: ["國文", "古文", "國八"], topics: ["愛蓮說", "記承天夜遊"] },
                    { name: "單元 3：現代詩文", tags: ["國文", "現代文", "國八"], topics: ["鄉土詩", "環保議題"] }
                ]
            },
            {
                id: "chi_j5", name: "國九國文 (上)", stage: "junior_high", subject: "chinese", book: "Book 5",
                units: [
                    { name: "單元 1：韻文流變", tags: ["國文", "元曲", "國九"], topics: ["元曲選", "馬致遠", "關漢卿"] },
                    { name: "單元 2：修辭總整理", tags: ["國文", "修辭", "國九"], topics: ["雙關", "對偶", "層遞"] },
                    { name: "單元 3：歷代名家", tags: ["國文", "古文", "國九"], topics: ["陶淵明", "蘇軾"] }
                ]
            },
            {
                id: "chi_j6", name: "國九國文 (下)", stage: "junior_high", subject: "chinese", book: "Book 6",
                units: [
                    { name: "單元 1：文化教材", tags: ["國文", "禮俗", "國九"], topics: ["柬帖", "書信", "對聯"] },
                    { name: "單元 2：成語總複習", tags: ["國文", "成語", "國九"], topics: ["易混淆成語", "成語活用"] },
                    { name: "單元 3：會考衝刺", tags: ["國文", "古文", "國九"], topics: ["閱讀測驗", "文意理解"] }
                ]
            },
            // Senior High
            {
                id: "chi_s1", name: "高一國文 (上)", stage: "high_school", subject: "chinese", book: "Book 1",
                units: [
                    { name: "單元 1：先秦諸子", tags: ["國文", "古文", "高一"], topics: ["論語", "孟子", "勸學"] },
                    { name: "單元 2：文學常識", tags: ["國文", "經典", "高一"], topics: ["詩經", "楚辭"] },
                    { name: "單元 3：修辭鑑賞", tags: ["國文", "修辭", "高一"], topics: ["移覺", "互文", "錯綜"] },
                    { name: "單元 4：應用文", tags: ["國文", "題辭", "高一"], topics: ["慶賀題辭", "哀輓題辭"] }
                ]
            },
            {
                id: "chi_s2", name: "高一國文 (下)", stage: "high_school", subject: "chinese", book: "Book 2",
                units: [
                    { name: "單元 1：唐宋八大家", tags: ["國文", "古文", "高一"], topics: ["師說", "赤壁賦", "始得西山宴遊記"] },
                    { name: "單元 2：現代文學", tags: ["國文", "現代文", "高一"], topics: ["徐志摩", "魯迅", "現代詩"] },
                    { name: "單元 3：年齡與稱謂", tags: ["國文", "年齡", "高一"], topics: ["弱冠", "及笄", "期頤"] }
                ]
            },
            {
                id: "chi_s3", name: "高二國文 (上)", stage: "high_school", subject: "chinese", book: "Book 3",
                units: [
                    { name: "單元 1：韻文之美", tags: ["國文", "宋詞", "高二"], topics: ["蘇軾", "李清照", "辛棄疾"] },
                    { name: "單元 2：明清小品", tags: ["國文", "古文", "高二"], topics: ["晚遊六橋待月記", "項脊軒志"] },
                    { name: "單元 3：史書體例", tags: ["國文", "史書", "高二"], topics: ["史記", "漢書", "資治通鑑"] }
                ]
            },
            {
                id: "chi_s4", name: "高二國文 (下)", stage: "high_school", subject: "chinese", book: "Book 4",
                units: [
                    { name: "單元 1：成語典故", tags: ["國文", "成語", "高二"], topics: ["歷史典故", "寓言故事"] },
                    { name: "單元 2：修辭進階", tags: ["國文", "修辭", "高二"], topics: ["借代", "映襯", "象徵"] },
                    { name: "單元 3：現代散文", tags: ["國文", "現代文", "高二"], topics: ["鄭愁予", "琦君", "余光中"] }
                ]
            },
            {
                id: "chi_s5", name: "高三國文 (全)", stage: "high_school", subject: "chinese", book: "Book 5",
                units: [
                    { name: "單元 1：學測總複習", tags: ["國文", "成語", "高三"], topics: ["成語總匯", "字音字形"] },
                    { name: "單元 2：經典選讀", tags: ["國文", "古文", "高三"], topics: ["岳陽樓記", "典論論文", "諫逐客書"] },
                    { name: "單元 3：台灣文學", tags: ["國文", "現代文", "高三"], topics: ["賴和", "楊逵", "鄉土文學"] }
                ]
            }
        ],

        // --- 數學 (Math) ---
     math: [
  {
    id: "math_j1",
    name: "國七數學 (上)",
    stage: "junior_high",
    subject: "math",
    book: "Book 1",
    units: [
      {
        name: "單元 1：整數的運算",
        tags: [
          "數學",
          "國七",
          "整數",
          "絕對值",
          "加減",
          "乘除",
          "指數",
          "科學記號"
        ],
        topics: ["負數與絕對值", "整數的加減", "整數的乘除", "指數與科學記號"]
      },
      {
        name: "單元 2：分數的運算",
        tags: [
          "數學",
          "國七",
          "分數",
          "因數",
          "倍數",
          "最大公因數",
          "最小公倍數",
          "分數加減乘除",
          "指數律"
        ],
        topics: ["因數與倍數", "最大公因數與最小公倍數", "分數的加減乘除", "指數律"]
      },
      {
        name: "單元 3：一元一次方程式",
        tags: [
          "數學",
          "國七",
          "代數",
          "一元一次",
          "方程式",
          "移項",
          "代入",
          "應用題"
        ],
        topics: ["以符號代表數", "一元一次式的運算", "解一元一次方程式", "應用問題"]
      }
    ]
  },

  {
    id: "math_j2",
    name: "國七數學 (下)",
    stage: "junior_high",
    subject: "math",
    book: "Book 2",
    units: [
      {
        name: "單元 1：二元一次聯立方程式",
        tags: [
          "數學",
          "國七",
          "聯立方程式",
          "二元一次",
          "代入法",
          "加減法",
          "應用題"
        ],
        topics: ["二元一次方程式", "解聯立方程式(代入/加減)", "應用問題"]
      },
      {
        name: "單元 2：直角坐標與圖形",
        tags: [
          "數學",
          "國七",
          "坐標",
          "直角坐標平面",
          "圖形",
          "一次方程式圖形"
        ],
        topics: ["直角坐標平面", "二元一次方程式的圖形"]
      },
      {
        name: "單元 3：比與比例",
        tags: [
          "數學",
          "國七",
          "比例",
          "比",
          "連比例",
          "正比",
          "反比",
          "比例應用"
        ],
        topics: ["比例式與連比例", "正比與反比"]
      },
      {
        name: "單元 4：一元一次不等式",
        tags: [
          "數學",
          "國七",
          "不等式",
          "不等式解法",
          "數線表示",
          "不等式應用"
        ],
        topics: ["不等式的解與圖示", "不等式的應用"]
      }
    ]
  },

  {
    id: "math_j3",
    name: "國八數學 (上)",
    stage: "junior_high",
    subject: "math",
    book: "Book 3",
    units: [
      {
        name: "單元 1：乘法公式與多項式",
        tags: [
          "數學",
          "國八",
          "乘法公式",
          "多項式",
          "多項式加減",
          "多項式乘除",
          "差平方",
          "完全平方"
        ],
        topics: ["乘法公式", "多項式的加減乘除"]
      },
      {
        name: "單元 2：平方根與畢氏定理",
        tags: [
          "數學",
          "國八",
          "平方根",
          "根號",
          "近似值",
          "根式運算",
          "畢氏定理",
          "直角三角形"
        ],
        topics: ["平方根與近似值", "根式的運算", "畢氏定理"]
      },
      {
        name: "單元 3：因式分解",
        tags: [
          "數學",
          "國八",
          "因式分解",
          "提公因式",
          "乘法公式因式分解",
          "十字交乘法",
          "展開與因式化"
        ],
        topics: ["提公因式", "乘法公式因式分解", "十字交乘法"]
      }
    ]
  },

  {
    id: "math_j4",
    name: "國八數學 (下)",
    stage: "junior_high",
    subject: "math",
    book: "Book 4",
    units: [
      {
        name: "單元 1：等差數列與級數",
        tags: [
          "數學",
          "國八",
          "數列",
          "等差數列",
          "等差級數",
          "通項公式",
          "求和"
        ],
        topics: ["等差數列", "等差級數"]
      },
      {
        name: "單元 2：幾何圖形與尺規作圖",
        tags: [
          "數學",
          "國八",
          "幾何",
          "平面圖形",
          "尺規作圖",
          "垂直",
          "平分",
          "線對稱"
        ],
        topics: ["平面圖形", "垂直、平分與線對稱", "尺規作圖"]
      },
      {
        name: "單元 3：三角形的性質",
        tags: [
          "數學",
          "國八",
          "三角形",
          "內角和",
          "外角",
          "全等",
          "邊角關係"
        ],
        topics: ["三角形的內角與外角", "三角形的全等性質", "邊角不等等關係"]
      },
      {
        name: "單元 4：平行與四邊形",
        tags: [
          "數學",
          "國八",
          "平行線",
          "截角性質",
          "平行四邊形",
          "特殊四邊形",
          "面積"
        ],
        topics: ["平行線截角性質", "平行四邊形與特殊四邊形"]
      }
    ]
  },

  {
    id: "math_j5",
    name: "國九數學 (上)",
    stage: "junior_high",
    subject: "math",
    book: "Book 5",
    units: [
      {
        name: "單元 1：相似形",
        tags: [
          "數學",
          "國九",
          "相似形",
          "相似三角形",
          "連比例",
          "比例尺",
          "相似應用"
        ],
        topics: ["連比例", "相似三角形", "相似形的應用"]
      },
      {
        name: "單元 2：圓形",
        tags: [
          "數學",
          "國九",
          "圓",
          "圓心角",
          "圓周角",
          "弦切角",
          "點直線圓關係"
        ],
        topics: ["點、直線與圓的關係", "圓心角、圓周角與弦切角"]
      },
      {
        name: "單元 3：幾何證明與三角形的心",
        tags: [
          "數學",
          "國九",
          "幾何證明",
          "幾何推理",
          "外心",
          "內心",
          "重心",
          "三角形中心"
        ],
        topics: ["幾何推理證明", "三角形的外心、內心與重心"]
      }
    ]
  },

  {
    id: "math_j6",
    name: "國九數學 (下)",
    stage: "junior_high",
    subject: "math",
    book: "Book 6",
    units: [
      {
        name: "單元 1：二次函數",
        tags: [
          "數學",
          "國九",
          "二次函數",
          "拋物線",
          "配方法",
          "頂點",
          "最大值",
          "最小值"
        ],
        topics: ["二次函數的圖形(拋物線)", "配方法與頂點", "最大值與最小值"]
      },
      {
        name: "單元 2：統計與機率",
        tags: [
          "數學",
          "國九",
          "統計",
          "機率",
          "四分位數",
          "盒狀圖",
          "機率入門",
          "資料分析"
        ],
        topics: ["統計圖表與數據分析(四分位數/盒狀圖)", "機率入門"]
      },
      {
        name: "單元 3：立體幾何圖形",
        tags: [
          "數學",
          "國九",
          "立體幾何",
          "角柱",
          "圓柱",
          "角錐",
          "圓錐",
          "展開圖",
          "體積",
          "表面積"
        ],
        topics: ["角柱與圓柱", "角錐與圓錐", "展開圖"]
      }
    ]
  },

  {
    id: "math_s1",
    name: "高一數學 (上)",
    stage: "high_school",
    subject: "math",
    book: "Book 1",
    units: [
      {
        name: "單元 1：數與式",
        tags: [
          "數學",
          "高一",
          "數與式",
          "數系",
          "絕對值",
          "不等式",
          "指數",
          "對數"
        ],
        topics: ["數系與絕對值", "算幾不等式", "指數與對數基本運算"]
      },
      {
        name: "單元 2：直線與圓",
        tags: [
          "數學",
          "高一",
          "直線",
          "斜率",
          "直線方程式",
          "圓",
          "圓方程式",
          "直線與圓的關係"
        ],
        topics: ["直線方程式與斜率", "圓方程式", "直線與圓的關係"]
      },
      {
        name: "單元 3：多項式函數",
        tags: [
          "數學",
          "高一",
          "多項式",
          "多項式除法",
          "餘式定理",
          "因式定理",
          "二次函數",
          "不等式"
        ],
        topics: ["多項式的除法原理", "餘式定理與因式定理", "二次函數與不等式"]
      }
    ]
  },

  {
    id: "math_s2",
    name: "高一數學 (下)",
    stage: "high_school",
    subject: "math",
    book: "Book 2",
    units: [
      {
        name: "單元 1：數列與級數",
        tags: [
          "數學",
          "高一",
          "數列",
          "級數",
          "等差",
          "等比",
          "Σ運算",
          "數學歸納法"
        ],
        topics: ["等差與等比", "Σ運算", "數學歸納法"]
      },
      {
        name: "單元 2：排列組合",
        tags: [
          "數學",
          "高一",
          "計數原理",
          "排列",
          "組合",
          "二項式定理",
          "組合公式"
        ],
        topics: ["計數原理", "排列", "組合", "二項式定理"]
      },
      {
        name: "單元 3：機率",
        tags: [
          "數學",
          "高一",
          "機率",
          "古典機率",
          "期望值",
          "隨機變數"
        ],
        topics: ["古典機率", "期望值"]
      },
      {
        name: "單元 4：數據分析",
        tags: [
          "數學",
          "高一",
          "數據分析",
          "統計",
          "標準差",
          "相關係數",
          "迴歸直線"
        ],
        topics: ["一維數據分析(標準差)", "二維數據分析(相關係數/迴歸直線)"]
      }
    ]
  },

  {
    id: "math_s3a",
    name: "高二數學 A (上)",
    stage: "high_school",
    subject: "math",
    book: "Book 3A",
    units: [
      {
        name: "單元 1：三角函數",
        tags: [
          "數學",
          "高二",
          "三角函數",
          "弧度",
          "正弦",
          "餘弦",
          "和差角",
          "週期",
          "振幅",
          "正餘弦定理"
        ],
        topics: ["弧度量", "三角函數圖形", "和差角公式", "正餘弦定理"]
      },
      {
        name: "單元 2：指數與對數函數",
        tags: [
          "數學",
          "高二",
          "指數函數",
          "對數函數",
          "方程式",
          "不等式",
          "函數性質"
        ],
        topics: ["指數函數圖形", "對數函數圖形", "方程式與不等式"]
      },
      {
        name: "單元 3：平面向量",
        tags: [
          "數學",
          "高二",
          "向量",
          "向量運算",
          "內積",
          "柯西不等式",
          "行列式",
          "面積"
        ],
        topics: ["向量運算", "內積", "柯西不等式", "面積與行列式"]
      }
    ]
  },

  {
    id: "math_s4a",
    name: "高二數學 A (下)",
    stage: "high_school",
    subject: "math",
    book: "Book 4A",
    units: [
      {
        name: "單元 1：空間向量",
        tags: [
          "數學",
          "高二",
          "空間向量",
          "空間坐標系",
          "外積",
          "平面方程式",
          "向量運算"
        ],
        topics: ["空間坐標系", "空間向量運算", "外積", "平面方程式"]
      },
      {
        name: "單元 2：空間中的直線與平面",
        tags: [
          "數學",
          "高二",
          "空間直線",
          "直線方程式",
          "距離公式",
          "夾角",
          "參數式"
        ],
        topics: ["直線方程式", "距離公式", "夾角"]
      },
      {
        name: "單元 3：矩陣",
        tags: [
          "數學",
          "高二",
          "矩陣",
          "矩陣運算",
          "矩陣乘法",
          "反方陣",
          "線性變換",
          "行列式"
        ],
        topics: ["矩陣運算", "矩陣的乘法", "反方陣", "平面上的線性變換"]
      },
      {
        name: "單元 4：二次曲線",
        tags: [
          "數學",
          "高二",
          "圓錐曲線",
          "拋物線",
          "橢圓",
          "雙曲線",
          "標準式"
        ],
        topics: ["拋物線", "橢圓", "雙曲線"]
      }
    ]
  },

  {
    id: "math_s5a",
    name: "高三數學甲 (上)",
    stage: "high_school",
    subject: "math",
    book: "Book 5 (Calc)",
    units: [
      {
        name: "單元 1：極限與函數",
        tags: [
          "數學",
          "高三",
          "極限",
          "數列極限",
          "函數極限",
          "連續",
          "極限性質"
        ],
        topics: ["數列的極限", "函數的極限", "連續函數"]
      },
      {
        name: "單元 2：微分",
        tags: [
          "數學",
          "高三",
          "微分",
          "導數",
          "連鎖律",
          "微分公式",
          "極值",
          "切線",
          "凹凸性"
        ],
        topics: ["導數與導函數", "微分公式(連鎖律)", "微分應用(極值、切線、凹凸性)"]
      },
      {
        name: "單元 3：積分",
        tags: [
          "數學",
          "高三",
          "積分",
          "定積分",
          "黎曼和",
          "微積分基本定理",
          "面積",
          "體積"
        ],
        topics: ["黎曼和與定積分", "微積分基本定理", "積分應用(面積、體積)"]
      }
    ]
  },

  {
    id: "math_s6a",
    name: "高三數學甲 (下)",
    stage: "high_school",
    subject: "math",
    book: "Book 6",
    units: [
      {
        name: "單元 1：複數與多項式方程式",
        tags: [
          "數學",
          "高三",
          "複數",
          "複數極式",
          "極坐標表示",
          "棣美弗定理",
          "複數運算"
        ],
        topics: ["複數極式", "棣美弗定理"]
      },
      {
        name: "單元 2：隨機變數",
        tags: [
          "數學",
          "高三",
          "機率",
          "隨機變數",
          "二項分佈",
          "幾何分佈",
          "常態分佈",
          "期望值"
        ],
        topics: ["隨機變數", "二項分佈", "幾何分佈", "常態分佈"]
      }
    ]
  }
],

        english: [
            {
                id: "eng_j1", name: "國七英文 (上)", stage: "junior_high", subject: "english", book: "Book 1",
                units: [
                    { name: "Unit 1: Be Verbs", tags: ["英文", "be動詞", "文法", "國七"], topics: ["Am/Is/Are", "Subject Pronouns"] },
                    { name: "Unit 2: Nouns", tags: ["英文", "名詞", "單複數", "國七"], topics: ["Singular/Plural", "This/That/These/Those"] },
                    { name: "Unit 3: Imperatives", tags: ["英文", "祈使句", "句型", "國七"], topics: ["Don't/Let's", "Prepositions of Place"] }
                ]
            },
            {
                id: "eng_j2", name: "國七英文 (下)", stage: "junior_high", subject: "english", book: "Book 2",
                units: [
                    { name: "Unit 1: Present Progressive", tags: ["英文", "現在進行式", "文法", "國七"], topics: ["V-ing rules", "What are you doing?"] },
                    { name: "Unit 2: Quantifiers", tags: ["英文", "數量詞", "國七"], topics: ["How many/much", "Some/Any"] },
                    { name: "Unit 3: Past Tense (Be)", tags: ["英文", "過去式", "文法", "國七"], topics: ["Was/Were", "Time expressions"] }
                ]
            },
            {
                id: "eng_j3", name: "國八英文 (上)", stage: "junior_high", subject: "english", book: "Book 3",
                units: [
                    { name: "Unit 1: Past Simple", tags: ["英文", "過去式", "動詞", "國八"], topics: ["Regular/Irregular Verbs", "Did questions"] },
                    { name: "Unit 2: Future Tense", tags: ["英文", "未來式", "文法", "國八"], topics: ["Will", "Be going to"] },
                    { name: "Unit 3: Patterns", tags: ["英文", "句型", "授與動詞", "國八"], topics: ["Give/Buy (Dative verbs)", "Imperatives with if"] }
                ]
            },
            {
                id: "eng_j4", name: "國八英文 (下)", stage: "junior_high", subject: "english", book: "Book 4",
                units: [
                    { name: "Unit 1: Comparison", tags: ["英文", "比較級", "形容詞", "國八"], topics: ["Comparative adj.", "Superlative adj."] },
                    { name: "Unit 2: Verbs Pattern", tags: ["英文", "動詞句型", "國八"], topics: ["Spend/Cost/Take/Pay", "Gerund vs Infinitive"] },
                    { name: "Unit 3: Conjunctions", tags: ["英文", "連接詞", "文法", "國八"], topics: ["Although/Though", "Before/After/When"] }
                ]
            },
            {
                id: "eng_j5", name: "國九英文 (上)", stage: "junior_high", subject: "english", book: "Book 5",
                units: [
                    { name: "Unit 1: Present Perfect", tags: ["英文", "現在完成式", "文法", "國九"], topics: ["Have/Has + p.p.", "Since/For"] },
                    { name: "Unit 2: Passive Voice", tags: ["英文", "被動語態", "文法", "國九"], topics: ["Be + p.p.", "By agent"] },
                    { name: "Unit 3: Relative Clause I", tags: ["英文", "關係子句", "文法", "國九"], topics: ["Who/Which/That", "Subject relative pronouns"] }
                ]
            },
            {
                id: "eng_j6", name: "國九英文 (下)", stage: "junior_high", subject: "english", book: "Book 6",
                units: [
                    { name: "Unit 1: Relative Clause II", tags: ["英文", "關係子句", "文法", "國九"], topics: ["Object relative pronouns", "Preposition placement"] },
                    { name: "Unit 2: Noun Clauses", tags: ["英文", "名詞子句", "文法", "國九"], topics: ["That clause", "Wh- clause"] },
                    { name: "Unit 3: Review", tags: ["英文", "文法", "國九"], topics: ["Tag Questions", "Make/Have/Let (Causative)"] }
                ]
            },
            {
                id: "eng_s1", name: "高一英文 (上)", stage: "high_school", subject: "english", book: "Book 1",
                units: [
                    { name: "Unit 1: Sentence Structure", tags: ["英文", "句型", "文法", "高一"], topics: ["Five sentence patterns", "S+V+O+OC"] },
                    { name: "Unit 2: Perfect Tenses", tags: ["英文", "完成式", "時態", "高一"], topics: ["Present/Past/Future Perfect"] },
                    { name: "Unit 3: Relative Clauses", tags: ["英文", "關係子句", "文法", "高一"], topics: ["Defining vs Non-defining", "Quantifiers in RC"] }
                ]
            },
            {
                id: "eng_s2", name: "高一英文 (下)", stage: "high_school", subject: "english", book: "Book 2",
                units: [
                    { name: "Unit 1: Participles", tags: ["英文", "分詞", "文法", "高一"], topics: ["V-ing/V-pp as Adjectives", "Participle Construction"] },
                    { name: "Unit 2: Infinitives", tags: ["英文", "不定詞", "文法", "高一"], topics: ["To V as subject/object", "Too...to / Enough to"] },
                    { name: "Unit 3: Comparison Adv.", tags: ["英文", "比較級", "高一"], topics: ["The more...the more", "Multiplier comparison"] }
                ]
            },
            {
                id: "eng_s3", name: "高二英文 (上)", stage: "high_school", subject: "english", book: "Book 3",
                units: [
                    { name: "Unit 1: Subjunctive Mood", tags: ["英文", "假設語氣", "文法", "高二"], topics: ["If I were you", "Past perfect subjunctive"] },
                    { name: "Unit 2: Inversion", tags: ["英文", "倒裝句", "文法", "高二"], topics: ["Negative adverbs", "Only + prep phrase"] },
                    { name: "Unit 3: Reduced Clauses", tags: ["英文", "簡化子句", "高二"], topics: ["Adjective clause reduction", "Adverbial clause reduction"] }
                ]
            },
            {
                id: "eng_s4", name: "高二英文 (下)", stage: "high_school", subject: "english", book: "Book 4",
                units: [
                    { name: "Unit 1: Advanced Passive", tags: ["英文", "被動語態", "高二"], topics: ["It is said that...", "Passive with modals"] },
                    { name: "Unit 2: Compound Adj.", tags: ["英文", "複合形容詞", "高二"], topics: ["N-Ving", "Adj-Noun-ed"] },
                    { name: "Unit 3: Rhetoric", tags: ["英文", "修辭", "高二"], topics: ["Metaphor", "Simile", "Personification"] }
                ]
            },
            {
                id: "eng_s5", name: "高三英文 (全)", stage: "high_school", subject: "english", book: "Book 5",
                units: [
                    { name: "Unit 1: News English", tags: ["英文", "新聞英語", "高三"], topics: ["Headlines", "Journalistic vocabulary"] },
                    { name: "Unit 2: Literature", tags: ["英文", "文學", "高三"], topics: ["Short stories", "Poetry appreciation"] },
                    { name: "Unit 3: Academic Writing", tags: ["英文", "寫作", "高三"], topics: ["Topic sentences", "Transitions"] }
                ]
            }
        ],
    science: [
    {
        id: "sci_j3", name: "國八理化 (上)", stage: "junior_high", subject: "science", book: "Book 3",
        // 國八上：物理基礎（測量、波動、光、熱、流體）
        units: [
            { 
                name: "單元 1：基本測量與物質性質", 
                // 新增：密度與浮沉、壓力相關 (對應題組 8, 12)
                tags: ["理化", "測量", "國八", "密度", "浮力", "阿基米德原理", "大氣壓力", "氣體壓力"], 
                topics: ["長度與體積", "質量與密度", "科學記號", "浮力判斷", "托里切利實驗"] 
            },
            { 
                name: "單元 2：波動與聲音", 
                // 新增：回聲計算、波的干涉 (對應題組 6, 17)
                tags: ["理化", "波動", "物理", "國八", "回聲計算", "聲速變因", "波的干涉", "波的獨立性"], 
                topics: ["波的傳播", "聲波的反射", "樂音三要素", "回聲測距"] 
            },
            { 
                name: "單元 3：光與成像", 
                // 新增：透鏡成像規律、虛像實像 (對應題組 5)
                tags: ["理化", "光學", "物理", "國八", "透鏡成像", "物像關係", "虛像"], 
                topics: ["光的反射", "面鏡成像", "光的折射", "透鏡成像實驗"] 
            },
            { 
                name: "單元 4：熱與溫度", 
                // 新增：熱量計算、混合比熱 (對應題組 4)
                tags: ["理化", "熱學", "物理", "國八", "熱量計算", "比熱計算", "實驗誤差", "熱平衡"], 
                topics: ["溫度與溫度計", "熱量與比熱", "熱的傳播", "絕熱容器"] 
            }
        ]
    },
    {
        id: "sci_j4", name: "國八理化 (下)", stage: "junior_high", subject: "science", book: "Book 4",
        // 國八下：化學基礎 (因物理題庫較少涉及化學，維持原樣，僅微調)
        units: [
            { name: "單元 1：物質的組成", tags: ["理化", "化學", "國八", "原子結構"], topics: ["元素與化合物", "原子結構", "週期表", "分子式"] },
            { name: "單元 2：化學反應", tags: ["理化", "化學", "國八", "質量守恆"], topics: ["化學反應式", "粒子觀點", "莫耳數", "質量守恆"] },
            { name: "單元 3：氧化還原", tags: ["理化", "化學", "國八", "活性"], topics: ["氧化與還原", "活性大小", "燃燒"] },
            { name: "單元 4：酸鹼鹽", tags: ["理化", "化學", "國八", "酸鹼中和"], topics: ["電解質", "酸與鹼", "pH值", "酸鹼中和"] }
        ]
    },
    {
        id: "sci_j5", name: "國九理化 (上)", stage: "junior_high", subject: "science", book: "Book 5",
        // 國九上：力學核心 (對應大量物理題組)
        units: [
            { 
                name: "單元 1：直線運動", 
                // 新增：打點計時器、運動圖形分析 (對應題組 1)
                tags: ["理化", "力學", "物理", "國九", "運動學", "速度計算", "位移與路徑長", "加速度", "運動型態"], 
                topics: ["位置與位移", "速度與速率", "加速度", "等加速度運動", "打點計時器"] 
            },
            { 
                name: "單元 2：力與運動", 
                // 新增：F=ma、圓周運動、慣性 (對應題組 2, 15)
                tags: ["理化", "力學", "物理", "國九", "牛頓第二定律", "F=ma", "失重狀態", "向心力", "慣性"], 
                topics: ["牛頓三大運動定律", "圓周運動", "萬有引力", "摩擦力"] 
            },
            { 
                name: "單元 3：功與能", 
                // 新增：能量守恆、簡單機械 (對應題組 3, 13)
                tags: ["理化", "能量", "物理", "國九", "能量守恆", "位能轉動能", "非保守力", "省力機械", "功的原理", "功能定理"], 
                topics: ["功與功率", "動能與位能", "力學能守恆", "槓桿與滑輪"] 
            }
        ]
    },
    {
        id: "sci_j6", name: "國九理化 (下)", stage: "junior_high", subject: "science", book: "Book 6",
        // 國九下：電磁學與現代科技
        units: [
            { 
                name: "單元 1：基本電路與靜電", 
                // 新增：靜電學、電阻計算 (對應題組 7, 9)
                tags: ["理化", "電學", "物理", "國九", "靜電感應", "感應起電", "電荷移動", "電阻計算", "串聯電路"], 
                topics: ["靜電", "電流", "電壓", "歐姆定律", "電路連接"] 
            },
            { 
                name: "單元 2：電的應用與能源", 
                // 新增：焦耳定律、能源議題 (對應題組 14, 16)
                tags: ["理化", "電學", "物理", "國九", "電功率", "焦耳定律", "電能計算", "能源議題", "質能守恆定律"], 
                topics: ["電功率", "電力輸送", "用電安全", "電池與能源"] 
            },
            { 
                name: "單元 3：電流磁效應", 
                // 新增：安培右手、冷次定律 (對應題組 10, 11)
                tags: ["理化", "磁學", "物理", "國九", "安培右手定則", "電流磁效應", "電磁感應", "冷次定律", "法拉第定律"], 
                topics: ["磁鐵與磁場", "電流磁效應", "電磁感應", "發電機與馬達"] 
            },
            { 
                name: "單元 4：反應速率與平衡", 
                tags: ["理化", "化學", "國九", "反應速率"], 
                topics: ["反應速率", "化學平衡", "有機化合物介紹"] 
            }
        ]
    }
],

        // --- 物理 (Physics) ---
        physics: [
           
            {
                id: "phy_s1", name: "高一物理 (必修)", stage: "high_school", subject: "physics", book: "Book 1",
                units: [
                    { name: "單元 1：科學態度", tags: ["物理", "測量", "單位", "高一"], topics: ["SI單位", "測量不確定度"] },
                    { name: "單元 2：物質組成", tags: ["物理", "原子", "力", "高一"], topics: ["原子模型演變", "基本交互作用(四大力)"] },
                    { name: "單元 3：物體運動", tags: ["物理", "運動學", "牛頓定律", "高一"], topics: ["直線運動分析", "牛頓定律應用"] },
                    { name: "單元 4：電與磁", tags: ["物理", "電磁", "高一"], topics: ["電流磁效應", "電磁感應", "波與光粒二象性"] },
                    { name: "單元 5：能量", tags: ["物理", "能量", "核能", "高一"], topics: ["能量形式", "能源與核能", "量子現象初探"] }
                ]
            },
            {
                id: "phy_s2", name: "高二物理 (選修 I)", stage: "high_school", subject: "physics", book: "Book 2",
                units: [
                    { name: "單元 1：平面運動", tags: ["物理", "運動學", "高二"], topics: ["拋體運動", "圓周運動"] },
                    { name: "單元 2：牛頓定律應用", tags: ["物理", "力學", "高二"], topics: ["慣性力", "摩擦力分析"] },
                    { name: "單元 3：動量與衝量", tags: ["物理", "動量", "高二"], topics: ["動量守恆", "質心運動", "碰撞"] },
                    { name: "單元 4：萬有引力", tags: ["物理", "引力", "高二"], topics: ["克卜勒定律", "萬有引力定律"] }
                ]
            },
            {
                id: "phy_s3", name: "高二物理 (選修 II)", stage: "high_school", subject: "physics", book: "Book 3",
                units: [
                    { name: "單元 1：功與能量", tags: ["物理", "能量", "高二"], topics: ["變力作功", "保守力與位能"] },
                    { name: "單元 2：熱學", tags: ["物理", "熱", "高二"], topics: ["理想氣體方程式", "氣體動力論", "熱容量"] }
                ]
            },
            {
                id: "phy_s4", name: "高三物理 (選修 III)", stage: "high_school", subject: "physics", book: "Book 4",
                units: [
                    { name: "單元 1：波動", tags: ["物理", "波動", "高三"], topics: ["波的疊加", "駐波", "都卜勒效應"] },
                    { name: "單元 2：聲波", tags: ["物理", "聲波", "高三"], topics: ["空氣柱共鳴"] },
                    { name: "單元 3：幾何光學", tags: ["物理", "光學", "高三"], topics: ["折射定律", "透鏡成像公式"] },
                    { name: "單元 4：物理光學", tags: ["物理", "光學", "高三"], topics: ["干涉(雙狹縫)", "繞射(單狹縫)"] }
                ]
            },
            {
                id: "phy_s5", name: "高三物理 (選修 IV)", stage: "high_school", subject: "physics", book: "Book 5",
                units: [
                    { name: "單元 1：靜電學", tags: ["物理", "電學", "高三"], topics: ["庫侖定律", "電場與電位", "高斯定律(定性)"] },
                    { name: "單元 2：電流電路", tags: ["物理", "電學", "高三"], topics: ["克希荷夫定律", "電容"] },
                    { name: "單元 3：電流磁效應", tags: ["物理", "磁學", "高三"], topics: ["必歐-沙伐定律", "安培定律"] },
                    { name: "單元 4：電磁感應", tags: ["物理", "電磁", "高三"], topics: ["冷次定律", "電感", "馬克士威方程式(概念)"] }
                ]
            },
            {
                id: "phy_s6", name: "高三物理 (選修 V)", stage: "high_school", subject: "physics", book: "Book 6",
                units: [
                    { name: "單元 1：量子現象", tags: ["物理", "量子", "高三"], topics: ["光電效應", "波耳氫原子模型"] },
                    { name: "單元 2：原子核與粒子", tags: ["物理", "核物理", "高三"], topics: ["放射性衰變", "標準模型簡介"] }
                ]
            }
        ],

        // --- 化學 (Chemistry) ---
        chemistry: [
           
            {
                id: "chem_s1", name: "高一化學 (必修)", stage: "high_school", subject: "chemistry", book: "Book 1",
                units: [
                    { name: "單元 1：物質的組成", tags: ["化學", "原子", "化學鍵", "高一"], topics: ["原子結構", "週期表規律", "八隅體規則", "化學鍵(離子/共價/金屬)"] },
                    { name: "單元 2：化學反應", tags: ["化學", "反應熱", "計量", "高一"], topics: ["化學計量", "反應熱(吸放熱)", "溶解度與濃度"] },
                    { name: "單元 3：生活化學", tags: ["化學", "生活化學", "高一"], topics: ["生物分子(醣/蛋白/脂/核酸)", "藥物", "水資源與環境污染"] }
                ]
            },
            {
                id: "chem_s2", name: "高二化學 (選修 I)", stage: "high_school", subject: "chemistry", book: "Book 2",
                units: [
                    { name: "單元 1：原子構造", tags: ["化學", "原子", "軌域", "高二"], topics: ["原子軌域(s,p,d,f)", "電子組態"] },
                    { name: "單元 2：化學鍵結", tags: ["化學", "化學鍵", "高二"], topics: ["路易斯結構", "VSEPR模型", "混成軌域"] },
                    { name: "單元 3：物質狀態", tags: ["化學", "氣體", "高二"], topics: ["氣體定律", "分子間作用力", "相圖"] }
                ]
            },
            {
                id: "chem_s3", name: "高二化學 (選修 II)", stage: "high_school", subject: "chemistry", book: "Book 3",
                units: [
                    { name: "單元 1：化學反應速率", tags: ["化學", "速率", "高二"], topics: ["速率定律", "碰撞學說", "催化劑"] },
                    { name: "單元 2：化學平衡", tags: ["化學", "平衡", "高二"], topics: ["平衡常數(Kc, Kp)", "勒沙特列原理"] }
                ]
            },
            {
                id: "chem_s4", name: "高三化學 (選修 III)", stage: "high_school", subject: "chemistry", book: "Book 4",
                units: [
                    { name: "單元 1：溶液性質", tags: ["化學", "溶液", "高三"], topics: ["拉午耳定律", "依數性質(沸點上升/凝固點下降)"] },
                    { name: "單元 2：酸鹼鹽平衡", tags: ["化學", "酸鹼", "高三"], topics: ["布-洛酸鹼", "Ka/Kb/Kw", "緩衝溶液", "滴定曲線"] }
                ]
            },
            {
                id: "chem_s5", name: "高三化學 (選修 IV)", stage: "high_school", subject: "chemistry", book: "Book 5",
                units: [
                    { name: "單元 1：氧化還原與電化學", tags: ["化學", "氧化還原", "電化學", "高三"], topics: ["氧化數", "電池電位", "電解與電鍍"] },
                    { name: "單元 2：有機化學 (一)", tags: ["化學", "有機", "高三"], topics: ["有機官能基", "異構物", "烷/烯/炔反應"] },
                    { name: "單元 3：有機化學 (二)", tags: ["化學", "有機", "高三"], topics: ["芳香烴", "醇/醚/醛/酮/酸/酯", "胺/醯胺"] }
                ]
            }
        ],

     // --- 生物 (Biology) ---
        biology: [
            {
                id: "bio_j1", name: "國七生物 (上)", stage: "junior_high", subject: "biology", book: "Book 1",
                units: [
                    { 
                        name: "單元 1：生命的特性", 
                        // 新增: "科學方法", "物質進出細胞", "滲透作用", "擴散作用", "細胞構造" (對應題庫中的顯微鏡、細胞題)
                        tags: ["生物", "國七", "單元 1：生命的特性", "細胞", "顯微鏡", "科學方法", "細胞構造", "物質進出細胞", "滲透作用", "擴散作用"], 
                        topics: ["科學方法", "細胞構造", "物質進出細胞"] 
                    },
                    { 
                        name: "單元 2：養分", 
                        // 新增: "食物中的養分", "光合作用", "酵素", "消化系統", "本氏液" (對應題庫中的實驗題)
                        tags: ["生物", "國七", "單元 2：養分", "養分", "酵素", "光合作用", "消化系統", "食物中的養分", "本氏液", "葉綠體"], 
                        topics: ["食物中的養分", "酵素", "光合作用", "消化系統"] 
                    },
                    { 
                        name: "單元 3：運輸與防禦", 
                        // 新增: "蒸散作用", "維管束", "血液循環", "淋巴與免疫", "心臟", "微血管"
                        tags: ["生物", "國七", "單元 3：運輸與防禦", "運輸", "循環", "維管束", "木質部", "韌皮部", "蒸散作用", "血液循環", "淋巴與免疫", "微血管"], 
                        topics: ["維管束", "蒸散作用", "血液循環", "淋巴與免疫"] 
                    },
                    { 
                        name: "單元 4：協調作用", 
                        // 新增: "神經系統", "內分泌系統", "腦", "激素" (對應題庫中的胰島素、腎上腺素題)
                        tags: ["生物", "國七", "單元 4：協調作用", "神經", "內分泌", "神經系統", "內分泌系統", "腦", "激素", "視覺暫留"], 
                        topics: ["神經系統", "內分泌系統", "動物行為", "植物感應"] 
                    },
                    { 
                        name: "單元 5：恆定性", 
                        // 新增: "呼吸作用", "體溫調節", "排泄與水分恆定", "泌液作用"
                        tags: ["生物", "國七", "單元 5：恆定性", "恆定", "排泄", "體溫調節", "呼吸作用", "血糖恆定", "排泄與水分恆定", "泌液作用", "含氮廢物"], 
                        topics: ["體溫調節", "呼吸作用", "血糖恆定", "排泄與水分恆定"] 
                    }
                ]
            },
            {
                id: "bio_j2", name: "國七生物 (下)", stage: "junior_high", subject: "biology", book: "Book 2",
                units: [
                    { 
                        name: "單元 1：生殖", 
                        // 新增: "細胞分裂與減數分裂", "有性生殖", "無性生殖"
                        tags: ["生物", "國七", "單元 1：生殖", "生殖", "細胞分裂", "減數分裂", "細胞分裂與減數分裂", "有性生殖", "無性生殖", "受精"], 
                        topics: ["細胞分裂與減數分裂", "無性生殖", "有性生殖"] 
                    },
                    { 
                        name: "單元 2：遺傳", 
                        // 新增: "人類的遺傳", "孟德爾遺傳法則", "性別遺傳"
                        tags: ["生物", "國七", "單元 2：遺傳", "遺傳", "基因", "孟德爾", "孟德爾遺傳法則", "人類的遺傳", "突變", "性別遺傳", "遺傳疾病"], 
                        topics: ["孟德爾遺傳法則", "人類的遺傳", "突變"] 
                    },
                    { 
                        name: "單元 3：演化", 
                        // 新增: "天擇說", "生物分類系統", "五界分類"
                        tags: ["生物", "國七", "單元 3：演化", "演化", "化石", "天擇", "天擇說", "生物分類", "生物分類系統", "五界分類", "二名法"], 
                        topics: ["化石", "天擇說", "生物分類系統"] 
                    },
                    { 
                        name: "單元 4：生態", 
                        // 新增: "能量流動", "族群與群集", "環境保育"
                        tags: ["生物", "國七", "單元 4：生態", "生態", "族群", "群集", "族群與群集", "生態系", "能量流動", "生物多樣性", "環境保育"], 
                        topics: ["族群與群集", "生態系", "能量流動", "生物多樣性"] 
                    }
                ]
            },
            {
                id: "bio_s1", name: "高一生物 (必修)", stage: "high_school", subject: "biology", book: "Book 1",
                units: [
                    { name: "單元 1：細胞", tags: ["生物", "高一", "細胞", "胞器", "能量", "ATP", "細胞學說"], topics: ["細胞學說", "細胞構造", "細胞能量(ATP)"] },
                    { name: "單元 2：遺傳", tags: ["生物", "高一", "遺傳", "DNA", "RNA", "染色體", "中心法則"], topics: ["染色體", "DNA結構", "基因轉錄與轉譯"] },
                    { name: "單元 3：演化與多樣性", tags: ["生物", "高一", "演化", "親緣關係", "病毒", "生物多樣性"], topics: ["演化證據", "親緣關係重建", "病毒與生物五界"] }
                ]
            },
            {
                id: "bio_s2", name: "高二生物 (選修 I)", stage: "high_school", subject: "biology", book: "Book 2",
                units: [
                    { name: "單元 1：細胞與能量", tags: ["生物", "高二", "細胞生理", "代謝", "酵素", "呼吸作用", "光合作用"], topics: ["酵素動力學", "細胞呼吸", "光反應"] },
                    { name: "單元 2：遺傳與分子生物", tags: ["生物", "高二", "分子生物", "基因表現", "基因調控", "生物技術", "PCR"], topics: ["基因調控", "生物技術(PCR)"] }
                ]
            },
            {
                id: "bio_s3", name: "高三生物 (選修 II)", stage: "high_school", subject: "biology", book: "Book 3",
                units: [
                    { name: "單元 1：動物生理", tags: ["生物", "高三", "生理學", "循環", "消化", "呼吸", "神經", "內分泌", "免疫"], topics: ["循環", "消化", "呼吸", "神經", "內分泌"] },
                    { name: "單元 2：植物生理", tags: ["生物", "高三", "植物生理", "營養器官", "物質運輸", "植物荷爾蒙"], topics: ["根莖葉構造", "物質運輸", "植物荷爾蒙"] },
                    { name: "單元 3：生態學", tags: ["生物", "高三", "生態學", "族群", "演替", "生質能", "保育"], topics: ["族群成長", "演替", "生質能"] }
                ]
            }
        ],

        // --- 地科 (Earth Science) ---
        // --- 地球科 (Earth Science) ---
earth: [
  {
    id: "earth_j5", name: "國九地科 (全)", stage: "junior_high", subject: "earth", book: "Book 5",
    units: [
      {
        name: "單元 1：變動的地球",
        tags: [
          "地科","板塊","地震","國九",
          "火山","岩漿","造山運動","抬升","地殼運動",
          "斷層","震源","震央","海嘯","地質構造"
        ],
        topics: ["地球分層","板塊構造","地震與火山"]
      },
      {
        name: "單元 2：地貌與岩石",
        tags: [
          "岩石","風化",
          "岩石循環","沉積岩","火成岩","變質岩",
          "風化作用","侵蝕作用","搬運作用","沉積作用",
          "冰川","冰磧石","U形谷","V形谷",
          "河流","河床沉積","鵝卵石","海岸","沙洲",
          "地下水","井水","地下水面","不透水層","超抽地下水","地層下陷",
          "礦物","石英","方解石","花崗岩","玄武岩","頁岩","砂岩","板岩","大理岩",
          "地質剖面","地質圖","災害防治","水利工程"
        ],
        topics: ["岩石循環","沉積岩/火成岩/變質岩","地質營力"]
      },
      {
        name: "單元 3：天氣變化",
        tags: [
          "天氣","氣象",
          "大氣結構","氣團","鋒面","降雨","水循環",
          "海洋鹽度","潮汐","氣象觀測","風力","氣壓"
        ],
        topics: ["大氣結構","氣團與鋒面","氣象觀測"]
      },
      {
        name: "單元 4：天文",
        tags: [
          "天文","宇宙",
          "晝夜與四季","月相","日食月食","太陽系",
          "天體運動","天球坐標（基礎）"
        ],
        topics: ["晝夜與四季","月相","日食月食","潮汐","太陽系"]
      }
    ]
  },
  {
    id: "earth_s1", name: "高一地科 (必修)", stage: "high_school", subject: "earth", book: "Book 1",
    units: [
      { name: "單元 1：地球環境", tags: ["地球","高一"], topics: ["地球系統","固體地球","大氣與海洋"] },
      { name: "單元 2：地球變動", tags: ["天氣","洋流"], topics: ["板塊運動","天氣系統","洋流"] },
      { name: "單元 3：永續發展", tags: ["環境","高一"], topics: ["氣候變遷","能源資源","天然災害"] }
    ]
  },
  {
    id: "earth_s2", name: "高二地科 (選修 I)", stage: "high_school", subject: "earth", book: "Book 2",
    units: [
      { name: "單元 1：地質學", tags: ["地質","高二"], topics: ["地質圖判讀","台灣地質","礦物學"] },
      { name: "單元 2：大氣科學", tags: ["大氣","高二"], topics: ["大氣熱力學","大氣運動","氣象預報"] },
      { name: "單元 3：海洋科學", tags: ["海洋","高二"], topics: ["海水性質","潮汐力學","艾克曼傳送"] }
    ]
  },
  {
    id: "earth_s3", name: "高三地科 (選修 II)", stage: "high_school", subject: "earth", book: "Book 3",
    units: [
      { name: "單元 1：天文學", tags: ["天文","高三"], topics: ["天球坐標","恆星演化","宇宙論"] }
    ]
  }
],

// --- 歷史 (History) ---
history: [
  {
    id: "hist_j1", name: "國七歷史 (臺灣史-上)", stage: "junior_high", subject: "history", book: "Book 1",
    units: [
      { 
        name: "單元 1：史前與原住民", 
        tags: [
          "歷史","史前","原住民","國七",
          "史前文化","考古","臺北盆地","生活型態","新石器時代","農耕",
          "南島語族","分布","考古層位","出土順序","史前文化序列",
          "淇武蘭","舶來品","阿美族","原住民權利","歲時祭儀",
          "平埔族","高山族","文化交流"
        ], 
        topics: ["長濱文化","南島語族"] 
      },
      { 
        name: "單元 2：大航海時代", 
        tags: [
          "歷史","荷西","明鄭","國七",
          "臺灣史","時期排序","大航海時代","荷蘭統治","西班牙統治",
          "鄭氏時期","外來作物","貿易史","海商","走私","地理優勢",
          "人物史","海防","宗教史","殖民影響","菲律賓","馬尼拉貿易"
        ], 
        topics: ["荷蘭統治","鄭氏政權"] 
      },
      { 
        name: "單元 3：清帝國時期(上)", 
        tags: [
          "歷史","清領","開港","國七",
          "渡台禁令","漢番關係","行政區劃","奏摺","社會問題","政策建議",
          "地圖判讀","行政隸屬","民變","街道更名","番界","劃界封山",
          "移民開墾","墾拓","軍屯制"
        ], 
        topics: ["開港通商前","渡台禁令","漢番關係"] 
      }
    ]
  },
  {
    id: "hist_j2", name: "國七歷史 (臺灣史-下)", stage: "junior_high", subject: "history", book: "Book 2",
    units: [
      { 
        name: "單元 1：清帝國時期(下)", 
        tags: [
          "歷史","清領","現代化","國七",
          "開港通商後","沈葆楨","劉銘傳","海防建設","地方治理",
          "行政設置","行政改制","原漢互動","漢化","番界","劃界封山",
          "地方民變","朱一貴","林爽文","地方社會"
        ], 
        topics: ["開港通商後","沈葆楨/劉銘傳"] 
      },
      { 
        name: "單元 2：日治時期", 
        tags: [
          "歷史","日治","國七",
          "殖民統治體制","皇民化運動","內地延長主義","專賣制度",
          "經濟建設","糖業","製糖","蓬萊米","水利工程","嘉南大圳",
          "教育政策","公共衛生","保甲制度","警察國家","慰安婦",
          "民族自決","南進政策","五年理蕃計畫","文化同化","日治法令"
        ], 
        topics: ["殖民統治體制","皇民化運動","經濟建設"] 
      },
      { 
        name: "單元 3：戰後臺灣", 
        tags: [
          "歷史","戰後","民主","國七",
          "二二八事件","白色恐怖","戒嚴","清鄉","黨外運動","美麗島事件",
          "民主化","經濟奇蹟","土地改革","耕者有其田","十大建設",
          "外交轉向","務實外交","彈性外交","大三通","政黨輪替","選舉史"
        ], 
        topics: ["二二八事件","白色恐怖","經濟奇蹟","民主化"] 
      }
    ]
  },
  {
    id: "hist_j3", name: "國八歷史 (東亞史-上)", stage: "junior_high", subject: "history", book: "Book 3",
    units: [
      { 
        name: "單元 1：商周至隋唐", 
        tags: [
          "歷史","中國史","國八",
          "封建與郡縣","儒家思想","絲路","古代政治","社會結構"
        ], 
        topics: ["封建與郡縣","儒家思想","絲路"] 
      },
      { 
        name: "單元 2：宋元明清", 
        tags: [
          "歷史","中國史","國八",
          "科舉士大夫","經濟重心南移","天朝體制","商業發展","城市化"
        ], 
        topics: ["科舉士大夫","經濟重心南移","天朝體制"] 
      }
    ]
  },
  {
    id: "hist_j4", name: "國八歷史 (東亞史-下)", stage: "junior_high", subject: "history", book: "Book 4",
    units: [
      { 
        name: "單元 1：晚清變局", 
        tags: [
          "歷史","晚清","國八",
          "鴉片戰爭","自強運動","洋務運動","甲午戰爭","不平等條約"
        ], 
        topics: ["鴉片戰爭","自強運動","甲午戰爭"] 
      },
      { 
        name: "單元 2：中華民國與共產中國", 
        tags: [
          "歷史","民國","國八",
          "辛亥革命","五四運動","國共內戰","改革開放","現代中國"
        ], 
        topics: ["辛亥革命","五四運動","國共內戰","改革開放"] 
      },
      { 
        name: "單元 3：日本與朝鮮半島", 
        tags: [
          "歷史","日本","朝鮮","國八",
          "明治維新","日本帝國主義","韓戰","東亞近代化"
        ], 
        topics: ["明治維新","日本帝國主義","韓戰"] 
      }
    ]
  },
  {
    id: "hist_j5", name: "國九歷史 (世界史-上)", stage: "junior_high", subject: "history", book: "Book 5",
    units: [
      { 
        name: "單元 1：古文明", 
        tags: [
          "歷史","古文明","國九",
          "西亞","埃及","印度","希臘","羅馬","文明比較"
        ], 
        topics: ["西亞","埃及","印度","希臘","羅馬"] 
      },
      { 
        name: "單元 2：普世宗教", 
        tags: [
          "歷史","宗教","國九",
          "基督教","伊斯蘭教","佛教","宗教傳播","宗教與社會"
        ], 
        topics: ["基督教","伊斯蘭教","佛教"] 
      },
      { 
        name: "單元 3：近代歐洲興起", 
        tags: [
          "歷史","歐洲","國九",
          "文藝復興","宗教改革","地理大發現","近代化起源"
        ], 
        topics: ["文藝復興","宗教改革","地理大發現"] 
      }
    ]
  },
  {
    id: "hist_j6", name: "國九歷史 (世界史-下)", stage: "junior_high", subject: "history", book: "Book 6",
    units: [
      { 
        name: "單元 1：革命時代", 
        tags: [
          "歷史","革命","國九",
          "科學革命","啟蒙運動","工業革命","法國大革命","思想史"
        ], 
        topics: ["科學革命","啟蒙運動","工業革命","法國大革命"] 
      },
      { 
        name: "單元 2：帝國主義與戰爭", 
        tags: [
          "歷史","戰爭","國九",
          "新帝國主義","一次大戰","二次大戰","殖民擴張"
        ], 
        topics: ["新帝國主義","一次大戰","二次大戰"] 
      },
      { 
        name: "單元 3：戰後世界", 
        tags: [
          "歷史","戰後","國九",
          "冷戰","區域統合","全球化","聯合國","冷戰影響"
        ], 
        topics: ["冷戰","區域統合","全球化"] 
      }
    ]
  },
            {
                id: "hist_s1", name: "高一歷史 (臺灣史)", stage: "high_school", subject: "history", book: "Book 1",
                units: [
                    { name: "單元 1：如何認識過去", tags: ["歷史", "史學", "高一"], topics: ["歷史思維", "史料分析"] },
                    { name: "單元 2：多元族群", tags: ["歷史", "族群", "高一"], topics: ["原住民族", "移民社會", "新住民"] },
                    { name: "單元 3：現代國家形塑", tags: ["歷史", "國家", "高一"], topics: ["殖民統治", "威權體制", "民主轉型"] }
                ]
            },
            {
                id: "hist_s2", name: "高一歷史 (東亞史)", stage: "high_school", subject: "history", book: "Book 2",
                units: [
                    { name: "單元 1：人群移動與交流", tags: ["歷史", "交流", "高一"], topics: ["漢人移民", "華商與華工"] },
                    { name: "單元 2：國家與社會", tags: ["歷史", "國家", "高一"], topics: ["傳統政治權威", "近代國家轉型"] },
                    { name: "單元 3：文化交會", tags: ["歷史", "文化", "高一"], topics: ["儒家文化圈", "西方文化衝擊"] }
                ]
            },
            {
                id: "hist_s3", name: "高二歷史 (世界史)", stage: "high_school", subject: "history", book: "Book 3",
                units: [
                    { name: "單元 1：歐洲文化與現代性", tags: ["歷史", "歐洲", "高二"], topics: ["基督教文化", "個人主義", "現代性擴張"] },
                    { name: "單元 2：文化接觸與交流", tags: ["歷史", "交流", "高二"], topics: ["伊斯蘭世界", "美洲古文明", "帝國主義"] },
                    { name: "單元 3：世界大戰與當代", tags: ["歷史", "戰爭", "高二"], topics: ["總體戰", "冷戰", "人權議題"] }
                ]
            }
        ],

        // --- 地理 (Geography) ---
        geography: [
            {
                id: "geo_j1", name: "國七地理 (臺灣)", stage: "junior_high", subject: "geography", book: "Book 1",
                units: [
                    { name: "單元 1：位置與範圍", tags: ["地理", "位置", "經緯度", "國七"], topics: ["絕對位置", "相對位置", "經緯度", "時區"] },
                    { name: "單元 2：地形", tags: ["地理", "地形", "國七"], topics: ["內營力與外營力", "五大地形", "海岸地形"] },
                    { name: "單元 3：氣候與水文", tags: ["地理", "氣候", "水文", "國七"], topics: ["天氣與氣候", "降雨類型", "水循環", "河川特性"] }
                ]
            },
            {
                id: "geo_j2", name: "國七地理 (臺灣/區域)", stage: "junior_high", subject: "geography", book: "Book 2",
                units: [
                    { name: "單元 1：人口與聚落", tags: ["地理", "人口", "聚落", "國七"], topics: ["人口成長", "人口金字塔", "城鄉差異"] },
                    { name: "單元 2：產業", tags: ["地理", "產業", "國七"], topics: ["農業類型", "工業區位", "高科技產業", "服務業"] },
                    { name: "單元 3：區域特色", tags: ["地理", "區域", "國七"], topics: ["北中南東區域發展", "離島特色"] }
                ]
            },
            {
                id: "geo_j3", name: "國八地理 (中國/東亞)", stage: "junior_high", subject: "geography", book: "Book 3",
                units: [
                    { name: "單元 1：中國的自然環境", tags: ["地理", "中國", "自然", "國八"], topics: ["地形階梯", "氣候類型"] },
                    { name: "單元 2：中國的人文發展", tags: ["地理", "中國", "人文", "國八"], topics: ["人口問題", "經濟改革開放", "一帶一路"] },
                    { name: "單元 3：東北亞與東南亞", tags: ["地理", "亞洲", "國八"], topics: ["日本", "韓國", "東協各國"] }
                ]
            },
            {
                id: "geo_j4", name: "國八地理 (區域地理)", stage: "junior_high", subject: "geography", book: "Book 4",
                units: [
                    { name: "單元 1：南亞", tags: ["地理", "南亞", "國八"], topics: ["印度季風", "宗教文化", "軟體產業"] },
                    { name: "單元 2：西亞與北非", tags: ["地理", "西亞", "北非", "國八"], topics: ["乾燥氣候", "伊斯蘭文化", "石油經濟"] },
                    { name: "單元 3：漠南非洲", tags: ["地理", "非洲", "國八"], topics: ["熱帶氣候", "殖民遺產"] }
                ]
            },
            {
                id: "geo_j5", name: "國九地理 (區域地理)", stage: "junior_high", subject: "geography", book: "Book 5",
                units: [
                    { name: "單元 1：歐洲", tags: ["地理", "歐洲", "國九"], topics: ["地形與氣候", "歐盟", "西歐/南歐/東歐/北歐"] },
                    { name: "單元 2：俄羅斯", tags: ["地理", "俄羅斯", "國九"], topics: ["高緯度氣候", "資源開發"] },
                    { name: "單元 3：北美洲", tags: ["地理", "北美", "國九"], topics: ["商業性農業", "多元文化", "全球經濟核心"] }
                ]
            },
            {
                id: "geo_j6", name: "國九地理 (全球議題)", stage: "junior_high", subject: "geography", book: "Book 6",
                units: [
                    { name: "單元 1：中南美洲", tags: ["地理", "中南美", "國九"], topics: ["拉丁文化", "貧富差距"] },
                    { name: "單元 2：大洋洲與兩極", tags: ["地理", "大洋洲", "兩極", "國九"], topics: ["澳洲與紐西蘭", "全球暖化影響"] },
                    { name: "單元 3：全球議題", tags: ["地理", "全球化", "國九"], topics: ["能源危機", "糧食問題", "國際分工"] }
                ]
            },
            {
                id: "geo_s1", name: "高一地理 (通論)", stage: "high_school", subject: "geography", book: "Book 1",
                units: [
                    { name: "單元 1：地理技能", tags: ["地理", "GIS", "地圖", "高一"], topics: ["地圖投影", "GIS地理資訊系統"] },
                    { name: "單元 2：自然地理", tags: ["地理", "地形", "氣候", "高一"], topics: ["地形系統", "氣候系統", "水文與土壤"] },
                    { name: "單元 3：自然災害", tags: ["地理", "災害", "高一"], topics: ["坡地災害", "洪患", "災害管理"] }
                ]
            },
            {
                id: "geo_s2", name: "高一地理 (人文/區域)", stage: "high_school", subject: "geography", book: "Book 2",
                units: [
                    { name: "單元 1：人文地理", tags: ["地理", "人文", "都市", "高一"], topics: ["人口轉型", "都市階層", "產業區位"] },
                    { name: "單元 2：世界體系", tags: ["地理", "全球化", "高一"], topics: ["核心與邊陲", "全球化與在地化"] },
                    { name: "單元 3：東亞文化圈", tags: ["地理", "東亞", "高一"], topics: ["儒家文化", "人口老化問題"] }
                ]
            },
            {
                id: "geo_s3", name: "高二地理 (區域/議題)", stage: "high_school", subject: "geography", book: "Book 3",
                units: [
                    { name: "單元 1：歐美區域", tags: ["地理", "歐美", "高二"], topics: ["歐盟整合", "北美都市發展"] },
                    { name: "單元 2：開發中國家", tags: ["地理", "開發中", "高二"], topics: ["東南亞發展", "非洲資源詛咒"] },
                    { name: "單元 3：全球議題", tags: ["地理", "議題", "高二"], topics: ["氣候變遷對策", "糧食安全", "傳染病擴散"] }
                ]
            }
        ],

        // --- 公民 (Civics) ---
civics: [
  {
    id: "civ_j1", name: "國七公民 (個人與社會)", stage: "junior_high", subject: "civics", book: "Book 1",
    units: [
      { name: "單元 1：自我發展", tags: ["公民","自我","性別","國七","性別刻板印象","性別平權","生命倫理","媒體素養","公民德性"], topics: ["馬斯洛需求理論","性別平等"] },
      { name: "單元 2：生活中的團體", tags: ["公民","家庭","社區","國七","家庭功能","家庭型態","親屬關係","收養與家庭","長期照護"], topics: ["家庭功能與變遷","同儕關係","部落與社區"] },
      { name: "單元 3：社會規範", tags: ["公民","規範","法律","國七","民法","刑法與違法概念","人權","隱私與權利"], topics: ["風俗習慣/倫理道德/宗教信仰/法律"] }
    ]
  },
  {
    id: "civ_j2", name: "國七公民 (社會與文化)", stage: "junior_high", subject: "civics", book: "Book 2",
    units: [
      { name: "單元 1：文化", tags: ["公民","文化","國七","多元文化","原住民文化","文化傳承挑戰"], topics: ["主流與次文化","文化位階","多元文化"] },
      { name: "單元 2：社會變遷", tags: ["公民","社會","國七","社會流動","高齡社會","少子化","社會福利","社會安全"], topics: ["社會運動","社會福利"] },
      { name: "單元 3：民主素養", tags: ["公民","民主","國七","會議程序","學生自治","公民參與","表決方式"], topics: ["會議規範","學生自治"] }
    ]
  },
  {
    id: "civ_j3", name: "國八公民 (政治)", stage: "junior_high", subject: "civics", book: "Book 3",
    units: [
      { name: "單元 1：國家與政府", tags: ["公民","國家","政治","國八","國家要素","主權概念","國家功能","國家與政府","國際承認"], topics: ["國家組成要素","民主與獨裁","五權分立"] },
      { name: "單元 2：政黨與選舉", tags: ["公民","政黨","選舉","國八","政黨政治","民意政治","選舉權","公民投票"], topics: ["政黨功能","選舉制度","公民投票"] },
      { name: "單元 3：中央與地方", tags: ["公民","政府","國八","地方自治","中央政府體制"], topics: ["中央政府體制","地方自治"] }
    ]
  },
  {
    id: "civ_j4", name: "國八公民 (法律)", stage: "junior_high", subject: "civics", book: "Book 4",
    units: [
      { name: "單元 1：法律基本概念", tags: ["公民","法律","權利","國八","法律位階","權利義務","偵查程序原則","無罪推定","偵查與起訴程序"], topics: ["法律位階","權利義務","法律責任"] },
      { name: "單元 2：民法與生活", tags: ["公民","民法","國八","行為能力","契約法","親屬與繼承","監護宣告","權利救濟","民事訴訟","調解"], topics: ["行為能力","契約自由","侵權行為","親屬與繼承"] },
      { name: "單元 3：刑法與行政法", tags: ["公民","刑法","行政法","國八","刑罰種類","犯罪與違法區別","新刑法條文與立法效果","行政處分"], topics: ["罪刑法定","刑罰種類","行政處分","權利救濟"] }
    ]
  },
  {
    id: "civ_j5", name: "國九公民 (經濟)", stage: "junior_high", subject: "civics", book: "Book 5",
    units: [
      { name: "單元 1：選擇與機會成本", tags: ["公民","經濟","機會成本","國九","經濟功能","資源稀缺"], topics: ["資源稀缺","機會成本","生產可能曲線"] },
      { name: "單元 2：市場與貨幣", tags: ["公民","市場","供需","國九","需求法則","供給法則","市場均衡","貨幣功能"], topics: ["需求法則","供給法則","市場均衡","貨幣功能"] },
      { name: "單元 3：分工與貿易", tags: ["公民","貿易","國九","比較利益","國際貿易","外匯市場"], topics: ["比較利益","國際貿易","外匯市場"] }
    ]
  },
  {
    id: "civ_j6", name: "國九公民 (全球關連)", stage: "junior_high", subject: "civics", book: "Book 6",
    units: [
      { name: "單元 1：科技與資訊", tags: ["公民","科技","媒體","國九","媒體識讀","智慧財產權","資訊倫理","媒體素養"], topics: ["媒體識讀","智慧財產權","資訊倫理"] },
      { name: "單元 2：全球議題", tags: ["公民","全球化","國九","國際組織","貧富差距","環境永續","社會福利","移工權益"], topics: ["國際組織","貧富差距","環境永續"] }
    ]
  },


            // Senior High
            {
                id: "civ_s1", name: "高一公民 (公民身分)", stage: "high_school", subject: "civics", book: "Book 1",
                units: [
                    { name: "單元 1：公民身分與人權", tags: ["公民", "人權", "高一"], topics: ["人權演進", "公民權利", "弱勢保障"] },
                    { name: "單元 2：公共利益", tags: ["公民", "公益", "高一"], topics: ["公共性", "社會正義", "多元文化"] },
                    { name: "單元 3：國家與民主政治", tags: ["公民", "國家", "民主", "高一"], topics: ["國家組成", "民主理論", "憲政主義"] }
                ]
            },
            {
                id: "civ_s2", name: "高一公民 (法律與生活)", stage: "high_school", subject: "civics", book: "Book 2",
                units: [
                    { name: "單元 1：憲法與人權保障", tags: ["公民", "憲法", "高一"], topics: ["違憲審查", "權利限制原則"] },
                    { name: "單元 2：行政法與生活", tags: ["公民", "行政法", "高一"], topics: ["行政程序", "國家賠償"] },
                    { name: "單元 3：民法與刑法", tags: ["公民", "民刑法", "高一"], topics: ["契約效力", "刑罰目的", "修復式司法"] }
                ]
            },
            {
                id: "civ_s3", name: "高二公民 (經濟與社會)", stage: "high_school", subject: "civics", book: "Book 3",
                units: [
                    { name: "單元 1：經濟學基本概念", tags: ["公民", "經濟", "高二"], topics: ["誘因", "供需模型", "經濟效率"] },
                    { name: "單元 2：總體經濟指標", tags: ["公民", "總經", "高二"], topics: ["GDP", "失業率", "通貨膨脹"] },
                    { name: "單元 3：社會階層與流動", tags: ["公民", "社會", "高二"], topics: ["社會不平等", "社會安全制度"] }
                ]
            }
        ]
    };

    // Mount to global scope
    global.CurriculumLibrary.data = fullData;
    console.log("✅ V5.4 完整細分課綱已載入 (標籤對齊修復版)");

})(typeof window !== 'undefined' ? window : global);
