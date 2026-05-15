'use strict';

const ICONS = {
  hourglass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h14M5 22h14M6 2v6l3 4-3 4v6M18 2v6l-3 4 3 4v6"/></svg>',
  book:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  atom:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></svg>',
  feather:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
  sqrt:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3 8 4-16h7"/></svg>',
  sigma:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4H6l6 8-6 8h12"/></svg>',
  users:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  zap:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  leaf:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  globe:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  message:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  code:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  mic:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
};

const EXAMS_DATA = [
  { id: 'history',    name: 'История',             date: '2026-06-01', badge: ICONS.hourglass, color: '#ce93d8', rgb: '206,147,216' },
  { id: 'literature', name: 'Литература',           date: '2026-06-01', badge: ICONS.book,      color: '#f48fb1', rgb: '244,143,177' },
  { id: 'chemistry',  name: 'Химия',                date: '2026-06-01', badge: ICONS.atom,      color: '#80cbc4', rgb: '128,203,196' },
  { id: 'ru',         name: 'Русский язык',         date: '2026-06-04', badge: ICONS.feather,   color: '#ff6b8a', rgb: '255,107,138' },
  { id: 'math-base',  name: 'Математика (баз.)',    date: '2026-06-08', badge: ICONS.sqrt,      color: '#81d4fa', rgb: '129,212,250' },
  { id: 'math-prof',  name: 'Математика (проф.)',   date: '2026-06-08', badge: ICONS.sigma,     color: '#4fc3f7', rgb: '79,195,247'  },
  { id: 'social',     name: 'Обществознание',       date: '2026-06-11', badge: ICONS.users,     color: '#ffd54f', rgb: '255,213,79'  },
  { id: 'physics',    name: 'Физика',               date: '2026-06-11', badge: ICONS.zap,       color: '#ffb74d', rgb: '255,183,77'  },
  { id: 'biology',    name: 'Биология',             date: '2026-06-15', badge: ICONS.leaf,      color: '#a5d6a7', rgb: '165,214,167' },
  { id: 'geography',  name: 'География',            date: '2026-06-15', badge: ICONS.globe,     color: '#80deea', rgb: '128,222,234' },
  { id: 'foreign-wr', name: 'Ин. языки (письм.)',  date: '2026-06-15', badge: ICONS.message,   color: '#ffab91', rgb: '255,171,145' },
  { id: 'cs',         name: 'Информатика',          date: '2026-06-18', badge: ICONS.code,      color: '#69f0ae', rgb: '105,240,174' },
  { id: 'foreign-or', name: 'Ин. языки (устн.)',   date: '2026-06-19', badge: ICONS.mic,       color: '#ff8a65', rgb: '255,138,101' },
];

const TIMEZONES = [
  { offset: 2,  label: 'Калининград (UTC+2)'             },
  { offset: 3,  label: 'Москва, Санкт-Петербург (UTC+3)' },
  { offset: 4,  label: 'Самара, Удмуртия (UTC+4)'        },
  { offset: 5,  label: 'Екатеринбург (UTC+5)'            },
  { offset: 6,  label: 'Омск (UTC+6)'                    },
  { offset: 7,  label: 'Красноярск, Новосибирск (UTC+7)' },
  { offset: 8,  label: 'Иркутск (UTC+8)'                 },
  { offset: 9,  label: 'Якутск (UTC+9)'                  },
  { offset: 10, label: 'Владивосток, Хабаровск (UTC+10)' },
  { offset: 11, label: 'Магадан, Сахалин (UTC+11)'       },
  { offset: 12, label: 'Камчатка, Чукотка (UTC+12)'      },
];

