const tg = window.Telegram && Telegram.WebApp;
if (tg) { tg.ready(); tg.expand(); tg.setHeaderColor('#141414'); tg.setBackgroundColor('#141414'); }

const P = {
  leaf:'<path d="M12 21v-7M12 14c-4 0-7-2-8-6 3-1 5 0 6 1-1-3 0-5 2-7 2 2 3 4 2 7 1-1 3-2 6-1-1 4-4 6-8 6z"/>',
  bag:'<path d="M9 3h6l-1.5 3h-3zM8 9h8c3 3 4 7 3 10-1 2-3 2-7 2s-6 0-7-2c-1-3 0-7 3-10z"/>',
  horn:'<path d="M4 10v4h3l8 4V6l-8 4zM19 9v6"/>',
  menu:'<path d="M5 7h14M5 12h14M5 17h14"/>',
  gift:'<path d="M4 9h16v4H4zM5 13h14v8H5zM12 9v12M12 9c-3 0-4-4-1.5-4S12 9 12 9zm0 0c3 0 4-4 1.5-4S12 9 12 9z"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  doc:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 10h4M8 14h8"/>',
  plane:'<path d="M21 4L3 11l6 2 2 6 3-4 5 3z"/>',
  cart:'<path d="M3 4h3l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1"/>',
  sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  grid:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
  pad:'<rect x="3" y="8" width="18" height="10" rx="5"/><path d="M8 11v4M6 13h4M16 12h.01M18 14h.01"/>',
  box:'<path d="M3 8l9-5 9 5v9l-9 5-9-5zM3 8l9 5 9-5M12 13v9"/>'
};
const svg = k => `<svg viewBox="0 0 24 24">${P[k]}</svg>`;
function icons(root = document) {
  root.querySelectorAll('[data-i]').forEach(el => { if (!el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', svg(el.dataset.i)); });
}

const ITEMS = [
  { name:'Chill Flame',   id:'307693', price:'4.7',  bg:'#4B5343', em:'🔥', badge:'#6C7365', ic:'#fff' },
  { name:'Instant Ramen', id:'164508', price:'4.73', bg:'#488AB5', em:'🍜', badge:'#E68A1E', ic:'#7A4400', event:'🍁 Осенний фест' },
  { name:'Snow Globe',    id:'221047', price:'6.2',  bg:'#6B5B95', em:'🔮', badge:'#8A7BB3', ic:'#fff' },
  { name:'Lunar Snake',   id:'095312', price:'12.9', bg:'#2F6F5E', em:'🐍', badge:'#E68A1E', ic:'#7A4400', event:'🍁 Осенний фест' }
];

const grid = document.getElementById('grid');
function render(q = '') {
  const list = ITEMS.filter(i => i.name.toLowerCase().includes(q.trim().toLowerCase()));
  grid.innerHTML = list.length ? list.map(i => `
    <article class="card">
      <div class="pic" style="background:${i.bg}">
        ${i.event ? `<span class="event">${i.event}</span>` : ''}
        <span class="badge" style="background:${i.badge};color:${i.ic}">🍀</span>
        <span class="em">${i.em}</span>
      </div>
      <div class="name">${i.name}</div>
      <div class="id">#${i.id}</div>
      <div class="row">
        <button class="price" data-buy="${i.id}"><i class="gem" style="font-style:normal">💎</i> ${i.price}</button>
        <button class="add" data-i="cart" data-add="${i.id}"></button>
      </div>
    </article>`).join('') : '<div class="empty">Ничего не найдено</div>';
  icons(grid);
}
render();
icons();

document.getElementById('q').addEventListener('input', e => render(e.target.value));

grid.addEventListener('click', e => {
  const b = e.target.closest('[data-buy],[data-add]');
  if (!b) return;
  tg && tg.HapticFeedback && tg.HapticFeedback.impactOccurred('light');
  const msg = b.dataset.buy ? `Покупка #${b.dataset.buy}` : `#${b.dataset.add} добавлен в корзину`;
  tg && tg.showAlert ? tg.showAlert(msg) : console.log(msg);
});

document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t));
}));
document.querySelectorAll('.cat').forEach(c => c.addEventListener('click', () => {
  document.querySelectorAll('.cat').forEach(x => x.classList.toggle('active', x === c));
}));
