/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   메인 페이지 전용 JS  (index.js)
   책 데이터는 js/books.js 에서 관리합니다.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

renderHeader();
renderFooter();
initSlideshow();

/* 금주 추천 표지 */
renderBookCover(document.getElementById('wc0'), 'week_1');
renderBookCover(document.getElementById('wc1'), 'week_2');
renderBookCover(document.getElementById('wc2'), 'week_3');

/* ── 신착 / 인기 / 베스트 탭 ── */
const TAB_BOOKS = {
  new:     ['new_1',  'new_2',  'new_3',  'new_4',  'new_5'],
  popular: ['pop_1',  'pop_2',  'pop_3',  'pop_4',  'pop_5'],
  best:    ['best_2', 'best_7', 'best_8', 'economics', 'comfort'],
};

function renderBooks(tab) {
  const grid = document.getElementById('bGrid');
  const keys = TAB_BOOKS[tab];
  grid.innerHTML = keys.map((key, i) => {
    const b = ALL_BOOKS[key];
    return bookCardHTML(b, `bk-${tab}-${i}`);
  }).join('');
  keys.forEach((key, i) => renderBookCover(document.getElementById(`bk-${tab}-${i}`), key));
}

document.querySelectorAll('.btab').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btab').forEach(x => x.classList.remove('on'));
    btn.classList.add('on');
    renderBooks(btn.dataset.t);
  })
);
renderBooks('new');

/* ── 장르별 추천 ── */
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
  const grid = document.getElementById('gGrid');
  const keys = GENRE_KEYS[key] || GENRE_KEYS.all;
  grid.innerHTML = keys.map((k, i) => gbookCardHTML(ALL_BOOKS[k], `gk-${key}-${i}`)).join('');
  keys.forEach((k, i) => renderBookCover(document.getElementById(`gk-${key}-${i}`), k));
}

document.querySelectorAll('#gTabs .gtab').forEach(btn =>
  btn.addEventListener('click', () => {
    document.querySelectorAll('#gTabs .gtab').forEach(x => x.classList.remove('on'));
    btn.classList.add('on');
    renderGenre(btn.dataset.g);
  })
);
renderGenre('all');