const QUOTES = [
  { text: 'Боль временна. Сдаться — навсегда.',                                                        author: 'Лэнс Армстронг'    },
  { text: 'Тяжело в учении — легко в бою.',                                                            author: 'Александр Суворов' },
  { text: 'Чемпион — это тот, кто встал на один раз больше, чем упал.',                               author: 'Мухаммед Али'      },
  { text: 'Никто не говорил, что будет легко. Но оно того стоит.',                                     author: 'Народная мудрость' },
  { text: 'Ты не устал — ты просто ещё не дошёл.',                                                    author: 'Народная мудрость' },
  { text: 'Разница между возможным и невозможным — в твоём желании.',                                  author: 'Томми Ласорда'     },
  { text: 'Один день — один шаг. Не останавливайся.',                                                  author: 'Народная мудрость' },
  { text: 'Успех — это идти от провала к провалу, не теряя энтузиазма.',                               author: 'Уинстон Черчилль'  },
  { text: 'Либо ты управляешь своим днём, либо день управляет тобой.',                                 author: 'Джим Рон'          },
  { text: 'Сделай сегодня то, что другие не хотят, — завтра ты будешь жить так, как другие не могут.', author: 'Джаред Лето'       },
  { text: 'Не жди. Времени никогда не будет достаточно.',                                              author: 'Наполеон Хилл'    },
  { text: 'Победители находят способ. Проигравшие — причину.',                                         author: 'Народная мудрость' },
  { text: 'Каждое утро ты получаешь 86 400 секунд. Используй их.',                                     author: 'Народная мудрость' },
  { text: 'Страх — это реакция. Смелость — это решение.',                                              author: 'Уинстон Черчилль'  },
  { text: 'Твои ограничения существуют только в твоей голове.',                                        author: 'Народная мудрость' },
  { text: 'Делай пока другие объясняют почему это невозможно.',                                        author: 'Народная мудрость' },
];

const MONTHS = ['','янв.','фев.','мар.','апр.','мая','июня','июля','авг.','сен.','окт.','ноя.','дек.'];
const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
const YEAR_START = new Date('2025-09-01T00:00:00+03:00').getTime();
const second = 1000, minute = 60000, hour = 3600000, day = 86400000;
const fmt = new Intl.NumberFormat('ru-RU');

let selectedTz       = parseInt(localStorage.getItem('ege-tz') ?? '3');
let selectedSubjects = JSON.parse(localStorage.getItem('ege-subjects') ?? '["ru","math-prof","cs"]');
let activeExams = [];
let tickInterval = null;

// ── Quote rotator ──
function renderQuote() {
  const slot = Math.floor(Date.now() / (15 * 60 * 1000));
  const q    = QUOTES[slot % QUOTES.length];
  const el = document.getElementById('quote');
  if (!el) return;
  el.querySelector('.quote__text').textContent   = '«' + q.text + '»';
  el.querySelector('.quote__author').textContent = '— ' + q.author;
}

function saveState() {
  localStorage.setItem('ege-tz', selectedTz);
  localStorage.setItem('ege-subjects', JSON.stringify(selectedSubjects));
}

function pad(n) { return String(n).padStart(2, '0'); }

function makeTarget(date) {
  return `${date}T10:00:00+${pad(selectedTz)}:00`;
}

// ── Timezone custom dropdown ──
function renderTzSelect() {
  const wrap = document.getElementById('tz-select');
  const current = TIMEZONES.find(t => t.offset === selectedTz) || TIMEZONES[1];

  wrap.innerHTML = `
    <button class="custom-select__trigger" id="tz-trigger" type="button">
      <span id="tz-value">${current.label}</span>
      <svg class="custom-select__arrow" width="12" height="7" viewBox="0 0 12 7" fill="none">
        <path d="M1 1l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="custom-select__dropdown" id="tz-dropdown">
      ${TIMEZONES.map(tz => `
        <button class="custom-select__option${tz.offset === selectedTz ? ' selected' : ''}"
          data-offset="${tz.offset}" type="button">${tz.label}</button>
      `).join('')}
    </div>`;

  const trigger  = wrap.querySelector('#tz-trigger');
  const dropdown = wrap.querySelector('#tz-dropdown');
  const valEl    = wrap.querySelector('#tz-value');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.toggle('open');
  });

  dropdown.querySelectorAll('.custom-select__option').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTz = parseInt(btn.dataset.offset);
      valEl.textContent = btn.textContent;
      dropdown.querySelectorAll('.custom-select__option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      wrap.classList.remove('open');
      saveState();
      renderCards();
    });
  });

  document.addEventListener('click', () => wrap.classList.remove('open'));
}

