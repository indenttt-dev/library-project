renderHeader();
            renderFooter();
            /* ══════════════════════════════════════════════
            책 데이터
            ══════════════════════════════════════════════ */
            const LEVEL_BOOKS = {
                easy: [
                    { t:'도련님',        a:'나쓰메 소세키',                  img:'botchan.jpg',     q:'Botchan Natsume Soseki',           bg:'#1a3d2a' },
                    { t:'미움받을 용기', a:'이치로 기시미 · 고가 후미히로', img:'courage.jpg',     q:'Courage to Be Disliked Kishimi',   bg:'#163d73' },
                    { t:'위험한 과학책', a:'란달 먼로',                       img:'whatif.jpg',      q:'What If Randall Munroe',           bg:'#2a1a0a' },
                    { t:'방구석 미술관', a:'조원재',                          img:'armchair_art.jpg',bg:'#0a2a3d' },
                    { t:'경제학 콘서트', a:'팀 하포드',                       img:'undercover.jpg',  q:'Undercover Economist Tim Harford', bg:'#1a3d0a' },
                ],
            mid: [
                { t:'노르웨이의 숲',      a:'무라카미 하루키',  img:'norwegian.jpg',   q:'Norwegian Wood Haruki Murakami',    bg:'#1a0a3d' },
                { t:'사피엔스',           a:'유발 하라리',      img:'sapiens.jpg',     q:'Sapiens Yuval Noah Harari',         bg:'#0a3d2a' },
                { t:'코스모스',           a:'칼 세이건',        img:'cosmos.jpg',      q:'Cosmos Carl Sagan',                 bg:'#0a1a3d' },
                { t:'생각에 관한 생각',   a:'대니얼 카너먼',    img:'think.jpg',       q:'Thinking Fast Slow Kahneman',       bg:'#3d0a2a' },
                { t:'불안',               a:'알랭 드 보통',     img:'anxiety.jpg',     q:'Status Anxiety Alain de Botton',   bg:'#2a2a0a' },
            ],
            hard: [
                { t:'차라투스트라는 이렇게 말했다', a:'프리드리히 니체',           img:'zarathustra.jpg', q:'Thus Spoke Zarathustra Nietzsche',       bg:'#0a0a2a' },
                { t:'비전의 충돌',                  a:'토머스 소웰',                img:'conflict.jpg',    q:'Conflict of Visions Thomas Sowell',      bg:'#2a0a0a' },
                { t:'봄눈',                         a:'미시마 유키오',              img:'spring_snow.jpg', q:'Spring Snow Mishima Yukio',              bg:'#0a2a1a' },
                { t:'미래의 시공간',                a:'킵 손 · 스티븐 호킹 외',    img:'spacetime.jpg',   q:'The Future of Spacetime Kip Thorne',     bg:'#1a1a3d' },
                { t:'죽음에 이르는 병',             a:'쇠렌 키르케고르',            img:'sickness.jpg',    q:'Sickness Unto Death Kierkegaard',        bg:'#1a0a2a' },
            ],
            };
            /* 체크 상태 */
            const checked = { easy:{}, mid:{}, hard:{} };
            function renderLevelGrid(lv) {
                const grid = document.getElementById(`grid-${lv}`);
                const books = LEVEL_BOOKS[lv];
                grid.innerHTML = books.map((b, i) => `
                    <div class="rb-card ${checked[lv][i] ? 'done' : ''}" id="rbc-${lv}-${i}">
                    <div class="rb-cover">
                    <div class="rb-cover-ph" id="rbph-${lv}-${i}" style="background:${b.bg}">${b.t}</div>
                    </div>
                    <div class="rb-body">
                    <div class="rb-title">${b.t}</div>
                    <div class="rb-author">${b.a}</div>
                    <div class="rb-check">
                    <input type="checkbox" id="chk-${lv}-${i}" ${checked[lv][i] ? 'checked' : ''}
                    onchange="toggleCheck('${lv}',${i})">
                    <label for="chk-${lv}-${i}">읽었어요</label>
                    </div>
                    </div>
                    </div>`).join('');
                    books.forEach((b, i) => {
                            const el = document.getElementById(`rbph-${lv}-${i}`);
                            const src = b.img ? (BOOKS_ROOT + 'images/books/' + b.img) : null;
                            loadCover(el, src, b.q);
                    });
            }
            ['easy','mid','hard'].forEach(lv => renderLevelGrid(lv));
            /* 체크 토글 */
            function toggleCheck(lv, i) {
                const chk = document.getElementById(`chk-${lv}-${i}`);
                checked[lv][i] = chk.checked;
                document.getElementById(`rbc-${lv}-${i}`).classList.toggle('done', chk.checked);
                updateProgress();
            }
            /* 레벨 탭 전환 */
            document.querySelectorAll('.level-tab').forEach(btn =>
                btn.addEventListener('click', () => {
                        document.querySelectorAll('.level-tab').forEach(b => b.classList.remove('on'));
                        document.querySelectorAll('.level-panel').forEach(p => p.classList.remove('on'));
                        btn.classList.add('on');
                        document.getElementById('panel-' + btn.dataset.lv).classList.add('on');
                })
            );
            /* ══════════════════════════════════════════════
            진행 현황 업데이트
            ══════════════════════════════════════════════ */
            function updateProgress() {
                const done  = ['easy','mid','hard'].reduce((s, lv) =>
                    s + Object.values(checked[lv]).filter(Boolean).length, 0
                );
            const total = +document.getElementById('goalNum').textContent || 12;
            const pct   = Math.min(100, Math.round(done / total * 100));
            document.getElementById('doneCount').textContent  = done;
            document.getElementById('totalCount').textContent = total;
            document.getElementById('progressFill').style.width = pct + '%';
            const q = Math.round(total / 4);
            document.getElementById('qtr1Label').textContent = q;
            document.getElementById('qtr2Label').textContent = q * 2;
            document.getElementById('qtr3Label').textContent = q * 3;
            document.getElementById('totalLabel').textContent = total;
            }
            /* ══════════════════════════════════════════════
            목표 슬라이더
            ══════════════════════════════════════════════ */
            const slider = document.getElementById('goalSlider');
            slider.addEventListener('input', () => {
                    const v = +slider.value;
                    document.getElementById('goalNum').textContent = v;
                    /* 슬라이더 채우기 색상 */
                    slider.style.setProperty('--pct', ((v - 1) / 51 * 100).toFixed(1) + '%');
                    /* 프리셋 버튼 on 상태 */
                    document.querySelectorAll('.preset-btn').forEach(b => b.classList.toggle('on', +b.dataset.v === v));
                    updateProgress();
                    updateSuggest();
            });
            document.querySelectorAll('.preset-btn').forEach(btn =>
                btn.addEventListener('click', () => {
                        const v = +btn.dataset.v;
                        slider.value = v;
                        slider.dispatchEvent(new Event('input'));
                })
            );
            /* ══════════════════════════════════════════════
            캘린더
            ══════════════════════════════════════════════ */
            const TODAY     = new Date();
            TODAY.setHours(0,0,0,0);
            const YEAR_END  = new Date(2026, 11, 31);
            let calYear  = TODAY.getFullYear();
            let calMonth = TODAY.getMonth();   /* 0-based */
            let selectedDate = null;
            const MONTH_KR = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
            const DAY_KR   = ['일','월','화','수','목','금','토'];
            function buildCal() {
                const lbl  = document.getElementById('calMonthLabel');
                const grid = document.getElementById('calGrid');
                lbl.textContent = `${calYear}년 ${MONTH_KR[calMonth]}`;
                /* 요일 헤더 */
                const header = DAY_KR.map((d, i) =>
                    `<div class="cal-day-name ${i===0?'sun':i===6?'sat':''}">${d}</div>`
                ).join('');
            /* 날짜 셀 */
            const first   = new Date(calYear, calMonth, 1).getDay();  /* 시작 요일 */
            const lastDay = new Date(calYear, calMonth + 1, 0).getDate();
            let cells = '';
            for (let e = 0; e < first; e++)
            cells += `<button class="cal-day empty" disabled></button>`;
            for (let d = 1; d <= lastDay; d++) {
                const date = new Date(calYear, calMonth, d);
                const isPast    = date < TODAY;
                const isToday   = date.getTime() === TODAY.getTime();
                const isSel     = selectedDate && date.getTime() === selectedDate.getTime();
                const outOfRange = date > YEAR_END;
                const dow = date.getDay();
                let cls = 'cal-day';
                if (isPast || outOfRange) cls += ' past';
                if (isToday)  cls += ' today';
                if (isSel)    cls += ' selected';
                if (dow === 0) cls += ' sun-col';
                if (dow === 6) cls += ' sat-col';
                const disabled = isPast || outOfRange ? 'disabled' : '';
                cells += `<button class="${cls}" data-d="${calYear}-${calMonth+1}-${d}" ${disabled}>${d}</button>`;
            }
            grid.innerHTML = header + cells;
            /* 날짜 클릭 */
            grid.querySelectorAll('.cal-day:not(.empty):not(.past)').forEach(btn =>
                btn.addEventListener('click', () => {
                        const [y, m, d] = btn.dataset.d.split('-').map(Number);
                        selectedDate = new Date(y, m - 1, d);
                        buildCal();
                        updateCalInfo();
                        updateSuggest();
                })
            );
            }
            /* 이전/다음 달 */
            document.getElementById('calPrev').addEventListener('click', () => {
                    calMonth--;
                    if (calMonth < 0) { calMonth = 11; calYear--; }
                    /* 2026년 전으로 안 가게 */
                    if (calYear < 2026) { calYear = 2026; calMonth = 0; }
                    buildCal();
            });
            document.getElementById('calNext').addEventListener('click', () => {
                    calMonth++;
                    if (calMonth > 11) { calMonth = 0; calYear++; }
                    /* 2026년 이후로 안 가게 */
                    if (calYear > 2026) { calYear = 2026; calMonth = 11; }
                    buildCal();
            });
            function updateCalInfo() {
                const info = document.getElementById('calInfo');
                if (!selectedDate) { info.innerHTML = '달성일을 선택하세요.'; return; }
                const diff = Math.ceil((selectedDate - TODAY) / (1000 * 60 * 60 * 24));
                const y = selectedDate.getFullYear();
                const m = selectedDate.getMonth() + 1;
                const d = selectedDate.getDate();
                const dow = DAY_KR[selectedDate.getDay()];
                if (diff <= 0) {
                    info.innerHTML = '오늘 이후의 날짜를 선택해주세요.';
                    return;
                }
            info.innerHTML = `
            목표 달성일 <strong>${y}년 ${m}월 ${d}일 (${dow})</strong>
            <span class="days-left">D-${diff} <span style="font-size:16px;font-weight:400;color:var(--text3);">남았습니다</span></span>`;
            }
            /* ══════════════════════════════════════════════
            추천 독서량
            ══════════════════════════════════════════════ */
            function updateSuggest() {
                const textEl = document.getElementById('suggestText');
                const goal   = +slider.value;
                if (!selectedDate || selectedDate <= TODAY) {
                    textEl.innerHTML = `목표일을 선택하면 추천 독서 페이스를 알려드립니다.`;
                    return;
                }
            const diffDays  = Math.ceil((selectedDate - TODAY) / (1000 * 60 * 60 * 24));
            const diffWeeks = (diffDays / 7).toFixed(1);
            const perWeek   = (goal / diffDays * 7).toFixed(2);
            const perMonth  = (goal / diffDays * 30).toFixed(1);
            let pace = '';
            if (+perWeek >= 1)      pace = `<strong>주 ${(+perWeek).toFixed(1)}권</strong>씩`;
            else if (+perMonth >= 1) pace = `<strong>월 ${perMonth}권</strong>씩`;
            else                     pace = `<strong>약 ${diffDays}일에 1권</strong>씩`;
            textEl.innerHTML =
            `${diffDays}일(${diffWeeks}주) 안에 <strong>${goal}권</strong>을 읽으려면<br>
            ${pace} 읽으면 됩니다.`;
            }
            /* 초기 실행 */
            /* 2026년으로 고정 */
            calYear  = 2026;
            calMonth = TODAY.getFullYear() === 2026 ? TODAY.getMonth() : 0;
            buildCal();
            updateCalInfo();
            updateSuggest();
            updateProgress();
            /* 슬라이더 초기 채우기 */
            slider.style.setProperty('--pct', ((12 - 1) / 51 * 100).toFixed(1) + '%');
