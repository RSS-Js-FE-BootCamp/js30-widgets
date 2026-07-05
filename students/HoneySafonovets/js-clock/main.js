let secondArrow = document.querySelector('.second-arrow');
let minuteArrow = document.querySelector('.min-arrow');
let hourArrow = document.querySelector('.hour-arrow');
isTheme = 1;
// Theme
const theme = document.querySelector('#theme');

document.addEventListener('DOMContentLoaded', () => {
  const isThemeStorage = localStorage.getItem('isTheme');
  isTheme = Number(isThemeStorage);
  startTheme(Number(isThemeStorage));
});

function setTime() {
  const time = new Date();
  // const moscowTime = time.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
  // console.log(time)

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondsArrowNow = (seconds / 60) * 360;
  const minutesArrowNow = (minutes / 60) * 360  + (minutes / 60) * 6;
  const hoursArrowNow = ((hours) % 12) * 30  + (seconds / 60) * 6;

  secondArrow.style.transform = `rotate(${secondsArrowNow}deg)`;
  minuteArrow.style.transform = `rotate(${minutesArrowNow}deg)`;
  hourArrow.style.transform = `rotate(${hoursArrowNow}deg)`;
}

function setDigitalTime() {
  const time = new Date();
  const weekDay = time.toLocaleDateString('en-US', { weekday: 'short' });
  const month = time.toLocaleDateString('en-US', { month: 'long' });
  const day = time.toLocaleDateString('en-US', { day: 'numeric' });
  const year = time.getFullYear()


  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const digitalTime = document.querySelector('.digital-time');

  digitalTime.innerHTML = 
      `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} - ${weekDay}day - ${month} ${day} - ${year}`
}
function startTheme(isTheme) {
  if (isTheme === 0) {
    theme.classList.add('theme-light');
    document.querySelector('.clock-wrapper').classList.add('clock-wrapper-active');
    document.querySelector('.title').classList.add('title-active');
    document.documentElement.classList.add('active-html');
    document.querySelector('.digital-time').classList.add('digital-time-light');
    document.querySelectorAll('.num').forEach((e) => e.classList.add('num-active'));
    document.querySelector('.dot').classList.add('dot-active');
    document.querySelector('.second-arrow').classList.add('second-arrow-active')
  } else {
    theme.classList.remove('theme-light');
    document.querySelector('.clock-wrapper').classList.remove('clock-wrapper-active');
    document.querySelector('.title').classList.remove('title-active');
    document.documentElement.classList.remove('active-html');
    document.querySelector('.digital-time').classList.remove('digital-time-light');
    document.querySelectorAll('.num').forEach((e) => e.classList.remove('num-active'));
    document.querySelector('.dot').classList.remove('dot-active');
    document.querySelector('.second-arrow').classList.remove('second-arrow-active')
  }
}
function setTheme() {
  if (isTheme === 1) {
    theme.classList.add('theme-light');
    document.querySelector('.clock-wrapper').classList.add('clock-wrapper-active');
    document.querySelector('.title').classList.add('title-active');
    document.documentElement.classList.add('active-html');
    document.querySelector('.digital-time').classList.add('digital-time-light');
    document.querySelectorAll('.num').forEach((e) => e.classList.add('num-active'));
    document.querySelector('.dot').classList.add('dot-active');
    document.querySelector('.second-arrow').classList.add('second-arrow-active');
    isTheme = 0;
    localStorage.setItem('isTheme', 0)
  } else {
    theme.classList.remove('theme-light');
    document.querySelector('.clock-wrapper').classList.remove('clock-wrapper-active');
    document.querySelector('.title').classList.remove('title-active');
    document.documentElement.classList.remove('active-html');
    document.querySelector('.digital-time').classList.remove('digital-time-light');
    document.querySelectorAll('.num').forEach((e) => e.classList.remove('num-active'));
    document.querySelector('.dot').classList.remove('dot-active');
    document.querySelector('.second-arrow').classList.remove('second-arrow-active')
    isTheme = 1;
    localStorage.setItem('isTheme', 1)
  }
}

startTheme(Number(isTheme));
setTime();
setDigitalTime();

setInterval(setTime, 1000);
setInterval(setDigitalTime, 1000);

theme.addEventListener('click', setTheme);


