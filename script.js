'use strict';

/* ---------- Справочники и схема данных ---------- */
const CATS = ['Разработка ПО', 'Телеком и интернет', 'Финтех', 'Облака и ЦОД', 'Аутсорсинг', 'Образование и EdTech', 'Кибербезопасность'];
const CITIES = ['Бишкек', 'Ош', 'Каракол', 'Джалал-Абад', 'Нарын'];
const TYPES = ['Услуга', 'Программное обеспечение', 'Цифровой продукт'];
const YEAR = new Date().getFullYear();

// Одна схема описывает таблицу, форму, поиск, фильтр и CSV для каждой сущности.
const SCHEMA = {
  companies: { one: 'компания', filter: 'category', sort: 'name', fields: [
    { k: 'name', l: 'Название', t: 'text' },
    { k: 'city', l: 'Город', t: 'select', o: CITIES },
    { k: 'category', l: 'Категория', t: 'select', o: CATS },
    { k: 'services', l: 'Направления деятельности', t: 'text' },
    { k: 'employees', l: 'Сотрудников', t: 'number', min: 1 },
    { k: 'revenue', l: 'Выручка, млн сом', t: 'number', min: 0 },
    { k: 'year', l: 'Год основания', t: 'number', min: 1991, max: YEAR }] },
  products: { one: 'услуга или продукт', filter: 'type', sort: 'name', fields: [
    { k: 'name', l: 'Название', t: 'text' },
    { k: 'type', l: 'Тип', t: 'select', o: TYPES },
    { k: 'vendor', l: 'Поставщик', t: 'text' },
    { k: 'direction', l: 'Направление', t: 'text' },
    { k: 'price', l: 'Цена, сом', t: 'number', min: 0 }] },
  stats: { one: 'год статистики', sort: 'year', fields: [
    { k: 'year', l: 'Год', t: 'number', min: 2000, max: YEAR + 5 },
    { k: 'market', l: 'Объём рынка, млрд сом', t: 'number', min: 0 },
    { k: 'internet', l: 'Пользователи интернета, %', t: 'number', min: 0, max: 100 },
    { k: 'companies', l: 'IT-компаний', t: 'number', min: 0 },
    { k: 'employees', l: 'Занятых, тыс. чел.', t: 'number', min: 0 }] }
};

// Демонстрационные (вымышленные) данные.
const mk = (e, prefix, rows) => rows.map((r, i) =>
  ({ id: prefix + i, ...Object.fromEntries(SCHEMA[e].fields.map((f, j) => [f.k, r[j]])) }));
const seed = () => ({
  companies: mk('companies', 'c', [
    ['Ала-Тоо Софт', 'Бишкек', 'Разработка ПО', 'Веб- и мобильная разработка, ERP', 85, 120, 2012],
    ['Манас Диджитал', 'Бишкек', 'Финтех', 'Платёжные сервисы, мобильный банкинг', 60, 210, 2016],
    ['Иссык-Куль Клауд', 'Каракол', 'Облака и ЦОД', 'Хостинг, резервное копирование', 25, 45, 2018],
    ['Тянь-Шань Дата', 'Бишкек', 'Облака и ЦОД', 'Центр обработки данных, аренда серверов', 40, 160, 2015],
    ['Ош Тех', 'Ош', 'Аутсорсинг', 'ИТ-аутсорсинг, тестирование ПО', 70, 55, 2017],
    ['Чуй Телеком', 'Бишкек', 'Телеком и интернет', 'Широкополосный доступ, IPTV', 150, 480, 2008],
    ['Нур Секьюрити', 'Бишкек', 'Кибербезопасность', 'Аудит безопасности, SOC-услуги', 30, 62, 2019],
    ['Джалал-Абад Лаб', 'Джалал-Абад', 'Образование и EdTech', 'Онлайн-курсы, обучение программированию', 18, 14, 2020]]),
  products: mk('products', 'p', [
    ['Сайт-визитка под ключ', 'Услуга', 'Ала-Тоо Софт', 'Веб-разработка', 45000],
    ['Мобильное приложение под ключ', 'Услуга', 'Ала-Тоо Софт', 'Мобильная разработка', 380000],
    ['CRM «Манас» (лицензия)', 'Программное обеспечение', 'Ала-Тоо Софт', 'Бизнес-ПО', 60000],
    ['Платёжный шлюз (подписка, месяц)', 'Цифровой продукт', 'Манас Диджитал', 'Финтех', 15000],
    ['Виртуальный сервер VPS (месяц)', 'Услуга', 'Иссык-Куль Клауд', 'Хостинг', 1200],
    ['Колокейшн стойки (месяц)', 'Услуга', 'Тянь-Шань Дата', 'ЦОД', 25000],
    ['Аудит информационной безопасности', 'Услуга', 'Нур Секьюрити', 'Кибербезопасность', 120000],
    ['Антивирусный пакет (год)', 'Программное обеспечение', 'Нур Секьюрити', 'Кибербезопасность', 3500],
    ['Онлайн-курс «Python с нуля»', 'Цифровой продукт', 'Джалал-Абад Лаб', 'Образование', 9000]]),
  stats: mk('stats', 's', [
    [2019, 38.0, 55, 410, 14.5], [2020, 42.5, 60, 450, 16.0], [2021, 48.1, 65, 520, 18.5],
    [2022, 56.4, 70, 610, 22.0], [2023, 64.2, 74, 690, 25.0], [2024, 72.9, 77, 780, 28.0]])
});

