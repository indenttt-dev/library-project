/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
동양미래대학교 도서관 — 공통 JS  (main.js)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const ROOT = (() => location.pathname.includes('/pages/') ? '../' : './')();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
헤더
activeNav: '자료 이용'|'추천 도서'|'시설 이용'|'커뮤니티'|'나의 공간'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderHeader(activeNav) {

    /* 탭 정의 — 순서대로 나열 */
    const NAV_LABELS = ['자료 이용', '추천 도서', '시설 이용', '커뮤니티', '나의 공간'];
    const activeLabel = activeNav === '자료이용' ? '자료 이용' : activeNav === '시설이용' ? '시설 이용' : activeNav === '나의공간' ? '나의 공간' : activeNav;

    /* 메가 드롭다운: 탭 순서와 1:1 대응하는 컬럼들
    각 탭 버튼 아래쪽에 해당 컬럼이 오도록 flex 배치 */
    const MEGA_COLS = [
        /* 자료 이용 */
        {
            title: '자료 이용',
            links: [
                ['통합 자료 검색', '#'],
                ['도서 대출 · 반납', ROOT + 'pages/materials.html#loan'],
                ['도서 구입 신청', ROOT + 'pages/materials.html#request'],
                ['신작 도서 안내', ROOT + 'pages/materials.html#new'],
            ]
    },
/* 추천 도서 */
{
    title: '추천 도서',
    links: [
        ['금주의 추천 도서', ROOT + 'pages/recommend.html#week'],
        ['장르별 추천',       ROOT + 'pages/recommend.html#genre'],
        ['사서 추천 도서',    ROOT + 'pages/recommend.html#curator'],
        ['베스트 대출',       ROOT + 'pages/recommend.html#best'],
    ]
},
/* 시설 이용 */
{
    title: '시설 이용',
    links: [
        ['시설 예약',   ROOT + 'pages/facility.html'],
        ['층별 안내도', ROOT + 'pages/floormap.html'],
    ]
},
/* 커뮤니티 */
{
    title: '커뮤니티',
    links: [
        ['공지사항', ROOT + 'pages/community.html#notice'],
        ['F&Q',      ROOT + 'pages/community.html#faq'],
    ]
},
/* 나의 공간 — 내정보 + 이용현황을 하나의 컬럼에 표시 */
{
    title: '나의 공간',
    links: [
        ['— 내정보', ''],          /* 소제목 역할 (링크 없음) */
        ['내 서재', ROOT + 'pages/mypage.html#library'],
        ['이용자 정보 관리', ROOT + 'pages/mypage.html#info'],
        ['— 이용현황', ''],        /* 소제목 역할 */
        ['자료 대출 · 예약 현황', ROOT + 'pages/mypage.html#borrow'],
        ['자료구입 신청 현황', ROOT + 'pages/mypage.html#request'],
    ]
},
];

/* 메가 컬럼 HTML 생성 */
const megaHTML = MEGA_COLS.map(col => {
        const linksHTML = col.links.map(([t, h]) => {
                /* 소제목 (href 빈 문자열) */
                if (h === '') return `<span class="mega-sub-title">${t}</span>`;
                return `<a href="${h}">${t}</a>`;
        }).join('');
return `<div class="mega-col"><div class="mega-col-title">${col.title}</div>${linksHTML}</div>`;
}).join('');

/* nav 버튼 HTML */
const NAV_LINKS = {
    '자료 이용': ROOT + 'pages/materials.html',
    '추천 도서': ROOT + 'pages/recommend.html',
    '시설 이용': ROOT + 'pages/facility.html',
    '커뮤니티': ROOT + 'pages/community.html',
    '나의 공간': ROOT + 'pages/mypage.html'
};
const navBtnsHTML = NAV_LABELS.map(label =>
    `<div class="nav-item"><a href="${NAV_LINKS[label] || '#'}" ${label === activeLabel ? 'class="active"' : ''}>${label}</a></div>`
).join('');

document.getElementById('header-placeholder').outerHTML = `
<header>
<div class="header-inner">
<a class="logo-link" href="${ROOT}index.html">
<img class="logo-img" src="${ROOT}images/logo.jpg" alt="동양미래대학교">
<span class="logo-lib-label">도서관</span>
</a>
<div class="header-utils">
<a class="btn-login" href="${ROOT}pages/login.html">LOGIN</a>
<button class="icon-btn" aria-label="검색">
<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
</svg>
</button>
</div>
</div>
<nav class="main-nav" id="mainNav">
<div class="nav-inner">${navBtnsHTML}</div>
<div class="mega-panel" id="megaPanel">
<div class="mega-panel-inner">${megaHTML}</div>
</div>
</nav>
</header>`;

/* hover 제어 */
const nav   = document.getElementById('mainNav');
const panel = document.getElementById('megaPanel');
let tid = null;
const show = () => { clearTimeout(tid); panel.classList.add('visible'); };
const hide = () => { tid = setTimeout(() => panel.classList.remove('visible'), 150); };
nav.addEventListener('mouseenter',   show);
nav.addEventListener('mouseleave',   hide);
panel.addEventListener('mouseenter', show);
panel.addEventListener('mouseleave', hide);

/* community.html 내부에서 hash 탭 전환 */
document.querySelectorAll('.mega-panel a').forEach(a => {
        a.addEventListener('click', e => {
                const href  = a.getAttribute('href') || '';
                const [, hash] = href.split('#');
                if (!hash) return;
                if (location.href.includes('community.html')) {
                    const btn = document.querySelector(`#commTabs .tab-btn[data-key="${hash}"]`);
                    if (btn) { e.preventDefault(); btn.click(); }
                }
            if (location.href.includes('recommend.html')) {
                const btn = document.querySelector(`#recTabs .tab-btn[data-key="${hash}"]`);
                if (btn) { e.preventDefault(); btn.click(); }
            }
        if (location.href.includes('materials.html')) {
            const btn = document.querySelector(`#matTabs .tab-btn[data-key="${hash}"]`);
            if (btn) { e.preventDefault(); btn.click(); }
        }
        if (location.href.includes('mypage.html') && typeof loadMainTab === 'function') {
            if (['library', 'info', 'borrow', 'request'].includes(hash)) {
                e.preventDefault();
                loadMainTab(hash);
            }
        }
});
});
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
푸터 — 원본 로고 (필터 없음)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function renderFooter() {
    document.getElementById('footer-placeholder').outerHTML = `
    <footer>
    <div class="footer-inner">
    <div class="footer-top">
    <div class="footer-logo-col">
    <img src="${ROOT}images/logo2.png" alt="동양미래대학교" class="footer-logo-img">
    <div class="f-addr">
    08221 서울특별시 구로구 경인로 445 (고척 62-160) 동양미래대학교<br>
    TEL. 02)2610-1726 &nbsp;/&nbsp; FAX. 02)2610-1733
</div>
</div>
<div>
<div class="f-col-tit">자료 이용</div>
<ul class="f-links">
<li><a href="${ROOT}pages/materials.html">통합 자료 검색</a></li>
<li><a href="${ROOT}pages/materials.html#loan">도서 대출 · 반납</a></li>
<li><a href="${ROOT}pages/materials.html#request">도서 구입 신청</a></li>
<li><a href="${ROOT}pages/materials.html#new">신작 도서 안내</a></li>
</ul>
</div>
<div>
<div class="f-col-tit">추천 도서</div>
<ul class="f-links">
<li><a href="${ROOT}pages/recommend.html#week">금주의 추천 도서</a></li>
<li><a href="${ROOT}pages/recommend.html#genre">장르별 추천</a></li>
<li><a href="${ROOT}pages/recommend.html#curator">사서 추천 도서</a></li>
<li><a href="${ROOT}pages/recommend.html#best">베스트 대출</a></li>
</ul>
</div>
<div>
<div class="f-col-tit">시설 이용 · 커뮤니티</div>
<ul class="f-links">
<li><a href="${ROOT}pages/facility.html">시설 예약</a></li>
<li><a href="${ROOT}pages/floormap.html">층별 안내도</a></li>
<li><a href="${ROOT}pages/community.html#notice">공지사항</a></li>
<li><a href="${ROOT}pages/community.html#faq">F&amp;Q</a></li>
</ul>
</div>
</div>
<div class="footer-bottom">
<span>COPYRIGHT &copy; DONGYANG MIRAE UNIVERSITY. ALL RIGHTS RESERVED.</span>
</div>
</div>
</footer>`;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
슬라이드쇼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.hdot');
    if (!slides.length) return;
    let cur = 0, timer;
    const go = n => {
        slides[cur].classList.remove('on'); dots[cur].classList.remove('on');
        cur = (n + slides.length) % slides.length;
        slides[cur].classList.add('on');   dots[cur].classList.add('on');
    };
dots.forEach(d => d.addEventListener('click', () => {
            clearInterval(timer); go(+d.dataset.i);
            timer = setInterval(() => go(cur + 1), 5500);
}));
timer = setInterval(() => go(cur + 1), 5500);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
책 표지 로드
localSrc 있으면 로컬 이미지 우선 사용,
없으면 Open Library API 시도
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
async function loadCover(el, localSrc, query) {
    if (!el) return;

    /* 1) 로컬 이미지 우선 */
    if (localSrc) {
        const img = new Image();
        img.onload = () => applyCover(el, localSrc);
        img.onerror = () => { if (query) fetchOpenLibCover(el, query); };
        img.src = localSrc;
        return;
    }

/* 2) Open Library fallback */
if (query) fetchOpenLibCover(el, query);
}

async function fetchOpenLibCover(el, query) {
    try {
        const r = await fetch(
            `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1&fields=cover_i`
        );
    const d = await r.json();
    const id = d.docs?.[0]?.cover_i;
    if (id) applyCover(el, `https://covers.openlibrary.org/b/id/${id}-M.jpg`);
} catch {}
}

function applyCover(el, src) {
    if (el.tagName === 'IMG') {
        el.src = src;
    } else {
    el.style.background = `url(${src}) center/cover no-repeat`;
    el.textContent = '';
}
}

/* 하위 호환 — fetchCover(query, el) 형태도 지원 */
async function fetchCover(query, el) {
    fetchOpenLibCover(el, query);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
범용 탭 초기화
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function initTabs(containerSel, btnSel, onSwitch) {
    const c = document.querySelector(containerSel);
    if (!c) return;
    c.querySelectorAll(btnSel).forEach(btn =>
        btn.addEventListener('click', () => {
                c.querySelectorAll(btnSel).forEach(x => x.classList.remove('on'));
                btn.classList.add('on');
                onSwitch(btn.dataset.key || btn.dataset.t || btn.dataset.g);
        })
);
}
