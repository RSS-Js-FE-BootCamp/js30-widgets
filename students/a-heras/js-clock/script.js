const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const digitalTime = document.querySelector('.digital-time');
const weekday = document.querySelector('.weekday');
const date = document.querySelector('.date');
const year = document.querySelector('.year');

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

function setClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;

  const hours = now.getHours();
  const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30 + 90;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  digitalTime.textContent = timeFormatter.format(now);
  weekday.textContent = weekdayFormatter.format(now);
  date.textContent = dateFormatter.format(now);
  year.textContent = yearFormatter.format(now);
}

setClock();
setInterval(setClock, 1000);
