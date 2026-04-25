const exams = [...document.querySelectorAll("[data-exam-card]")].map((card) => {
  const timer = card.querySelector("[data-target]");
  return {
    card,
    targetTime: new Date(timer.dataset.target).getTime(),
    days: timer.querySelector('[data-unit="days"]'),
    hours: timer.querySelector('[data-unit="hours"]'),
    minutes: timer.querySelector('[data-unit="minutes"]'),
    seconds: timer.querySelector('[data-unit="seconds"]'),
  };
});

const numberFormatter = new Intl.NumberFormat("ru-RU");
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * 60 * minute;

function formatNumber(value) {
  return numberFormatter.format(Math.max(0, value));
}

function setText(element, value) {
  const nextValue = formatNumber(value);

  if (element.textContent !== nextValue) {
    element.textContent = nextValue;
  }
}

function updateCountdowns() {
  const now = Date.now();
  exams.forEach((exam) => {
    const distance = Math.max(0, exam.targetTime - now);
    const daysLeft = Math.floor(distance / day);
    const hoursLeft = Math.floor((distance % day) / hour);
    const minutesLeft = Math.floor((distance % hour) / minute);
    const secondsLeft = Math.floor((distance % minute) / second);

    setText(exam.days, daysLeft);
    setText(exam.hours, hoursLeft);
    setText(exam.minutes, minutesLeft);
    setText(exam.seconds, secondsLeft);
    exam.card.classList.toggle("is-done", distance === 0);
  });
}

updateCountdowns();
setInterval(updateCountdowns, 1000);