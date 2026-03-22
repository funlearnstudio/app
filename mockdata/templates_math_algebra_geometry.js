(function(global){
    'use strict';

    if (!window.__MATH_REPO__) window.__MATH_REPO__ = {};
    console.log("🚀 [Math Core] 數學題庫 (純文字自然版) 啟動...");

    const Utils = {
        rnd: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
        
        genOptions: (ans) => {
            let opts = new Set([ans]);
            while(opts.size < 4) {
                let offset = Utils.rnd(1, 10);
                let val = Math.random() > 0.5 ? ans + offset : ans - offset;
                opts.add(val);
            }
            return Array.from(opts).sort(() => Math.random() - 0.5);
        },

        // 人類算式翻譯機：把負數變成 "- 10"，正數變成 "+ 10"
        formatOp: (val) => {
            if (val < 0) return `- ${Math.abs(val)}`; 
            return `+ ${val}`;
        }
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
}

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


    generators.forEach(gen => {
        for(let i=0; i<5; i++) {
            const uId = `${gen.id}_${i}`;
            window.__MATH_REPO__[uId] = {
                func: () => {
                    const d = gen.generate();
                    return { 
                        ...d, 
                        answer: d.options.indexOf(d.correctValue), 
                        subject: "math", 
                        tags: gen.tags 
                    };
                },
                tags: gen.tags,
                subject: "math"
            };
        }
    });

})(window);
