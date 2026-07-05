const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

const digitalTime = document.querySelector('.digital-time');
const digitalWeekday = document.querySelector('.digital-weekday');
const digitalDate = document.querySelector('.digital-date');
const digitalYear = document.querySelector('.digital-year');

const cities = document.querySelectorAll('.city');
const themeButton = document.querySelector('.theme-button');

const locale = 'en-US';

function addZero(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const hourDegrees = (hours % 12) * 30 + minutes * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secondDegrees}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegrees}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDegrees}deg)`;

  digitalTime.textContent = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

  digitalWeekday.textContent = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
  }).format(now);

  digitalDate.textContent = new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric',
  }).format(now);

  digitalYear.textContent = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
  }).format(now);

  updateCitiesTime(now);
}

function updateCitiesTime(date) {
  cities.forEach((city) => {
    const timeZone = city.dataset.timezone;
    const timeElement = city.querySelector('b');

    timeElement.textContent = new Intl.DateTimeFormat(locale, {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light');
  }
}

function changeTheme() {
  document.body.classList.toggle('light');

  if (document.body.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
}

themeButton.addEventListener('click', changeTheme);

loadTheme();
updateClock();
setInterval(updateClock, 1000);