const squad = []; // {player, captain:bool, vice:bool}
let captainIdx = -1;
let viceIdx = -1;

const $ = (sel) => document.querySelector(sel);

function initTeamSelects() {
  const a = $('#team-a'), b = $('#team-b');
  TEAMS.forEach((t) => {
    a.appendChild(new Option(t, t));
    b.appendChild(new Option(t, t));
  });
  a.value = FEATURED_MATCH.teamA;
  b.value = FEATURED_MATCH.teamB;
}

function currentBudget() {
  return Number($('#budget-input').value) || BUDGET_DEFAULT;
}

function poolPlayers() {
  const search = $('#search-input').value.trim().toLowerCase();
  const posFilter = $('#pos-filter').value;
  const matchOnly = $('#match-only-toggle').checked;
  const teamA = $('#team-a').value, teamB = $('#team-b').value;

  return PLAYERS.filter((p) => {
    if (matchOnly && p.team !== teamA && p.team !== teamB) return false;
    if (posFilter && p.pos !== posFilter) return false;
    if (search && !p.name.toLowerCase().includes(search)) return false;
    return true;
  });
}

function isInSquad(player) {
  return squad.some((s) => s.player.name === player.name);
}

function renderPool() {
  const tbody = $('#pool-table tbody');
  tbody.innerHTML = '';
  poolPlayers().forEach((p) => {
    const tr = document.createElement('tr');
    const already = isInSquad(p);
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.team}</td>
      <td>${p.pos}</td>
      <td>${p.price.toFixed(1)}</td>
      <td>${p.points}</td>
      <td><button class="add-btn" ${already ? 'disabled' : ''}>${already ? 'В составе' : 'Добавить'}</button></td>
    `;
    tr.querySelector('button').addEventListener('click', () => addToSquad(p));
    tbody.appendChild(tr);
  });
}

function addToSquad(player) {
  if (isInSquad(player)) return;
  if (squad.length >= 15) {
    alert('Состав уже полный (15 игроков).');
    return;
  }
  squad.push({ player });
  renderAll();
}

function removeFromSquad(index) {
  squad.splice(index, 1);
  if (captainIdx === index) captainIdx = -1;
  if (viceIdx === index) viceIdx = -1;
  if (captainIdx > index) captainIdx--;
  if (viceIdx > index) viceIdx--;
  renderAll();
}

function setCaptain(index) {
  captainIdx = captainIdx === index ? -1 : index;
  if (captainIdx === viceIdx) viceIdx = -1;
  renderAll();
}

function setVice(index) {
  viceIdx = viceIdx === index ? -1 : index;
  if (viceIdx === captainIdx) captainIdx = -1;
  renderAll();
}

function renderSquad() {
  const tbody = $('#squad-table tbody');
  tbody.innerHTML = '';
  squad.forEach((s, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.player.name}</td>
      <td>${s.player.team}</td>
      <td>${s.player.pos}</td>
      <td>${s.player.price.toFixed(1)}</td>
      <td><button class="cap-btn ${captainIdx === i ? 'active' : ''}">C</button></td>
      <td><button class="cap-btn ${viceIdx === i ? 'active' : ''}">VC</button></td>
      <td><button class="rm-btn">✕</button></td>
    `;
    const [capBtn, viceBtn, rmBtn] = tr.querySelectorAll('button');
    capBtn.addEventListener('click', () => setCaptain(i));
    viceBtn.addEventListener('click', () => setVice(i));
    rmBtn.addEventListener('click', () => removeFromSquad(i));
    tbody.appendChild(tr);
  });

  $('#squad-count').textContent = squad.length;

  const spent = squad.reduce((sum, s) => sum + s.player.price, 0);
  const budget = currentBudget();
  $('#spent').textContent = spent.toFixed(1);
  $('#budget-total').textContent = budget.toFixed(1);
  const pct = Math.min(100, (spent / budget) * 100);
  const fill = $('#bar-fill');
  fill.style.width = pct + '%';
  fill.classList.toggle('over', spent > budget);

  const counts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
  squad.forEach((s) => counts[s.player.pos]++);
  const status = $('#formation-status');
  status.innerHTML = Object.keys(FORMATION)
    .map((pos) => {
      const ok = counts[pos] === FORMATION[pos];
      return `<span class="${ok ? 'ok' : 'bad'}">${pos}: ${counts[pos]}/${FORMATION[pos]}</span>`;
    })
    .join('');
}

function renderForecastLabel() {
  $('#forecast-match').textContent = `${$('#team-a').value} vs ${$('#team-b').value}`;
}

function computeForecast() {
  const teamA = $('#team-a').value, teamB = $('#team-b').value;
  const relevant = squad.filter((s) => s.player.team === teamA || s.player.team === teamB);

  if (relevant.length === 0) {
    $('#forecast-result').innerHTML = `<p style="color:var(--muted)">В составе нет игроков из выбранного матча — прогноз недоступен. Добавьте игроков ${teamA} или ${teamB}.</p>`;
    return;
  }

  let base = 0;
  relevant.forEach((s, idx) => {
    const globalIdx = squad.indexOf(s);
    let mult = 1;
    if (globalIdx === captainIdx) mult = 2;
    if (globalIdx === viceIdx) mult = 1.5;
    base += (s.player.points / 5) * mult; // /5 ~ approximate per-match share of season points
  });

  const pessimistic = Math.round(base * 0.7);
  const optimistic = Math.round(base * 1.35);
  const mid = Math.round(base);

  $('#forecast-result').innerHTML = `
    <p>Оценочный прогноз очков за матч по игрокам из состава: <span class="range">${pessimistic}–${optimistic}</span> (база: ${mid})</p>
    <ul>
      <li>Диапазон рассчитан из демо-очков игроков за матч, без учёта реальных news/травм (данные примерные).</li>
      <li>Капитан удваивает очки, вице — ×1.5, если назначены.</li>
      <li>Факторы риска: изменение состава перед матчем, форма игрока, тактика соперника — не учтены в демо-модели.</li>
    </ul>
  `;
}

function renderAll() {
  renderPool();
  renderSquad();
  renderForecastLabel();
}

initTeamSelects();
['team-a', 'team-b', 'match-only-toggle', 'search-input', 'pos-filter'].forEach((id) => {
  $('#' + id).addEventListener('input', renderAll);
});
$('#budget-input').addEventListener('input', renderSquad);
$('#forecast-btn').addEventListener('click', computeForecast);

renderAll();