// ── Subject pills ──
function renderPills() {
  const container = document.getElementById('subject-pills');
  container.innerHTML = EXAMS_DATA.map(e => {
    const active = selectedSubjects.includes(e.id);
    return `<button class="subject-pill${active ? ' active' : ''}" data-id="${e.id}" style="--pill-color:${e.color};--pill-rgb:${e.rgb}">${e.name}</button>`;
  }).join('');
  container.querySelectorAll('.subject-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      selectedSubjects = selectedSubjects.includes(id)
        ? selectedSubjects.filter(s => s !== id)
        : [...selectedSubjects, id];
      btn.classList.toggle('active', selectedSubjects.includes(id));
      saveState();
      renderCards();
    });
  });
}

// ── Exam cards ──
function initCards() {
  const now  = Date.now();
  const grid = document.getElementById('exam-grid');
  grid.innerHTML = EXAMS_DATA.map((e, i) => {
    const [, m, d] = e.date.split('-');
    const dateLabel  = `${parseInt(d)} ${MONTHS[parseInt(m)]}`;
    const target     = makeTarget(e.date);
    const targetTime = new Date(target).getTime();
    const expired    = targetTime < now;
    const dist = Math.max(0, targetTime - now);
    const dv = fmt.format(Math.floor(dist / day));
    const hv = fmt.format(Math.floor((dist % day) / hour));
    const mv = fmt.format(Math.floor((dist % hour) / minute));
    const sv = fmt.format(Math.floor((dist % minute) / second));
    const pct = Math.min(100, Math.max(0, (now - YEAR_START) / (targetTime - YEAR_START) * 100));
    const hidden = !selectedSubjects.includes(e.id);
    return `
    <div class="card-wrap${hidden ? ' card-wrap--hidden' : ''}">
    <article class="exam-card${isReload ? '' : ' exam-card--entering'}${expired ? ' exam-card--expired' : ''}" data-exam-card data-exam-id="${e.id}"
      style="--card-color:${e.color};--card-rgb:${e.rgb};--card-i:${i}">
      <div class="exam-card__header">
        <div class="exam-card__accent"></div>
        <div class="exam-card__badge">${e.badge}</div>
        <div class="exam-card__meta">
          <p class="exam-card__date">${dateLabel} · 10:00</p>
          <h2>${e.name}</h2>
        </div>
      </div>
      ${expired
        ? `<p class="exam-card__expired-msg">Экзамен уже завершился</p>`
        : `<div class="countdown" data-target="${target}">
        <div class="countdown__block"><span data-unit="days">${dv}</span><span class="countdown__label">дней</span></div>
        <span class="countdown__sep">:</span>
        <div class="countdown__block"><span data-unit="hours">${hv}</span><span class="countdown__label">часов</span></div>
        <span class="countdown__sep">:</span>
        <div class="countdown__block"><span data-unit="minutes">${mv}</span><span class="countdown__label">минут</span></div>
        <span class="countdown__sep">:</span>
        <div class="countdown__block"><span data-unit="seconds" class="seconds">${sv}</span><span class="countdown__label">секунд</span></div>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-bar__fill" data-progress style="width:${pct.toFixed(1)}%"></div></div>
        <span class="progress-label" data-progress-label>${pct.toFixed(0)}%</span>
      </div>`}
    </article>
    </div>`;
  }).join('');
}

