const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalTime = document.querySelector('.digital-time');
const weekday = document.querySelector('.weekday');
const date = document.querySelector('.date');
const year = document.querySelector('.year');
const secondsProgress = document.querySelector('.seconds-progress');
const minutesProgress = document.querySelector('.minutes-progress');
const hoursProgress = document.querySelector('.hours-progress');
const timezoneCards = document.querySelectorAll('.timezone-card');

const locale = 'en-US';
const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
const weekdayFormatter = new Intl.DateTimeFormat(locale, {
  weekday: 'long',
});
const dateFormatter = new Intl.DateTimeFormat(locale, {
  day: 'numeric',
  month: 'long',
});
const yearFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
});

const timezoneFormatters = Array.from(timezoneCards).map((card) => ({
  card,
  formatter: new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: card.dataset.timezone,
  }),
}));

function setClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;

  const hours = now.getHours();
  const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;
  const hoursProgressDegrees = (((hours % 12) * 60 + minutes) / 720) * 360;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  secondsProgress.style.setProperty('--progress', `${(seconds / 60) * 360}deg`);
  minutesProgress.style.setProperty('--progress', `${((minutes * 60 + seconds) / 3600) * 360}deg`);
  hoursProgress.style.setProperty('--progress', `${hoursProgressDegrees}deg`);

  digitalTime.textContent = timeFormatter.format(now);
  weekday.textContent = weekdayFormatter.format(now);
  date.textContent = dateFormatter.format(now);
  year.textContent = yearFormatter.format(now);

  timezoneFormatters.forEach(({ card, formatter }) => {
    card.querySelector('strong').textContent = formatter.format(now);
  });
}

setClock();
setInterval(setClock, 1000);