/* ---------- Хранилище ---------- */
const KEY = 'ict-kg-v1';
let db = load();
function load() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY));
    if (d && d.companies && d.products && d.stats) return d;
  } catch (e) { /* повреждённые данные — берём демо-набор */ }
  return seed();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch (e) { toast('Не удалось сохранить данные в браузере'); }
}

/* ---------- Утилиты ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Number(n || 0).toLocaleString('ru-RU', { maximumFractionDigits: 1 });
const sum = (rows, k) => rows.reduce((a, r) => a + (Number(r[k]) || 0), 0);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const byYear = () => [...db.stats].sort((a, b) => a.year - b.year);
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 2400);
}
function group(rows, key, val) {
  const m = {};
  rows.forEach(r => { m[r[key]] = (m[r[key]] || 0) + (val ? val(r) : 1); });
  return m;
}

/* ---------- Формы ---------- */
function fieldsHtml(S, rec = {}) {
  return S.fields.map(f => {
    const v = rec[f.k] ?? '';
    const input = f.t === 'select'
      ? `<select name="${f.k}" required>${f.o.map(o => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
      : `<input name="${f.k}" type="${f.t}" value="${esc(v)}" required
          ${f.min != null ? `min="${f.min}"` : ''} ${f.max != null ? `max="${f.max}"` : ''} ${f.t === 'number' ? 'step="any"' : ''}>`;
    return `<label>${f.l}${input}</label>`;
  }).join('');
}
function readForm(form, S) {
  const data = {};
  S.fields.forEach(f => {
    const v = form.elements[f.k].value.trim();
    data[f.k] = f.t === 'number' ? Number(v) : v;
  });
  return data;
}
function valid(form) {
  [...form.elements].forEach(el => el.classList.add('touched'));
  if (!form.checkValidity()) { form.reportValidity(); return false; }
  return true;
}

/* ---------- Модальное окно (добавление и редактирование) ---------- */
let editing = { e: null, id: null };
function openModal(e, id) {
  const S = SCHEMA[e];
  editing = { e, id };
  $('#mtitle').textContent = (id ? 'Редактирование: ' : 'Новая запись: ') + S.one;
  $('#mfields').innerHTML = fieldsHtml(S, id ? db[e].find(r => r.id === id) : {});
  $('#modal').showModal();
}
$('#mform').addEventListener('submit', ev => {
  ev.preventDefault();
  if (!valid(ev.target)) return;
  const { e, id } = editing;
  const data = readForm(ev.target, SCHEMA[e]);
  if (id) Object.assign(db[e].find(r => r.id === id), data);
  else db[e].push({ id: uid(), ...data });
  save(); $('#modal').close(); toast('Запись сохранена'); renderPage(current);
});
$('#mcancel').addEventListener('click', () => $('#modal').close());

function removeRow(e, id) {
  if (!confirm('Удалить запись? Действие нельзя отменить.')) return;
  db[e] = db[e].filter(r => r.id !== id);
  save(); toast('Запись удалена'); renderPage(current);
}

/* ---------- Таблицы: поиск, фильтр, экспорт ---------- */
function visibleRows(sec) {
  const e = sec.dataset.entity, S = SCHEMA[e];
  const q = sec.querySelector('.search').value.trim().toLowerCase();
  const f = sec.querySelector('.filter').value;
  return db[e]
    .filter(r => (!f || r[S.filter] === f) && (!q || Object.values(r).join(' ').toLowerCase().includes(q)))
    .sort((a, b) => String(a[S.sort]).localeCompare(String(b[S.sort]), 'ru', { numeric: true }));
}
function renderTable(sec) {
  const e = sec.dataset.entity, S = SCHEMA[e], rows = visibleRows(sec);
  sec.querySelector('tbody').innerHTML = rows.length
    ? rows.map(r => '<tr>' + S.fields.map(f =>
        f.t === 'number' ? `<td class="num">${f.k === 'year' ? r[f.k] : fmt(r[f.k])}</td>` : `<td>${esc(r[f.k])}</td>`).join('') +
        `<td class="acts"><button class="btn ghost sm" data-act="edit" data-id="${r.id}">Изменить</button>
         <button class="btn danger sm" data-act="del" data-id="${r.id}">Удалить</button></td></tr>`).join('')
    : `<tr><td class="empty" colspan="${S.fields.length + 1}">Ничего не найдено. Измените запрос или добавьте запись.</td></tr>`;
  sec.querySelector('.count').textContent = `Записей: ${rows.length} из ${db[e].length}`;
}
function exportCsv(e, rows) {
  const S = SCHEMA[e];
  const q = v => `"${String(v).replace(/"/g, '""')}"`;
  const lines = [S.fields.map(f => q(f.l)).join(';'), ...rows.map(r => S.fields.map(f => q(r[f.k])).join(';'))];
  const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `ikt-kg-${e}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast(`Экспортировано строк: ${rows.length}`);
}
$$('[data-entity]').forEach(sec => {
  const e = sec.dataset.entity, S = SCHEMA[e];
  sec.querySelector('thead').innerHTML = '<tr>' + S.fields.map(f => `<th class="${f.t === 'number' ? 'num' : ''}">${f.l}</th>`).join('') + '<th></th></tr>';
  const sel = sec.querySelector('.filter');
  if (S.filter) {
    const f = S.fields.find(x => x.k === S.filter);
    sel.innerHTML = `<option value="">Все: ${f.l.toLowerCase()}</option>` + f.o.map(o => `<option>${esc(o)}</option>`).join('');
  } else sel.hidden = true;
  sec.addEventListener('input', ev => { if (ev.target.matches('.search, .filter')) renderTable(sec); });
  sec.addEventListener('click', ev => {
    const b = ev.target.closest('button');
    if (!b) return;
    if (b.classList.contains('add')) openModal(e);
    else if (b.classList.contains('csv')) exportCsv(e, visibleRows(sec));
    else if (b.dataset.act === 'edit') openModal(e, b.dataset.id);
    else if (b.dataset.act === 'del') removeRow(e, b.dataset.id);
  });
});

/* ---------- Регистрация компании ---------- */
$('#regFields').innerHTML = fieldsHtml(SCHEMA.companies);
$('#regForm').addEventListener('submit', ev => {
  ev.preventDefault();
  const form = ev.target;
  if (!valid(form)) return;
  const data = readForm(form, SCHEMA.companies);
  if (db.companies.some(c => c.name.toLowerCase() === data.name.toLowerCase())) {
    toast('Компания с таким названием уже зарегистрирована'); return;
  }
  db.companies.push({ id: uid(), ...data });
  save(); form.reset(); [...form.elements].forEach(el => el.classList.remove('touched'));
  toast('Компания зарегистрирована'); show('companies');
});

/* ---------- Графики Chart.js ---------- */
const PAL = ['#0f9d78', '#0b7fb3', '#38c9a0', '#1e5fa8', '#7fd8be', '#5aa9d6', '#0a6b54', '#a5d8ee'];
const charts = {};
function chart(id, type, labels, datasets, options = {}) {
  const cv = document.getElementById(id);
  if (!cv) return;
  if (!window.Chart) { cv.parentElement.innerHTML = '<p class="muted">Chart.js не загружен. Проверьте подключение к интернету.</p>'; return; }
  if (charts[id]) charts[id].destroy();
  charts[id] = new Chart(cv, {
    type, data: { labels, datasets },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: type === 'doughnut' || datasets.length > 1 } }, ...options }
  });
}
const barSet = (label, data) => [{ label, data, backgroundColor: PAL, borderRadius: 4 }];
const lineSet = (label, data, c = PAL[0]) => [{ label, data, borderColor: c, backgroundColor: c + '33', fill: true, tension: .3 }];

function renderDashboard() {
  const st = byYear(), last = st[st.length - 1] || {};
  const cards = [
    ['IT-компаний в каталоге', db.companies.length],
    ['Сотрудников', fmt(sum(db.companies, 'employees'))],
    ['Выручка, млн сом', fmt(sum(db.companies, 'revenue'))],
    ['Услуг и продуктов', db.products.length],
    [`Объём рынка, млрд сом (${last.year || '—'})`, fmt(last.market)],
    ['Пользователи интернета, %', fmt(last.internet)]
  ];
  $('#cards').innerHTML = cards.map(([l, v]) => `<div class="card"><span>${l}</span><b>${v}</b></div>`).join('');
  chart('chDashMarket', 'line', st.map(s => s.year), lineSet('Млрд сом', st.map(s => s.market)));
  const c = group(db.companies, 'category');
  chart('chDashCats', 'doughnut', Object.keys(c), [{ data: Object.values(c), backgroundColor: PAL }]);
}
function renderAnalytics() {
  const rev = group(db.companies, 'city', r => r.revenue);
  chart('chRevCity', 'bar', Object.keys(rev), barSet('Млн сом', Object.values(rev)));
  const tot = group(db.products, 'type', r => r.price), cnt = group(db.products, 'type');
  const types = Object.keys(tot);
  chart('chPrice', 'bar', types, barSet('Сом', types.map(t => Math.round(tot[t] / cnt[t]))));
  const emp = group(db.companies, 'category', r => r.employees);
  chart('chEmp', 'bar', Object.keys(emp), barSet('Сотрудников', Object.values(emp)), { indexAxis: 'y' });
  const city = group(db.companies, 'city');
  chart('chCity', 'doughnut', Object.keys(city), [{ data: Object.values(city), backgroundColor: PAL }]);
}
function renderStatCharts() {
  const st = byYear(), years = st.map(s => s.year);
  chart('chNet', 'line', years, lineSet('%', st.map(s => s.internet), PAL[1]), { scales: { y: { min: 0, max: 100 } } });
  chart('chCnt', 'line', years, lineSet('Компаний', st.map(s => s.companies)));
  const growth = st.map((s, i) => i && st[i - 1].market ? +((s.market / st[i - 1].market - 1) * 100).toFixed(1) : 0);
  chart('chGrowth', 'bar', years, barSet('Рост, %', growth));
}

/* ---------- Навигация ---------- */
const TITLES = {
  dashboard: 'Главная панель', companies: 'Каталог IT-компаний', services: 'IT-услуги, ПО и цифровые продукты',
  analytics: 'Аналитика рынка', stats: 'Статистика и динамика ИКТ', register: 'Регистрация IT-компании'
};
let current = 'dashboard';
function renderPage(p) {
  if (p === 'dashboard') renderDashboard();
  else if (p === 'analytics') renderAnalytics();
  else {
    const sec = $('#page-' + p);
    if (sec && sec.dataset.entity) renderTable(sec);
    if (p === 'stats') renderStatCharts();
  }
}
function show(p) {
  if (!TITLES[p]) p = 'dashboard';
  current = p;
  $$('.page').forEach(s => { s.hidden = s.id !== 'page-' + p; });
  $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.page === p));
  $('#title').textContent = TITLES[p];
  $('#sidebar').classList.remove('open');
  history.replaceState(null, '', '#' + p);
  renderPage(p);
}
$('#nav').addEventListener('click', ev => { const b = ev.target.closest('button'); if (b) show(b.dataset.page); });
$('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#resetBtn').addEventListener('click', () => {
  if (!confirm('Заменить все данные демонстрационным набором? Ваши изменения будут потеряны.')) return;
  db = seed(); save(); toast('Демо-данные восстановлены'); renderPage(current);
});
window.addEventListener('hashchange', () => show(location.hash.slice(1)));

show(location.hash.slice(1));
