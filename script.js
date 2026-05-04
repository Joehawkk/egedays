const YEAR_START = new Date('2025-09-01T00:00:00+03:00').getTime();

const exams = [...document.querySelectorAll('[data-exam-card]')].map((card) => {
  const timer = card.querySelector('[data-target]');
  return {
    card,
    targetTime: new Date(timer.dataset.target).getTime(),
    days:    timer.querySelector('[data-unit="days"]'),
    hours:   timer.querySelector('[data-unit="hours"]'),
    minutes: timer.querySelector('[data-unit="minutes"]'),
    seconds: timer.querySelector('[data-unit="seconds"]'),
    progressFill:  card.querySelector('[data-progress]'),
    progressLabel: card.querySelector('[data-progress-label]'),
  };
});

const fmt = new Intl.NumberFormat('ru-RU');
const second = 1000, minute = 60 * second, hour = 60 * minute, day = 24 * hour;

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

function updateProgress(exam, now) {
  if (!exam.progressFill) return;
  const total = exam.targetTime - YEAR_START;
  const elapsed = now - YEAR_START;
  const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
  exam.progressFill.style.width = pct.toFixed(1) + '%';
  if (exam.progressLabel) {
    exam.progressLabel.textContent = pct.toFixed(0) + '%';
  }
}

function update() {
  const now = Date.now();
  exams.forEach((exam) => {
    const dist = Math.max(0, exam.targetTime - now);
    setText(exam.days,    Math.floor(dist / day));
    setText(exam.hours,   Math.floor((dist % day) / hour));
    setText(exam.minutes, Math.floor((dist % hour) / minute));
    setText(exam.seconds, Math.floor((dist % minute) / second));
    exam.card.classList.toggle('is-done', dist === 0);
    updateProgress(exam, now);
  });
}

update();
setInterval(update, 1000);
