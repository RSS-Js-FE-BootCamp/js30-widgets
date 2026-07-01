
const themeBtn = document.querySelector('.theme-btn');
const hourHand = document.querySelector('.hour-arrow');
const minuteHand = document.querySelector('.minute-arrow');
const secondHand = document.querySelector('.second-arrow');
const dateDisplay = document.querySelector('.display-date');
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const digitalClock = document.querySelector('.digital-clock');
const tickSound = new Audio('./assets/clock-ticking.mp3');
const soundBtn = document.querySelector('.sound-btn');
let isSoundOn = false;
soundBtn.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    if (isSoundOn) {
        soundBtn.textContent = "Mute";
    } else {
        soundBtn.textContent = "Unmute";
        tickSound.pause();
    }
});
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
}
let alarmTime = null;
let isAlarmSet = false;
const alarmSound = new Audio('./assets/taimer.mp3');
const alarmBtn = document.querySelector('.alarm-btn');
alarmBtn.addEventListener('click', () => {
    isAlarmSet = !isAlarmSet;
    if (isAlarmSet) {
        alarmTime = document.querySelector('.alarm-time').value;
        alarmBtn.textContent = "Stop Alarm";
    } else {
        alarmTime = null;
        alarmBtn.textContent = "Set Alarm";
        alarmSound.pause()
        alarmSound.currentTime = 0;
    }
});

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = seconds * 6;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const minutes = now.getMinutes();
    const minuteDegrees = (minutes * 6) + (seconds * 0.1);
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;

    const hours = now.getHours();
    const hourDegrees = (hours * 30) + (minutes * 0.5);
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    const dayOfMonth = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    dateDisplay.textContent = `${dayOfMonth} ${months[month]} ${year}`;
    if (isSoundOn) {
        tickSound.currentTime = 0;
        tickSound.play();
    }
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dataString = now.toLocaleDateString('en-EN', options);
    const timeString = now.toLocaleTimeString('en-EN');
    digitalClock.textContent = `${timeString} - ${dataString}`;

    document.getElementById('london-time').textContent = now.toLocaleTimeString('en-EN', { timeZone: 'Europe/London'});
    document.getElementById('tokyo-time').textContent = now.toLocaleTimeString('en-EN', { timeZone: 'Asia/Tokyo'});

    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeString = `${currentHours}:${currentMinutes}`;
    if(isAlarmSet && currentTimeString === alarmTime) {
        alarmSound.play();
    } else if (!isAlarmSet) {
        alarmSound.pause();
    }

}
setInterval(setDate, 1000);
setDate();
const marksContainer = document.querySelector('.marks-container');
for (let i = 0; i < 60; i++) {
    const mark = document.createElement('div');
    mark.classList.add('mark');
    if (i % 5 === 0) {
        mark.classList.add('big');
    }
    mark.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
    mark.style.transformOrigin = `50% 230px`;
    marksContainer.appendChild(mark);
};

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});
