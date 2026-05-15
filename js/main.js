/* HERO SLIDE */
const sls = document.querySelectorAll('.hero-slide');
const hds = document.querySelectorAll('.hdot');
let ci = 0, ht;
function go(n) {
  sls[ci].classList.remove('on'); hds[ci].classList.remove('on');
  ci = (n + sls.length) % sls.length;
  sls[ci].classList.add('on'); hds[ci].classList.add('on');
}
hds.forEach(d => d.addEventListener('click', () => { clearInterval(ht); go(+d.dataset.i); ht = setInterval(() => go(ci+1), 5500); }));
ht = setInterval(() => go(ci+1), 5500);

/* SEARCH TABS */
document.querySelectorAll('.stab').forEach(t => {
  t.addEventListener('click', () => { document.querySelectorAll('.stab').forEach(x => x.classList.remove('on')); t.classList.add('on'); });
});

/* OPEN LIBRARY COVER */
async function fetchCov(q, el) {
  try {
    const r = await fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(q) + '&limit=1&fields=cover_i');
    const d = await r.json();
    if (d.docs?.[0]?.cover_i) el.src = 'https://covers.openlibrary.org/b/id/' + d.docs[0].cover_i + '-M.jpg';
  } catch(e) {}
}
fetchCov('Stolen Focus Johann Hari', document.getElementById('wc0'));
fetchCov('Pachinko Min Jin Lee', document.getElementById('wc1'));
fetchCov('Sapiens Yuval Noah Harari', document.getElementById('wc2'));

/* BOOKS DATA — 국내도서는 플레이스홀더로, 조원이 직접 이미지 교체 */
const BD = {
  new: [
    {t:'돈에 관한 7가지 착각', a:'모건 하우절', ph:'돈에 관한\n7가지 착각', bg:'#2a4a18'},
    {t:'변역문학의 상상력과 동아시아', a:'서울대 출판부', ph:'변역문학의\n상상력과\n동아시아', bg:'#2a1a5a'},
    {t:'다시, 공부머리 독서법', a:'최승필', ph:'다시,\n공부머리\n독서법', bg:'#0a2a5a'},
    {t:'완벽한 패자', a:'스콧 갤러웨이', ph:'완벽한\n패자', bg:'#2c2c2c'},
    {t:'AI in Modern Architecture', a:'Holmes & Robertson', q:'AI architecture design book', ph:'AI in Modern\nArchitecture', bg:'#3d2a0a'},
  ],
  popular: [
    {t:'프로젝트 헤일메리', a:'앤디 위어', q:'Project Hail Mary Andy Weir', ph:'프로젝트\n헤일메리', bg:'#0a1a3d'},
    {t:'Let Them', a:'Mel Robbins', q:'Let Them Theory Mel Robbins', ph:'Let Them', bg:'#0a3d0a'},
    {t:'The Art of Distance', a:'Baltasar Gracian', q:'Art Distance Gracian wisdom', ph:'The Art of\nDistance', bg:'#3d0a2a'},
    {t:'Claude Code 바이블', a:'AI 연구소', ph:'Claude Code\n바이블', bg:'#1a1a3d'},
    {t:'구름 사람들', a:'류시화', ph:'구름\n사람들', bg:'#3d0a0a'},
  ],
  best: [
    {t:'경제학원론', a:'이준구 · 이창용', ph:'경제학원론', bg:'#1a3d1a'},
    {t:'편안함의 습격', a:'마이클 이스터', q:'Comfort Crisis Michael Easter', ph:'편안함의\n습격', bg:'#1a2a5a'},
    {t:'이게 되네? 제미나이', a:'IT 편집부', ph:'이게 되네?\n제미나이', bg:'#3d1a0a'},
    {t:'굿모닝, 미스터 백!', a:'이지아', ph:'굿모닝,\n미스터 백!', bg:'#2a0a3d'},
    {t:'무기화학', a:'Shriver & Atkins', q:'Inorganic Chemistry Shriver Atkins', ph:'무기화학', bg:'#0a0a2a'},
  ],
};

