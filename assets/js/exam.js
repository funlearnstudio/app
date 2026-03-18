// assets/js/exam.js

// 讀取全域資料 (由 mockdata 注入)
const examData = window.ExamData;

if (!examData) {
    alert("系統錯誤：無法讀取試題資料！");
    throw new Error("No Exam Data");
}

const mockQuestions = examData.questions;
const examInfo = examData.info;

// 狀態變數
let currentQuestionIndex = 0;
let userAnswers = new Array(mockQuestions.length).fill(null);
let timeLeft = examInfo.timeLimit;
let timerInterval;
let examFinished = false; // ✅ 防止重複交卷

// DOM 元素
const els = {
    title: document.getElementById('examTitle'),
    qText: document.getElementById('questionText'),
    opts: document.getElementById('optionsContainer'),
    currNum: document.getElementById('currentQNum'),
    totalNum: document.getElementById('totalQNum'),
    progress: document.getElementById('progressBar'),
    prev: document.getElementById('prevBtn'),
    next: document.getElementById('nextBtn'),
    timer: document.getElementById('timer'),
    submit: document.getElementById('submitBtnTop')
};

function initExam() {
    if (els.title) els.title.textContent = examInfo.title;
    els.totalNum.textContent = mockQuestions.length;
    renderQuestion();
    startTimer();
    updateNav();
}

/* =========================
 * 顯示題目
 * ========================= */
function renderQuestion() {
    const q = mockQuestions[currentQuestionIndex];
    els.currNum.textContent = currentQuestionIndex + 1;
    els.qText.textContent = q.question;
    
    // 進度條
    const pct = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;
    els.progress.style.width = `${pct}%`;

    // 選項
    els.opts.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        const isSelected = userAnswers[currentQuestionIndex] === idx;

        btn.className = `
            w-full text-left p-4 rounded-lg border border-gray-200
            hover:bg-gray-50 transition flex items-center
            ${isSelected ? 'option-selected' : ''}
        `;

        btn.innerHTML = `
            <span class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold mr-4">
                ${String.fromCharCode(65 + idx)}
            </span>
            <span class="text-lg">${opt}</span>
        `;

        btn.onclick = () => {
            userAnswers[currentQuestionIndex] = idx;
            renderQuestion();
        };

        els.opts.appendChild(btn);
    });

    updateNav();
}

/* =========================
 * 導航狀態（❗不綁 onclick）
 * ========================= */
function updateNav() {
    els.prev.disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === mockQuestions.length - 1) {
        els.next.textContent = '交卷';
        els.next.classList.remove('bg-blue-600');
        els.next.classList.add('bg-green-600');
    } else {
        els.next.textContent = '下一題';
        els.next.classList.remove('bg-green-600');
        els.next.classList.add('bg-blue-600');
    }
}

/* =========================
 * 上一題
 * ========================= */
els.prev.onclick = () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
};

/* =========================
 * 下一題 / 交卷（唯一入口）
 * ========================= */
els.next.onclick = () => {
    if (currentQuestionIndex === mockQuestions.length - 1) {
        finishExam();
    } else {
        currentQuestionIndex++;
        renderQuestion();
    }
};

/* =========================
 * 上方交卷按鈕（防呆）
 * ========================= */
if (els.submit) {
    els.submit.addEventListener('click', finishExam);
}

/* =========================
 * 計時器
 * ========================= */
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        els.timer.textContent = `${m}:${s}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("時間到！自動交卷。");
            finishExam();
        }
    }, 1000);
}

/* =========================
 * 交卷（保證成功）
 * ========================= */
function finishExam() {
    if (examFinished) return;
    examFinished = true;

    clearInterval(timerInterval);

    let correctCount = 0;
    let wrongList = [];

    mockQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.answer) {
            correctCount++;
        } else {
            wrongList.push({
                ...q,
                yourAns: userAnswers[idx] ?? -1
            });
        }
    });

    const score = Math.round((correctCount / mockQuestions.length) * 100);

    localStorage.setItem('examResult', JSON.stringify({
        score,
        correctCount,
        totalCount: mockQuestions.length,
        wrongList,
        subject: examInfo.subject
    }));

    setTimeout(() => {
        if (confirm(`作答結束！\n得分：${score}\n是否查看診斷分析？`)) {
            window.location.href = "analysis.html";
        } else {
            window.location.href = "dashboard.html";
        }
    }, 50);
}
function showFatalError(msg) {
  document.body.innerHTML = `
    <div style="padding:40px;font-family:sans-serif;">
      <h1 style="color:red;">⚠️ 題目產生失敗</h1>
      <p>${msg}</p>
      <p>請聯絡系統管理員或重新整理</p>
    </div>
  `;
}

function renderDebugPanel() {
  const panel = document.getElementById("debugPanel");
  const content = document.getElementById("debugContent");
  const logs = PaperGenerator.getDebugLog();

  panel.style.display = "block";
  content.textContent = JSON.stringify(logs, null, 2);
}

// 啟動
initExam();
