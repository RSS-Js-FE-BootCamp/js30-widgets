const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

const digitalTime = document.getElementById('digital-time');
const digitalDay = document.getElementById('digital-day');
const digitalDate = document.getElementById('digital-date');
const digitalYear = document.getElementById('digital-year');

const hoursProgress = document.getElementById('hours-progress');
const minutesProgress = document.getElementById('minutes-progress');
const secondsProgress = document.getElementById('seconds-progress');

const themeBtn = document.getElementById('theme-btn');


function updateClock() {
    const now = new Date();
    
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;
    
    const secondsDegrees = (seconds / 60) * 360;

    const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    
    const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    // === Цифровое время ===
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');
    digitalTime.textContent = `${hh}:${mm}:${ss}`;

    const days = [
      'Воскресенье', 
      'Понедельник', 
      'Вторник', 
      'Среда', 
      'Четверг', 
      'Пятница', 
      'Суббота'
    ];
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    digitalDay.textContent = days[now.getDay()];
    digitalDate.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
    digitalYear.textContent = now.getFullYear();

    // === Прогресс (круговые диаграммы) ===
    const secProgress = (seconds / 60) * 100;
    const minProgress = (minutes / 60) * 100;
    const hourProgress = ((now.getHours() % 12) / 12) * 100;

    secondsProgress.textContent = `${Math.round(secProgress)}%`;
    minutesProgress.textContent = `${Math.round(minProgress)}%`;
    hoursProgress.textContent = `${Math.round(hourProgress)}%`;

    document.querySelector('#progress-seconds').style.setProperty('--progress', `${secProgress}%`);
    document.querySelector('#progress-minutes').style.setProperty('--progress', `${minProgress}%`);
    document.querySelector('#progress-hours').style.setProperty('--progress', `${hourProgress}%`);
}

// === Тёмная/светлая тема ===
function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeBtn.textContent = isDark ? '☀️ Светлая' : '🌙 Тёмная';
    localStorage.setItem('clock-theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const saved = localStorage.getItem('clock-theme');
    if (saved === 'dark') {
        document.body.classList.add('dark');
        themeBtn.textContent = '☀️ Светлая';
    } else {
        document.body.classList.remove('dark');
        themeBtn.textContent = '🌙 Тёмная';
    }
}

themeBtn.addEventListener('click', toggleTheme);

updateClock();
setInterval(updateClock, 1000);
loadTheme();