function renderBooks(tab) {
  const g = document.getElementById('bGrid');
  g.innerHTML = BD[tab].map((b,i) => `
    <div class="bk">
      <div class="bk-cover">
        <div class="bk-cover-ph" id="bk-${tab}-${i}" style="background:${b.bg}">${b.ph || b.t}</div>
      </div>
      <div class="bk-info"><div class="bk-title">${b.t}</div><div class="bk-author">${b.a}</div></div>
    </div>
  `).join('');
  BD[tab].forEach((b,i) => {
    if (!b.q) return;
    const ph = document.getElementById('bk-' + tab + '-' + i);
    (async () => {
      try {
        const r = await fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(b.q) + '&limit=1&fields=cover_i');
        const d = await r.json();
        if (d.docs?.[0]?.cover_i) {
          const img = new Image();
          img.onload = () => { ph.style.backgroundImage = 'url(' + img.src + ')'; ph.style.backgroundSize = 'cover'; ph.style.backgroundPosition = 'center'; ph.innerHTML = ''; ph.style.background = 'url(' + img.src + ') center/cover'; };
          img.src = 'https://covers.openlibrary.org/b/id/' + d.docs[0].cover_i + '-M.jpg';
        }
      } catch(e) {}
    })();
  });
}
document.querySelectorAll('.btab').forEach(b => {
  b.addEventListener('click', () => { document.querySelectorAll('.btab').forEach(x => x.classList.remove('on')); b.classList.add('on'); renderBooks(b.dataset.t); });
});
renderBooks('new');

