'use strict';

const EXAMS_DATA = [
  { id: 'history',    name: 'История',             date: '2026-06-01', badge: '⏳',        color: '#ce93d8', rgb: '206,147,216' },
  { id: 'literature', name: 'Литература',           date: '2026-06-01', badge: '§',         color: '#f48fb1', rgb: '244,143,177' },
  { id: 'chemistry',  name: 'Химия',                date: '2026-06-01', badge: '⚛',         color: '#80cbc4', rgb: '128,203,196' },
  { id: 'ru',         name: 'Русский язык',         date: '2026-06-04', badge: 'Ъ',         color: '#ff6b8a', rgb: '255,107,138' },
  { id: 'math-base',  name: 'Математика (баз.)',    date: '2026-06-08', badge: '√',         color: '#81d4fa', rgb: '129,212,250' },
  { id: 'math-prof',  name: 'Математика (проф.)',   date: '2026-06-08', badge: '∑',         color: '#4fc3f7', rgb: '79,195,247'  },
  { id: 'social',     name: 'Обществознание',       date: '2026-06-11', badge: '🕮',        color: '#ffd54f', rgb: '255,213,79'  },
  { id: 'physics',    name: 'Физика',               date: '2026-06-11', badge: 'Ω',         color: '#ffb74d', rgb: '255,183,77'  },
  { id: 'biology',    name: 'Биология',             date: '2026-06-15', badge: '☣',         color: '#a5d6a7', rgb: '165,214,167' },
  { id: 'geography',  name: 'География',            date: '2026-06-15', badge: '🗺',        color: '#80deea', rgb: '128,222,234' },
  { id: 'foreign-wr', name: 'Ин. языки (письм.)',  date: '2026-06-15', badge: '🗛',        color: '#ffab91', rgb: '255,171,145' },
  { id: 'cs',         name: 'Информатика',          date: '2026-06-18', badge: '&lt;/&gt;', color: '#69f0ae', rgb: '105,240,174' },
  { id: 'foreign-or', name: 'Ин. языки (устн.)',   date: '2026-06-19', badge: '🗛',        color: '#ff8a65', rgb: '255,138,101' },
];

const MONTHS = ['','янв.','фев.','мар.','апр.','мая','июня','июля','авг.','сен.','окт.','ноя.','дек.'];
const YEAR_START = new Date('2025-09-01T00:00:00+03:00').getTime();
const second = 1000, minute = 60000, hour = 3600000, day = 86400000;
const fmt = new Intl.NumberFormat('ru-RU');

let activeExams = [];

function initCards() {
  const now  = Date.now();
  const grid = document.getElementById('exam-grid');
  grid.innerHTML = EXAMS_DATA.map(e => {
    const [, m, d] = e.date.split('-');
    const dateLabel  = `${parseInt(d)} ${MONTHS[parseInt(m)]}`;
    const target     = `${e.date}T10:00:00+03:00`;
    const targetTime = new Date(target).getTime();
    const dist = Math.max(0, targetTime - now);
    const dv = fmt.format(Math.floor(dist / day));
    const hv = fmt.format(Math.floor((dist % day) / hour));
    const mv = fmt.format(Math.floor((dist % hour) / minute));
    const sv = fmt.format(Math.floor((dist % minute) / second));
    const pct = Math.min(100, Math.max(0, (now - YEAR_START) / (targetTime - YEAR_START) * 100));
    const sm = e.badge.length > 1 ? ' exam-card__badge--sm' : '';
    return `
    <article class="exam-card" data-exam-card data-exam-id="${e.id}"
      style="--card-color:${e.color};--card-rgb:${e.rgb}">
      <div class="exam-card__header">
        <div class="exam-card__accent"></div>
        <div class="exam-card__badge${sm}">${e.badge}</div>
        <div class="exam-card__meta">
          <p class="exam-card__date">${dateLabel} · 10:00</p>
          <h2>${e.name}</h2>
        </div>
      </div>
      <div class="countdown" data-target="${target}">
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
      </div>
    </article>`;
  }).join('');
}

function rebuildActiveExams() {
  activeExams = [...document.querySelectorAll('[data-exam-card]')].map(card => {
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

function update() {
  const now = Date.now();
  activeExams.forEach(exam => {
    const dist = Math.max(0, exam.targetTime - now);
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
}

initCards();
rebuildActiveExams();
update();
setInterval(update, 1000);
