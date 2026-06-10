renderHeader('시설이용');
renderFooter();

/* ── 탭 전환 ── */
document.querySelectorAll('#facTabs .tab-btn').forEach(btn =>
    btn.addEventListener('click', () => {
        document.querySelectorAll('#facTabs .tab-btn').forEach(x => x.classList.remove('on'));
        btn.classList.add('on');
        document.getElementById('tab-reserve').style.display = btn.dataset.key === 'reserve' ? 'block' : 'none';
        document.getElementById('tab-history').style.display  = btn.dataset.key === 'history'  ? 'block' : 'none';
    })
);

/* ── 상태 ── */
const TIMES = [
    '09:00~10:00','10:00~11:00','11:00~12:00','12:00~13:00',
    '13:00~14:00','14:00~15:00','15:00~16:00','16:00~17:00','17:00~18:00'
];
let currentRoom = { floor:1, room:1, name:'1층 스터디룸 1 (D_Study)' };
let selectedSlots = new Set(); /* "날짜|시간" */
let reservedSlots = {}; /* key: "floor|room|날짜|시간" */
let historyList   = [];
let historySeq    = 1;

/* 오늘 날짜로 초기화 */
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
document.getElementById('bookingDate').value = todayStr;
document.getElementById('bookingDate').min   = todayStr;

/* ── 룸 선택 ── */
function selectRoom(btn) {
    document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const floor = +btn.dataset.floor;
    const room  = +btn.dataset.room;
    const floorLabel = floor === 1 ? '(D_Study)' : '';
    currentRoom = { floor, room, name: `${floor}층 스터디룸 ${room} ${floorLabel}`.trim() };
    document.getElementById('bookingRoomName').textContent = currentRoom.name;
    selectedSlots.clear();
    renderTimetable();
    updateSelInfo();
}

/* ── 시간표 렌더링 ── */
function renderTimetable() {
    const date = document.getElementById('bookingDate').value;
    const head = document.getElementById('ttHead');
    const body = document.getElementById('ttBody');
    head.innerHTML = `<tr><th style="width:50px;">구분</th>${TIMES.map(t=>`<th>${t}</th>`).join('')}</tr>`;
    const key   = r => `${currentRoom.floor}|${currentRoom.room}|${date}|${r}`;
    const selKey = r => `${date}|${r}`;
    body.innerHTML = `
    <tr>
    <td style="background:var(--bg);font-size:12px;font-weight:700;color:var(--text2);padding:0 8px;">예약</td>
    ${TIMES.map(t => {
        const reserved = reservedSlots[key(t)];
        const selected = selectedSlots.has(selKey(t));
        const cls = reserved ? 'reserved' : selected ? 'selected' : 'available';
        const txt = reserved ? '예약됨' : selected ? '선택됨' : '가능';
        return `<td><button class="slot-btn ${cls}" onclick="toggleSlot('${t}')" ${reserved?'disabled':''}>${txt}</button></td>`;
    }).join('')}
    </tr>`;
}

document.getElementById('bookingDate').addEventListener('change', () => {
    selectedSlots.clear();
    renderTimetable();
    updateSelInfo();
});

/* ── 슬롯 토글 ── */
function toggleSlot(time) {
    const date = document.getElementById('bookingDate').value;
    const k = `${date}|${time}`;
    if (selectedSlots.has(k)) selectedSlots.delete(k);
    else selectedSlots.add(k);
    renderTimetable();
    updateSelInfo();
}

function updateSelInfo() {
    const el = document.getElementById('selInfo');
    if (selectedSlots.size === 0) {
        el.innerHTML = '선택된 시간대 없음';
    } else {
        const date = document.getElementById('bookingDate').value;
        const times = [...selectedSlots].map(k => k.replace(date+'|','')).join(', ');
        el.innerHTML = `<strong>${currentRoom.name}</strong> · ${date} · ${times}`;
    }
}

/* ── 모달 ── */
function openModal() {
    if (selectedSlots.size === 0) { alert('예약할 시간대를 선택하세요.'); return; }
    const date  = document.getElementById('bookingDate').value;
    const times = [...selectedSlots].map(k=>k.replace(date+'|','')).join(', ');
    document.getElementById('modalInfo').innerHTML =
    `<strong>시설명</strong> &nbsp; ${currentRoom.name}<br>
    <strong>예약일</strong> &nbsp; ${date}<br>
    <strong>시간</strong> &nbsp;&nbsp;&nbsp; ${times}`;
    document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); }

function confirmReserve() {
    const date  = document.getElementById('bookingDate').value;
    const times = [...selectedSlots].map(k=>k.replace(date+'|',''));
    /* 예약됨으로 등록 */
    times.forEach(t => {
        reservedSlots[`${currentRoom.floor}|${currentRoom.room}|${date}|${t}`] = true;
    });
    /* 내역 추가 */
    historyList.unshift({
        no: historySeq++,
        name: currentRoom.name,
        date,
        times: times.join(', '),
        status: '예약완료',
    });
    renderHistory();
    selectedSlots.clear();
    renderTimetable();
    updateSelInfo();
    closeModal();
    alert('예약이 완료되었습니다.');
}

function renderHistory() {
    const tbody = document.getElementById('historyTbody');
    if (historyList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2.5rem;color:var(--text3);font-size:13.5px;">신청 내역이 없습니다.</td></tr>';
        return;
    }
    tbody.innerHTML = historyList.map(h => `
    <tr>
    <td style="text-align:center;color:var(--text3)">${h.no}</td>
    <td>${h.name}</td>
    <td style="text-align:center">${h.date}</td>
    <td style="text-align:center">${h.times}</td>
    <td style="text-align:center"><span class="status-badge ${h.status==='예약완료'?'sb-ok':'sb-cancel'}">${h.status}</span></td>
    <td style="text-align:center">${h.status==='예약완료'?`<button class="btn-cancel-sm" onclick="cancelReserve(${h.no})">취소</button>`:'-'}</td>
    </tr>`).join('');
}

function cancelReserve(no) {
    if (!confirm('예약을 취소하시겠습니까?')) return;
    const h = historyList.find(x=>x.no===no);
    if (!h) return;
    h.status = '취소됨';
    /* reservedSlots에서 제거 */
    h.times.split(', ').forEach(t => {
        const rk = `${currentRoom.floor}|${currentRoom.room}|${h.date}|${t}`;
        delete reservedSlots[rk];
    });
    renderHistory();
    renderTimetable();
}

renderTimetable();
