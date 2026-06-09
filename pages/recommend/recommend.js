renderHeader('추천 도서');
            renderFooter();
            /* ── 메인 탭 전환 ── */
            const PANELS = { week:'tab-week', genre:'tab-genre', curator:'tab-curator', best:'tab-best' };
            const RECOMMEND_LABELS = {
                week: '금주의 추천 도서',
                genre: '장르별 추천',
                curator: '사서 추천 도서',
                best: '베스트 대출'
            };
            document.querySelectorAll('#recTabs .tab-btn').forEach(btn =>
                btn.addEventListener('click', () => {
                        document.querySelectorAll('#recTabs .tab-btn').forEach(x => x.classList.remove('on'));
                        btn.classList.add('on');
                        Object.values(PANELS).forEach(id => document.getElementById(id).style.display = 'none');
                        document.getElementById(PANELS[btn.dataset.key]).style.display = 'block';
                        document.getElementById('recommendCurrentCrumb').textContent = RECOMMEND_LABELS[btn.dataset.key];
                })
            );
            /* ── hash 자동 탭 이동 ── */
            (function() {
                    const hash = location.hash.replace('#', '');
                    if (hash && PANELS[hash]) {
                        const btn = document.querySelector(`#recTabs .tab-btn[data-key="${hash}"]`);
                        if (btn) btn.click();
                    }
            })();
            /* ── 금주 #1 피처드 ── */
            (function() {
                    const b = ALL_BOOKS['week_1'];
                    renderBookCover(document.getElementById('wf-main'), 'week_1');
                    document.getElementById('wf-info').innerHTML = `
                    <div class="wf-rank">이번 주 #1</div>
                    <div class="wf-title">${b.t}</div>
                    <div class="wf-author">${b.a}</div>
                    <div class="wf-tags">${(b.tags||[]).map(t=>`<span class="wf-tag">${t}</span>`).join('')}</div>
                    <p class="wf-desc">${b.desc||''}</p>
                    <div class="wf-foot">
                    <div class="avail"><div class="avail-dot"></div>대출 가능</div>
                    <button class="btn-primary">대출 예약</button>
                    <button class="btn-outline">상세 정보</button>
                    </div>`;
            })();
            /* ── 금주 #2~7 그리드 ── */
            const WEEK_EXTRA = ['week_2','week_3','week_4','week_5','week_6','best_7'];
            (function() {
                    const grid = document.getElementById('weekGrid');
                    grid.innerHTML = WEEK_EXTRA.map((k,i) => bookCardHTML(ALL_BOOKS[k], `wk2-${i}`)).join('');
                    WEEK_EXTRA.forEach((k,i) => renderBookCover(document.getElementById(`wk2-${i}`), k));
            })();
            /* ── 장르별 ── */
            const GENRE_KEYS = {
                all:   ['g_novel_1','g_biz_1',  'g_it_1',   'g_sci_1',  'g_hist_1', 'g_novel_2'],
                novel: ['g_novel_1','g_novel_2','g_novel_3', 'g_novel_4','g_novel_5','g_novel_6'],
                self:  ['g_self_1', 'g_self_2', 'g_self_3',  'g_self_4', 'g_self_5', 'g_self_6'],
                biz:   ['g_biz_1',  'g_biz_2',  'g_biz_3',   'g_biz_4',  'g_biz_5',  'g_biz_6'],
                sci:   ['g_sci_1',  'g_sci_2',  'g_sci_3',   'g_sci_4',  'g_sci_5',  'g_sci_6'],
                art:   ['g_art_1',  'g_art_2',  'g_art_3',   'g_art_4',  'g_art_5',  'g_art_6'],
                hist:  ['g_hist_1', 'g_hist_2', 'g_hist_3',  'g_hist_4', 'g_hist_5', 'g_hist_6'],
                it:    ['g_it_1',   'g_it_2',   'g_it_3',    'g_it_4',   'g_it_5',   'g_it_6'],
            };
            function renderGenre(key) {
                const grid = document.getElementById('genreGrid');
                const keys = GENRE_KEYS[key] || GENRE_KEYS.all;
                grid.innerHTML = keys.map((k,i) => gbookCardHTML(ALL_BOOKS[k], `gk-${key}-${i}`)).join('');
                keys.forEach((k,i) => renderBookCover(document.getElementById(`gk-${key}-${i}`), k));
            }
            document.querySelectorAll('#genreTabs .gtab').forEach(btn =>
                btn.addEventListener('click', () => {
                        document.querySelectorAll('#genreTabs .gtab').forEach(x => x.classList.remove('on'));
                        btn.classList.add('on'); renderGenre(btn.dataset.g);
                })
            );
            renderGenre('all');
            /* ── 사서 추천 ── */
            (function() {
                    const keys = ['cur_1','cur_2','cur_3'];
                    const grid = document.getElementById('curatorGrid');
                    grid.innerHTML = keys.map((k,i) => {
                            const b = ALL_BOOKS[k];
                            return `
                            <div class="curator-card">
                            <div class="curator-card-top">
                            <div class="curator-cover-ph" id="cur-${i}" style="background:${b.bg}">${b.t}</div>
                            <div>
                            <div class="curator-title">${b.t}</div>
                            <div class="curator-author">${b.a}</div>
                            <div class="curator-by">추천: ${b.by||''}</div>
                            </div>
                            </div>
                            <p class="curator-desc">${b.curDesc||''}</p>
                            </div>`;
                    }).join('');
            keys.forEach((k,i) => renderBookCover(document.getElementById(`cur-${i}`), k));
            })();
            /* ── 베스트 대출 Top 10 ── */
            (function() {
                    const keys = ['best_1','best_2','best_3','best_4','best_5','best_6','best_7','best_8','best_9','best_10'];
                    const list = document.getElementById('bestList');
                    list.innerHTML = keys.map((k,i) => {
                            const b = ALL_BOOKS[k];
                            return `
                            <div class="best-row">
                            <div class="best-rank ${i<3?'top3':''}">${i+1}</div>
                            <div class="best-cover-sm-ph" id="bs-${i}" style="background:${b.bg}">${b.t}</div>
                            <div class="best-info">
                            <div class="best-title">${b.t}</div>
                            <div class="best-author">${b.a}</div>
                            </div>
                            <div class="best-avail">대출 가능</div>
                            <button class="btn-primary" style="font-size:12.5px;padding:6px 14px;">대출 예약</button>
                            </div>`;
                    }).join('');
            keys.forEach((k,i) => renderBookCover(document.getElementById(`bs-${i}`), k));
            })();