function rebuildActiveExams() {
  activeExams = [...document.querySelectorAll('[data-exam-card]')]
    .filter(card => {
      const wrap = card.parentElement;
      return !wrap.classList.contains('card-wrap--hidden') &&
             !wrap.dataset.hiding &&
             !card.classList.contains('exam-card--expired');
    })
    .map(card => {
      const timer = card.querySelector('[data-target]');
      return {
        card,
        targetTime:    new Date(timer.dataset.target).getTime(),
        days:          timer.querySelector('[data-unit="days"]'),
        hours:         timer.querySelector('[data-unit="hours"]'),
        minutes:       timer.querySelector('[data-unit="minutes"]'),
        seconds:       timer.querySelector('[data-unit="seconds"]'),
        progressFill:  card.querySelector('[data-progress]'),
        progressLabel: card.querySelector('[data-progress-label]'),
      };
    });
}

function showCard(wrap, card) {
  wrap.classList.remove('card-wrap--hidden');
  delete wrap.dataset.hiding;
  wrap.style.cssText = '';
  card.style.setProperty('--card-i', '0');
  card.classList.remove('exam-card--entering');
  void card.offsetWidth;
  card.classList.add('exam-card--entering');
}

function hideCard(wrap) {
  if (wrap.dataset.hiding) return;
  wrap.dataset.hiding = '1';
  wrap.style.pointerEvents = 'none';

  // Phase 1: fade out
  wrap.style.transition = 'opacity 0.18s ease';
  wrap.style.opacity = '0';

  setTimeout(() => {
    // Phase 2: collapse height + margin
    const h  = wrap.offsetHeight;
    const mb = parseFloat(getComputedStyle(wrap).marginBottom) || 0;
    wrap.style.overflow = 'hidden';
    wrap.style.height = h + 'px';
    wrap.style.marginBottom = mb + 'px';
    wrap.style.transition = 'height 0.28s ease, margin-bottom 0.28s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      wrap.style.height = '0';
      wrap.style.marginBottom = '0';
    }));

    setTimeout(() => {
      delete wrap.dataset.hiding;
      wrap.style.cssText = '';
      wrap.classList.add('card-wrap--hidden');
      rebuildActiveExams();
    }, 290);
  }, 190);
}

function renderCards() {
  document.querySelectorAll('[data-exam-card]').forEach(card => {
    const wrap    = card.parentElement;
    const visible = selectedSubjects.includes(card.dataset.examId);
    const hidden  = wrap.classList.contains('card-wrap--hidden');
    const hiding  = !!wrap.dataset.hiding;
    if (visible && (hidden || hiding)) showCard(wrap, card);
    else if (!visible && !hidden && !hiding) hideCard(wrap);
  });

  // Update targets if timezone changed
  EXAMS_DATA.forEach(e => {
    const card  = document.querySelector(`[data-exam-id="${e.id}"]`);
    if (!card) return;
    const timer = card.querySelector('[data-target]');
    if (timer) timer.dataset.target = makeTarget(e.date);
  });

  rebuildActiveExams();

  if (!tickInterval) {
    update();
    tickInterval = setInterval(update, 1000);
  }
}

function setText(el, value) {
  const next = fmt.format(Math.max(0, value));
  if (el.textContent !== next) {
    el.textContent = next;
    if (el.classList.contains('seconds')) {
      el.classList.remove('tick');
      void el.offsetWidth;
      el.classList.add('tick');
    }
  }
}

function declension(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m100 >= 11 && m100 <= 19) return 'дней';
  if (m10 === 1) return 'день';
  if (m10 >= 2 && m10 <= 4) return 'дня';
  return 'дней';
}

function updateMeta() {
  if (!activeExams.length) return;
  const now   = Date.now();
  const parts = activeExams.map(e => {
    const days = Math.floor(Math.max(0, e.targetTime - now) / day);
    return e.card.querySelector('h2').textContent.trim() + ' — ' + days + ' ' + declension(days);
  });
  document.querySelector('meta[name="description"]')
    ?.setAttribute('content', 'До ЕГЭ 2026: ' + parts.join(', ') + '.');
}