/* GENRE DATA */
const GD = {
  all: [
    {t:'총, 균, 쇠', a:'재레드 다이아몬드', cat:'역사·인문', q:'Guns Germs Steel Diamond', ph:'총, 균, 쇠', bg:'#0a2a0a'},
    {t:'아몬드', a:'손원평', cat:'소설·문학', ph:'아몬드', bg:'#3d0a0a'},
    {t:'클린 코드', a:'Robert C. Martin', cat:'IT·공학', q:'Clean Code Robert Martin', ph:'Clean\nCode', bg:'#0a0a3d'},
    {t:'넛지', a:'리처드 탈러', cat:'경영·경제', q:'Nudge Richard Thaler', ph:'넛지', bg:'#2a1a0a'},
    {t:'코스모스', a:'칼 세이건', cat:'과학·기술', q:'Cosmos Carl Sagan book', ph:'코스모스', bg:'#0a1a3d'},
    {t:'채식주의자', a:'한강', cat:'소설·문학', ph:'채식주의자', bg:'#1a3d0a'},
  ],
  novel: [
    {t:'채식주의자', a:'한강', cat:'소설·문학', ph:'채식주의자', bg:'#1a3d0a'},
    {t:'아몬드', a:'손원평', cat:'소설·문학', ph:'아몬드', bg:'#3d0a0a'},
    {t:'파친코', a:'이민진', cat:'소설·문학', q:'Pachinko Min Jin Lee', ph:'파친코', bg:'#5c2a0a'},
    {t:'82년생 김지영', a:'조남주', cat:'소설·문학', ph:'82년생\n김지영', bg:'#0a2a3d'},
    {t:'데미안', a:'헤르만 헤세', cat:'소설·문학', q:'Demian Hermann Hesse', ph:'데미안', bg:'#1a0a3d'},
    {t:'어린 왕자', a:'생텍쥐페리', cat:'소설·문학', q:'Little Prince Saint Exupery', ph:'어린 왕자', bg:'#0a0a2a'},
  ],
  self: [
    {t:'도둑맞은 집중력', a:'요한 하리', cat:'자기계발', q:'Stolen Focus Johann Hari', ph:'도둑맞은\n집중력', bg:'#163d73'},
    {t:'아토믹 해빗', a:'제임스 클리어', cat:'자기계발', q:'Atomic Habits James Clear', ph:'아토믹\n해빗', bg:'#2a3d0a'},
    {t:'그릿', a:'앤절라 더크워스', cat:'자기계발', q:'Grit Angela Duckworth', ph:'그릿', bg:'#3d1a0a'},
    {t:'미라클 모닝', a:'할 엘로드', cat:'자기계발', q:'Miracle Morning Hal Elrod', ph:'미라클\n모닝', bg:'#0a2a3d'},
    {t:'1만 시간의 재발견', a:'안데르스 에릭슨', cat:'자기계발', q:'Peak Anders Ericsson deliberate practice', ph:'1만 시간의\n재발견', bg:'#1a0a2a'},
    {t:'완벽한 공부법', a:'고영성·신영준', cat:'자기계발', ph:'완벽한\n공부법', bg:'#0a3d2a'},
  ],
  biz: [
    {t:'넛지', a:'리처드 탈러', cat:'경영·경제', q:'Nudge Richard Thaler', ph:'넛지', bg:'#2a1a0a'},
    {t:'제로 투 원', a:'피터 틸', cat:'경영·경제', q:'Zero to One Peter Thiel', ph:'제로 투 원', bg:'#0a0a2a'},
    {t:'린 스타트업', a:'에릭 리스', cat:'경영·경제', q:'Lean Startup Eric Ries', ph:'린\n스타트업', bg:'#1a3d0a'},
    {t:'생각에 관한 생각', a:'다니얼 카너먼', cat:'경영·경제', q:'Thinking Fast Slow Kahneman', ph:'생각에\n관한 생각', bg:'#3d0a2a'},
    {t:'부의 추월차선', a:'엠제이 드마코', ph:'부의\n추월차선', bg:'#0a2a0a'},
    {t:'좋은 기업을 넘어 위대한 기업으로', a:'짐 콜린스', q:'Good to Great Jim Collins', ph:'좋은 기업을\n넘어', bg:'#2a0a3d'},
  ],
  sci: [
    {t:'코스모스', a:'칼 세이건', cat:'과학·기술', q:'Cosmos Carl Sagan', ph:'코스모스', bg:'#0a1a3d'},
    {t:'이기적 유전자', a:'리처드 도킨스', cat:'과학·기술', q:'Selfish Gene Richard Dawkins', ph:'이기적\n유전자', bg:'#0a3d1a'},
    {t:'우리는 모두 별에서 왔다', a:'닐 타이슨', cat:'과학·기술', q:'Astrophysics People Hurry Tyson', ph:'우리는 모두\n별에서 왔다', bg:'#0a0a3d'},
    {t:'파인만의 물리학', a:'리처드 파인만', cat:'과학·기술', q:'Feynman Lectures Physics', ph:'파인만의\n물리학', bg:'#3d1a1a'},
    {t:'멀티버스', a:'브라이언 그린', cat:'과학·기술', q:'Hidden Reality Brian Greene', ph:'멀티버스', bg:'#1a0a3d'},
    {t:'AI 슈퍼파워', a:'리카이푸', cat:'과학·기술', q:'AI Superpowers Kai Fu Lee', ph:'AI\n슈퍼파워', bg:'#0a2a3d'},
  ],
  art: [
    {t:'예술가여 무엇이 두려운가', a:'데이비드 베일스', cat:'예술·디자인', q:'Art Fear David Bayles', ph:'예술가여\n무엇이\n두려운가', bg:'#3d0a3d'},
    {t:'훔쳐라, 아티스트처럼', a:'오스틴 클레온', cat:'예술·디자인', q:'Steal Like Artist Austin Kleon', ph:'훔쳐라,\n아티스트처럼', bg:'#1a3d0a'},
    {t:'디자인 씽킹', a:'팀 브라운', cat:'예술·디자인', q:'Design Thinking Tim Brown IDEO', ph:'디자인\n씽킹', bg:'#0a1a3d'},
    {t:'감각의 박물학', a:'다이앤 애커먼', cat:'예술·디자인', q:'Natural History Senses Ackerman', ph:'감각의\n박물학', bg:'#2a0a0a'},
    {t:'피카소처럼 생각하기', a:'마이클 겔브', cat:'예술·디자인', q:'How Think Like Leonardo Vinci Gelb', ph:'피카소처럼\n생각하기', bg:'#0a2a3d'},
    {t:'건축의 즐거움', a:'매튜 프레더릭', cat:'예술·디자인', q:'101 Things Learned Architecture', ph:'건축의\n즐거움', bg:'#1a0a0a'},
  ],
  hist: [
    {t:'총, 균, 쇠', a:'재레드 다이아몬드', cat:'역사·인문', q:'Guns Germs Steel Diamond', ph:'총, 균, 쇠', bg:'#0a2a0a'},
    {t:'사피엔스', a:'유발 하라리', cat:'역사·인문', q:'Sapiens Yuval Noah Harari', ph:'사피엔스', bg:'#0a3d2a'},
    {t:'어떻게 민주주의는 무너지는가', a:'스티븐 레비츠키', cat:'역사·인문', q:'How Democracies Die Levitsky', ph:'어떻게\n민주주의는\n무너지는가', bg:'#3d0a0a'},
    {t:'정의란 무엇인가', a:'마이클 샌델', cat:'역사·인문', q:'Justice What Right Michael Sandel', ph:'정의란\n무엇인가', bg:'#1a1a3d'},
    {t:'군주론', a:'마키아벨리', cat:'역사·인문', q:'Prince Machiavelli political', ph:'군주론', bg:'#2a1a0a'},
    {t:'역사란 무엇인가', a:'E.H. 카', cat:'역사·인문', q:'What is History EH Carr', ph:'역사란\n무엇인가', bg:'#1a3d3d'},
  ],
  it: [
    {t:'클린 코드', a:'Robert C. Martin', cat:'IT·공학', q:'Clean Code Robert Martin', ph:'Clean\nCode', bg:'#0a0a3d'},
    {t:'해커와 화가', a:'폴 그레이엄', cat:'IT·공학', q:'Hackers Painters Paul Graham', ph:'해커와\n화가', bg:'#2a1a0a'},
    {t:'소프트웨어 장인', a:'산드로 만쿠소', cat:'IT·공학', q:'Software Craftsman Mancuso', ph:'소프트웨어\n장인', bg:'#0a2a1a'},
    {t:'코딩테스트 바이블', a:'나동빈', cat:'IT·공학', ph:'코딩테스트\n바이블', bg:'#3d0a1a'},
    {t:'리팩터링', a:'마틴 파울러', cat:'IT·공학', q:'Refactoring Martin Fowler', ph:'리팩터링', bg:'#1a0a3d'},
    {t:'이것이 자바다', a:'신용권', cat:'IT·공학', ph:'이것이\n자바다', bg:'#0a3d3d'},
  ],
};

