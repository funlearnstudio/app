(function(global){
    'use strict';

    // 1. 初始化倉庫
    window.__MATH_REPO__ = window.__MATH_REPO__ || {};
    console.log("🚀 [Math Combined] 數學題庫 (動態生成 + QAOT 固定版) 啟動...");

    // 2. 共用工具集 (包含原本動態題需要的與 QAOT 需要的 shuffle)
    const Utils = {
        rnd: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
        shuffle: (arr) => [...arr].sort(() => Math.random() - 0.5),
        genOptions: (ans) => {
            let opts = new Set([ans]);
            while(opts.size < 4) {
                let offset = Math.floor(Math.random() * 10) + 1;
                let val = Math.random() > 0.5 ? ans + offset : ans - offset;
                opts.add(val);
            }
            return Array.from(opts).sort(() => Math.random() - 0.5);
        },
        formatOp: (val) => (val < 0 ? `- ${Math.abs(val)}` : `+ ${val}`)
    };

    const generators = [

    // 單元 1：整數的運算
    {
        id: "math_abs",
        tags: ["數學","整數","絕對值","國七"],
        generate: () => {
            const n = Utils.rnd(-20,20);
            const ans = Math.abs(n);
            return {
                question:`【整數】計算 |${n}| = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"負數與絕對值",
                explanation:[`絕對值代表距離，永遠非負。`,`|${n}| = ${ans}`]
            };
        }
    },
    {
        id:"math_int_addsub",
        tags:["數學","整數","加減","國七"],
        generate:()=>{
            const a=Utils.rnd(-15,15);
            const b=Utils.rnd(-15,15);
            const ans=a+b;
            const bStr=Utils.formatOp(b);
            return {
                question:`【整數】計算 ${a} ${bStr} = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"整數的加減",
                explanation:[`同號相加，異號相減。`,`${a} ${bStr} = ${ans}`]
            };
        }
    },
    {
        id:"math_int_muldiv",
        tags:["數學","整數","乘除","國七"],
        generate:()=>{
            const a=Utils.rnd(-9,9);
            const b=Utils.rnd(2,9);
            const ans=a*b;
            return {
                question:`【整數】計算 ${a} × ${b} = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"整數的乘除",
                explanation:[`乘法：符號相同得正，符號不同得負。`,`${a} × ${b} = ${ans}`]
            };
        }
    },
    {
        id:"math_exp_sci",
        tags:["數學","指數","科學記號","國七"],
        generate:()=>{
            const base=Utils.rnd(2,5);
            const exp=Utils.rnd(2,4);
            const ans=Math.pow(base,exp);
            return {
                question:`【指數】計算 ${base}^${exp} = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"指數與科學記號",
                explanation:[`指數表示重複乘法。`,`${base}^${exp} = ${ans}`]
            };
        }
    },

    // 單元 2：分數的運算
    {
        id:"math_factor_multiple",
        tags:["數學","分數","因數","國七"],
        generate:()=>{
            const a=Utils.rnd(6,20);
            const b=Utils.rnd(6,20);
            const ans=(a%b===0);
            return {
                question:`【因數】判斷 ${a} 是否為 ${b} 的倍數？`,
                options:["是","否"],
                correctValue:ans?"是":"否",
                concept:"因數與倍數",
                explanation:[`${a} ÷ ${b} = ${a/b}`, ans? "整除，為倍數":"非整除，不是倍數"]
            };
        }
    },
    {
        id:"math_gcf_lcm",
        tags:["數學","分數","國七"],
        generate:()=>{
            const a=Utils.rnd(6,20);
            const b=Utils.rnd(6,20);
            const g=(n,m)=>m?g(m,n%m):n;
            const gcf=g(a,b);
            const lcm=a*b/gcf;
            return {
                question:`【因數】求 ${a} 與 ${b} 的最大公因數？`,
                options:Utils.genOptions(gcf),
                correctValue:gcf,
                concept:"最大公因數與最小公倍數",
                explanation:[`最大公因數 GCF = ${gcf}`,`最小公倍數 LCM = ${lcm}`]
            };
        }
    },
    {
        id:"math_fraction_ops",
        tags:["數學","分數","加減乘除","國七"],
        generate:()=>{
            const a=Utils.rnd(1,9);
            const b=Utils.rnd(2,9);
            const c=Utils.rnd(1,9);
            const d=Utils.rnd(2,9);
            const ans=(a*d+b*c)/(b*d);
            return {
                question:`【分數】計算 ${a}/${b} + ${c}/${d} = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"分數的加減乘除",
                explanation:[`通分：${a*d}/${b*d}+${c*b}/${d*b}`,`答案=${ans}`]
            };
        }
    },
    {
        id:"math_exp_law",
        tags:["數學","指數律","國七"],
        generate:()=>{
            const a=Utils.rnd(2,5);
            const m=Utils.rnd(2,3);
            const n=Utils.rnd(2,3);
            const ans=Math.pow(a,m+n);
            return {
                question:`【指數律】計算 ${a}^${m} × ${a}^${n} = ?`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"指數律",
                explanation:[`同底數相乘，指數相加。`,`答案=${ans}`]
            };
        }
    },

    // 單元 3：一元一次方程式
    {
        id:"math_symbol",
        tags:["數學","一元一次","國七"],
        generate:()=>{
            const x=Utils.rnd(1,9);
            return {
                question:`【代數】若 x=${x}，則 2x+3=?`,
                options:Utils.genOptions(2*x+3),
                correctValue:2*x+3,
                concept:"以符號代表數",
                explanation:[`代入 x=${x}`,`2x+3=${2*x+3}`]
            };
        }
    },
    {
        id:"math_linear_ops",
        tags:["數學","一元一次","國七"],
        generate:()=>{
            const a=Utils.rnd(2,5);
            const b=Utils.rnd(1,9);
            const x=Utils.rnd(1,9);
            const ans=a*x+b;
            return {
                question:`【代數】計算 ${a}x+${b} 當 x=${x}`,
                options:Utils.genOptions(ans),
                correctValue:ans,
                concept:"一元一次式的運算",
                explanation:[`代入 x=${x}`,`答案=${ans}`]
            };
        }
    },
    {
        id:"math_linear_eq",
        tags:["數學","一元一次","國七"],
        generate:()=>{
            const x=Utils.rnd(2,9);
            const a=Utils.rnd(2,5);
            const b=Utils.rnd(-10,10);
            const c=a*x+b;
            return {
                question:`【代數】解方程式 ${a}x+${b}=${c}`,
                options:Utils.genOptions(x),
                correctValue:x,
                concept:"解一元一次方程式",
                explanation:[`移項：${a}x=${c-b}`,`答案 x=${x}`]
            };
        }
    },
    {
        id:"math_linear_app",
        tags:["數學","一元一次","應用","國七"],
        generate:()=>{
            const price=Utils.rnd(50,100);
            const qty=Utils.rnd(2,5);
            const total=price*qty;
            return {
                question:`【應用】單價${price}元，買${qty}個，總價=?`,
                options:Utils.genOptions(total),
                correctValue:total,
                concept:"應用問題",
                explanation:[`總價=單價×數量=${total}`]
            };
        }
    },
            // 國八：單元 1 乘法公式與多項式
    {
        id: "k8_mul_formula",
        tags: ["數學","乘法公式","多項式","國八"],
        generate: () => {
            const a = Utils.rnd(2,9);
            const b = Utils.rnd(2,9);
            const ans = a*a - b*b; // (a-b)(a+b)
            return {
                question: `【乘法公式】計算 ${a}^2 - ${b}^2 = ? (提示：可用乘法公式)`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "乘法公式",
                explanation: [
                    `差平方公式：${a}^2 - ${b}^2 = (${a}-${b})(${a}+${b})`,
                    `計算：(${a}-${b})(${a}+${b}) = ${ans}`
                ]
            };
        }
    },
    {
        id: "k8_poly_ops",
        tags: ["數學","多項式","國八"],
        generate: () => {
            const a = Utils.rnd(1,5);
            const b = Utils.rnd(1,5);
            const c = Utils.rnd(1,5);
            // (ax + b) + (cx + 1)
            const coef = a + c;
            const constTerm = b + 1;
            const ansStr = `${coef}x + ${constTerm}`;
            return {
                question: `【多項式】化簡：${a}x + ${b} + ${c}x + 1 = ?`,
                options: [ansStr, `${a}x+${b}`, `${c}x+1`, `${(a-c)}x+${(b-1)}`],
                correctValue: ansStr,
                concept: "多項式的加減",
                explanation: [
                    `同類項相加：係數相加，常數相加。`,
                    `${a}x+${c}x = ${coef}x，${b}+1=${constTerm}`
                ]
            };
        }
    },

    // 國八：單元 2 平方根與畢氏定理
    {
        id: "k8_sqrt_approx",
        tags: ["數學","平方根","國八"],
        generate: () => {
            const n = Utils.rnd(2,15);
            const ans = Math.sqrt(n).toFixed(2);
            // genOptions expects numbers; convert to floats
            const opts = Utils.genOptions(Math.round(parseFloat(ans)*100)/100);
            return {
                question: `【平方根】計算 √${n}（四捨五入到小數第二位）= ?`,
                options: opts,
                correctValue: Math.round(Math.sqrt(n)*100)/100,
                concept: "平方根與近似值",
                explanation: [
                    `平方根是使平方等於原數的數。`,
                    `√${n} ≈ ${ans}`
                ]
            };
        }
    },
    {
        id: "k8_pythagoras",
        tags: ["數學","畢氏定理","國八"],
        generate: () => {
            const a = Utils.rnd(3,12);
            const b = Utils.rnd(3,12);
            const c = Math.sqrt(a*a + b*b);
            const ans = Math.round(c*100)/100;
            return {
                question: `【畢氏定理】直角三角形兩直角邊長 ${a} 與 ${b}，斜邊長為多少（四捨五入到小數第二位）？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "畢氏定理",
                explanation: [
                    `畢氏定理：c^2 = a^2 + b^2。`,
                    `c = √(${a*a} + ${b*b}) ≈ ${ans}`
                ]
            };
        }
    },

   // 國八：單元 3 因式分解
    {
        id: "k8_factor_common",
        tags: ["數學","因式分解","國八"],
        generate: () => {
            const m = Utils.rnd(2,6);
            const n = Utils.rnd(1,6);
            const a = m*n;
            const b = m;
            // const c = n; // 這行沒用到，可以註解掉
            const ansStr = `${m}(${n}x + 1)`;
            
            return {
                question: `【因式分解】將 ${a}x + ${b} 分解為因式？`,
                
                // ❌ 原本錯誤： `${a}(${x}+1)`  <-- 這裡的 x 被當成變數了
                // ✅ 修正如下： `${a}(x+1)`     <-- 這裡的 x 只是文字
                options: [ansStr, `${n}(${m}x+1)`, `${m}x+${b}`, `${a}(x+1)`],
                
                correctValue: ansStr,
                concept: "提公因式",
                explanation: [
                    `提公因式：找出共同因子 ${m}，`,
                    `${a}x+${b} = ${m}(${n}x+1)`
                ]
            };
        }
    },
    {
        id: "k8_cross_multiply",
        tags: ["數學","因式分解","十字交乘","國八"],
        generate: () => {
            const p = Utils.rnd(1,9);
            const q = Utils.rnd(1,9);
            const r = Utils.rnd(1,9);
            const s = Utils.rnd(1,9);
            const ans = `${p*r}x^2 + ${(p*s+q*r)}x + q*s`;
            return {
                question: `【十字交乘】計算 (${p}x + ${q})(${r}x + ${s}) 展開為何？`,
                options: Utils.genOptions(0).map((_,i,arr)=>{ // placeholder to create 4 options
                    if(i===0) return ans;
                    return `${p*r+i}x^2 + ${(p*s+q*r+i)}x + ${q*s+i}`;
                }),
                correctValue: ans,
                concept: "十字交乘法",
                explanation: [
                    `展開：(${p}x+${q})(${r}x+${s}) = ${p*r}x^2 + (${p*s+q*r})x + ${q*s}`,
                    `答案：${ans}`
                ]
            };
        }
    },

    // 國八：單元 1-4 補充（等差數列、幾何圖形、三角形、平行與四邊形）
    {
        id: "k8_arith_seq",
        tags: ["數學","數列","國八"],
        generate: () => {
            const a1 = Utils.rnd(1,10);
            const d = Utils.rnd(1,6);
            const n = Utils.rnd(3,8);
            const an = a1 + (n-1)*d;
            return {
                question: `【等差數列】首項 ${a1}，公差 ${d}，求第 ${n} 項？`,
                options: Utils.genOptions(an),
                correctValue: an,
                concept: "等差數列",
                explanation: [
                    `等差數列第 n 項：a_n = a_1 + (n-1)d`,
                    `a_${n} = ${an}`
                ]
            };
        }
    },
    {
        id: "k8_plane_geometry",
        tags: ["數學","幾何","國八"],
        generate: () => {
            const base = Utils.rnd(4,12);
            const height = Utils.rnd(3,10);
            const area = 0.5 * base * height;
            const ans = Math.round(area*100)/100;
            return {
                question: `【平面圖形】三角形底 ${base} 高 ${height}，面積為多少（四捨五入到小數第二位）？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "平面圖形",
                explanation: [
                    `三角形面積 = 底 × 高 ÷ 2`,
                    `面積 = ${base}×${height}÷2 = ${ans}`
                ]
            };
        }
    },
    {
        id: "k8_triangle_props",
        tags: ["數學","三角形","國八"],
        generate: () => {
            const A = Utils.rnd(40,80);
            const B = Utils.rnd(30,90-A);
            const C = 180 - A - B;
            return {
                question: `【三角形】已知兩內角 ${A}° 與 ${B}°，第三角為多少度？`,
                options: Utils.genOptions(C),
                correctValue: C,
                concept: "三角形的內角與外角",
                explanation: [
                    `三角形內角和為 180°，第三角 = 180 - ${A} - ${B} = ${C}°`
                ]
            };
        }
    },
    {
        id: "k8_parallel_quadrilateral",
        tags: ["數學","平行","四邊形","國八"],
        generate: () => {
            const base = Utils.rnd(6,12);
            const height = Utils.rnd(3,8);
            const area = base * height;
            return {
                question: `【平行四邊形】底 ${base} 高 ${height}，面積為多少？`,
                options: Utils.genOptions(area),
                correctValue: area,
                concept: "平行四邊形與特殊四邊形",
                explanation: [
                    `平行四邊形面積 = 底 × 高 = ${area}`
                ]
            };
        }
    },

    // 國九：單元 1 相似形
    {
        id: "k9_similarity_ratio",
        tags: ["數學","相似形","國九"],
        generate: () => {
            const a1 = Utils.rnd(3,8);
            const b1 = Utils.rnd(4,12);
            const scale = Utils.rnd(2,4);
            const a2 = a1 * scale;
            const ans = a2;
            return {
                question: `【相似形】若小三角形邊長 ${a1} 對應大三角形邊長 ${a2}，比例尺為 ${scale}，若另一邊為 ${b1}，對應大三角形為多少？`,
                options: Utils.genOptions(b1*scale),
                correctValue: b1*scale,
                concept: "連比例與相似三角形",
                explanation: [
                    `相似形邊長成比例，放大倍數 = ${scale}`,
                    `答案：${b1} × ${scale} = ${b1*scale}`
                ]
            };
        }
    },

    // 國九：單元 2 圓形
    {
        id: "k9_circle_angles",
        tags: ["數學","圓","國九"],
        generate: () => {
            const central = Utils.rnd(40,140);
            const inscribed = central / 2;
            return {
                question: `【圓】已知圓心角為 ${central}°，對應的圓周角為多少度？`,
                options: Utils.genOptions(inscribed),
                correctValue: inscribed,
                concept: "圓心角與圓周角",
                explanation: [
                    `圓周角等於對應圓心角的一半。`,
                    `答案：${inscribed}°`
                ]
            };
        }
    },

    // 國九：單元 3 幾何證明與三角形的心
    {
        id: "k9_triangle_centers",
        tags: ["數學","幾何","國九"],
        generate: () => {
            const a = Utils.rnd(5,12);
            const b = Utils.rnd(5,12);
            const c = Utils.rnd(5,12);
            // not computing actual centers numerically; ask conceptual
            return {
                question: `【三角形心】三角形的三個重要中心分別是？`,
                options: ["外心;內心;重心", "垂心;外心;中點", "內心;中點;垂心", "重心;中點;外心"],
                correctValue: "外心;內心;重心",
                concept: "三角形的外心、內心與重心",
                explanation: [
                    `三角形重要中心：外心（垂直平分線交點）、內心（角平分線交點）、重心（中線交點）。`
                ]
            };
        }
    },

    // 國九：二次函數、統計與機率、立體幾何
    {
        id: "k9_quadratic_vertex",
        tags: ["數學","二次函數","國九"],
        generate: () => {
            const a = Utils.rnd(1,3);
            const b = Utils.rnd(-6,6);
            const c = Utils.rnd(-5,5);
            const vertexX = -b/(2*a);
            const vertexY = a*vertexX*vertexX + b*vertexX + c;
            const ansX = Math.round(vertexX*100)/100;
            const ansY = Math.round(vertexY*100)/100;
            return {
                question: `【二次函數】求 y=${a}x^2 + ${b}x + ${c} 的頂點座標 (x,y)，四捨五入到小數第二位？`,
                options: [`(${ansX}, ${ansY})`, `(${Math.round((ansX+1)*100)/100}, ${ansY})`, `(${ansX}, ${Math.round((ansY+1)*100)/100})`, `(0, ${c})`],
                correctValue: `(${ansX}, ${ansY})`,
                concept: "配方法與頂點",
                explanation: [
                    `頂點 x = -b/(2a) = ${ansX}`,
                    `代入得 y = ${ansY}`
                ]
            };
        }
    },
    {
        id: "k9_stats_prob",
        tags: ["數學","統計","機率","國九"],
        generate: () => {
            const total = Utils.rnd(10,20);
            const success = Utils.rnd(1, total-1);
            const prob = Math.round((success/total)*100)/100;
            return {
                question: `【機率】從 ${total} 個球中隨機抽一個，其中 ${success} 個是紅球，抽到紅球的機率為多少（小數兩位）？`,
                options: Utils.genOptions(prob),
                correctValue: prob,
                concept: "機率入門",
                explanation: [
                    `機率 = 成功數 / 總數 = ${success}/${total} ≈ ${prob}`
                ]
            };
        }
    },
    {
        id: "k9_solid_geometry",
        tags: ["數學","立體","國九"],
        generate: () => {
            const r = Utils.rnd(2,6);
            const h = Utils.rnd(3,10);
            const vol = Math.round(Math.PI * r * r * h * 100)/100;
            return {
                question: `【立體】圓柱半徑 ${r} 高 ${h}，體積為多少（π 保留，或數值四捨五入到小數第二位）？`,
                options: Utils.genOptions(vol),
                correctValue: vol,
                concept: "角柱與圓柱",
                explanation: [
                    `圓柱體積 = 底面積 × 高 = πr^2 h ≈ ${vol}`
                ]
            };
        }
    },
            // 單元 1：相似形 - 連比例
    {
        id: "k9_sim_prop",
        tags: ["數學","相似形","連比例","國九"],
        generate: () => {
            const a = Utils.rnd(2,8);
            const scale = Utils.rnd(2,5);
            const b = Utils.rnd(3,12);
            const ans = b * scale;
            return {
                question: `【相似形】若小圖形邊長 ${a} 對應大圖形為 ${a*scale}，則 ${b} 對應的大圖形邊長為多少？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "連比例",
                explanation: [
                    `相似形邊長成比例，放大倍數 = ${scale}。`,
                    `答案：${b} × ${scale} = ${ans}`
                ]
            };
        }
    },
    // 單元 1：相似形 - 相似三角形
    {
        id: "k9_sim_triangle",
        tags: ["數學","相似形","相似三角形","國九"],
        generate: () => {
            const a1 = Utils.rnd(3,8);
            const a2 = Utils.rnd(3,8);
            const scale = Utils.rnd(2,4);
            const b1 = a1 * scale;
            const b2 = a2 * scale;
            return {
                question: `【相似三角形】若三角形 ABC 與 A'B'C' 相似，且 AB=${a1}, AC=${a2}，放大倍數為 ${scale}，求 A'B' 與 A'C'？`,
                options: [`${b1}; ${b2}`, `${a1}; ${a2}`, `${b1+1}; ${b2+1}`, `${b1-1}; ${b2-1}`],
                correctValue: `${b1}; ${b2}`,
                concept: "相似三角形",
                explanation: [
                    `相似形邊長按相同比例放大：A'B'=${a1}×${scale}=${b1}，A'C'=${a2}×${scale}=${b2}`
                ]
            };
        }
    },

    // 單元 2：圓形 - 點、直線與圓的關係
    {
        id: "k9_circle_relation",
        tags: ["數學","圓","點直線圓","國九"],
        generate: () => {
            const r = Utils.rnd(3,8);
            const d = Utils.rnd(1, r+5);
            const relation = d < r ? "在圓內" : (d === r ? "在圓上" : "在圓外");
            return {
                question: `【圓】圓心到某點的距離為 ${d}，半徑為 ${r}，該點位於圓的哪裡？`,
                options: ["在圓內","在圓上","在圓外","無法判定"],
                correctValue: relation,
                concept: "點、直線與圓的關係",
                explanation: [
                    `若距離 < 半徑 → 在圓內；距離 = 半徑 → 在圓上；距離 > 半徑 → 在圓外。`,
                    `此題：${d} ${d<r?'<':''}${d===r?'=':''} ${r}，所以 ${relation}`
                ]
            };
        }
    },
    // 單元 2：圓形 - 圓心角、圓周角與弦切角
    {
        id: "k9_circle_angles",
        tags: ["數學","圓心角","圓周角","國九"],
        generate: () => {
            const central = Utils.rnd(40,160);
            const inscribed = Math.round(central / 2);
            return {
                question: `【圓角】已知圓心角為 ${central}°，對應的圓周角為多少度？`,
                options: Utils.genOptions(inscribed),
                correctValue: inscribed,
                concept: "圓心角與圓周角",
                explanation: [
                    `圓周角等於對應圓心角的一半。`,
                    `答案：${central}° ÷ 2 = ${inscribed}°`
                ]
            };
        }
    },

    // 單元 3：幾何證明與三角形的心 - 幾何推理證明（概念題）
    {
        id: "k9_geo_proof",
        tags: ["數學","幾何","證明","國九"],
        generate: () => {
            return {
                question: `【證明】若兩直線互相平分對方，則形成的四邊形為何種特殊四邊形？`,
                options: ["平行四邊形","菱形","矩形","正方形"],
                correctValue: "平行四邊形",
                concept: "幾何推理證明",
                explanation: [
                    `若兩直線互相平分對方（中點互相連接），則對邊互相平行，形成平行四邊形。`
                ]
            };
        }
    },
    // 單元 3：三角形的外心、內心與重心（概念題）
    {
        id: "k9_triangle_centers",
        tags: ["數學","三角形","外心內心重心","國九"],
        generate: () => {
            return {
                question: `【三角形心】下列哪一項配對正確？`,
                options: [
                    "外心：垂直平分線交點；內心：角平分線交點；重心：中線交點",
                    "外心：角平分線交點；內心：中線交點；重心：垂直平分線交點",
                    "外心：中線交點；內心：垂直平分線交點；重心：角平分線交點",
                    "外心：重心；內心：外心；重心：內心"
                ],
                correctValue: "外心：垂直平分線交點；內心：角平分線交點；重心：中線交點",
                concept: "三角形的外心、內心與重心",
                explanation: [
                    `外心為三邊垂直平分線交點；內心為三角的角平分線交點；重心為三條中線交點。`
                ]
            };
        }
    },

    // 單元 1（另一組）：二次函數 - 拋物線與頂點
    {
        id: "k9_quadratic_vertex",
        tags: ["數學","二次函數","拋物線","國九"],
        generate: () => {
            const a = Utils.rnd(1,3);
            const b = Utils.rnd(-6,6);
            const c = Utils.rnd(-5,5);
            const vx = -b / (2*a);
            const vy = a*vx*vx + b*vx + c;
            const ans = `(${Math.round(vx*100)/100}, ${Math.round(vy*100)/100})`;
            return {
                question: `【二次函數】求 y = ${a}x^2 + ${b}x + ${c} 的頂點座標 (x,y)，四捨五入到小數第二位？`,
                options: [ans, `(0, ${c})`, `(${Math.round((vx+1)*100)/100}, ${Math.round(vy*100)/100})`, `(${Math.round(vx*100)/100}, ${Math.round((vy+1)*100)/100})`],
                correctValue: ans,
                concept: "配方法與頂點",
                explanation: [
                    `頂點 x = -b/(2a)；代入求 y。`,
                    `計算得頂點 ${ans}`
                ]
            };
        }
    },
{
    id: "k9_quadratic_extreme",
    tags: ["數學", "二次函數", "最大最小", "國九"],
    generate: () => {
        // 1. 修正 const 錯誤，改用 let，並確保 a 不為 0
       // let a = Utils.rnd(-3, 3);
       // if (a === 0) a = 1; 
        let a = Utils.rnd(-3, 3);
        if (a === 0) a = 1;
        const b = Utils.rnd(-6, 6);
        const c = Utils.rnd(-5, 5);
        
        // 2. 判斷性質
        const opening = a > 0 ? "向上" : "向下";
        const nature = a > 0 ? "最小值" : "最大值";
        const correctAns = `${opening}，有${nature}`;

        // 3. 處理方程式顯示 (美化)
        const termA = a === 1 ? "x^2" : (a === -1 ? "-x^2" : `${a}x^2`);
        const termB = b === 0 ? "" : ` ${Utils.formatOp(b)}x`;
        const termC = c === 0 ? "" : ` ${Utils.formatOp(c)}`;

        return {
            question: `【二次函數】函數 y = ${termA}${termB}${termC} 的開口方向為何，且頂點處有何極值？`,
            options: [
                `${opening}，有${nature}`,
                `${opening === "向上" ? "向下" : "向上"}，有${nature}`,
                `${opening}，有${nature === "最大值" ? "最小值" : "最大值"}`,
                "無極值"
            ],
            correctValue: correctAns,
            concept: "開口方向與最大最小值",
            explanation: [
                `1. 係數 a = ${a}。`,
                `2. 因為 a ${a > 0 ? "> 0" : "< 0"}，故開口${opening}。`,
                `3. 開口${opening}的拋物線，其頂點處有${nature}。`
            ]
        };
    }
},

    // 單元 2：統計與機率 - 四分位數與盒狀圖（簡單計算 Q1/Q3）
    {
        id: "k9_stats_quartile",
        tags: ["數學","統計","四分位數","國九"],
        generate: () => {
            // 以簡單偶數長度資料集示範
            const data = [];
            for (let i=0;i<8;i++) data.push(Utils.rnd(1,20));
            data.sort((x,y)=>x-y);
            const q1 = data[1+Math.floor((2-1)/4)]; // 簡化取法，主要示範題型
            const q3 = data[5+Math.floor((6-1)/4)];
            return {
                question: `【統計】給定資料（已排序）: ${data.join(", ")}，請問第一四分位數 Q1 與第三四分位數 Q3 的近似值為何？（以資料中值近似）`,
                options: [`Q1=${data[1]}, Q3=${data[6]}`, `Q1=${data[0]}, Q3=${data[7]}`, `Q1=${data[2]}, Q3=${data[5]}`, `Q1=${data[3]}, Q3=${data[4]}`],
                correctValue: `Q1=${data[1]}, Q3=${data[6]}`,
                concept: "四分位數/盒狀圖",
                explanation: [
                    `四分位數將資料分為四等份，簡化取法以資料中位附近的值代表 Q1 與 Q3。`,
                    `此題選擇 Q1=${data[1]}、Q3=${data[6]}（示範題型）。`
                ]
            };
        }
    },
    // 統計與機率 - 機率入門
    {
        id: "k9_prob_basic",
        tags: ["數學","機率","國九"],
        generate: () => {
            const total = Utils.rnd(6,20);
            const success = Utils.rnd(1, total-1);
            const prob = Math.round((success/total)*100)/100;
            return {
                question: `【機率】從 ${total} 個球中隨機抽一個，其中 ${success} 個是紅球，抽到紅球的機率為多少（小數兩位）？`,
                options: Utils.genOptions(prob),
                correctValue: prob,
                concept: "機率入門",
                explanation: [
                    `機率 = 成功數 / 總數 = ${success}/${total} ≈ ${prob}`
                ]
            };
        }
    },

    // 單元 3：立體幾何圖形 - 角柱與圓柱（體積）
    {
        id: "k9_cylinder_volume",
        tags: ["數學","立體","圓柱","國九"],
        generate: () => {
            const r = Utils.rnd(2,6);
            const h = Utils.rnd(3,10);
            const vol = Math.round(Math.PI * r * r * h * 100)/100;
            return {
                question: `【立體】圓柱半徑 ${r}，高 ${h}，體積約為多少（π 取 3.1416，四捨五入到小數第二位）？`,
                options: Utils.genOptions(vol),
                correctValue: vol,
                concept: "角柱與圓柱",
                explanation: [
                    `圓柱體積 = 底面積 × 高 = π r^2 h ≈ ${vol}`
                ]
            };
        }
    },
    // 立體幾何 - 展開圖（概念題）
    {
        id: "k9_net_concept",
        tags: ["數學","立體","展開圖","國九"],
        generate: () => {
            return {
                question: `【展開圖】下列哪一項是圓錐的展開圖？`,
                options: ["扇形加一個圓形","長方形","三角形組合","梯形"],
                correctValue: "扇形加一個圓形",
                concept: "展開圖",
                explanation: [
                    `圓錐的展開圖由一個扇形（側面）和一個圓形（底面）組成。`
                ]
            };
        }
    },
            // math_s1 高一數學 (上) - 單元1：數與式
    {
        id: "s1_num_abs",
        tags: ["數學","數與式","絕對值","高一"],
        generate: () => {
            const n = Utils.rnd(-50,50);
            const ans = Math.abs(n);
            return {
                question: `【數系與絕對值】計算 |${n}| = ?`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "數系與絕對值",
                explanation: [`絕對值為數到 0 的距離，|${n}| = ${ans}`]
            };
        }
    },
    {
        id: "s1_ineq_basic",
        tags: ["數學","算幾不等式","高一"],
        generate: () => {
            const a = Utils.rnd(-10,10);
            const b = Utils.rnd(1,10);
            const ans = a + b;
            return {
                question: `【算幾不等式】若 x > ${a}，則 x + ${b} > ?`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "不等式的性質",
                explanation: [`不等式兩邊同加常數不改變方向：x+${b} > ${a}+${b} = ${ans}`]
            };
        }
    },
    {
        id: "s1_exp_log_basic",
        tags: ["數學","指數","對數","高一"],
        generate: () => {
            const base = 2;
            const n = Utils.rnd(1,5);
            const ans = Math.pow(base,n);
            return {
                question: `【指數】計算 ${base}^${n} = ?（並寫成對數形式）`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "指數與對數基本運算",
                explanation: [`${base}^${n} = ${ans}；對數形式：log_${base}(${ans}) = ${n}`]
            };
        }
    },

    // math_s1 高一數學 (上) - 單元2：直線與圓
    {
        id: "s1_line_slope",
        tags: ["數學","直線","斜率","高一"],
        generate: () => {
            const x1 = Utils.rnd(-5,5), y1 = Utils.rnd(-5,5);
            const x2 = x1 + Utils.rnd(1,6), y2 = y1 + Utils.rnd(-6,6);
            const slope = Math.round(((y2-y1)/(x2-x1))*100)/100;
            return {
                question: `【直線方程式與斜率】已知兩點 (${x1},${y1}) 與 (${x2},${y2})，斜率為多少？`,
                options: Utils.genOptions(slope),
                correctValue: slope,
                concept: "直線斜率",
                explanation: [`斜率 m = (y2 - y1) / (x2 - x1) = ${slope}`]
            };
        }
    },
    {
        id: "s1_circle_eq",
        tags: ["數學","圓方程式","高一"],
        generate: () => {
            const h = Utils.rnd(-5,5), k = Utils.rnd(-5,5), r = Utils.rnd(1,6);
            const eq = `(x - ${h})^2 + (y - ${k})^2 = ${r*r}`;
            return {
                question: `【圓方程式】半徑為 ${r}，圓心為 (${h},${k})，圓的方程式為何？`,
                options: [eq, `(x+${h})^2+(y+${k})^2=${r}`, `(x-${h})^2+(y-${k})^2=${r}`, `(x-${h})^2+(y-${k})^2=${r*r+1}`],
                correctValue: eq,
                concept: "圓方程式",
                explanation: [`標準式：(x - h)^2 + (y - k)^2 = r^2；代入得 ${eq}`]
            };
        }
    },
    {
        id: "s1_line_circle_relation",
        tags: ["數學","直線與圓的關係","高一"],
        generate: () => {
            const r = Utils.rnd(3,8);
            const d = Utils.rnd(0, r+3);
            const relation = d < r ? "相交於兩點或內含" : (d === r ? "相切" : "相離");
            return {
                question: `【直線與圓的關係】圓心到直線的距離為 ${d}，半徑為 ${r}，兩者關係為何？`,
                options: ["相交於兩點或內含","相切","相離","無法判定"],
                correctValue: relation,
                concept: "直線與圓的相對位置",
                explanation: [`若距離 < r → 相交（兩點或直線穿過圓內）；距離 = r → 相切；距離 > r → 相離。此題：${relation}`]
            };
        }
    },

    // math_s1 高一數學 (上) - 單元3：多項式函數
    {
        id: "s1_poly_division",
        tags: ["數學","多項式","除法","高一"],
        generate: () => {
            const a = Utils.rnd(1,5), b = Utils.rnd(0,5);
            // 題型：除以 (x - 1)
            const polyVal = a*1*1 + b*1 + Utils.rnd(0,5);
            const remainder = (a + b + 0) % (a+1); // 只是產生一個小餘數示例
            const ans = (a*1*1 + b*1); // f(1)
            return {
                question: `【多項式的除法原理】若 f(x) = ${a}x^2 + ${b}x + ${Utils.rnd(0,5)}，則 f(1) = ?（餘式定理示範）`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "多項式的除法原理",
                explanation: [`餘式定理：f(a) 為 f(x) 除以 (x-a) 的餘式；代入 x=1 得 f(1) = ${ans}`]
            };
        }
    },
    {
        id: "s1_remainder_factor",
        tags: ["數學","餘式定理","因式定理","高一"],
        generate: () => {
            const a = Utils.rnd(1,5);
            const b = Utils.rnd(-5,5);
            const c = Utils.rnd(-5,5);
            const root = Utils.rnd(-3,3);
            const val = a*root*root + b*root + c;
            return {
                question: `【餘式/因式定理】若 f(x) = ${a}x^2 + ${b}x + ${c}，則 f(${root}) = ?`,
                options: Utils.genOptions(val),
                correctValue: val,
                concept: "餘式定理與因式定理",
                explanation: [`代入計算：f(${root}) = ${val}；若 f(root)=0，則 (x - ${root}) 為因式。`]
            };
        }
    },
    {
        id: "s1_quadratic_ineq",
        tags: ["數學","二次函數","不等式","高一"],
        generate: () => {
            const a = Utils.rnd(1,3);
            const b = Utils.rnd(-6,6);
            const c = Utils.rnd(-5,5);
            // 判斷頂點是否為最小值
            const vertexX = -b/(2*a);
            const vertexY = a*vertexX*vertexX + b*vertexX + c;
            return {
                question: `【二次函數與不等式】函數 y = ${a}x^2 + ${b}x + ${c} 的頂點 y 值約為多少（四捨五入到小數第二位）？`,
                options: Utils.genOptions(Math.round(vertexY*100)/100),
                correctValue: Math.round(vertexY*100)/100,
                concept: "二次函數與不等式",
                explanation: [`頂點 y = f(-b/(2a)) = ${Math.round(vertexY*100)/100}`]
            };
        }
    },

    // math_s2 高一數學 (下) - 單元1：數列與級數
    {
        id: "s2_arith_geo",
        tags: ["數學","數列","等差","等比","高一"],
        generate: () => {
            const a1 = Utils.rnd(1,10);
            const d = Utils.rnd(1,6);
            const n = Utils.rnd(3,8);
            const an = a1 + (n-1)*d;
            const r = Utils.rnd(2,5);
            const gn = a1 * Math.pow(r, n-1);
            return {
                question: `【等差與等比】已知等差首項 ${a1} 公差 ${d}，第 ${n} 項為？（同時給出等比第 ${n} 項示例）`,
                options: Utils.genOptions(an),
                correctValue: an,
                concept: "等差與等比",
                explanation: [`等差第 n 項 a_n = a_1 + (n-1)d = ${an}`]
            };
        }
    },
    {
        id: "s2_sigma",
        tags: ["數學","Σ運算","高一"],
        generate: () => {
            const n = Utils.rnd(3,7);
            // sum 1..n
            const ans = n*(n+1)/2;
            return {
                question: `【Σ運算】計算 Σ_{k=1}^{${n}} k = ?`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "Σ運算",
                explanation: [`等差級數求和公式：n(n+1)/2 = ${ans}`]
            };
        }
    },
    {
        id: "s2_induction",
        tags: ["數學","數學歸納法","高一"],
        generate: () => {
            const n = Utils.rnd(2,5);
            const lhs = (n*(n+1))/2;
            const rhs = (n*(n+1))/2; // 示範命題成立
            return {
                question: `【數學歸納法】對命題 P(n): 1+2+...+n = n(n+1)/2，當 n=${n} 時左邊等於多少？`,
                options: Utils.genOptions(lhs),
                correctValue: lhs,
                concept: "數學歸納法",
                explanation: [`代入計算：1+...+${n} = ${lhs}，與右式相等，示範歸納基礎步驟。`]
            };
        }
    },

    // math_s2 高一數學 (下) - 單元2：排列組合
    {
        id: "s2_counting_principle",
        tags: ["數學","計數原理","高一"],
        generate: () => {
            const a = Utils.rnd(2,5), b = Utils.rnd(2,5);
            const ans = a * b;
            return {
                question: `【計數原理】有 ${a} 種主菜與 ${b} 種配菜，任選一主菜一配菜共有多少種組合？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "乘法原理",
                explanation: [`乘法原理：${a}×${b} = ${ans}`]
            };
        }
    },
    {
        id: "s2_permutation",
        tags: ["數學","排列","高一"],
        generate: () => {
            const n = Utils.rnd(4,7);
            const r = Utils.rnd(2,Math.min(4,n));
            // P(n,r) = n!/(n-r)!
            const fact = (m)=>m<=1?1:m*fact(m-1);
            const ans = fact(n)/fact(n-r);
            return {
                question: `【排列】從 ${n} 個不同物件取 ${r} 個排列，數量為多少？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "排列",
                explanation: [`P(n,r) = n!/(n-r)! = ${ans}`]
            };
        }
    },
    {
        id: "s2_combination",
        tags: ["數學","組合","高一"],
        generate: () => {
            const n = Utils.rnd(5,8);
            const r = Utils.rnd(2,Math.min(4,n));
            const fact = (m)=>m<=1?1:m*fact(m-1);
            const ans = fact(n)/(fact(r)*fact(n-r));
            return {
                question: `【組合】從 ${n} 個不同物件選 ${r} 個，不考慮順序，數量為多少？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "組合",
                explanation: [`C(n,r) = n!/(r!(n-r)!) = ${ans}`]
            };
        }
    },
    {
        id: "s2_binomial",
        tags: ["數學","二項式定理","高一"],
        generate: () => {
            const n = Utils.rnd(2,5);
            const a = Utils.rnd(1,3), b = Utils.rnd(1,3);
            // 展開第一項係數示例
            const ans = Math.pow(a+b, n);
            return {
                question: `【二項式定理】計算 ( ${a} + ${b} )^${n} 的值？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "二項式定理",
                explanation: [`直接計算或用二項式定理展開得 ${ans}`]
            };
        }
    },

    // math_s2 高一數學 (下) - 單元3：機率
    {
        id: "s2_classic_prob",
        tags: ["數學","機率","高一"],
        generate: () => {
            const total = Utils.rnd(6,20);
            const success = Utils.rnd(1,total-1);
            const prob = Math.round((success/total)*100)/100;
            return {
                question: `【古典機率】從 ${total} 個球中隨機抽一個，其中 ${success} 個為紅球，抽到紅球的機率為多少（小數兩位）？`,
                options: Utils.genOptions(prob),
                correctValue: prob,
                concept: "古典機率",
                explanation: [`機率 = 成功數/總數 = ${success}/${total} ≈ ${prob}`]
            };
        }
    },
    {
        id: "s2_expectation_basic",
        tags: ["數學","期望值","高一"],
        generate: () => {
            const outcomes = [1,2,3];
            const probs = [0.2,0.3,0.5];
            const exp = Math.round((outcomes[0]*probs[0]+outcomes[1]*probs[1]+outcomes[2]*probs[2])*100)/100;
            return {
                question: `【期望值】隨機變數 X 取值 1,2,3 的機率分別為 0.2,0.3,0.5，E[X] = ?`,
                options: Utils.genOptions(exp),
                correctValue: exp,
                concept: "期望值",
                explanation: [`E[X] = Σ x_i p_i = ${exp}`]
            };
        }
    },

    // math_s2 高一數學 (下) - 單元4：數據分析
    {
        id: "s2_stddev",
        tags: ["數學","標準差","高一"],
        generate: () => {
            const data = [];
            for (let i=0;i<5;i++) data.push(Utils.rnd(1,10));
            const mean = data.reduce((s,v)=>s+v,0)/data.length;
            const variance = data.reduce((s,v)=>s+Math.pow(v-mean,2),0)/data.length;
            const sd = Math.round(Math.sqrt(variance)*100)/100;
            return {
                question: `【一維數據分析】資料 ${data.join(", ")} 的標準差（四捨五入到小數第二位）約為？`,
                options: Utils.genOptions(sd),
                correctValue: sd,
                concept: "標準差",
                explanation: [`標準差 = √(平均平方差) ≈ ${sd}`]
            };
        }
    },
    {
        id: "s2_corr_reg",
        tags: ["數學","相關係數","迴歸直線","高一"],
        generate: () => {
            const xs = [1,2,3,4,5];
            const ys = xs.map(x=>2*x + Utils.rnd(-1,1));
            // 簡化：提示斜率約為 2
            return {
                question: `【二維數據分析】給定資料 x=${xs.join(",")}，y=${ys.join(",")}，迴歸直線斜率約為多少？`,
                options: Utils.genOptions(2),
                correctValue: 2,
                concept: "相關係數/迴歸直線",
                explanation: [`資料近似線性，y ≈ 2x + b，斜率約為 2`]
            };
        }
    },

    // math_s3a 高二數學 A (上) - 單元1：三角函數
    {
        id: "s3a_radian",
        tags: ["數學","弧度量","高二"],
        generate: () => {
            const deg = Utils.rnd(30,300);
            const rad = Math.round((deg * Math.PI/180)*100)/100;
            return {
                question: `【弧度量】${deg}° 等於多少弧度（四捨五入到小數第二位）？`,
                options: Utils.genOptions(rad),
                correctValue: rad,
                concept: "弧度量",
                explanation: [`弧度 = 度 × π/180；${deg}° ≈ ${rad} 弧度`]
            };
        }
    },
    {
        id: "s3a_trig_graph",
        tags: ["數學","三角函數圖形","高二"],
        generate: () => {
            const func = ["sin","cos"][Utils.rnd(0,1)];
            return {
                question: `【三角函數圖形】下列哪一項描述正弦函數 y = sin x 的週期與振幅正確？`,
                options: ["週期 2π，振幅 1","週期 π，振幅 2","週期 2π，振幅 2","週期 π，振幅 1"],
                correctValue: "週期 2π，振幅 1",
                concept: "三角函數圖形",
                explanation: [`基本正弦函數週期為 2π，振幅為 1。`]
            };
        }
    },
    {
        id: "s3a_sum_diff_formula",
        tags: ["數學","和差角公式","高二"],
        generate: () => {
            const A = 30, B = 15;
            const ans = Math.round((Math.sin(A*Math.PI/180)*Math.cos(B*Math.PI/180) + Math.cos(A*Math.PI/180)*Math.sin(B*Math.PI/180))*1000)/1000;
            return {
                question: `【和差角公式】計算 sin(${A}+${B}) 的值（四捨五入到小數第三位）？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "和差角公式",
                explanation: [`sin(A+B)=sinA cosB + cosA sinB；代入計算得 ${ans}`]
            };
        }
    },
    {
        id: "s3a_law_cos_sin",
        tags: ["數學","正餘弦定理","高二"],
        generate: () => {
            const a = Utils.rnd(3,8), b = Utils.rnd(3,8), Cdeg = Utils.rnd(30,120);
            const Crad = Cdeg * Math.PI/180;
            const c = Math.round(Math.sqrt(a*a + b*b - 2*a*b*Math.cos(Crad))*100)/100;
            return {
                question: `【正餘弦定理】在三角形中，已知 a=${a}, b=${b}, ∠C=${Cdeg}°，求對邊 c（四捨五入到小數第二位）？`,
                options: Utils.genOptions(c),
                correctValue: c,
                concept: "正餘弦定理",
                explanation: [`c^2 = a^2 + b^2 - 2ab cos C；代入得 c ≈ ${c}`]
            };
        }
    },

    // math_s3a 高二數學 A (上) - 單元2：指數與對數函數
    {
        id: "s3a_exp_graph",
        tags: ["數學","指數函數圖形","高二"],
        generate: () => {
            const base = [2, Math.E, 10][Utils.rnd(0,2)];
            return {
                question: `【指數函數圖形】下列哪一項描述 y = ${base}^x 的性質正確？`,
                options: ["當 x 增大時函數單調遞增（若 base>1）","函數為偶函數","函數在 x=0 處為 0","函數在 x 軸上有兩個交點"],
                correctValue: "當 x 增大時函數單調遞增（若 base>1）",
                concept: "指數函數圖形",
                explanation: [`若底數 >1，指數函數隨 x 增大而單調遞增；在 x=0 時值為 1。`]
            };
        }
    },
    {
        id: "s3a_log_graph",
        tags: ["數學","對數函數圖形","高二"],
        generate: () => {
            return {
                question: `【對數函數圖形】對數函數 y = log x 的定義域與值域分別為何？`,
                options: ["定義域 x>0；值域 全體實數","定義域 全體實數；值域 x>0","定義域 x≥0；值域 全體實數","定義域 全體實數；值域 全體實數"],
                correctValue: "定義域 x>0；值域 全體實數",
                concept: "對數函數圖形",
                explanation: [`log x 只對正數有定義，輸出可為任意實數。`]
            };
        }
    },
    {
        id: "s3a_exp_log_eq",
        tags: ["數學","方程式與不等式","高二"],
        generate: () => {
            const a = Utils.rnd(2,5);
            const n = Utils.rnd(1,4);
            const ans = Math.pow(a,n);
            return {
                question: `【方程式與不等式】解方程 ${a}^x = ${ans}，x = ?`,
                options: Utils.genOptions(n),
                correctValue: n,
                concept: "指數與對數方程",
                explanation: [`若 a^x = a^n，則 x = n。此題 x = ${n}`]
            };
        }
    },

    // math_s3a 高二數學 A (上) - 單元3：平面向量
    {
        id: "s3a_vector_ops",
        tags: ["數學","向量運算","高二"],
        generate: () => {
            const ax = Utils.rnd(-5,5), ay = Utils.rnd(-5,5);
            const bx = Utils.rnd(-5,5), by = Utils.rnd(-5,5);
            const cx = ax + bx, cy = ay + by;
            return {
                question: `【向量運算】若 a=(${ax},${ay})，b=(${bx},${by})，則 a+b = ?`,
                options: [`(${cx},${cy})`,`(${ax-bx},${ay-by})`,`(${ax*bx},${ay*by})`,`(${ax},${by})`],
                correctValue: `(${cx},${cy})`,
                concept: "向量加法",
                explanation: [`向量相加分量相加：(${ax}+${bx}, ${ay}+${by}) = (${cx},${cy})`]
            };
        }
    },
    {
        id: "s3a_dot_product",
        tags: ["數學","內積","高二"],
        generate: () => {
            const ax = Utils.rnd(1,5), ay = Utils.rnd(1,5);
            const bx = Utils.rnd(1,5), by = Utils.rnd(1,5);
            const dot = ax*bx + ay*by;
            return {
                question: `【內積】向量 a=(${ax},${ay}) 與 b=(${bx},${by}) 的內積為何？`,
                options: Utils.genOptions(dot),
                correctValue: dot,
                concept: "內積",
                explanation: [`內積 = ax*bx + ay*by = ${dot}`]
            };
        }
    },
    {
        id: "s3a_cauchy",
        tags: ["數學","柯西不等式","高二"],
        generate: () => {
            const a = [Utils.rnd(1,5), Utils.rnd(1,5)];
            const b = [Utils.rnd(1,5), Utils.rnd(1,5)];
            // 示範：|a·b| ≤ ||a|| ||b||
            return {
                question: `【柯西不等式】對向量 a 與 b，哪一項為柯西不等式的正確敘述？`,
                options: ["|a·b| ≤ ||a|| ||b||","|a·b| ≥ ||a|| ||b||","a·b = ||a|| + ||b||","a·b = 0 則 a 與 b 平行"],
                correctValue: "|a·b| ≤ ||a|| ||b||",
                concept: "柯西不等式",
                explanation: [`柯西不等式：內積的絕對值不超過兩向量長的乘積。`]
            };
        }
    },
    {
        id: "s3a_area_det",
        tags: ["數學","面積","行列式","高二"],
        generate: () => {
            const ax = Utils.rnd(1,5), ay = Utils.rnd(1,5);
            const bx = Utils.rnd(1,5), by = Utils.rnd(1,5);
            const det = Math.abs(ax*by - ay*bx);
            return {
                question: `【面積與行列式】向量 a=(${ax},${ay}) 與 b=(${bx},${by}) 所張成平行四邊形面積為多少？`,
                options: Utils.genOptions(det),
                correctValue: det,
                concept: "面積與行列式",
                explanation: [`面積 = |det([a b])| = |${ax}*${by} - ${ay}*${bx}| = ${det}`]
            };
        }
    },

    // math_s4a 高二數學 A (下) - 單元1：空間向量
    {
        id: "s4a_space_coord",
        tags: ["數學","空間坐標系","高二"],
        generate: () => {
            const x = Utils.rnd(-3,3), y = Utils.rnd(-3,3), z = Utils.rnd(-3,3);
            return {
                question: `【空間坐標系】點 P 的座標為 (${x},${y},${z})，請問 P 到原點的距離為多少（四捨五入到小數第二位）？`,
                options: Utils.genOptions(Math.round(Math.sqrt(x*x+y*y+z*z)*100)/100),
                correctValue: Math.round(Math.sqrt(x*x+y*y+z*z)*100)/100,
                concept: "空間坐標系",
                explanation: [`距離 = √(x^2+y^2+z^2)`]
            };
        }
    },
    {
        id: "s4a_space_vector_ops",
        tags: ["數學","空間向量運算","高二"],
        generate: () => {
            const a = [Utils.rnd(1,4), Utils.rnd(1,4), Utils.rnd(1,4)];
            const b = [Utils.rnd(1,4), Utils.rnd(1,4), Utils.rnd(1,4)];
            const sum = [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
            return {
                question: `【空間向量運算】a=(${a.join(",")}), b=(${b.join(",")})，a+b = ?`,
                options: [ `(${sum.join(",")})`, `(${a[0]-b[0]},${a[1]-b[1]},${a[2]-b[2]})`, `(${a.join(",")})`, `(${b.join(",")})` ],
                correctValue: `(${sum.join(",")})`,
                concept: "空間向量運算",
                explanation: [`分量相加得 a+b = (${sum.join(",")})`]
            };
        }
    },
    {
        id: "s4a_cross_product",
        tags: ["數學","外積","高二"],
        generate: () => {
            const a = [1,0,0], b = [0,1,0];
            return {
                question: `【外積】已知 a=(1,0,0), b=(0,1,0)，則 a × b = ?`,
                options: ["(0,0,1)","(0,0,-1)","(1,1,0)","(0,1,0)"],
                correctValue: "(0,0,1)",
                concept: "外積",
                explanation: [`外積方向由右手定則決定，a×b=(0,0,1)`]
            };
        }
    },
    {
        id: "s4a_plane_eq",
        tags: ["數學","平面方程式","高二"],
        generate: () => {
            const A = Utils.rnd(1,3), B = Utils.rnd(1,3), C = Utils.rnd(1,3), D = Utils.rnd(-5,5);
            const eq = `${A}x + ${B}y + ${C}z + ${D} = 0`;
            return {
                question: `【平面方程式】下列哪一個為平面的一般方程式？`,
                options: [eq, `${A}x^2+${B}y^2+${C}z^2=${D}`, `${A}x+${B}y=${C}`, `x^2+y^2+z^2=${D}`],
                correctValue: eq,
                concept: "平面方程式",
                explanation: [`平面的一般式為 Ax+By+Cz+D=0。`]
            };
        }
    },

    // math_s4a 高二數學 A (下) - 單元2：空間中的直線與平面
    {
        id: "s4a_line_eq_space",
        tags: ["數學","直線方程式","高二"],
        generate: () => {
            const x0 = Utils.rnd(0,3), y0 = Utils.rnd(0,3), z0 = Utils.rnd(0,3);
            const vx = Utils.rnd(1,3), vy = Utils.rnd(1,3), vz = Utils.rnd(1,3);
            const eq = `r = (${x0},${y0},${z0}) + t(${vx},${vy},${vz})`;
            return {
                question: `【直線方程式】空間直線的參數式範例為何？`,
                options: [eq, `x=${x0}t, y=${y0}t, z=${z0}t`, `x^2+y^2=z^2`, `無解`],
                correctValue: eq,
                concept: "直線方程式",
                explanation: [`參數式常寫為 r = r0 + t v`]
            };
        }
    },
    {
        id: "s4a_distance_formula",
        tags: ["數學","距離公式","高二"],
        generate: () => {
            const p1 = [Utils.rnd(0,3), Utils.rnd(0,3), Utils.rnd(0,3)];
            const p2 = [p1[0]+Utils.rnd(1,3), p1[1]+Utils.rnd(1,3), p1[2]+Utils.rnd(1,3)];
            const dist = Math.round(Math.sqrt(Math.pow(p2[0]-p1[0],2)+Math.pow(p2[1]-p1[1],2)+Math.pow(p2[2]-p1[2],2))*100)/100;
            return {
                question: `【距離公式】點 P(${p1.join(",")}) 與 Q(${p2.join(",")}) 之距離為多少（四捨五入到小數第二位）？`,
                options: Utils.genOptions(dist),
                correctValue: dist,
                concept: "距離公式",
                explanation: [`距離 = √Σ(坐標差)^2 ≈ ${dist}`]
            };
        }
    },
    {
        id: "s4a_angle_between",
        tags: ["數學","夾角","高二"],
        generate: () => {
            const a = [1,0,0], b = [0,1,0];
            return {
                question: `【夾角】向量 a=(1,0,0) 與 b=(0,1,0) 的夾角為多少度？`,
                options: [ "90°", "0°", "45°", "60°" ],
                correctValue: "90°",
                concept: "向量夾角",
                explanation: [`兩正交基向量夾角為 90°。`]
            };
        }
    },

    // math_s4a 高二數學 A (下) - 單元3：矩陣
    {
        id: "s4a_matrix_ops",
        tags: ["數學","矩陣運算","高二"],
        generate: () => {
            const A = [[1,2],[3,4]];
            const B = [[0,1],[1,0]];
            const C = [[A[0][0]+B[0][0], A[0][1]+B[0][1]],[A[1][0]+B[1][0], A[1][1]+B[1][1]]];
            return {
                question: `【矩陣運算】若 A=[[1,2],[3,4]]，B=[[0,1],[1,0]]，則 A+B = ?`,
                options: [`[${C[0].join(",")}; ${C[1].join(",")}]`, `[1,2;3,4]`, `[0,1;1,0]`, `[1,3;4,4]`],
                correctValue: `[${C[0].join(",")}; ${C[1].join(",")}]`,
                concept: "矩陣加法",
                explanation: [`矩陣加法為對應元素相加。`]
            };
        }
    },
    {
        id: "s4a_matrix_mul",
        tags: ["數學","矩陣的乘法","高二"],
        generate: () => {
            const A = [[1,2],[0,1]];
            const B = [[2,0],[1,3]];
            const C00 = A[0][0]*B[0][0]+A[0][1]*B[1][0];
            const C01 = A[0][0]*B[0][1]+A[0][1]*B[1][1];
            const C10 = A[1][0]*B[0][0]+A[1][1]*B[1][0];
            const C11 = A[1][0]*B[0][1]+A[1][1]*B[1][1];
            const ans = `[${C00},${C01}; ${C10},${C11}]`;
            return {
                question: `【矩陣乘法】計算 A*B，A=[[1,2],[0,1]]，B=[[2,0],[1,3]]，結果為何？`,
                options: [ans, `[2,0;1,3]`, `[1,2;0,1]`, `[3,6;1,3]`],
                correctValue: ans,
                concept: "矩陣乘法",
                explanation: [`矩陣乘法按行列相乘求和，結果為 ${ans}`]
            };
        }
    },
    {
        id: "s4a_inverse_matrix",
        tags: ["數學","反方陣","高二"],
        generate: () => {
            const A = [[1,2],[3,4]];
            const det = 1*4 - 2*3;
            const inv = det !== 0 ? `1/${det} * [4,-2; -3,1]` : "不存在";
            return {
                question: `【反方陣】矩陣 [[1,2],[3,4]] 的反矩陣為何（以公式表示）？`,
                options: [inv, "不存在", "[1,0;0,1]", "[4,3;2,1]"],
                correctValue: inv,
                concept: "反方陣",
                explanation: [`反矩陣公式為 1/det * adj(A)；此處 det=${det}`]
            };
        }
    },
    {
        id: "s4a_linear_transform",
        tags: ["數學","線性變換","高二"],
        generate: () => {
            return {
                question: `【平面上的線性變換】矩陣作用於向量會產生什麼效果？`,
                options: ["旋轉、縮放、剪切等線性變換","非線性扭曲","隨機置換","無任何改變"],
                correctValue: "旋轉、縮放、剪切等線性變換",
                concept: "線性變換",
                explanation: [`矩陣代表線性映射，可實現旋轉、縮放、剪切等變換。`]
            };
        }
    },

    // math_s4a 高二數學 A (下) - 單元4：二次曲線
    {
        id: "s4a_parabola",
        tags: ["數學","拋物線","高二"],
        generate: () => {
            const a = Utils.rnd(1,3), h = Utils.rnd(-3,3), k = Utils.rnd(-3,3);
            const eq = `y = ${a}(x - ${h})^2 + ${k}`;
            return {
                question: `【拋物線】下列哪一個為頂點在 (${h},${k}) 的拋物線方程式？`,
                options: [eq, `y = ${a}x^2 + ${k}`, `y = ${a}(x+${h})^2 - ${k}`, `y = ${a}x + ${k}`],
                correctValue: eq,
                concept: "拋物線",
                explanation: [`頂點式為 y = a(x-h)^2 + k，頂點為 (h,k)。`]
            };
        }
    },
    {
        id: "s4a_ellipse",
        tags: ["數學","橢圓","高二"],
        generate: () => {
            const a = Utils.rnd(3,6), b = Utils.rnd(2,5);
            const eq = `x^2/${a*a} + y^2/${b*b} = 1`;
            return {
                question: `【橢圓】標準式為何（長軸 a=${a}, 短軸 b=${b}）？`,
                options: [eq, `x^2/${b*b} + y^2/${a*a} = 1`, `x^2+y^2=1`, `x^2/${a} + y^2/${b} = 1`],
                correctValue: eq,
                concept: "橢圓",
                explanation: [`橢圓標準式為 x^2/a^2 + y^2/b^2 = 1。`]
            };
        }
    },
    {
        id: "s4a_hyperbola",
        tags: ["數學","雙曲線","高二"],
        generate: () => {
            const a = Utils.rnd(2,5), b = Utils.rnd(1,4);
            const eq = `x^2/${a*a} - y^2/${b*b} = 1`;
            return {
                question: `【雙曲線】下列哪一個為雙曲線的標準式？`,
                options: [eq, `x^2+y^2=1`, `x^2/${b*b} - y^2/${a*a} = 1`, `y^2/${a*a} - x^2/${b*b} = 1`],
                correctValue: eq,
                concept: "雙曲線",
                explanation: [`雙曲線標準式可為 x^2/a^2 - y^2/b^2 = 1 或其變形。`]
            };
        }
    },

    // math_s5a 高三數學甲 (上) - 單元1：極限與函數
    {
        id: "s5a_seq_limit",
        tags: ["數學","數列的極限","高三"],
        generate: () => {
            const n = Utils.rnd(10,50);
            const seq = 1/n;
            const ans = Math.round(seq*10000)/10000;
            return {
                question: `【數列的極限】考慮 a_n = 1/n，當 n 趨近無限大時 a_n 趨近於多少？（示例 n=${n}）`,
                options: Utils.genOptions(0),
                correctValue: 0,
                concept: "數列的極限",
                explanation: [`1/n 隨 n 增大趨近 0。示例 n=${n} 時 a_n ≈ ${ans}`]
            };
        }
    },
    {
        id: "s5a_func_limit",
        tags: ["數學","函數的極限","高三"],
        generate: () => {
            const x = Utils.rnd(1,10);
            const val = Math.round((1 - 1/x)*1000)/1000;
            return {
                question: `【函數的極限】考慮 f(x)=1-1/x，當 x 趨近無限大時 f(x) 趨近於多少？（示例 x=${x}）`,
                options: Utils.genOptions(1),
                correctValue: 1,
                concept: "函數的極限",
                explanation: [`當 x→∞，1/x→0，故 f(x)→1。示例 x=${x} 時 f(x)≈${val}`]
            };
        }
    },
    {
        id: "s5a_continuity",
        tags: ["數學","連續函數","高三"],
        generate: () => {
            return {
                question: `【連續函數】下列哪一項為函數在某點連續的必要條件？`,
                options: ["左極限、右極限與函數值相等","左極限存在但右極限不存在","函數值不存在","極限不存在"],
                correctValue: "左極限、右極限與函數值相等",
                concept: "連續函數",
                explanation: [`連續的定義要求左右極限存在且等於函數在該點的值。`]
            };
        }
    },

    // math_s5a 高三數學甲 (上) - 單元2：微分
    {
        id: "s5a_derivative_def",
        tags: ["數學","導數","高三"],
        generate: () => {
            const x = Utils.rnd(1,5);
            const h = 0.001;
            const f = (t)=>t*t;
            const derivative = Math.round(((f(x+h)-f(x))/h)*100)/100;
            return {
                question: `【導數】函數 f(x)=x^2 在 x=${x} 處的導數近似為多少（示例數值）？`,
                options: Utils.genOptions(2*x),
                correctValue: 2*x,
                concept: "導數與導函數",
                explanation: [`解析導數 f'(x)=2x；在 x=${x}，f'=${2*x}`]
            };
        }
    },
    {
        id: "s5a_chain_rule",
        tags: ["數學","微分公式","連鎖律","高三"],
        generate: () => {
            return {
                question: `【連鎖律】若 y = (3x+1)^2，dy/dx = ?`,
                options: ["2(3x+1)*3","(3x+1)^2","6x+2","3(3x+1)"],
                correctValue: "2(3x+1)*3",
                concept: "連鎖律",
                explanation: [`外層 2(⋯) 乘以內層導數 3，故為 2(3x+1)*3。`]
            };
        }
    },
    {
        id: "s5a_diff_app",
        tags: ["數學","微分應用","高三"],
        generate: () => {
            const a = Utils.rnd(1,3), b = Utils.rnd(-3,3);
            const x = Utils.rnd(0,3);
            const f = (t)=>a*t*t + b*t;
            const fprime = (t)=>2*a*t + b;
            const ans = fprime(x);
            return {
                question: `【微分應用】若 f(x) = ${a}x^2 + ${b}x，則 f'(${x}) = ?`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "極值、切線、凹凸性",
                explanation: [`f'(x)=2ax+b；代入 x=${x} 得 ${ans}`]
            };
        }
    },

    // math_s5a 高三數學甲 (上) - 單元3：積分
    {
        id: "s5a_riemann_def",
        tags: ["數學","黎曼和","定積分","高三"],
        generate: () => {
            return {
                question: `【黎曼和與定積分】定積分 ∫_0^1 1 dx 的值為何？`,
                options: [1, 0, 0.5, "不存在"],
                correctValue: 1,
                concept: "黎曼和與定積分",
                explanation: [`∫_0^1 1 dx = 1×(1-0) = 1`]
            };
        }
    },
    {
        id: "s5a_fundamental_theorem",
        tags: ["數學","微積分基本定理","高三"],
        generate: () => {
            return {
                question: `【微積分基本定理】若 F'(x)=f(x)，則 ∫_a^b f(x) dx = ?`,
                options: ["F(b)-F(a)","F(a)-F(b)","0","無法求得"],
                correctValue: "F(b)-F(a)",
                concept: "微積分基本定理",
                explanation: [`基本定理：定積分等於原函數在上下限的差。`]
            };
        }
    },
    {
        id: "s5a_integral_app",
        tags: ["數學","積分應用","高三"],
        generate: () => {
            const a = Utils.rnd(1,3);
            const area = Math.round((a/3 + 0.5)*100)/100; // placeholder
            return {
                question: `【積分應用】計算 ∫_0^1 ( ${a}x^2 ) dx 的值？`,
                options: Utils.genOptions(Math.round((a/3)*100)/100),
                correctValue: Math.round((a/3)*100)/100,
                concept: "面積、體積",
                explanation: [`∫ x^2 dx = x^3/3；代入 0 到 1 得 ${a}/3 ≈ ${Math.round((a/3)*100)/100}`]
            };
        }
    },

    // math_s6a 高三數學甲 (下) - 單元1：複數與多項式方程式
    {
        id: "s6a_complex_polar",
        tags: ["數學","複數極式","高三"],
        generate: () => {
            const r = Utils.rnd(1,5);
            const thetaDeg = Utils.rnd(0,360);
            const theta = Math.round(thetaDeg*100)/100;
            return {
                question: `【複數極式】複數 z 的極式表示為 r(cosθ + i sinθ)，若 r=${r}, θ=${theta}°，則 z = ?（以極式表示）`,
                options: [`${r}(cos ${theta}° + i sin ${theta}°)`, `${r}+${theta}i`, `${r}e^{i${theta}}`, `${r}(${theta})`],
                correctValue: `${r}(cos ${theta}° + i sin ${theta}°)`,
                concept: "複數極式",
                explanation: [`極式表示 z = r(cosθ + i sinθ)。`]
            };
        }
    },
    {
        id: "s6a_de_moivre",
        tags: ["數學","棣美弗定理","高三"],
        generate: () => {
            const r = Utils.rnd(1,3), n = Utils.rnd(2,4), thetaDeg = Utils.rnd(0,90);
            const theta = thetaDeg * Math.PI/180;
            // (r cis θ)^n = r^n cis(nθ)
            const ans = `${Math.pow(r,n)} cis ${n*thetaDeg}°`;
            return {
                question: `【棣美弗定理】( ${r} cis ${thetaDeg}° )^${n} = ?（以 cis 表示）`,
                options: [ans, `${r} cis ${thetaDeg}°`, `${Math.pow(r,n)} cis ${thetaDeg}°`, "無法計算"],
                correctValue: ans,
                concept: "棣美弗定理",
                explanation: [`(r cis θ)^n = r^n cis(nθ)，代入得 ${ans}`]
            };
        }
    },

    // math_s6a 高三數學甲 (下) - 單元2：隨機變數
    {
        id: "s6a_rv_basic",
        tags: ["數學","隨機變數","高三"],
        generate: () => {
            const outcomes = [0,1];
            const p = 0.3;
            const exp = Math.round((outcomes[0]*(1-p) + outcomes[1]*p)*100)/100;
            return {
                question: `【隨機變數】伯努利分配 X ~ Bernoulli(p=0.3)，E[X] = ?`,
                options: Utils.genOptions(exp),
                correctValue: exp,
                concept: "隨機變數",
                explanation: [`E[X] = p = 0.3`]
            };
        }
    },
    {
        id: "s6a_binomial_dist",
        tags: ["數學","二項分佈","高三"],
        generate: () => {
            const n = Utils.rnd(3,6), p = 0.5, k = Utils.rnd(0,n);
            // C(n,k) p^k (1-p)^(n-k)
            const fact = (m)=>m<=1?1:m*fact(m-1);
            const comb = fact(n)/(fact(k)*fact(n-k));
            const prob = Math.round(comb*Math.pow(p,k)*Math.pow(1-p,n-k)*10000)/10000;
            return {
                question: `【二項分佈】在 n=${n}, p=${p} 下，P(X=${k}) ≈ ?`,
                options: Utils.genOptions(prob),
                correctValue: prob,
                concept: "二項分佈",
                explanation: [`P(X=k)=C(n,k)p^k(1-p)^{n-k} ≈ ${prob}`]
            };
        }
    },
    {
        id: "s6a_geometric_dist",
        tags: ["數學","幾何分佈","高三"],
        generate: () => {
            const p = 0.3;
            const k = Utils.rnd(1,5);
            const prob = Math.round(Math.pow(1-p,k-1)*p*10000)/10000;
            return {
                question: `【幾何分佈】成功機率 p=${p}，第一次成功發生在第 ${k} 次的機率為多少？`,
                options: Utils.genOptions(prob),
                correctValue: prob,
                concept: "幾何分佈",
                explanation: [`P(X=k)=(1-p)^{k-1} p ≈ ${prob}`]
            };
        }
    },
    {
        id: "s6a_normal_approx",
        tags: ["數學","常態分佈","高三"],
        generate: () => {
            return {
                question: `【常態分佈】下列哪一項描述常態分佈的特性正確？`,
                options: ["對稱於平均數，平均數=中位數=眾數","偏斜向右","只有正值","離散分佈"],
                correctValue: "對稱於平均數，平均數=中位數=眾數",
                concept: "常態分佈",
                explanation: [`常態分佈為連續且對稱分佈，平均數、中位數與眾數相等。`]
            };
        }
    },
        // ==========================================
    // 國七下 (Book 2) - 補強缺漏單元
    // ==========================================

    // 單元 1：二元一次聯立方程式
    {
        id: "math_sys_eq",
        tags: ["數學", "二元一次", "聯立方程式", "國七"],
        generate: () => {
            // 生成簡單的 x + y = A, x - y = B 形式，確保整數解
            const x = Utils.rnd(1, 10);
            const y = Utils.rnd(1, 10);
            const A = x + y;
            const B = x - y;
            
            return {
                question: `【聯立方程式】解二元一次聯立方程式：\n(1) x + y = ${A}\n(2) x - y = ${B}\n請問 (x, y) = ?`,
                options: Utils.genOptions(`(${x}, ${y})`), // 注意：這裡簡化處理，實際選項生成可能需要調整字串邏輯
                correctValue: `(${x}, ${y})`,
                concept: "解聯立方程式",
                explanation: [`兩式相加可得 2x = ${A+B} => x=${x}，代回得 y=${y}`]
            };
        }
    },

    // 單元 2：直角坐標與圖形
    {
        id: "math_coord",
        tags: ["數學", "坐標", "象限", "國七"],
        generate: () => {
            const x = Utils.rnd(-10, 10) || 1; // 避免 0
            const y = Utils.rnd(-10, 10) || 1;
            let q = "";
            if (x > 0 && y > 0) q = "第一象限";
            else if (x < 0 && y > 0) q = "第二象限";
            else if (x < 0 && y < 0) q = "第三象限";
            else q = "第四象限";

            return {
                question: `【直角坐標】請問點 P(${x}, ${y}) 位於直角坐標平面的哪一個象限？`,
                options: ["第一象限", "第二象限", "第三象限", "第四象限"],
                correctValue: q,
                concept: "象限判斷",
                explanation: [`x為${x>0?"正":"負"}，y為${y>0?"正":"負"}，故在${q}`]
            };
        }
    },

    // 單元 3：比與比例
    {
        id: "math_ratio",
        tags: ["數學", "比例式", "國七"],
        generate: () => {
            const a = Utils.rnd(2, 9);
            const b = Utils.rnd(2, 9);
            const factor = Utils.rnd(2, 5);
            const c = a * factor;
            // 題目: a : b = c : x
            const ans = b * factor;

            return {
                question: `【比例式】若 ${a} : ${b} = ${c} : x，求 x 的值？`,
                options: Utils.genOptions(ans),
                correctValue: ans,
                concept: "內項積等於外項積",
                explanation: [`${a}x = ${b} × ${c}，x = ${ans}`]
            };
        }
    },

    // 單元 4：一元一次不等式
    {
        id: "math_inequality",
        tags: ["數學", "不等式", "國七"],
        generate: () => {
            const a = Utils.rnd(2, 5);
            const b = Utils.rnd(1, 10);
            const x = Utils.rnd(1, 10);
            const boundary = a * x + b; // 這裡作為題目邊界
            // 題目: ax + b > boundary (設計成 x > 答案)
            
            // 為了避免混淆，直接出基本運算題
            return {
                question: `【不等式】解不等式 ${a}x + ${b} > ${boundary}，下列何者正確？`,
                options: [`x > ${x}`, `x < ${x}`, `x > ${x+1}`, `x < ${x-1}`],
                correctValue: `x > ${x}`,
                concept: "不等式運算",
                explanation: [`${a}x > ${boundary - b} => x > ${x}`]
            };
        }
    },
];
// 1. 執行動態題註冊 (你剛才提供的這段)
    generators.forEach(gen => {
        for(let i=0; i<5; i++) {
            const uId = `${gen.id}_${i}`;
            window.__MATH_REPO__[uId] = {
                id: uId,
                func: () => {
                    const d = gen.generate();
                    return { 
                        ...d, 
                        answer: (typeof d.answer === 'number') ? d.answer : d.options.indexOf(d.correctValue), 
                        subject: "math", 
                        tags: gen.tags 
                    };
                },
                tags: gen.tags,
                subject: "math",
                type: "basic"
            };
        }
    });
const fixedMathQuestions = [
  { q: "8 + 7 = ?", a: "15", o: ["14","16","13"], t: ["數學","小四","四則運算","加法"] },
  { q: "25 - 9 = ?", a: "16", o: ["15","17","14"], t: ["數學","小四","四則運算","減法"] },
  { q: "6 × 7 = ?", a: "42", o: ["36","48","40"], t: ["數學","小四","四則運算","乘法"] },
  { q: "56 ÷ 8 = ?", a: "7", o: ["6","8","9"], t: ["數學","小四","四則運算","除法"] },
  { q: "3/4 + 1/4 = ?", a: "1", o: ["3/4","1/2","5/4"], t: ["數學","小四","分數加減","同分母加法"] },
  { q: "0.5 + 0.25 = ?", a: "0.75", o: ["0.7","0.8","0.6"], t: ["數學","小四","小數運算","小數加法"] },
  { q: "一個角是直角，度數為多少？", a: "90 度", o: ["45 度","180 度","60 度"], t: ["數學","小四","角度","角的種類"] },
  { q: "三角形內角和是多少度？", a: "180 度", o: ["360 度","90 度","270 度"], t: ["數學","小四","三角形","性質"] },
  { q: "長方形長 8 cm，寬 5 cm，周長為多少？", a: "26 cm", o: ["40 cm","20 cm","30 cm"], t: ["數學","小四","周長","長方形周長"] },
  { q: "長方形長 8 cm，寬 5 cm，面積為多少平方公分？", a: "40 平方公分", o: ["26","13","45"], t: ["數學","小四","面積","長方形面積"] },
  { q: "比值 2:5 中，若第一項是 4，第二項是多少？", a: "10", o: ["8","12","9"], t: ["數學","小四","比值","簡單比值"] },
  { q: "下列哪個圖表最適合顯示趨勢？", a: "折線圖", o: ["圓形圖","長條圖","表格"], t: ["數學","小四","統計","圖表選擇"] },
  { q: "12 + 15 × 2 = ?（先算乘法）", a: "42", o: ["54","34","36"], t: ["數學","小四","四則運算","運算順序"] },
  { q: "0.3 × 10 = ?", a: "3", o: ["0.3","30","1"], t: ["數學","小四","小數運算","乘法"] },
  { q: "把 3/5 表示成小數是多少？", a: "0.6", o: ["0.5","0.3","0.75"], t: ["數學","小四","分數與小數","互換"] },
  { q: "一個三角形三邊長為 3 cm、4 cm、5 cm，這是什麼三角形？", a: "直角三角形", o: ["等邊三角形","等腰三角形","鈍角三角形"], t: ["數學","小四","三角形","分類"] },
  { q: "一個四邊形有兩組平行邊，這是什麼形狀？", a: "平行四邊形", o: ["梯形","菱形","長方形"], t: ["數學","小四","四邊形","分類"] },
  { q: "周長是圍一圈的長度，單位通常用什麼？", a: "公分或公尺", o: ["平方公分","立方公分","毫升"], t: ["數學","小四","周長","單位"] },
  { q: "一個正方形邊長 6 cm，面積為多少？", a: "36 平方公分", o: ["12","18","24"], t: ["數學","小四","面積","正方形面積"] },
  { q: "資料 2、3、3、4 的眾數是？", a: "3", o: ["2","4","無眾數"], t: ["數學","小四","統計","眾數"] },
  { q: "1/2 × 1/3 = ?", a: "1/6", o: ["1/5","1/3","2/5"], t: ["數學","小四","分數乘除","分數乘法"] },
  { q: "3 ÷ 0.5 = ?", a: "6", o: ["1.5","0.6","3.5"], t: ["數學","小四","小數轉換","除法"] },
  { q: "12 和 18 的最大公因數是？", a: "6", o: ["3","12","36"], t: ["數學","小四","最大公因數","GCF"] },
  { q: "4、6、8 的最小公倍數是？", a: "24", o: ["12","16","48"], t: ["數學","小四","最小公倍數","LCM"] },
  { q: "圓的半徑 r = 5 cm，直徑 d = ?", a: "10 cm", o: ["5 cm","15 cm","20 cm"], t: ["數學","小四","圓","半徑直徑"] },
  { q: "長方體長 5 cm、寬 4 cm、高 3 cm，體積為多少？", a: "60 立方公分", o: ["12","20","24"], t: ["數學","小四","長方體體積","體積公式"] },
  { q: "速率題：走路 3 km 用 1 小時，速率是多少？", a: "3 km/h", o: ["1 km/h","0.33 km/h","6 km/h"], t: ["數學","小四","速率","距離時間關係"] },
  { q: "1 m = ? cm", a: "100 cm", o: ["10 cm","1000 cm","1 cm"], t: ["數學","小四","單位換算","長度"] },
  { q: "平均數：4、6、8 的平均值是多少？", a: "6", o: ["5","7","8"], t: ["數學","小四","平均數","計算"] },
  { q: "折線圖：哪種情況最適合用折線圖？", a: "顯示數值隨時間變化", o: ["比較類別比例","顯示地理位置","顯示單一數值"], t: ["數學","小四","折線圖","圖表選擇"] },
  { q: "把 2500 四捨五入到千位，結果是？", a: "3000", o: ["2000","2500","3500"], t: ["數學","小四","數與量","四捨五入"] },
  { q: "把 3/10 表示成百分比是多少？", a: "30%", o: ["3%","300%","0.3%"], t: ["數學","小四","分數與百分比","互換"] },
  { q: "一個角是 45 度，這是什麼角？", a: "銳角", o: ["直角","鈍角","平角"], t: ["數學","小四","角度","角的種類"] },
  { q: "一個三角形的兩個角是 50 度和 60 度，第三個角是多少度？", a: "70 度", o: ["80 度","60 度","90 度"], t: ["數學","小四","三角形","內角和"] },
  { q: "一個梯形上底 4 cm、下底 8 cm、高 3 cm，面積為多少？", a: "18 平方公分", o: ["12","24","22"], t: ["數學","小五","面積","梯形"] },
  { q: "9 + 6 = ?", a: "15", o: ["14","16","13"], t: ["數學","小四","四則運算","加法"] },
  { q: "14 - 7 = ?", a: "7", o: ["6","8","9"], t: ["數學","小四","四則運算","減法"] },
  { q: "9 × 5 = ?", a: "45", o: ["40","35","50"], t: ["數學","小四","四則運算","乘法"] },
  { q: "81 ÷ 9 = ?", a: "9", o: ["8","7","10"], t: ["數學","小四","四則運算","除法"] },
  { q: "1/3 + 1/3 = ?", a: "2/3", o: ["1/3","1","3/3"], t: ["數學","小四","分數加減","同分母"] },
  { q: "0.2 + 0.3 = ?", a: "0.5", o: ["0.6","0.4","0.3"], t: ["數學","小四","小數運算","加法"] },
  { q: "等邊三角形每邊長 5 cm，周長為多少？", a: "15 cm", o: ["10 cm","20 cm","25 cm"], t: ["數學","小四","三角形","周長"] },
  { q: "長方形長 7 cm、寬 3 cm，面積為多少？", a: "21 平方公分", o: ["10","24","30"], t: ["數學","小四","面積","長方形"] },
  { q: "資料 1、2、2、3 的中位數是？", a: "2", o: ["1","3","2.5"], t: ["數學","小四","統計","中位數"] },
  { q: "5 × (2 + 3) = ?", a: "25", o: ["15","20","30"], t: ["數學","小四","四則運算","括號"] },
  { q: "0.1 × 10 = ?", a: "1", o: ["0.1","10","0.01"], t: ["數學","小四","小數運算","乘法"] },
  { q: "把 1/5 表示成小數是多少？", a: "0.2", o: ["0.25","0.5","0.1"], t: ["數學","小四","分數與小數","互換"] },
  { q: "若一個數乘以 4 得到 36，原數是多少？", a: "9", o: ["8","10","12"], t: ["數學","小四","四則運算","逆運算"] },
  { q: "把 2/3 減去 1/6，結果是多少？", a: "1/2", o: ["1/3","1/6","2/3"], t: ["數學","小五","分數加減","異分母"] },
  { q: "0.25 × 4 = ?", a: "1", o: ["0.5","2","0.25"], t: ["數學","小四","小數運算","乘法"] },
  { q: "一個圓的半徑是 3 cm，取 π≈3.14，面積約為多少？", a: "約 28.26 平方公分", o: ["約 18.84","約 56.52","約 9.42"], t: ["數學","小五","圓","面積計算"] },
  { q: "把 0.75 表示成分數是？", a: "3/4", o: ["1/2","2/3","3/5"], t: ["數學","小五","小數與分數","互換"] },
  { q: "若 5 個相同的物品總價 275 元，單價是多少？", a: "55 元", o: ["50 元","45 元","60 元"], t: ["數學","小五","四則運算","平均與單價"] },
  { q: "一個長方體長 8 cm、寬 5 cm、高 2 cm，體積為多少？", a: "80 立方公分", o: ["40","20","160"], t: ["數學","小五","體積","長方體體積"] },
  { q: "3/5 × 10 = ?", a: "6", o: ["5","8","4"], t: ["數學","小五","分數乘法","應用"] },
  { q: "一個角是 120 度，這是什麼角？", a: "鈍角", o: ["銳角","直角","平角"], t: ["數學","小五","角度","角的種類"] },
  { q: "兩個數的最大公因數（GCF）為 6，若其中一數是 18，另一數可能是下列哪一個？", a: "24", o: ["20","25","28"], t: ["數學","小五","數與量","最大公因數"] },
  { q: "12 和 18 的最小公倍數（LCM）是多少？", a: "36", o: ["24","54","18"], t: ["數學","小五","數與量","最小公倍數"] },
  { q: "把 2.5 乘以 4 等於多少？", a: "10", o: ["6.5","8","12"], t: ["數學","小五","小數運算","乘法"] },
  { q: "一個圓的直徑是 10 cm，周長約為多少？（π≈3.14）", a: "約 31.4 cm", o: ["約 62.8","約 15.7","約 10"], t: ["數學","小五","圓","周長計算"] },
  { q: "若一個數除以 4 等於 9，該數是多少？", a: "36", o: ["32","40","34"], t: ["數學","小五","四則運算","逆運算"] },
  { q: "平均數：5、7、9 的平均值是多少？", a: "7", o: ["6","8","9"], t: ["數學","小五","統計","平均數"] },
  { q: "折線圖通常用來表示什麼？", a: "數值隨時間的變化趨勢", o: ["各類別比例","單一數值","地理位置"], t: ["數學","小五","統計","折線圖"] },
  { q: "一個三角形底 10 cm、高 6 cm，面積為多少？", a: "30 平方公分", o: ["60","16","36"], t: ["數學","小五","面積","三角形面積"] },
  { q: "把 7/10 表示成百分比是多少？", a: "70%", o: ["7%","700%","17%"], t: ["數學","小五","分數與百分比","互換"] },
    // mathQuestions_part2 (題目 101–200)
// 依課表單元（小四/小五/小六），格式：{ q, a, o, t }
// 每題包含 tags：科目、年級（小四/小五/小六）、主題、次主題
  { q: "101. 7 + 9 = ?", a: "16", o: ["15","17","14"], t: ["數學","小四","四則運算","加法"] },
  { q: "102. 18 - 6 = ?", a: "12", o: ["11","10","13"], t: ["數學","小四","四則運算","減法"] },
  { q: "103. 4 × 9 = ?", a: "36", o: ["34","32","40"], t: ["數學","小四","四則運算","乘法"] },
  { q: "104. 72 ÷ 8 = ?", a: "9", o: ["8","6","10"], t: ["數學","小四","四則運算","除法"] },
  { q: "105. 1/4 + 1/2 = ?", a: "3/4", o: ["1/2","2/3","1"], t: ["數學","小四","分數加減","同分母加法"] },
  { q: "106. 0.4 + 0.6 = ?", a: "1.0", o: ["0.9","0.8","1.1"], t: ["數學","小四","小數運算","小數加法"] },
  { q: "107. 角度題：直角的度數是？", a: "90 度", o: ["45 度","180 度","60 度"], t: ["數學","小四","角度","角的種類"] },
  { q: "108. 三角形有幾個邊？", a: "3", o: ["4","2","5"], t: ["數學","小四","三角形","基本概念"] },
  { q: "109. 長方形長 10 cm、寬 2 cm，周長為多少？", a: "24 cm", o: ["20 cm","22 cm","26 cm"], t: ["數學","小四","周長","長方形周長"] },
  { q: "110. 長方形長 10 cm、寬 2 cm，面積為多少？", a: "20 平方公分", o: ["12","22","24"], t: ["數學","小四","面積","長方形面積"] },
  { q: "111. 比 3:4 中，若第一項是 9，第二項是多少？", a: "12", o: ["10","15","8"], t: ["數學","小四","比值","簡單比值"] },
  { q: "112. 哪種圖表適合顯示各月份溫度變化？", a: "折線圖", o: ["圓形圖","長條圖","表格"], t: ["數學","小四","統計","圖表選擇"] },
  { q: "113. 5 + 6 × 3 = ?（先算乘法）", a: "23", o: ["33","35","18"], t: ["數學","小四","四則運算","運算順序"] },
  { q: "114. 0.2 × 5 = ?", a: "1.0", o: ["0.2","2.0","0.5"], t: ["數學","小四","小數運算","乘法"] },
  { q: "115. 把 1/2 表示成小數是多少？", a: "0.5", o: ["0.25","0.2","0.75"], t: ["數學","小四","分數與小數","互換"] },
  { q: "116. 三角形 2、3、4 cm，哪一邊最長？", a: "4 cm", o: ["3 cm","2 cm","都一樣"], t: ["數學","小四","三角形","邊長比較"] },
  { q: "117. 四邊形中，哪一種有四條相等邊？", a: "菱形（或正方形）", o: ["長方形","梯形","平行四邊形"], t: ["數學","小四","四邊形","分類"] },
  { q: "118. 周長單位：若周長是 2 m，等於多少 cm？", a: "200 cm", o: ["20 cm","2000 cm","2 cm"], t: ["數學","小四","周長","單位換算"] },
  { q: "119. 正方形邊長 4 cm，面積為多少？", a: "16 平方公分", o: ["8","12","20"], t: ["數學","小四","面積","正方形面積"] },
  { q: "120. 資料 1、1、2、3 的眾數是？", a: "1", o: ["2","3","無眾數"], t: ["數學","小四","統計","眾數"] },

  { q: "121. 1/3 × 1/2 = ?", a: "1/6", o: ["1/5","1/3","1/4"], t: ["數學","小四","分數乘除","分數乘法"] },
  { q: "122. 2.4 ÷ 0.8 = ?", a: "3", o: ["2","4","1.5"], t: ["數學","小四","小數轉換","除法"] },
  { q: "123. 8 和 12 的最大公因數是？", a: "4", o: ["2","6","8"], t: ["數學","小四","最大公因數","GCF"] },
  { q: "124. 3、5、7 的最小公倍數是？", a: "105", o: ["21","35","15"], t: ["數學","小四","最小公倍數","LCM"] },
  { q: "125. 圓的半徑 6 cm，直徑是多少？", a: "12 cm", o: ["6 cm","18 cm","24 cm"], t: ["數學","小四","圓","半徑直徑"] },
  { q: "126. 長方體 4×3×2 cm，體積為多少？", a: "24 立方公分", o: ["9","12","48"], t: ["數學","小四","長方體體積","體積公式"] },
  { q: "127. 速率題：車速 30 km/h，行駛 2 小時，距離為多少？", a: "60 km", o: ["30 km","90 km","15 km"], t: ["數學","小四","速率","距離時間關係"] },
  { q: "128. 100 cm = ? m", a: "1 m", o: ["10 m","0.1 m","1000 m"], t: ["數學","小四","單位換算","長度"] },
  { q: "129. 折線圖：若數值 2→4→6→8，趨勢是？", a: "上升", o: ["下降","不變","波動"], t: ["數學","小四","折線圖","趨勢判讀"] },
  { q: "130. 平均數：2、4、6、8 的平均值為？", a: "5", o: ["4","6","7"], t: ["數學","小四","平均數","計算"] },

  { q: "131. (4 + 6) × 2 = ?", a: "20", o: ["18","22","16"], t: ["數學","小五","綜合四則","括號處理"] },
  { q: "132. 1/2 + 1/3 = ?", a: "5/6", o: ["2/3","1/1","1/6"], t: ["數學","小五","分數應用","異分母加法"] },
  { q: "133. 0.6 × 5 = ?", a: "3.0", o: ["0.3","30","2.5"], t: ["數學","小五","小數應用","乘法"] },
  { q: "134. 互補角：若一角 25°，互補角為多少？", a: "65 度", o: ["55","75","90"], t: ["數學","小五","角度進階","互補角"] },
  { q: "135. 複合圖形：長方形 8×4，上面有半圓半徑 2，總面積為？（π≈3.14）", a: "32 + 6.28 = 38.28 平方單位", o: ["38.28","40","30"], t: ["數學","小五","複合圖形面積","分割合成"] },
  { q: "136. π ≈ ?", a: "3.14", o: ["2.14","3.41","4.14"], t: ["數學","小五","圓周率","π概念"] },
  { q: "137. 若 a:b = 3:5，且 a = 9，b = ?", a: "15", o: ["12","18","10"], t: ["數學","小五","比例","比例關係"] },
  { q: "138. 配方題：糖:水 = 1:4，若糖 2 杯，水要多少？", a: "8 杯", o: ["6","4","10"], t: ["數學","小五","比值應用","配比問題"] },
  { q: "139. 哪種圖表適合比較不同班級人數？", a: "長條圖", o: ["折線圖","圓形圖","表格"], t: ["數學","小五","統計綜合","圖表選擇"] },
  { q: "140. 應用題：3 本 60 元，付 200 元，找回多少？", a: "20 元", o: ["40","30","10"], t: ["數學","小五","應用題","找零"] },

  { q: "141. 因數：10 的因數有哪些？", a: "1,2,5,10", o: ["1,2,10","2,5,10","1,5,10"], t: ["數學","小五","因數與倍數","因數列舉"] },
  { q: "142. 0.125 = ? 分數", a: "1/8", o: ["1/4","1/5","1/10"], t: ["數學","小五","分數與小數","互換"] },
  { q: "143. GCF：20 和 30 的最大公因數是？", a: "10", o: ["5","20","2"], t: ["數學","小五","最大公因數","GCF"] },
  { q: "144. LCM：3、4 的最小公倍數是？", a: "12", o: ["7","24","6"], t: ["數學","小五","最小公倍數","LCM"] },
  { q: "145. 三角形面積：底 12 cm、高 5 cm，面積為多少？", a: "30 平方公分", o: ["60","17","24"], t: ["數學","小五","面積與體積","三角形面積"] },
  { q: "146. 長方體 5×5×2 cm，體積為多少？", a: "50 立方公分", o: ["12","25","20"], t: ["數學","小五","長方體體積","體積計算"] },
  { q: "147. 速率題：車速 50 km/h，行駛 0.5 小時，距離為多少？", a: "25 km", o: ["10 km","50 km","100 km"], t: ["數學","小五","速率應用","行程問題"] },
  { q: "148. 1 km = ? m", a: "1000 m", o: ["100 m","10 m","10000 m"], t: ["數學","小五","單位換算綜合","長度"] },
  { q: "149. 折線圖：數值 3→6→4→9，哪段最大增幅？", a: "第三到第四段", o: ["第一到第二段","第二到第三段","沒有增幅"], t: ["數學","小五","折線圖與統計","趨勢判讀"] },
  { q: "150. 平均數：70、80、90 的平均值為？", a: "80", o: ["75","85","70"], t: ["數學","小五","平均數與應用","計算"] },

  { q: "151. 分數綜合：2/3 + 1/4 = ?", a: "11/12", o: ["3/7","5/12","7/12"], t: ["數學","小六","分數綜合","加法"] },
  { q: "152. 小數綜合：1.25 + 2.75 = ?", a: "4.0", o: ["3.9","4.1","5.0"], t: ["數學","小六","小數綜合","加法"] },
  { q: "153. 正比：若 y = 2x，x=5，y = ?", a: "10", o: ["7","8","12"], t: ["數學","小六","比例與反比","正比"] },
  { q: "154. 比例尺：1 cm 代表 1 km，地圖 6 cm，實際距離為？", a: "6 km", o: ["60 km","0.6 km","600 m"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "155. 圓面積：半徑 3 cm，面積約為？（π≈3.14）", a: "約 28.26 平方公分", o: ["約 18.84","約 56.52","約 9.42"], t: ["數學","小六","圓面積","π應用"] },
  { q: "156. 圓周長：半徑 2 cm，周長約為？（π≈3.14）", a: "約 12.56 cm", o: ["約 6.28","約 25.12","約 18.84"], t: ["數學","小六","圓周長","周長計算"] },
  { q: "157. 速率應用：速率 60 km/h，時間 0.5 小時，距離為？", a: "30 km", o: ["15 km","60 km","90 km"], t: ["數學","小六","速率應用","行程問題"] },
  { q: "158. 單位綜合：1 L = ? mL", a: "1000 mL", o: ["100 mL","10 mL","10000 mL"], t: ["數學","小六","單位綜合","容量"] },
  { q: "159. 統計綜合：哪種圖表適合顯示市場佔有率？", a: "圓形圖", o: ["折線圖","長條圖","表格"], t: ["數學","小六","統計綜合","圖表選擇"] },
  { q: "160. 綜合應用：長方體 10×3×2 cm，體積為多少？", a: "60 立方公分", o: ["20","30","120"], t: ["數學","小六","綜合應用題","體積計算"] },

  { q: "161. 四則綜合： (9 × 4) - (18 ÷ 3) = ?", a: "30", o: ["28","32","36"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "162. 分數小數綜合：0.75 + 1/4 = ?", a: "1.0", o: ["0.75","1.25","0.5"], t: ["數學","小六","分數小數綜合","互換"] },
  { q: "163. 反比：若 y = k/x，x 變為 3 倍，y 會如何變化？", a: "變為原來的 1/3", o: ["變為 3 倍","不變","變為 9 倍"], t: ["數學","小六","比例深化","反比"] },
  { q: "164. 幾何：平行線被橫線截出，對應角是否相等？", a: "是", o: ["否","只有直角","只有銳角"], t: ["數學","小六","幾何深化","角的性質"] },
  { q: "165. 弧長：半徑 5 cm，扇形角 60°，弧長約為？（π≈3.14）", a: "約 5.24 cm", o: ["約 10.47","約 3.14","約 15.7"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "166. 體積拆解：一個 6×4×3 cm 的長方體，可拆成多少個 2×2×1 cm 的小長方體？", a: "18 個", o: ["12","24","36"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "167. 相向問題：甲 60 km/h、乙 40 km/h，相向距離 200 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "168. 面積換算：1 km² = ? m²", a: "1,000,000 m²", o: ["1000 m²","10000 m²","100000 m²"], t: ["數學","小六","單位深化","面積換算"] },
  { q: "169. 機率：擲一個公平六面骰，出現偶數的機率為？", a: "1/2", o: ["1/3","1/6","1/4"], t: ["數學","小六","統計深化","機率初探"] },
  { q: "170. 綜合應用：圓柱底半徑 3 cm、高 5 cm，體積約為？（π≈3.14）", a: "約 141.3 立方公分", o: ["約 56.52","約 282.6","約 94.2"], t: ["數學","小六","綜合應用題","圓柱體積"] },

  { q: "171. 18 × 3 + 24 ÷ 6 = ?", a: "57", o: ["54","60","51"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "172. 7/10 - 1/5 = ?", a: "1/2", o: ["3/10","2/5","4/5"], t: ["數學","小五","分數加減","異分母"] },
  { q: "173. 1.5 × 2.4 = ?", a: "3.6", o: ["3.0","4.0","2.9"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "174. 三角形內角 30°、60°、?，第三角為？", a: "90 度", o: ["80","90","100"], t: ["數學","小五","三角形","內角和"] },
  { q: "175. 圓面積：半徑 4 cm，面積約為？（π≈3.14）", a: "約 50.24 平方公分", o: ["約 25.12","約 12.56","約 100.48"], t: ["數學","小六","圓面積","π應用"] },
  { q: "176. 比例：若 2:3 = x:12，x = ?", a: "8", o: ["6","9","10"], t: ["數學","小六","比例深化","正比"] },
  { q: "177. 長方體 8×5×2 cm，體積為多少？", a: "80 立方公分", o: ["40","60","100"], t: ["數學","小五","體積","長方體"] },
  { q: "178. 2.25 km = ? m", a: "2250 m", o: ["225 m","22.5 m","22500 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "179. 資料 3、4、5、6 的平均數為？", a: "4.5", o: ["4","5","4.25"], t: ["數學","小六","統計綜合","平均數"] },
  { q: "180. 應用：圓周長公式 C = ?", a: "C = 2πr 或 C = πd", o: ["C = πr²","C = rπ","C = πd²"], t: ["數學","小六","圓周長","公式"] },

  { q: "181. (6 + 4) × (5 - 2) = ?", a: "30", o: ["20","36","24"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "182. (3/4) ÷ (1/2) = ?", a: "3/2 或 1.5", o: ["1/2","2","3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "183. 11.2 × 0.5 = ?", a: "5.6", o: ["56","1.12","6.2"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "184. 若 5:8 = x:32，x = ?", a: "20", o: ["16","24","10"], t: ["數學","小六","比例深化","應用"] },
  { q: "185. 扇形面積公式 A = ?", a: "A = πr² × (θ/360)", o: ["A = πrθ","A = 2πr × θ","A = πr²/θ"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "186. 長方體 12×4×2 cm，若切成 2×2×2 cm 小立方體，能切出多少完整小立方體？", a: "24 個", o: ["12","36","48"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "187. 甲 80 km/h、乙 60 km/h，相向距離 280 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "188. 3.6 km = ? m", a: "3600 m", o: ["360 m","36 m","36000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "189. 資料 2、4、6、8、10 的中位數為？", a: "6", o: ["5","7","4"], t: ["數學","小六","統計深化","中位數"] },
  { q: "190. 圓環面積：外半徑 7、內半徑 5，面積為？（π≈3.14）", a: "π(49-25)=π×24≈75.36", o: ["約 75.36","約 50","約 100"], t: ["數學","小六","綜合應用題","環形面積"] },

  { q: "191. (14 - 6) ÷ 2 = ?", a: "4", o: ["3","5","6"], t: ["數學","小五","四則綜合應用","混合運算"] },
  { q: "192. 5/8 + 1/8 = ?", a: "3/4", o: ["1/2","5/8","7/8"], t: ["數學","小五","分數加減","同分母"] },
  { q: "193. 0.9 ÷ 0.3 = ?", a: "3", o: ["0.3","0.9","9"], t: ["數學","小五","小數應用","除法"] },
  { q: "194. 若一角是 75°，這是什麼角？", a: "銳角", o: ["直角","鈍角","平角"], t: ["數學","小五","角度進階","角的分類"] },
  { q: "195. 圓周長：直徑 6 cm，周長約為？（π≈3.14）", a: "約 18.84 cm", o: ["約 37.68","約 9.42","約 12.56"], t: ["數學","小五","圓","周長計算"] },
  { q: "196. 比例題：若 6:9 簡化為最簡比是多少？", a: "2:3", o: ["3:2","6:9","1:2"], t: ["數學","小五","比值應用","約分"] },
  { q: "197. 長方體 3×3×3 cm，體積為多少？", a: "27 立方公分", o: ["9","18","81"], t: ["數學","小五","體積","正方體體積"] },
  { q: "198. 2.5 × 4 = ?", a: "10", o: ["6.5","8","12"], t: ["數學","小五","小數運算","乘法"] },
  { q: "199. 平均數：9、11、13 的平均值為？", a: "11", o: ["10","12","9"], t: ["數學","小五","統計","平均數"] },
  { q: "200. 折線圖題：若數值 5→5→5→5，趨勢為？", a: "不變", o: ["上升","下降","波動"], t: ["數學","小五","折線圖","趨勢判讀"] },
    // mathQuestions_part3 (題目 201–500)
// 依課表單元（小四/小五/小六），格式：{ q, a, o, t }
// 覆蓋所有單元，題型生活化、難度漸進
  { q: "201. 18 × 4 + 36 ÷ 6 = ?", a: "78", o: ["72","84","66"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "202. 7/8 - 1/4 = ?", a: "5/8", o: ["3/8","1/2","7/8"], t: ["數學","小五","分數加減","異分母"] },
  { q: "203. 1.2 × 3.5 = ?", a: "4.2", o: ["3.7","4.5","5.2"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "204. 三角形內角為 40°、60°、?，第三角為多少？", a: "80 度", o: ["70","80","90"], t: ["數學","小五","三角形","內角和"] },
  { q: "205. 圓半徑 5 cm，面積約為多少？（π≈3.14）", a: "約 78.5 平方公分", o: ["約 31.4","約 157","約 25"], t: ["數學","小六","圓面積","π應用"] },
  { q: "206. 若 3:4 = x:16，x = ?", a: "12", o: ["10","14","8"], t: ["數學","小六","比例深化","正比"] },
  { q: "207. 長方體 7×3×2 cm，體積為多少？", a: "42 立方公分", o: ["21","28","56"], t: ["數學","小五","體積","長方體"] },
  { q: "208. 2.5 km = ? m", a: "2500 m", o: ["250 m","25 m","25000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "209. 資料 10、12、14、16、18 的平均數為？", a: "14", o: ["13","15","12"], t: ["數學","小六","統計綜合","平均數"] },
  { q: "210. 圓形花圃半徑 4 m，圍欄長度約為多少？（π≈3.14）", a: "約 25.12 m", o: ["約 12.56","約 50.24","約 16"], t: ["數學","小六","應用題","周長計算"] },

  { q: "211. 2/3 × 3/4 = ?", a: "1/2", o: ["1/3","2/3","3/4"], t: ["數學","小五","分數乘法","應用"] },
  { q: "212. 4.8 ÷ 0.6 = ?", a: "8", o: ["0.8","2.8","4"], t: ["數學","小六","小數綜合","除法"] },
  { q: "213. 地圖比例 1:50000，地圖上 3 cm，實際距離為多少？", a: "1.5 km", o: ["150 m","15 km","0.5 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "214. 若人以 3 m/s 跑 30 秒，距離為多少？", a: "90 m", o: ["60 m","120 m","30 m"], t: ["數學","小六","速率深化","行程問題"] },
  { q: "215. 從袋中抽一顆紅球（3 紅、2 藍），抽到紅球機率為？", a: "3/5", o: ["2/5","1/2","1/5"], t: ["數學","小六","統計深化","機率"] },
  { q: "216. (15 - 3) × (4 + 1) = ?", a: "60", o: ["45","75","50"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "217. 每盒裝 6 顆球，裝滿 9 盒需多少顆球？", a: "54 顆", o: ["48","60","36"], t: ["數學","小四","四則運算","乘法應用"] },
  { q: "218. 一班 30 人，每人分到 2/3 包糖果，總共需要多少包？", a: "20 包", o: ["15","25","18"], t: ["數學","小五","分數應用","平均分配"] },
  { q: "219. 每天走 3 km，10 天共走多少？", a: "30 km", o: ["20 km","40 km","25 km"], t: ["數學","小五","速率應用","累計距離"] },
  { q: "220. 半徑變為原來的 2 倍，面積變為原來多少倍？", a: "4 倍", o: ["2 倍","8 倍","16 倍"], t: ["數學","小六","圓深化","比例關係"] },

  { q: "221. 0.125 × 8 = ?", a: "1", o: ["0.8","1.25","0.5"], t: ["數學","小五","小數應用","乘法"] },
  { q: "222. 9:12 簡化為最簡比是多少？", a: "3:4", o: ["9:12","2:3","1:4"], t: ["數學","小五","比值應用","約分"] },
  { q: "223. 資料 5、5、6、7、8 的眾數是？", a: "5", o: ["6","7","8"], t: ["數學","小五","統計","眾數"] },
  { q: "224. 地板長 5 m、寬 3 m，需鋪多少平方公尺？", a: "15 平方公尺", o: ["8","12","18"], t: ["數學","小五","面積","實務應用"] },
  { q: "225. 箱子 2×3×4 dm，體積為多少立方分米？", a: "24 立方分米", o: ["9","12","18"], t: ["數學","小五","體積","長方體"] },
  { q: "226. 折線圖：數值 10→12→9→15，最大增幅在哪？", a: "第三到第四", o: ["第一到第二","第二到第三","沒有增幅"], t: ["數學","小五","折線圖","趨勢判讀"] },
  { q: "227. 平均數：6、8、10、12 的平均數為？", a: "9", o: ["8","10","7"], t: ["數學","小五","平均數","計算"] },
  { q: "228. 直徑 14 cm，周長約為多少？（π≈3.14）", a: "約 43.96 cm", o: ["約 21.98","約 87.92","約 31.4"], t: ["數學","小五","圓周率","周長計算"] },
  { q: "229. (2/5) × (5/8) = ?", a: "1/4", o: ["1/5","2/8","1/2"], t: ["數學","小五","分數乘法","應用"] },
  { q: "230. 7.2 ÷ 0.9 = ?", a: "8", o: ["0.8","7.1","6.3"], t: ["數學","小六","小數綜合","除法"] },

  { q: "231. 地圖 1:25000，地圖上 6 cm，實際距離為多少？", a: "1.5 km", o: ["150 m","15 km","0.6 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "232. 3 m/s 跑 20 秒，距離為多少？", a: "60 m", o: ["40 m","100 m","20 m"], t: ["數學","小六","速率深化","行程問題"] },
  { q: "233. 從袋中抽一顆球（2 紅、3 藍、1 綠），抽到藍球機率為？", a: "3/6 = 1/2", o: ["1/3","1/6","2/3"], t: ["數學","小六","統計深化","機率"] },
  { q: "234. (12 - 4) × (3 + 2) = ?", a: "40", o: ["32","36","48"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "235. 一盒 8 顆糖，分給 5 人，每人可分到多少（以分數表示）？", a: "8/5", o: ["1","3/5","2"], t: ["數學","小五","分數應用","平均分配"] },
  { q: "236. 每天走 2.5 km，4 天共走多少？", a: "10 km", o: ["8 km","12 km","9 km"], t: ["數學","小五","速率應用","累計距離"] },
  { q: "237. 半徑 3 倍，周長變為原來多少倍？", a: "3 倍", o: ["9 倍","6 倍","1/3 倍"], t: ["數學","小六","圓深化","比例關係"] },
  { q: "238. 0.2 × 5 = ?", a: "1", o: ["0.2","2","0.5"], t: ["數學","小四","小數運算","乘法"] },
  { q: "239. 5:7 = x:21，x = ?", a: "15", o: ["14","18","12"], t: ["數學","小五","比例","等量關係"] },
  { q: "240. 資料 2、3、5、7、11 的中位數為？", a: "5", o: ["3","7","4"], t: ["數學","小五","統計","中位數"] },

  { q: "241. 三角形底 9、高 4，面積為多少？", a: "18 平方單位", o: ["36","13","22"], t: ["數學","小五","面積與體積","三角形面積"] },
  { q: "242. 長方體 6×6×2，體積為多少？", a: "72 立方單位", o: ["24","36","48"], t: ["數學","小五","長方體體積","體積計算"] },
  { q: "243. 速率題：車速 45 km/h，行駛 2 小時 30 分鐘，距離為多少？", a: "112.5 km", o: ["100 km","90 km","120 km"], t: ["數學","小五","速率應用","行程問題"] },
  { q: "244. 1 m² = ? cm²", a: "10000 cm²", o: ["100 cm²","1000 cm²","100000 cm²"], t: ["數學","小六","單位深化","面積換算"] },
  { q: "245. 折線圖：數值 4→7→5→9，哪段最大增幅？", a: "第二到第四段（7→9）視為第三到第四段最大", o: ["第一到第二","第二到第三","沒有增幅"], t: ["數學","小五","折線圖與統計","趨勢判讀"] },
  { q: "246. 平均數：12、15、18 的平均值為？", a: "15", o: ["14","16","13"], t: ["數學","小五","平均數與應用","計算"] },
  { q: "247. 把 3/8 表示成小數約為多少？", a: "0.375", o: ["0.35","0.4","0.25"], t: ["數學","小五","分數與小數","互換"] },
  { q: "248. 0.45 × 100 = ?", a: "45", o: ["4.5","450","0.45"], t: ["數學","小五","小數應用","乘法"] },
  { q: "249. 互補角和為多少度？", a: "90 度", o: ["180 度","45 度","360 度"], t: ["數學","小五","角度進階","互補角"] },
  { q: "250. 半徑 4 cm，周長約為多少？（π≈3.14）", a: "約 25.12 cm", o: ["約 12.56","約 50.24","約 16"], t: ["數學","小五","圓","周長計算"] },

  { q: "251. 若 5 個蘋果重 2 kg，1 個蘋果重多少？", a: "0.4 kg", o: ["0.2","0.5","0.8"], t: ["數學","小五","比例","單位比例"] },
  { q: "252. 長方體 9×2×2，體積為多少？", a: "36 立方單位", o: ["18","22","40"], t: ["數學","小五","體積","長方體"] },
  { q: "253. 哪種圖表適合顯示市場佔有率？", a: "圓形圖", o: ["折線圖","長條圖","表格"], t: ["數學","小五","統計綜合","圖表選擇"] },
  { q: "254. 衣服 350 元打 8 折後多少？", a: "280 元", o: ["70 元","300 元","320 元"], t: ["數學","小五","應用題","折扣"] },
  { q: "255. 把 7/10 表示成百分比是多少？", a: "70%", o: ["7%","700%","17%"], t: ["數學","小五","分數與百分比","互換"] },
  { q: "256. 平均數：10、12、14、16 的平均值為？", a: "13", o: ["12","14","15"], t: ["數學","小五","統計","平均數"] },
  { q: "257. 折線圖題：銷售量 5→7→6→8，哪段下降？", a: "第二到第三段", o: ["第一到第二","第三到第四","沒有下降"], t: ["數學","小五","折線圖","趨勢判讀"] },
  { q: "258. 圓面積：半徑 2 cm，面積約為？（π≈3.14）", a: "約 12.56 平方公分", o: ["約 6.28","約 25.12","約 3.14"], t: ["數學","小五","圓","面積計算"] },
  { q: "259. 把 3/4 的蛋糕分給 6 人，每人得到多少（分數）？", a: "1/8", o: ["1/6","1/4","3/8"], t: ["數學","小五","分數應用","平均分配"] },
  { q: "260. 2.4 ÷ 0.6 = ?", a: "4", o: ["0.4","1.6","3"], t: ["數學","小五","小數應用","除法"] },

  { q: "261. 若一角 110°，這是什麼角？", a: "鈍角", o: ["銳角","直角","平角"], t: ["數學","小五","角度進階","角的分類"] },
  { q: "262. 3 個 45 元的筆記本和 2 支 20 元的筆，總共多少？", a: "175 元", o: ["155","165","185"], t: ["數學","小五","應用題","混合運算"] },
  { q: "263. 若 4:5 = x:25，x = ?", a: "20", o: ["15","25","10"], t: ["數學","小五","比例","等量關係"] },
  { q: "264. 資料 2、3、5、7、11 的中位數為？", a: "5", o: ["3","7","4"], t: ["數學","小五","統計","中位數"] },
  { q: "265. L 形圖形拆成 6×2 和 4×3，總面積為多少？", a: "24 平方單位", o: ["18","20","22"], t: ["數學","小五","複合圖形面積","分割法"] },
  { q: "266. 5/6 - 1/3 = ?", a: "1/2", o: ["1/3","1/6","2/3"], t: ["數學","小六","分數綜合","減法"] },
  { q: "267. 3.75 - 1.25 = ?", a: "2.5", o: ["2.25","3.0","1.5"], t: ["數學","小六","小數綜合","減法"] },
  { q: "268. 若 y = 4x，x=3，y = ?", a: "12", o: ["7","9","15"], t: ["數學","小六","比例與反比","正比"] },
  { q: "269. 地圖 2 cm 代表 10 km，地圖 5 cm，實際距離為？", a: "25 km", o: ["10 km","20 km","50 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "270. 半徑 10 cm，面積約為多少？（π≈3.14）", a: "約 314 平方公分", o: ["約 62.8","約 157","約 628"], t: ["數學","小六","圓面積","π應用"] },

  { q: "271. 半徑 3 cm，周長約為多少？（π≈3.14）", a: "約 18.84 cm", o: ["約 9.42","約 37.68","約 28.26"], t: ["數學","小六","圓周長","周長計算"] },
  { q: "272. 正方體邊長 5 cm，體積為多少？", a: "125 立方公分", o: ["25","75","100"], t: ["數學","小六","體積深化","正方體體積"] },
  { q: "273. 5 km/h 走 2 小時，距離為多少？", a: "10 km", o: ["7 km","12 km","5 km"], t: ["數學","小六","速率深化","行程問題"] },
  { q: "274. 1 kg = ? g", a: "1000 g", o: ["100 g","10 g","10000 g"], t: ["數學","小六","單位深化","質量"] },
  { q: "275. 資料 1、2、2、3、4 的眾數是？", a: "2", o: ["1","3","4"], t: ["數學","小六","統計深化","眾數"] },
  { q: "276. 圓柱底半徑 2 cm、高 7 cm，體積約為？（π≈3.14）", a: "約 87.92 立方公分", o: ["約 43.96","約 175.84","約 31.4"], t: ["數學","小六","綜合應用題","圓柱體積"] },
  { q: "277. 0.2 = ?/5（以分數表示）", a: "1/5", o: ["2/5","3/5","1/10"], t: ["數學","小六","分數小數綜合","互換"] },
  { q: "278. 數列 4,7,10,13，公差為多少？", a: "3", o: ["2","4","5"], t: ["數學","小六","數與量","等差數列"] },
  { q: "279. 半徑 6 cm，扇形角 90°，弧長約為多少？（π≈3.14）", a: "約 9.42 cm", o: ["約 18.84","約 6.28","約 12.56"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "280. 甲 60 km/h、乙 40 km/h 同向，甲從乙後方追上需多久（距離 50 km）？", a: "2.5 小時", o: ["1 小時","5 小時","2 小時"], t: ["數學","小六","速率深化","相對速率"] },

  { q: "281. 擲一個公平六面骰，出現 4 的機率為？", a: "1/6", o: ["1/3","1/2","1/4"], t: ["數學","小六","統計深化","機率初探"] },
  { q: "282. 18 × 4 + 24 = ?", a: "96", o: ["90","84","100"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "283. 7/12 + 1/6 = ?", a: "3/4", o: ["2/3","5/12","7/12"], t: ["數學","小六","分數綜合","加法"] },
  { q: "284. 2.5 × 0.4 = ?", a: "1.0", o: ["0.1","10","0.5"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "285. 若 x:y = 2:5，且 x = 8，y = ?", a: "20", o: ["16","10","12"], t: ["數學","小六","比例與反比","正比"] },
  { q: "286. 地圖 1 cm 代表 4 km，地圖 2.5 cm，實際距離為？", a: "10 km", o: ["1 km","100 m","5 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "287. 圓面積：半徑 8 cm，面積約為？（π≈3.14）", a: "約 201.06 平方公分", o: ["約 50.24","約 100.48","約 402.12"], t: ["數學","小六","圓面積","π應用"] },
  { q: "288. 圓周長：半徑 7 cm，周長約為？（π≈3.14）", a: "約 43.96 cm", o: ["約 21.98","約 87.92","約 31.4"], t: ["數學","小六","圓周長","周長計算"] },
  { q: "289. 速率題：火車 90 km/h 行 2 小時 30 分鐘，距離為多少？", a: "225 km", o: ["180 km","200 km","250 km"], t: ["數學","小六","速率應用","行程問題"] },
  { q: "290. 1 L = ? mL", a: "1000 mL", o: ["100 mL","10 mL","10000 mL"], t: ["數學","小六","單位綜合","容量"] },

  { q: "291. 哪種圖表適合顯示各國人口比例？", a: "圓形圖", o: ["折線圖","長條圖","散佈圖"], t: ["數學","小六","統計綜合","圖表選擇"] },
  { q: "292. 長方體 12×5×3，體積為多少？", a: "180 立方單位", o: ["60","120","360"], t: ["數學","小六","綜合應用題","體積計算"] },
  { q: "293. (8 + 2) × (6 - 3) = ?", a: "30", o: ["20","36","24"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "294. (3/5) ÷ (2/5) = ?", a: "3/2", o: ["1","2","5/3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "295. 13.5 × 0.2 = ?", a: "2.7", o: ["27","1.35","0.27"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "296. 若 4:7 = x:35，x = ?", a: "20", o: ["15","25","10"], t: ["數學","小六","比例深化","應用"] },
  { q: "297. 扇形面積：r=6、θ=60°，面積約為？（π≈3.14）", a: "約 18.84 平方單位", o: ["約 37.68","約 9.42","約 56.52"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "298. 長方體 10×4×2 切成 2×2×2 小立方體，能切出多少完整小立方體？", a: "10", o: ["20","5","40"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "299. 甲 75 km/h、乙 45 km/h，相向距離 240 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "300. 3.6 km = ? m", a: "3600 m", o: ["360 m","36 m","36000 m"], t: ["數學","小六","單位深化","長度"] },

  { q: "301. 資料 2、4、6、8、10 的中位數為？", a: "6", o: ["5","7","4"], t: ["數學","小六","統計深化","中位數"] },
  { q: "302. 圓環外半徑 7、內半徑 5，面積約為？（π≈3.14）", a: "約 75.36", o: ["約 50","約 100","約 25"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "303. (14 - 6) ÷ 2 = ?", a: "4", o: ["3","5","6"], t: ["數學","小五","四則綜合應用","混合運算"] },
  { q: "304. 5/8 + 1/8 = ?", a: "3/4", o: ["1/2","5/8","7/8"], t: ["數學","小五","分數加減","同分母"] },
  { q: "305. 0.9 ÷ 0.3 = ?", a: "3", o: ["0.3","0.9","9"], t: ["數學","小五","小數應用","除法"] },
  { q: "306. 若一角 75°，這是什麼角？", a: "銳角", o: ["直角","鈍角","平角"], t: ["數學","小五","角度進階","角的分類"] },
  { q: "307. 直徑 6 cm，周長約為？（π≈3.14）", a: "約 18.84 cm", o: ["約 37.68","約 9.42","約 12.56"], t: ["數學","小五","圓","周長計算"] },
  { q: "308. 6:9 簡化為最簡比是多少？", a: "2:3", o: ["3:2","6:9","1:2"], t: ["數學","小五","比值應用","約分"] },
  { q: "309. 長方體 3×3×3，體積為多少？", a: "27 立方單位", o: ["9","18","81"], t: ["數學","小五","體積","正方體體積"] },
  { q: "310. 2.5 × 4 = ?", a: "10", o: ["6.5","8","12"], t: ["數學","小五","小數運算","乘法"] },

  { q: "311. 平均數：9、11、13 的平均值為？", a: "11", o: ["10","12","9"], t: ["數學","小五","統計","平均數"] },
  { q: "312. 折線圖：數值 5→5→5→5，趨勢為？", a: "不變", o: ["上升","下降","波動"], t: ["數學","小五","折線圖","趨勢判讀"] },
  { q: "313. 1/3 + 1/6 = ?", a: "1/2", o: ["2/3","1/3","1"], t: ["數學","小四","分數加減","同分母"] },
  { q: "314. 0.33 ≈ 哪個分數？", a: "約 1/3", o: ["1/4","1/2","2/3"], t: ["數學","小四","小數與分數","互換"] },
  { q: "315. 角度：平角是多少度？", a: "180 度", o: ["90 度","360 度","45 度"], t: ["數學","小四","角度","角的種類"] },
  { q: "316. 三角形邊長 5、5、8，這是什麼三角形？", a: "等腰三角形", o: ["等邊三角形","直角三角形","鈍角三角形"], t: ["數學","小四","三角形","分類"] },
  { q: "317. 四邊形：長方形有幾個直角？", a: "4 個", o: ["2 個","3 個","1 個"], t: ["數學","小四","四邊形","性質"] },
  { q: "318. 周長題：長方形長 15 cm、寬 5 cm，周長為？", a: "40 cm", o: ["30 cm","35 cm","45 cm"], t: ["數學","小四","周長","長方形周長"] },
  { q: "319. 面積題：正方形邊長 7 cm，面積為？", a: "49 平方公分", o: ["14","28","21"], t: ["數學","小四","面積","正方形面積"] },
  { q: "320. 統計：資料 2、2、3、4、5 的眾數是？", a: "2", o: ["3","4","5"], t: ["數學","小四","統計","眾數"] },

  { q: "321. 1/4 × 1/2 = ?", a: "1/8", o: ["1/6","1/4","1/2"], t: ["數學","小四","分數乘除","分數乘法"] },
  { q: "322. 0.75 × 4 = ?", a: "3", o: ["0.3","30","1"], t: ["數學","小四","小數運算","乘法"] },
  { q: "323. GCF：9 和 12 的最大公因數是？", a: "3", o: ["1","6","9"], t: ["數學","小四","最大公因數","GCF"] },
  { q: "324. LCM：2、3、4 的最小公倍數是？", a: "12", o: ["6","24","8"], t: ["數學","小四","最小公倍數","LCM"] },
  { q: "325. 圓的直徑 14 cm，半徑為多少？", a: "7 cm", o: ["14 cm","28 cm","3.5 cm"], t: ["數學","小四","圓","半徑直徑"] },
  { q: "326. 長方體 3×4×5，體積為多少？", a: "60 立方單位", o: ["12","20","100"], t: ["數學","小四","長方體體積","體積公式"] },
  { q: "327. 速率：若 10 km 用 2 小時，速率為多少？", a: "5 km/h", o: ["2 km/h","20 km/h","10 km/h"], t: ["數學","小四","速率","距離時間關係"] },
  { q: "328. 1000 g = ? kg", a: "1 kg", o: ["0.1 kg","10 kg","100 kg"], t: ["數學","小四","單位換算","質量"] },
  { q: "329. 折線圖：數值 1→3→2→4，趨勢為？", a: "波動並整體上升", o: ["下降","不變","穩定"], t: ["數學","小四","折線圖","趨勢判讀"] },
  { q: "330. 平均數：3、5、7 的平均值為？", a: "5", o: ["4","6","7"], t: ["數學","小四","平均數","計算"] },

  { q: "331. (2 + 3) × 4 = ?", a: "20", o: ["18","24","16"], t: ["數學","小五","綜合四則","括號處理"] },
  { q: "332. 2/5 + 1/5 = ?", a: "3/5", o: ["1/5","2/5","4/5"], t: ["數學","小五","分數應用","同分母加法"] },
  { q: "333. 0.2 × 0.5 = ?", a: "0.1", o: ["0.01","1","0.2"], t: ["數學","小五","小數應用","乘法"] },
  { q: "334. 互補角：若一角 40°，互補角為多少？", a: "50 度", o: ["60","40","90"], t: ["數學","小五","角度進階","互補角"] },
  { q: "335. 複合圖形：長方形 6×4，上有半圓 r=2，總面積為？（π≈3.14）", a: "24 + 6.28 = 30.28", o: ["30.28","28","32"], t: ["數學","小五","複合圖形面積","分割合成"] },
  { q: "336. π 約等於多少？", a: "3.14", o: ["2.14","4.14","3.41"], t: ["數學","小五","圓周率","π概念"] },
  { q: "337. 若 a:b = 4:5，且 a = 8，b = ?", a: "10", o: ["9","12","6"], t: ["數學","小五","比例","比例關係"] },
  { q: "338. 配方：果汁:水 = 1:3，果汁 2 杯，水要多少？", a: "6 杯", o: ["4","5","8"], t: ["數學","小五","比值應用","配比問題"] },
  { q: "339. 哪種圖表適合比較不同商品銷量？", a: "長條圖", o: ["折線圖","圓形圖","表格"], t: ["數學","小五","統計綜合","圖表選擇"] },
  { q: "340. 應用：買 4 本 45 元，付 200 元，找回多少？", a: "20 元", o: ["40","10","30"], t: ["數學","小五","應用題","找零"] },

  { q: "341. 因數：12 的因數有哪些？", a: "1,2,3,4,6,12", o: ["1,2,3,6","2,3,4,6","1,3,4,12"], t: ["數學","小五","因數與倍數","因數列舉"] },
  { q: "342. 0.2 = ? 分數", a: "1/5", o: ["1/4","1/10","2/5"], t: ["數學","小五","分數與小數","互換"] },
  { q: "343. GCF：14 和 21 的最大公因數是？", a: "7", o: ["14","3","2"], t: ["數學","小五","最大公因數","GCF"] },
  { q: "344. LCM：4、6 的最小公倍數是？", a: "12", o: ["24","8","6"], t: ["數學","小五","最小公倍數","LCM"] },
  { q: "345. 三角形底 15、高 4，面積為多少？", a: "30 平方單位", o: ["60","19","24"], t: ["數學","小五","面積與體積","三角形面積"] },
  { q: "346. 長方體 6×5×2，體積為多少？", a: "60 立方單位", o: ["24","30","48"], t: ["數學","小五","長方體體積","體積計算"] },
  { q: "347. 速率：車速 36 km/h，行駛 1.5 小時，距離為多少？", a: "54 km", o: ["36 km","72 km","48 km"], t: ["數學","小五","速率應用","行程問題"] },
  { q: "348. 1 m = ? cm", a: "100 cm", o: ["10 cm","1000 cm","1 cm"], t: ["數學","小五","單位換算綜合","長度"] },
  { q: "349. 折線圖：數值 2→5→3→6，哪段最大增幅？", a: "第三到第四段", o: ["第一到第二","第二到第三","沒有增幅"], t: ["數學","小五","折線圖與統計","趨勢判讀"] },
  { q: "350. 平均數：65、70、75 的平均值為？", a: "70", o: ["68","72","75"], t: ["數學","小五","平均數與應用","計算"] },

  { q: "351. 分數綜合：3/4 + 2/5 = ?", a: "23/20 或 1 3/20", o: ["7/9","1/2","11/20"], t: ["數學","小六","分數綜合","加法"] },
  { q: "352. 小數綜合：6.25 - 2.75 = ?", a: "3.5", o: ["3.25","4.0","2.5"], t: ["數學","小六","小數綜合","減法"] },
  { q: "353. 正比：若 y = 5x，x=4，y = ?", a: "20", o: ["9","16","25"], t: ["數學","小六","比例與反比","正比"] },
  { q: "354. 比例尺：1 cm 代表 0.5 km，地圖 8 cm，實際距離為？", a: "4 km", o: ["0.4 km","40 km","2 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "355. 圓面積：半徑 9 cm，面積約為？（π≈3.14）", a: "約 254.34", o: ["約 81","約 113.04","約 452.16"], t: ["數學","小六","圓面積","π應用"] },
  { q: "356. 圓周長：直徑 12 cm，周長約為？（π≈3.14）", a: "約 37.68 cm", o: ["約 18.84","約 75.36","約 12"], t: ["數學","小六","圓周長","周長計算"] },
  { q: "357. 速率應用：速率 72 km/h，時間 1.5 小時，距離為？", a: "108 km", o: ["54 km","120 km","90 km"], t: ["數學","小六","速率應用","行程問題"] },
  { q: "358. 單位綜合：2500 mL = ? L", a: "2.5 L", o: ["250 L","0.25 L","25 L"], t: ["數學","小六","單位綜合","容量"] },
  { q: "359. 統計綜合：哪種圖表適合顯示溫度變化？", a: "折線圖", o: ["圓形圖","長條圖","表格"], t: ["數學","小六","統計綜合","圖表選擇"] },
  { q: "360. 綜合應用：圓柱 r=4、高=10，體積約為？（π≈3.14）", a: "約 502.4", o: ["約 201.06","約 125.6","約 314"], t: ["數學","小六","綜合應用題","圓柱體積"] },

  { q: "361. 四則綜合： (7 × 6) - (18 ÷ 3) = ?", a: "36", o: ["30","42","32"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "362. 分數小數綜合：0.4 + 2/5 = ?", a: "0.8", o: ["0.6","1.0","0.4"], t: ["數學","小六","分數小數綜合","互換"] },
  { q: "363. 反比：y = k/x，若 x 減半，y 會如何變化？", a: "變為原來的 2 倍", o: ["變為 1/2","不變","變為 4 倍"], t: ["數學","小六","比例深化","反比"] },
  { q: "364. 幾何：平行四邊形面積公式為何？", a: "底 × 高", o: ["(上底+下底)×高/2","周長×高","底×底"], t: ["數學","小六","幾何深化","面積公式"] },
  { q: "365. 弧長：r=10、θ=45°，弧長約為？（π≈3.14）", a: "約 7.85", o: ["約 15.7","約 3.93","約 31.4"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "366. 體積拆解：12×6×2 切成 2×2×2 小立方體，能切出多少完整小立方體？", a: "36", o: ["24","18","48"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "367. 相向問題：甲 90 km/h、乙 60 km/h，距離 300 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "368. 面積換算：0.5 km² = ? m²", a: "500,000 m²", o: ["50,000 m²","5,000 m²","5,000,000 m²"], t: ["數學","小六","單位深化","面積換算"] },
  { q: "369. 機率：從 1-20 隨機選一數，選到 5 的機率為？", a: "1/20", o: ["1/10","1/5","1/4"], t: ["數學","小六","統計深化","機率"] },
  { q: "370. 綜合應用：圓錐底半徑 3、高 9，體積約為？（V=1/3πr²h，π≈3.14）", a: "約 84.78", o: ["約 28.26","約 169.56","約 56.52"], t: ["數學","小六","綜合應用題","圓錐體積"] },

  { q: "371. 計算：24 ÷ (3/4) = ?", a: "32", o: ["18","16","24"], t: ["數學","小六","四則綜合應用","分數除法"] },
  { q: "372. 5/9 + 2/3 = ?", a: "11/9", o: ["7/9","1","8/9"], t: ["數學","小六","分數綜合","加法"] },
  { q: "373. 14.4 ÷ 0.6 = ?", a: "24", o: ["2.4","8.4","9.6"], t: ["數學","小六","小數綜合","除法"] },
  { q: "374. 若 x:y = 5:8，x=25，y = ?", a: "40", o: ["35","30","45"], t: ["數學","小六","比例與反比","正比"] },
  { q: "375. 地圖 1:100000，地圖 3 cm，實際距離為多少？", a: "3 km", o: ["30 km","300 m","0.3 km"], t: ["數學","小六","比例尺","地圖應用"] },
  { q: "376. 圓面積：r=12 cm，面積約為？（π≈3.14）", a: "約 452.16", o: ["約 4521.6","約 150.72","約 226.08"], t: ["數學","小六","圓面積","π應用"] },
  { q: "377. 圓周長：r=2.5 cm，周長約為？（π≈3.14）", a: "約 15.7 cm", o: ["約 7.85","約 31.4","約 12.56"], t: ["數學","小六","圓周長","周長計算"] },
  { q: "378. 速率：若 5 m/s 跑 12 秒，距離為多少？", a: "60 m", o: ["24 m","120 m","36 m"], t: ["數學","小六","速率深化","行程問題"] },
  { q: "379. 1 L = ? cm³（近似）", a: "1000 cm³", o: ["100 cm³","10000 cm³","10 cm³"], t: ["數學","小六","單位深化","容量"] },
  { q: "380. 統計：資料 2、3、3、4、5 的中位數為？", a: "3", o: ["2","4","5"], t: ["數學","小六","統計深化","中位數"] },

  { q: "381. 應用：圓形花圃半徑 5 m，圍欄長度約為？（π≈3.14）", a: "約 31.4 m", o: ["約 15.7","約 62.8","約 25.12"], t: ["數學","小六","應用題","周長計算"] },
  { q: "382. (9 + 3) × (7 - 2) = ?", a: "60", o: ["54","48","66"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "383. (7/10) ÷ (1/5) = ?", a: "3.5 或 7/2", o: ["1.4","2","5"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "384. 16.8 × 0.25 = ?", a: "4.2", o: ["42","1.68","6.72"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "385. 若 3:7 = x:35，x = ?", a: "15", o: ["12","20","10"], t: ["數學","小六","比例深化","應用"] },
  { q: "386. 扇形面積：r=5、θ=120°，面積約為？（π≈3.14）", a: "約 78.5", o: ["約 39.25","約 157","約 31.4"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "387. 長方體 14×3×2 切成 2×1×1 小長方體，能切出多少完整小件？", a: "42", o: ["28","21","84"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "388. 甲 100 km/h、乙 60 km/h，相向距離 320 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "389. 4.2 km = ? m", a: "4200 m", o: ["420 m","42 m","42000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "390. 資料 1、3、5、7、9 的中位數為？", a: "5", o: ["3","7","6"], t: ["數學","小六","統計深化","中位數"] },

  { q: "391. 圓環外半徑 10、內半徑 6，面積約為？（π≈3.14）", a: "π(100-36)=π×64≈201.06", o: ["約 201.06","約 125.6","約 314"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "392. (20 ÷ 4) × (3 + 2) = ?", a: "25", o: ["20","30","15"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "393. (9/10) ÷ (3/5) = ?", a: "3/2", o: ["1/2","2/3","3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "394. 18.6 × 0.5 = ?", a: "9.3", o: ["93","1.86","8.6"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "395. 若 11:15 = x:60，x = ?", a: "44", o: ["45","40","48"], t: ["數學","小六","比例深化","應用"] },
  { q: "396. 扇形弧長：r=8、θ=45°，弧長約為？（π≈3.14）", a: "約 6.28", o: ["約 12.56","約 3.14","約 25.12"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "397. 長方體 20×2×2 切成 2×2×2 小立方體，能切出多少？", a: "20", o: ["10","40","5"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "398. 甲 120 km/h、乙 80 km/h，相向距離 400 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "399. 5.75 km = ? m", a: "5750 m", o: ["575 m","57.5 m","57500 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "400. 資料 2、2、2、3、4 的眾數為？", a: "2", o: ["3","4","無眾數"], t: ["數學","小六","統計深化","眾數"] },

  { q: "401. 應用：圓形花圃半徑 8 m，圍欄長度約為？（π≈3.14）", a: "約 50.24 m", o: ["約 25.12","約 100.48","約 31.4"], t: ["數學","小六","應用題","周長計算"] },
  { q: "402. (25 - 5) ÷ (4 - 2) = ?", a: "10", o: ["5","15","20"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "403. (7/8) ÷ (1/4) = ?", a: "3.5 或 7/2", o: ["1.75","2","4"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "404. 21.6 × 0.25 = ?", a: "5.4", o: ["54","2.16","6.4"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "405. 若 13:20 = x:100，x = ?", a: "65", o: ["60","50","75"], t: ["數學","小六","比例深化","應用"] },
  { q: "406. 扇形面積：r=10、θ=30°，面積約為？（π≈3.14）", a: "約 78.5", o: ["約 157","約 39.25","約 31.4"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "407. 長方體 18×3×2 切成 3×2×1 小塊，能切出多少完整小塊？", a: "54", o: ["36","27","72"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "408. 甲 90 km/h、乙 30 km/h，相向距離 240 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "409. 6.4 km = ? m", a: "6400 m", o: ["640 m","64 m","64000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "410. 資料 3、3、4、5、6 的中位數為？", a: "4", o: ["3","5","6"], t: ["數學","小六","統計深化","中位數"] },

  { q: "411. 圓環外半徑 12、內半徑 9，面積約為？（π≈3.14）", a: "π(144-81)=π×63≈197.82", o: ["約 197.82","約 125.6","約 314"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "412. (30 ÷ 5) × (8 - 3) = ?", a: "30", o: ["24","36","20"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "413. (11/12) ÷ (1/3) = ?", a: "11/4 或 2.75", o: ["11/3","1","3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "414. 27.5 × 0.4 = ?", a: "11", o: ["110","2.75","10.5"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "415. 若 17:20 = x:200，x = ?", a: "170", o: ["34","85","200"], t: ["數學","小六","比例深化","應用"] },
  { q: "416. 扇形弧長：r=15、θ=60°，弧長約為？（π≈3.14）", a: "約 15.71", o: ["約 31.42","約 7.85","約 47.12"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "417. 長方體 24×2×2 切成 2×2×2 小立方體，能切出多少？", a: "24", o: ["12","48","6"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "418. 甲 140 km/h、乙 60 km/h，相向距離 400 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "419. 8.25 km = ? m", a: "8250 m", o: ["825 m","82.5 m","82500 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "420. 資料 4、5、6、7、8 的平均數為？", a: "6", o: ["5","7","6.5"], t: ["數學","小六","統計深化","平均數"] },

  { q: "421. 圓形游泳池 r=9 m，若鋪一圈寬 1 m 的環形地磚，地磚面積約為？（π≈3.14）", a: "π(10²-9²)=π×19≈59.69", o: ["約 59.69","約 28.26","約 113.04"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "422. (16 - 4) × (5 + 1) = ?", a: "72", o: ["60","48","84"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "423. (13/15) ÷ (2/5) = ?", a: "13/6", o: ["13/10","26/15","5/6"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "424. 33.6 × 0.25 = ?", a: "8.4", o: ["84","3.36","9.6"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "425. 若 21:28 = x:140，x = ?", a: "105", o: ["100","84","70"], t: ["數學","小六","比例深化","應用"] },
  { q: "426. 扇形面積：r=20、θ=45°，面積約為？（π≈3.14）", a: "π×400×(45/360)=π×50≈157.08", o: ["約 157.08","約 314.16","約 78.54"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "427. 長方體 30×2×2 切成 2×2×2 小立方體，能切出多少？", a: "30", o: ["15","60","10"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "428. 甲 160 km/h、乙 80 km/h，相向距離 480 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "429. 9.6 km = ? m", a: "9600 m", o: ["960 m","96 m","96000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "430. 資料 5、5、5、6、7 的眾數為？", a: "5", o: ["6","7","無眾數"], t: ["數學","小六","統計深化","眾數"] },

  { q: "431. 圓環外半徑 15、內半徑 10，面積約為？（π≈3.14）", a: "π(225-100)=π×125≈392.5", o: ["約 392.5","約 314","約 250"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "432. (40 ÷ 8) × (9 - 4) = ?", a: "25", o: ["20","30","15"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "433. (17/20) ÷ (1/5) = ?", a: "17/4", o: ["17/5","4.25","3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "434. 45.6 × 0.2 = ?", a: "9.12", o: ["91.2","4.56","8.12"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "435. 若 25:30 = x:300，x = ?", a: "250", o: ["200","150","100"], t: ["數學","小六","比例深化","應用"] },
  { q: "436. 扇形弧長：r=25、θ=30°，弧長約為？（π≈3.14）", a: "約 13.09", o: ["約 26.18","約 6.54","約 39.27"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "437. 長方體 36×2×2 切成 2×2×2 小立方體，能切出多少？", a: "36", o: ["18","72","9"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "438. 甲 180 km/h、乙 120 km/h，相向距離 600 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "439. 12.3 km = ? m", a: "12300 m", o: ["1230 m","123 m","123000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "440. 資料 6、7、8、9、10 的平均數為？", a: "8", o: ["7","9","6"], t: ["數學","小六","統計深化","平均數"] },

  { q: "441. 圓形花圃 r=12 m，圍欄長度約為？（π≈3.14）", a: "約 75.36 m", o: ["約 37.68","約 150.72","約 50.24"], t: ["數學","小六","應用題","周長計算"] },
  { q: "442. (21 - 7) × (6 + 2) = ?", a: "112", o: ["84","96","128"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "443. (19/24) ÷ (1/6) = ?", a: "19/4", o: ["19/6","4.75","3"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "444. 54.4 × 0.1 = ?", a: "5.44", o: ["54.4","0.544","544"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "445. 若 29:35 = x:350，x = ?", a: "290", o: ["280","300","250"], t: ["數學","小六","比例深化","應用"] },
  { q: "446. 扇形面積：r=30、θ=60°，面積約為？（π≈3.14）", a: "π×900×(60/360)=π×150≈471.24", o: ["約 471.24","約 942.48","約 235.62"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "447. 長方體 40×2×2 切成 2×2×2 小立方體，能切出多少？", a: "40", o: ["20","80","10"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "448. 甲 200 km/h、乙 100 km/h，相向距離 600 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "449. 15.75 km = ? m", a: "15750 m", o: ["1575 m","157.5 m","157500 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "450. 資料 7、8、9、10、11 的中位數為？", a: "9", o: ["8","10","7"], t: ["數學","小六","統計深化","中位數"] },

  { q: "451. 圓環外半徑 20、內半徑 15，面積約為？（π≈3.14）", a: "π(400-225)=π×175≈549.78", o: ["約 549.78","約 314","約 700"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "452. (45 ÷ 9) × (11 - 6) = ?", a: "25", o: ["20","30","15"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "453. (23/30) ÷ (1/5) = ?", a: "23/6", o: ["23/5","3.83","4"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "454. 66.6 × 0.01 = ?", a: "0.666", o: ["6.66","66.6","0.0666"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "455. 若 31:40 = x:400，x = ?", a: "310", o: ["300","320","290"], t: ["數學","小六","比例深化","應用"] },
  { q: "456. 扇形弧長：r=35、θ=30°，弧長約為？（π≈3.14）", a: "約 18.33", o: ["約 36.66","約 9.16","約 54.99"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "457. 長方體 48×2×2 切成 2×2×2 小立方體，能切出多少？", a: "48", o: ["24","96","12"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "458. 甲 220 km/h、乙 110 km/h，相向距離 660 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "459. 18.9 km = ? m", a: "18900 m", o: ["1890 m","189 m","189000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "460. 資料 8、9、10、11、12 的平均數為？", a: "10", o: ["9","11","8"], t: ["數學","小六","統計深化","平均數"] },

  { q: "461. 圓形游泳池 r=15 m，若鋪一圈寬 2 m 的環形地磚，地磚面積約為？（π≈3.14）", a: "π(17²-15²)=π(289-225)=π×64≈201.06", o: ["約 201.06","約 125.6","約 314"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "462. (28 - 8) × (7 + 3) = ?", a: "200", o: ["160","240","180"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "463. (29/36) ÷ (1/6) = ?", a: "29/6", o: ["29/5","4.83","5"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "464. 72.8 × 0.05 = ?", a: "3.64", o: ["36.4","0.364","7.28"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "465. 若 37:50 = x:500，x = ?", a: "370", o: ["350","400","300"], t: ["數學","小六","比例深化","應用"] },
  { q: "466. 扇形面積：r=40、θ=45°，面積約為？（π≈3.14）", a: "π×1600×(45/360)=π×200≈628.32", o: ["約 628.32","約 1256.64","約 314.16"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "467. 長方體 50×2×2 切成 2×2×2 小立方體，能切出多少？", a: "50", o: ["25","100","10"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "468. 甲 240 km/h、乙 120 km/h，相向距離 720 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "469. 21.4 km = ? m", a: "21400 m", o: ["2140 m","214 m","214000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "470. 資料 9、10、11、12、13 的中位數為？", a: "11", o: ["10","12","9"], t: ["數學","小六","統計深化","中位數"] },

  { q: "471. 圓環外半徑 25、內半徑 20，面積約為？（π≈3.14）", a: "π(625-400)=π×225≈706.86", o: ["約 706.86","約 314","約 500"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "472. (50 ÷ 10) × (13 - 8) = ?", a: "25", o: ["20","30","15"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "473. (31/40) ÷ (1/5) = ?", a: "31/8", o: ["31/5","3.875","4"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "474. 88.8 × 0.01 = ?", a: "0.888", o: ["8.88","88.8","0.0888"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "475. 若 41:50 = x:500，x = ?", a: "410", o: ["400","420","390"], t: ["數學","小六","比例深化","應用"] },
  { q: "476. 扇形弧長：r=45、θ=60°，弧長約為？（π≈3.14）", a: "π×45×(60/360)=π×7.5≈23.56", o: ["約 23.56","約 47.12","約 11.78"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "477. 長方體 60×2×2 切成 2×2×2 小立方體，能切出多少？", a: "60", o: ["30","120","15"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "478. 甲 260 km/h、乙 130 km/h，相向距離 780 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "479. 24.6 km = ? m", a: "24600 m", o: ["2460 m","246 m","246000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "480. 資料 10、11、12、13、14 的平均數為？", a: "12", o: ["11","13","10"], t: ["數學","小六","統計深化","平均數"] },

  { q: "481. 圓形游泳池 r=20 m，若鋪一圈寬 3 m 的環形地磚，地磚面積約為？（π≈3.14）", a: "π(23²-20²)=π(529-400)=π×129≈405.06", o: ["約 405.06","約 314","約 628"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "482. (36 - 12) × (8 + 2) = ?", a: "240", o: ["192","288","216"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "483. (37/48) ÷ (1/6) = ?", a: "37/8", o: ["37/6","4.625","5"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "484. 99.9 × 0.01 = ?", a: "0.999", o: ["9.99","99.9","0.0999"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "485. 若 47:50 = x:500，x = ?", a: "470", o: ["450","480","490"], t: ["數學","小六","比例深化","應用"] },
  { q: "486. 扇形面積：r=50、θ=30°，面積約為？（π≈3.14）", a: "π×2500×(30/360)=π×208.333≈654.5", o: ["約 654.5","約 1309","約 327.25"], t: ["數學","小六","圓深化","扇形面積"] },
  { q: "487. 長方體 72×2×2 切成 2×2×2 小立方體，能切出多少？", a: "72", o: ["36","144","18"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "488. 甲 280 km/h、乙 140 km/h，相向距離 840 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "489. 27.3 km = ? m", a: "27300 m", o: ["2730 m","273 m","273000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "490. 資料 11、12、13、14、15 的中位數為？", a: "13", o: ["12","14","11"], t: ["數學","小六","統計深化","中位數"] },

  { q: "491. 圓環外半徑 30、內半徑 25，面積約為？（π≈3.14）", a: "π(900-625)=π×275≈863.94", o: ["約 863.94","約 706.86","約 1000"], t: ["數學","小六","綜合應用題","環形面積"] },
  { q: "492. (60 ÷ 12) × (17 - 7) = ?", a: "50", o: ["40","60","30"], t: ["數學","小六","四則綜合應用","混合運算"] },
  { q: "493. (41/60) ÷ (1/5) = ?", a: "41/12", o: ["41/5","3.416","4"], t: ["數學","小六","分數小數綜合","除法"] },
  { q: "494. 123.45 × 0.01 = ?", a: "1.2345", o: ["12.345","123.45","0.12345"], t: ["數學","小六","小數綜合","乘法"] },
  { q: "495. 若 53:60 = x:600，x = ?", a: "530", o: ["500","560","480"], t: ["數學","小六","比例深化","應用"] },
  { q: "496. 扇形弧長：r=60、θ=45°，弧長約為？（π≈3.14）", a: "π×60×(45/360)=π×7.5≈23.56", o: ["約 23.56","約 47.12","約 11.78"], t: ["數學","小六","圓深化","弧長計算"] },
  { q: "497. 長方體 80×2×2 切成 2×2×2 小立方體，能切出多少？", a: "80", o: ["40","160","20"], t: ["數學","小六","體積深化","拆解法"] },
  { q: "498. 甲 300 km/h、乙 150 km/h，相向距離 900 km，多久相遇？", a: "2 小時", o: ["1 小時","3 小時","4 小時"], t: ["數學","小六","速率深化","相向問題"] },
  { q: "499. 30.5 km = ? m", a: "30500 m", o: ["3050 m","305 m","305000 m"], t: ["數學","小六","單位深化","長度"] },
  { q: "500. 資料 12、13、14、15、16 的平均數為？", a: "14", o: ["13","15","12"], t: ["數學","小六","統計深化","平均數"] }
];

    // 2. 執行固定題註冊 (參考物理檔案格式)
    const processFixed = () => {
        fixedMathQuestions.forEach((item, idx) => {
            const id = `math_fixed_${idx}`;
            const finalTags = ["math", "數學", ...(item.t || [])];
            
            const func = () => {
                const options = Utils.shuffle([item.a, ...item.o]);
                return {
                    question: `【${item.t[2] || '數學'}】${item.q}`,
                    options: options,
                    answer: options.indexOf(item.a),
                    explanation: [`✅ 正確答案：${item.a}`],
                    subject: "math",
                    tags: finalTags
                };
            };

            window.__MATH_REPO__[id] = { id, func, tags: finalTags, subject: "math", type: "basic" };

            // 註冊到出題核心
            if (window.RigorousGenerator?.registerTemplate) {
                window.RigorousGenerator.registerTemplate(id, func, finalTags);
            }
        });
    };

    // 延遲執行確保環境就緒
    setTimeout(() => {
        processFixed();
        console.log(`✅ 數學題庫匯入完成！(動態題: ${generators.length} 類, 固定題: ${fixedMathQuestions.length} 題)`);
    }, 100);

})(window);