function update() {
  const now = Date.now();
  let anyExpired = false;
  activeExams.forEach(exam => {
    const dist = exam.targetTime - now;
    if (dist <= 0) {
      exam.card.classList.add('exam-card--expired');
      exam.card.querySelector('.countdown')?.remove();
      exam.card.querySelector('.progress-wrap')?.remove();
      if (!exam.card.querySelector('.exam-card__expired-msg')) {
        const msg = document.createElement('p');
        msg.className = 'exam-card__expired-msg';
        msg.textContent = 'Экзамен уже завершился';
        exam.card.appendChild(msg);
      }
      anyExpired = true;
      return;
    }
    setText(exam.days,    Math.floor(dist / day));
    setText(exam.hours,   Math.floor((dist % day) / hour));
    setText(exam.minutes, Math.floor((dist % hour) / minute));
    setText(exam.seconds, Math.floor((dist % minute) / second));
    if (exam.progressFill) {
      const pct = Math.min(100, Math.max(0, (now - YEAR_START) / (exam.targetTime - YEAR_START) * 100));
      exam.progressFill.style.width = pct.toFixed(1) + '%';
      if (exam.progressLabel) exam.progressLabel.textContent = pct.toFixed(0) + '%';
    }
  });
  if (anyExpired) activeExams = activeExams.filter(e => !e.card.classList.contains('exam-card--expired'));
  updateMeta();
}

// ── Particles ──
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0';
  document.querySelector('.bg-blobs').insertAdjacentElement('afterend', canvas);
  const ctx = canvas.getContext('2d');
  const N = 48;
  const pts = [];

  function resize() {
    canvas.width  = innerWidth;
    canvas.height = innerHeight;
  }

  for (let i = 0; i < N; i++) {
    pts.push({
      x:  Math.random() * innerWidth,
      y:  Math.random() * innerHeight,
      r:  0.8 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a:  0.12 + Math.random() * 0.35,
    });
  }

  function tick() {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const rgb = document.documentElement.classList.contains('light')
      ? '80,70,210' : '255,255,255';
    for (const p of pts) {
      p.x = (p.x + p.vx + w) % w;
      p.y = (p.y + p.vy + h) % h;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();

// ── Blob parallax ──
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const blobs = [
    { el: document.querySelector('.blob--1'), f: 0.022 },
    { el: document.querySelector('.blob--2'), f: 0.014 },
    { el: document.querySelector('.blob--3'), f: 0.008 },
  ];

  let tx = 0, ty = 0, cx = 0, cy = 0, rafId = null;

  function tick() {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    blobs.forEach(b => {
      b.el.style.translate = `${cx * innerWidth * b.f}px ${cy * innerHeight * b.f}px`;
    });
    rafId = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001)
      ? requestAnimationFrame(tick)
      : null;
  }

  function wake() { if (!rafId) rafId = requestAnimationFrame(tick); }

  document.addEventListener('mousemove', e => {
    tx = (e.clientX / innerWidth  - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
    wake();
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      tx = Math.max(-1, Math.min(1, (e.gamma || 0) / 45));
      ty = Math.max(-1, Math.min(1, (e.beta  || 0) / 45));
      wake();
    });
  }
})();

// ── Theme toggle ──
let isDark = localStorage.getItem('ege-theme') !== 'light';

function applyTheme() {
  const light = !isDark;
  document.documentElement.classList.toggle('light', light);
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', light ? '#ffffff' : '#0d0d18');
  localStorage.setItem('ege-theme', light ? 'light' : 'dark');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const html = document.documentElement;
  html.classList.add('theme-switching');
  isDark = !isDark;
  applyTheme();
  setTimeout(() => html.classList.remove('theme-switching'), 400);
});

// ── Init ──
renderQuote();
setInterval(renderQuote, 15 * 60 * 1000);
renderTzSelect();
renderPills();
initCards();
renderCards();
applyTheme();
document.body.classList.remove('js-loading');
