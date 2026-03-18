/**
 * 翰林雲端學院 - 全站統一元件
 */
const Components = {
    // 渲染側邊欄
    renderSidebar: function(activeId) {
        const user = (typeof Auth !== 'undefined' && Auth.getCurrentUser()) || { name: '學生', grade: '九年級' };
        
        const menu = [
            { id: 'dashboard', url: 'dashboard.html', icon: 'fa-th-large', text: '課程總覽' },
            { id: 'remedial', url: 'remedial.html', icon: 'fa-book-medical', text: '錯題補救' },
            { id: 'analysis', url: 'analysis.html', icon: 'fa-chart-pie', text: '學習分析' },
            { id: 'forum', url: 'forum.html', icon: 'fa-comments', text: '解題論壇' }
        ];

        const sidebarHTML = `
        <aside class="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col z-20 shrink-0 h-screen sticky top-0">
            <div class="h-16 flex items-center px-6 border-b border-slate-50">
                <div class="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm mr-2 shadow-sm">翰</div>
                <span class="text-lg font-bold text-slate-800 tracking-tight">雲端學院</span>
            </div>

            <div class="px-4 py-6">
                <div class="bg-white border border-slate-50 rounded-2xl p-6 text-center shadow-sm">
                    <div class="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-2xl text-blue-500 mb-3 border-2 border-white shadow-sm">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <h3 class="font-bold text-slate-800 text-base" id="sideUserName">${user.name}</h3>
                    <div class="text-[11px] text-slate-400 mt-1 mb-3 font-medium uppercase tracking-wider" id="sideUserRole">${user.grade}</div>
                    <button onclick="Components.openProfileModal()" class="text-[10px] font-bold text-slate-400 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:text-slate-600 transition-all">
                        <i class="fas fa-pen mr-1"></i> 編輯年級
                    </button>
                </div>
            </div>

            <nav class="flex-grow px-3 space-y-1 overflow-y-auto no-scrollbar">
                ${menu.map(item => `
                    <a href="${item.url}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${activeId === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}">
                        <i class="fas ${item.icon} w-5 text-center"></i> ${item.text}
                    </a>
                `).join('')}
            </nav>

            <div class="p-4 border-t border-slate-50">
                <button onclick="Auth.logout()" class="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-red-500 py-3 transition-colors font-bold text-xs">
                    <i class="fas fa-sign-out-alt"></i> 登出系統
                </button>
            </div>
        </aside>`;

        document.getElementById('sidebar-container').innerHTML = sidebarHTML;
        this.renderProfileModal(); // 同時生成隱藏的彈窗 HTML
    },

    // 渲染全站統一彈窗
    renderProfileModal: function() {
        if (document.getElementById('profileModal')) return;
        const modalHTML = `
        <div id="profileModal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onclick="Components.closeProfileModal()"></div>
            <div class="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 p-10 shadow-2xl">
                <h2 class="text-2xl font-black text-slate-800 mb-2">更新學習階段</h2>
                <p class="text-slate-400 text-sm mb-8 font-medium">請選擇您目前就讀的年級，我們將為您推薦合適課程。</p>
                <div class="grid grid-cols-1 gap-3 mb-8">
                    ${['七年級', '八年級', '九年級'].map(g => `
                        <button onclick="Components.updateGrade('${g}')" class="w-full p-4 rounded-2xl border-2 border-slate-50 hover:border-blue-500 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold transition-all text-left flex items-center justify-between group">
                            ${g} <i class="fas fa-chevron-right text-slate-300 group-hover:text-blue-500 transition-colors"></i>
                        </button>
                    `).join('')}
                </div>
                <button onclick="Components.closeProfileModal()" class="w-full py-4 text-slate-400 font-bold text-sm hover:text-slate-600 transition">取消修改</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    openProfileModal: () => document.getElementById('profileModal').classList.remove('hidden'),
    closeProfileModal: () => document.getElementById('profileModal').classList.add('hidden'),
    updateGrade: function(newGrade) {
        const user = Auth.getCurrentUser();
        if(user) {
            user.grade = newGrade;
            localStorage.setItem('currentUser', JSON.stringify(user));
            location.reload(); // 重新整理頁面以更新全站狀態
        }
    }
};
