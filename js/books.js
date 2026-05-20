/* ═══════════════════════════════════════════════════════════════
   books.js  —  동양미래대학교 도서관 전체 책 데이터 중앙 관리

   ★ 책 표지 이미지 교체 방법 ★
   ────────────────────────────────────────────────────────────
   1. library/images/books/ 폴더에 표지 이미지 파일을 넣습니다.
      권장 크기: 160 × 230 px (2:3 비율), JPG 또는 PNG

   2. 아래 데이터에서 해당 책의 img 값을 파일명으로 지정합니다.
      예)  img: 'amond.jpg'

   3. img 값이 있으면 images/books/[파일명] 을 표지로 사용합니다.
      img 값이 없거나 파일이 없으면 Open Library API로 자동 대체.

   ★ 이 파일 하나만 수정하면 사이트 전체에 반영됩니다 ★
═══════════════════════════════════════════════════════════════ */

/* ROOT 경로 자동 감지 (index.html / pages/*.html 모두 대응) */
const BOOKS_ROOT = (() =>
  location.pathname.includes('/pages/') ? '../' : './'
)();

/* ───────────────────────────────────────────────────────────
   전체 책 목록
   img  : images/books/ 안의 파일명  (직접 첨부 표지)
   q    : Open Library 검색어        (img 없을 때 자동 검색)
   bg   : 표지 없을 때 배경색
─────────────────────────────────────────────────────────── */
const ALL_BOOKS = {

  /* ── 금주의 추천 ─────────────────────────────────── */
  week_1: { t:'도둑맞은 집중력',  a:'요한 하리',     img:'stolen_focus.jpg',  q:'Stolen Focus Johann Hari',   bg:'#163d73',
             cat:'자기계발', tags:['사회과학','자기계발','미디어비평'],
             desc:'스마트폰과 SNS가 지배하는 시대, 우리의 집중력은 왜 무너졌을까? 집중력 위기의 진짜 원인을 파헤친 화제의 책.' },
  week_2: { t:'파친코',           a:'이민진',         img:'pachinko.jpg',       q:'Pachinko Min Jin Lee',       bg:'#5c2a0a',
             cat:'소설·문학', tags:['소설','역사'] },
  week_3: { t:'사피엔스',         a:'유발 하라리',    img:'sapiens.jpg',        q:'Sapiens Yuval Noah Harari',  bg:'#0a3d2a',
             cat:'역사·인문', tags:['역사','인문'] },
  week_4: { t:'개인적인 체험',           a:'오에 겐자부로',         img:'amond.jpg',          bg:'#3d0a0a',
             cat:'소설·문학', tags:['소설','한국문학'] },
  week_5: { t:'채식주의자',       a:'한강',           img:'vegetarian.jpg',     bg:'#1a3d0a',
             cat:'소설·문학', tags:['소설','한국문학'] },
  week_6: { t:'정의란 무엇인가',  a:'마이클 샌델',    img:'justice.jpg',        q:'Justice What Right Sandel',  bg:'#1a1a3d',
             cat:'역사·인문', tags:['철학','정치'] },

  /* ── 신착 도서 ───────────────────────────────────── */
  new_1: { t:'돈에 관한 7가지 착각',        a:'모건 하우절',       img:'psychology_money.jpg', q:'psychology of money Morgan Housel', bg:'#1a3a10' },
  new_2: { t:'번역문학의 상상력과 동아시아', a:'서울대 출판부',      img:'asian_lit.jpg',                                               bg:'#2a1a5a' },
  new_3: { t:'다시, 공부머리 독서법',        a:'최승필',             img:'study_reading.jpg',                                           bg:'#0a2a5a' },
  new_4: { t:'부의 공식',                  a:'스콧 갤러웨이',      img:'galloway.jpg',        q:'algebra of wealth Scott Galloway',  bg:'#2c2c2c' },
  new_5: { t:'나의 개인주의 외 (리커버)',   a:'나쓰메 소세키', img:'ai_arch.jpg',         q:'AI architecture design modern',     bg:'#3d2a0a' },

  /* ── 인기 도서 ───────────────────────────────────── */
  pop_1: { t:'프로젝트 헤일메리', a:'앤디 위어',   img:'hail_mary.jpg',  q:'Project Hail Mary Andy Weir',  bg:'#0a1a3d' },
  pop_2: { t:'침묵',           a:'엔도 슈사쿠', img:'let_them.jpg',   q:'Let Them Theory Mel Robbins',  bg:'#0a3d0a' },
  pop_3: { t:'개인적인 체험',             a:'오에 겐자부로',      img:'amond.jpg',                                         bg:'#3d0a0a' },
  pop_4: { t:'채식주의자',         a:'한강',        img:'vegetarian.jpg',                                    bg:'#1a3d0a' },
  pop_5: { t:'모순',               a:'양귀자',      img:'moson.jpg',                                         bg:'#0a2a3d' },

  /* ── 베스트 대출 ─────────────────────────────────── */
  best_1:  { t:'도둑맞은 집중력',  a:'요한 하리',      img:'stolen_focus.jpg',  q:'Stolen Focus Johann Hari',       bg:'#163d73' },
  best_2:  { t:'사피엔스',         a:'유발 하라리',     img:'sapiens.jpg',        q:'Sapiens Yuval Noah Harari',      bg:'#0a3d2a' },
  best_3:  { t:'개인적인 체험',           a:'오에 겐자부로',          img:'amond.jpg',                                               bg:'#3d0a0a' },
  best_4:  { t:'채식주의자',       a:'한강',            img:'vegetarian.jpg',                                          bg:'#1a3d0a' },
  best_5:  { t:'파친코',           a:'이민진',          img:'pachinko.jpg',       q:'Pachinko Min Jin Lee',           bg:'#5c2a0a' },
  best_6:  { t:'정의란 무엇인가',  a:'마이클 샌델',     img:'justice.jpg',        q:'Justice What Right Sandel',      bg:'#1a1a3d' },
  best_7:  { t:'클린 코드',        a:'Robert C. Martin',img:'clean_code.jpg',     q:'Clean Code Robert Martin',       bg:'#0a0a3d' },
  best_8:  { t:'넛지',             a:'리처드 탈러',      img:'nudge.jpg',          q:'Nudge Richard Thaler',           bg:'#2a1a0a' },
  best_9:  { t:'모순',             a:'양귀자',           img:'moson.jpg',                                               bg:'#0a2a3d' },
  best_10: { t:'코스모스',         a:'칼 세이건',        img:'cosmos.jpg',         q:'Cosmos Carl Sagan',              bg:'#0a1a3d' },

  /* ── 경제학원론 (베스트 리스트에도 포함) ─────────── */
  economics: { t:'경제학원론',      a:'이준구 · 이창용', img:'economics.jpg',                                bg:'#1a3d1a' },
  comfort:   { t:'편안함의 습격',   a:'마이클 이스터',   img:'comfort.jpeg',    q:'Comfort Crisis Michael Easter', bg:'#1a2a5a' },

  /* ── 사서 추천 ───────────────────────────────────── */
  cur_1: { t:'도둑맞은 집중력', a:'요한 하리',    img:'stolen_focus.jpg', q:'Stolen Focus Johann Hari',    bg:'#163d73',
           by:'자료서비스팀 김○○ 사서',
           curDesc:'디지털 시대를 살아가는 학생들에게 꼭 필요한 책입니다. 집중력 문제를 개인 의지가 아닌 사회 구조로 바라보는 시각이 신선합니다.' },
  cur_2: { t:'사피엔스',        a:'유발 하라리',  img:'sapiens.jpg',      q:'Sapiens Yuval Noah Harari',   bg:'#0a3d2a',
           by:'정보봉사팀 이○○ 사서',
           curDesc:'인류의 역사를 이처럼 흥미롭게 풀어낸 책은 드뭅니다. 전공과 무관하게 모든 대학생에게 읽어보길 권장합니다.' },
  cur_3: { t:'정의란 무엇인가', a:'마이클 샌델', img:'justice.jpg',      q:'Justice What Right Sandel',   bg:'#1a1a3d',
           by:'학술정보팀 박○○ 사서',
           curDesc:'복잡한 철학적 개념을 실제 사례로 풀어내는 샌델 교수의 강의를 책으로 만나보세요. 사회 이슈를 바라보는 눈이 달라집니다.' },

  /* ── 장르별: 소설·문학 ───────────────────────────── */
  g_novel_1: { t:'채식주의자',  a:'한강',        cat:'소설·문학', img:'vegetarian.jpg',                            bg:'#1a3d0a' },
  g_novel_2: { t:'개인적인 체험',      a:'오에 겐자부로',      cat:'소설·문학', img:'amond.jpg',                                 bg:'#3d0a0a' },
  g_novel_3: { t:'파친코',      a:'이민진',      cat:'소설·문학', img:'pachinko.jpg',   q:'Pachinko Min Jin Lee',  bg:'#5c2a0a' },
  g_novel_4: { t:'모순',        a:'양귀자',      cat:'소설·문학', img:'moson.jpg',                                 bg:'#0a2a3d' },
  g_novel_5: { t:'데미안',      a:'헤르만 헤세', cat:'소설·문학', img:'demian.jpg',     q:'Demian Hermann Hesse',  bg:'#1a0a3d' },
  g_novel_6: { t:'해변의 카프카(상)',   a:'무라마키 하루키',  cat:'소설·문학', img:'prince.jpg',     q:'Little Prince Saint',   bg:'#0a0a2a' },

  /* ── 장르별: 자기계발 ────────────────────────────── */
  g_self_1: { t:'도둑맞은 집중력',  a:'요한 하리',       cat:'자기계발', img:'stolen_focus.jpg', q:'Stolen Focus Johann Hari',   bg:'#163d73' },
  g_self_2: { t:'아토믹 해빗',      a:'제임스 클리어',    cat:'자기계발', img:'atomic.jpg',       q:'Atomic Habits James Clear',  bg:'#2a3d0a' },
  g_self_3: { t:'그릿',             a:'앤절라 더크워스',  cat:'자기계발', img:'grit.jpg',         q:'Grit Angela Duckworth',      bg:'#3d1a0a' },
  g_self_4: { t:'미라클 모닝',      a:'할 엘로드',        cat:'자기계발', img:'miracle.jpg',      q:'Miracle Morning Hal Elrod',  bg:'#0a2a3d' },
  g_self_5: { t:'1만 시간의 재발견',a:'안데르스 에릭슨',  cat:'자기계발', img:'peak.jpg',         q:'Peak Anders Ericsson',       bg:'#1a0a2a' },
  g_self_6: { t:'완벽한 공부법',    a:'고영성·신영준',    cat:'자기계발', img:'study.jpg',                                         bg:'#0a3d2a' },

  /* ── 장르별: 경영·경제 ───────────────────────────── */
  g_biz_1: { t:'넛지',             a:'리처드 탈러',  cat:'경영·경제', img:'nudge.jpg',    q:'Nudge Richard Thaler',        bg:'#2a1a0a' },
  g_biz_2: { t:'제로 투 원',       a:'피터 틸',      cat:'경영·경제', img:'zero.jpg',     q:'Zero to One Peter Thiel',     bg:'#0a0a2a' },
  g_biz_3: { t:'린 스타트업',      a:'에릭 리스',    cat:'경영·경제', img:'lean.jpg',     q:'Lean Startup Eric Ries',      bg:'#1a3d0a' },
  g_biz_4: { t:'생각에 관한 생각', a:'다니얼 카너먼', cat:'경영·경제', img:'think.jpg',    q:'Thinking Fast Slow Kahneman', bg:'#3d0a2a' },
  g_biz_5: { t:'부의 추월차선',    a:'엠제이 드마코', cat:'경영·경제', img:'fastlane.jpg',                                  bg:'#0a2a0a' },
  g_biz_6: { t:'좋은 기업을 넘어', a:'짐 콜린스',    cat:'경영·경제', img:'good.jpg',     q:'Good to Great Jim Collins',   bg:'#2a0a3d' },

  /* ── 장르별: 과학·기술 ───────────────────────────── */
  g_sci_1: { t:'코스모스',              a:'칼 세이건',    cat:'과학·기술', img:'cosmos.jpg',     q:'Cosmos Carl Sagan',            bg:'#0a1a3d' },
  g_sci_2: { t:'이기적 유전자',         a:'리처드 도킨스', cat:'과학·기술', img:'selfish.jpg',    q:'Selfish Gene Richard Dawkins', bg:'#0a3d1a' },
  g_sci_3: { t:'우리는 모두 별에서 왔다',a:'닐 타이슨',   cat:'과학·기술', img:'astro.jpg',      q:'Astrophysics People Hurry',    bg:'#0a0a3d' },
  g_sci_4: { t:'파인만의 물리학 길라잡이',       a:'리처드 파인만', cat:'과학·기술', img:'feynman.jpg',    q:'Feynman Lectures Physics',     bg:'#3d1a1a' },
  g_sci_5: { t:'멀티 유니버스',              a:'브라이언 그린', cat:'과학·기술', img:'multiverse.jpg', q:'Hidden Reality Brian Greene',  bg:'#1a0a3d' },
  g_sci_6: { t:'AI 슈퍼파워',           a:'리카이푸',      cat:'과학·기술', img:'ai_super.jpg',   q:'AI Superpowers Kai Fu Lee',    bg:'#0a2a3d' },

  /* ── 장르별: 예술·디자인 ─────────────────────────── */
  g_art_1: { t:'예술가여 무엇이 두려운가', a:'데이비드 베일스', cat:'예술·디자인', img:'artfear.jpeg',  q:'Art Fear David Bayles',      bg:'#3d0a3d' },
  g_art_2: { t:'훔쳐라, 아티스트처럼',     a:'오스틴 클레온',   cat:'예술·디자인', img:'steal.jpg',    q:'Steal Like Artist Kleon',    bg:'#1a3d0a' },
  g_art_3: { t:'디자인 씽킹',              a:'팀 브라운',        cat:'예술·디자인', img:'design.jpg',   q:'Design Thinking Tim Brown',  bg:'#0a1a3d' },
  g_art_4: { t:'감각의 박물학',            a:'다이앤 애커먼',    cat:'예술·디자인', img:'senses.jpeg',   q:'Natural History Senses',     bg:'#2a0a0a' },
  g_art_5: { t:'피카소처럼 생각하라',      a:'오가와 히토시',      cat:'예술·디자인', img:'picasso.jpg',  q:'How Think Like Leonardo',    bg:'#0a2a3d' },
  g_art_6: { t:'건축학입문',            a:'매튜 프레더릭',    cat:'예술·디자인', img:'arch.jpeg',     q:'101 Things Architecture',    bg:'#1a0a0a' },

  /* ── 장르별: 역사·인문 ───────────────────────────── */
  g_hist_1: { t:'총, 균, 쇠',                 a:'재레드 다이아몬드', cat:'역사·인문', img:'guns.jpg',    q:'Guns Germs Steel Diamond',   bg:'#0a2a0a' },
  g_hist_2: { t:'사피엔스',                    a:'유발 하라리',       cat:'역사·인문', img:'sapiens.jpg', q:'Sapiens Yuval Noah Harari',  bg:'#0a3d2a' },
  g_hist_3: { t:'어떻게 민주주의는 무너지는가',a:'스티븐 레비츠키',   cat:'역사·인문', img:'demo.jpg',    q:'How Democracies Die',        bg:'#3d0a0a' },
  g_hist_4: { t:'정의란 무엇인가',             a:'마이클 샌델',       cat:'역사·인문', img:'justice.jpg', q:'Justice What Right Sandel',  bg:'#1a1a3d' },
  g_hist_5: { t:'군주론',                      a:'마키아벨리',        cat:'역사·인문', img:'prince2.jpg', q:'Prince Machiavelli',         bg:'#2a1a0a' },
  g_hist_6: { t:'역사란 무엇인가',             a:'E.H. 카',           cat:'역사·인문', img:'history.jpg', q:'What is History EH Carr',    bg:'#1a3d3d' },

  /* ── 장르별: IT·공학 ─────────────────────────────── */
  g_it_1: { t:'클린 코드',        a:'Robert C. Martin', cat:'IT·공학', img:'clean_code.jpg',  q:'Clean Code Robert Martin',    bg:'#0a0a3d' },
  g_it_2: { t:'해커와 화가',      a:'폴 그레이엄',       cat:'IT·공학', img:'hackers.jpg',     q:'Hackers Painters Paul Graham', bg:'#2a1a0a' },
  g_it_3: { t:'소프트웨어 장인',  a:'산드로 만쿠소',     cat:'IT·공학', img:'craftsman.jpg',   q:'Software Craftsman Mancuso',  bg:'#0a2a1a' },
  g_it_4: { t:'이것이 코딩 테스트다',a:'나동빈',             cat:'IT·공학', img:'coding_test.jpg',                                  bg:'#3d0a1a' },
  g_it_5: { t:'리팩터링',         a:'마틴 파울러',        cat:'IT·공학', img:'refactor.jpg',    q:'Refactoring Martin Fowler',   bg:'#1a0a3d' },
  g_it_6: { t:'이것이 자바다',    a:'신용권',             cat:'IT·공학', img:'java.jpg',                                         bg:'#0a3d3d' },

};

