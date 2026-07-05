let secondArrow = document.querySelector('.second-arrow');
let minuteArrow = document.querySelector('.min-arrow');
let hourArrow = document.querySelector('.hour-arrow');
let isTheme = 1;
let isName = 1;
// Theme
const theme = document.querySelector('#theme');
const muteBtn = document.querySelector('#btn-mute');
const audio = new Audio('../shared/sound.mp3');

document.addEventListener('DOMContentLoaded', () => {
  const isThemeStorage = localStorage.getItem('isTheme');
  const timeStorage = localStorage.getItem('audioTime');

  isTheme = Number(isThemeStorage);
  startTheme(Number(isThemeStorage));
  getSound(timeStorage);
});

function setTime() {
  const time = new Date();

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
    document.querySelector('#btn-mute').classList.add('btn-active');
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
    document.querySelector('.second-arrow').classList.remove('second-arrow-active');
    document.querySelector('#btn-mute').classList.remove('btn-active');
    isTheme = 1;
    localStorage.setItem('isTheme', 1)
  }
}
// Set time London, New-york
function setWorldTime() {
  const time = new Date();

  document.querySelector('.London').innerHTML = time.toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  document.querySelector('.New-York').innerHTML = time.toLocaleTimeString('ru-RU', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

// Set time 
startTheme(Number(isTheme));
setWorldTime();
setTime();
setDigitalTime();

setInterval(setTime, 1000);
setInterval(setDigitalTime, 1000);
setInterval(setWorldTime, 1000);

function sound() {
  if (Number(isName) === 1) {
    document.querySelector('#btn-mute').innerHTML = 'Mute';
    isName = 0;
    audio.play();
  } else {
    document.querySelector('#btn-mute').innerHTML = 'Unmute';
    audio.pause();
    isName = 1;
  }
}

function getSound(time) {
  document.querySelector('#btn-mute').innerHTML = 'Unmute';
  audio.currentTime = Number(time);
  isName = 1;
}

theme.addEventListener('click', setTheme);
muteBtn.addEventListener('click', sound);
audio.addEventListener('timeupdate', () => {
  localStorage.setItem('audioTime', audio.currentTime);
});