function renderGenre(g) {
  const grid = document.getElementById('gGrid');
  const books = GD[g] || GD.all;
  grid.innerHTML = books.map((b,i) => `
    <div class="gbk">
      <div class="gbk-cov">
        <div class="gbk-ph" id="gk-${g}-${i}" style="background:${b.bg}">${b.ph || b.t}</div>
      </div>
      <div class="gbk-info"><div class="gbk-cat">${b.cat||''}</div><div class="gbk-title">${b.t}</div><div class="gbk-author">${b.a}</div></div>
    </div>
  `).join('');
  books.forEach((b,i) => {
    if (!b.q) return;
    const ph = document.getElementById('gk-' + g + '-' + i);
    (async () => {
      try {
        const r = await fetch('https://openlibrary.org/search.json?q=' + encodeURIComponent(b.q) + '&limit=1&fields=cover_i');
        const d = await r.json();
        if (d.docs?.[0]?.cover_i) {
          ph.style.backgroundImage = 'none';
          ph.style.background = 'url(https://covers.openlibrary.org/b/id/' + d.docs[0].cover_i + '-M.jpg) center/cover';
          ph.innerHTML = '';
        }
      } catch(e) {}
    })();
  });
}
document.querySelectorAll('#gTabs .gtab').forEach(b => {
  b.addEventListener('click', () => { document.querySelectorAll('#gTabs .gtab').forEach(x => x.classList.remove('on')); b.classList.add('on'); renderGenre(b.dataset.g); });
});
renderGenre('all');