/* ───────────────────────────────────────────────────────────
   표지 로딩 함수
   el       : 표지를 넣을 DOM 엘리먼트 (div 또는 img)
   bookKey  : ALL_BOOKS 의 키
─────────────────────────────────────────────────────────── */
function renderBookCover(el, bookKey) {
  if (!el) return;
  const book = ALL_BOOKS[bookKey];
  if (!book) return;

  if (book.img) {
    const src = BOOKS_ROOT + 'images/books/' + book.img;
    const probe = new Image();
    probe.onload  = () => _applyCover(el, src);
    probe.onerror = () => { if (book.q) _fetchOL(el, book.q); };
    probe.src = src;
  } else if (book.q) {
    _fetchOL(el, book.q);
  }
}

async function _fetchOL(el, query) {
  try {
    const r = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=1&fields=cover_i`);
    const d = await r.json();
    const id = d.docs?.[0]?.cover_i;
    if (id) _applyCover(el, `https://covers.openlibrary.org/b/id/${id}-M.jpg`);
  } catch {}
}

function _applyCover(el, src) {
  if (el.tagName === 'IMG') {
    el.src = src;
  } else {
    el.style.background  = `url(${src}) center/cover no-repeat`;
    el.style.backgroundSize = 'cover';
    el.textContent = '';
  }
}

/* ───────────────────────────────────────────────────────────
   편의 함수 — 책 카드 HTML 생성
   book   : ALL_BOOKS[key]
   idAttr : 생성될 cover div 의 id
─────────────────────────────────────────────────────────── */
function bookCardHTML(book, idAttr) {
  return `
    <div class="book-card">
      <div class="book-cover">
        <div class="book-cover-ph" id="${idAttr}" style="background:${book.bg}">${book.t}</div>
      </div>
      <div class="book-info">
        <div class="book-title">${book.t}</div>
        <div class="book-author">${book.a}</div>
      </div>
    </div>`;
}

function gbookCardHTML(book, idAttr) {
  return `
    <div class="gbk">
      <div class="gbk-cov">
        <div class="gbk-ph" id="${idAttr}" style="background:${book.bg}">${book.t}</div>
      </div>
      <div class="gbk-info">
        <div class="gbk-cat">${book.cat || ''}</div>
        <div class="gbk-title">${book.t}</div>
        <div class="gbk-author">${book.a}</div>
      </div>
    </div>`;
}
