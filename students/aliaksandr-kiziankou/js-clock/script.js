const SECOND_HAND = document.querySelector('.sec-hand');
const MIN_HAND = document.querySelector('.min-hand');
const HOUR_HAND = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsToDegrees = (seconds * 6) + 90;
    
    const mins = now.getMinutes();
    const minsToDegrees = (mins * 6) + (seconds / 10) + 90;

    const hours = now.getHours();
    const hoursToDegrees = ((hours % 12) * 30) + (mins / 2) + (seconds / 120) + 90;

    if (seconds === 0) {
        SECOND_HAND.style.transition = 'none';
    }

    if (mins === 0 && seconds === 0) {
        MIN_HAND.style.transition = 'none';
    }

    if (hours % 12 === 0 && mins === 0 && seconds === 0) {
        HOUR_HAND.style.transition = 'none';
    }

    SECOND_HAND.style.transform = `rotate(${secondsToDegrees}deg)`;
    MIN_HAND.style.transform = `rotate(${minsToDegrees}deg)`;
    HOUR_HAND.style.transform = `rotate(${hoursToDegrees}deg)`;

    if (seconds === 0) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                SECOND_HAND.style.transition = '';
                MIN_HAND.style.transition = '';
                if (hours % 12 === 0 && mins === 0) {
                    HOUR_HAND.style.transition = '';
                }
            });
        });
    } else if (hours % 12 === 0 && mins === 0 && seconds === 1) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                HOUR_HAND.style.transition = '';
            });
        });
    }

    checkAlarmTime(hours, mins, seconds);
}

setInterval(setDate, 1000);


/*------------------------Digital Clock------------------------*/


const DIGITAL_CLOCK = document.querySelector('.digital-clock');

const GET_TIME = new Intl.DateTimeFormat(("en-US"), {
    dateStyle: "full",
    timeStyle: "medium"
});


function updateTime() {
    DIGITAL_CLOCK.textContent = GET_TIME.format(new Date());
}

setInterval(updateTime, 1000);


/*----------------------Time Zones Section----------------------*/


const timeZoneClocks = document.querySelectorAll('.timezone-clock');

function setTimeZoneClock(clock) {
    const timeZone = clock.dataset.timezone;

    const getTime = new Intl.DateTimeFormat(("en-US"), {
        timeZone,
        dateStyle: "full",
        timeStyle: "medium"
    });

    clock.textContent = getTime.format(new Date());
}

function updateAllTimeZoneClocks() {
    timeZoneClocks.forEach(setTimeZoneClock);
}

updateAllTimeZoneClocks();
setInterval(updateAllTimeZoneClocks, 1000);


/*-------------------------Theme Toggle-------------------------*/


const THEME_TOGGLE = document.querySelector('.theme-toggle');
const THEME_TOGGLE_PIC = document.querySelector('.theme-toggle-pic');
const CREDITS = document.querySelector('.credits');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        THEME_TOGGLE_PIC.textContent = '🌙';
        CREDITS.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark-theme');
        THEME_TOGGLE_PIC.textContent = '☀️';
        CREDITS.classList.remove('hidden');
    }
}

const savedTheme = localStorage.getItem('theme') || 'light';

applyTheme(savedTheme);

THEME_TOGGLE.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';

    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    THEME_TOGGLE.classList.toggle('active');
});


/*----------------------------Alarm----------------------------*/


const ALARM_BTN = document.querySelector('.alarm-btn');
const ALARM_STOP_BTN = document.querySelector('.alarm-stop-btn');
const ALARM_SNOOZE_BTN = document.querySelector('.alarm-snooze-btn');
const ALARM = document.querySelector('.alarm');
const ALARM_RING = new Audio('assets/sounds/alarm.mp3');
const SNOOZE = document.querySelector('.snooze-duration');
const MODAL_WINDOW = document.querySelector('.modal-window');

let alarmTime = null;

const savedAlarm = localStorage.getItem('alarmTime');
alarmTime = savedAlarm ? JSON.parse(savedAlarm) : null;

ALARM_BTN.addEventListener('click', () => {
    const timeParts = ALARM.value.split(':');
    alarmTime = {hours: parseInt(timeParts[0], 10), mins: parseInt(timeParts[1], 10)};

    ALARM_BTN.classList.add('active-btn');

    localStorage.setItem('alarmTime', JSON.stringify(alarmTime));
});

function checkAlarmTime(hours, mins, seconds) {
    if (!alarmTime) return;

    if (hours === alarmTime.hours && mins === alarmTime.mins && seconds === 0) {
        triggerAlarm();

        alarmTime = null;
        localStorage.removeItem('alarmTime');
    }

}

function triggerAlarm() {
    ALARM_RING.loop = true;
    ALARM_RING.play();

    MODAL_WINDOW.classList.remove('hide');
}

ALARM_STOP_BTN.addEventListener('click' , () => {
    ALARM_RING.pause();
    ALARM_RING.currentTime = 0;
    alarmTime = null;
    ALARM_BTN.classList.remove('active-btn');
    localStorage.removeItem('alarmTime');
});

ALARM_SNOOZE_BTN.addEventListener('click', () => {
    const snoozeMinutes = parseInt(SNOOZE.value, 10);

    const now = new Date();
    now.setMinutes(now.getMinutes() + snoozeMinutes);

    ALARM_RING.pause();
    ALARM_RING.currentTime = 0;
    alarmTime = {hours: now.getHours(), mins: now.getMinutes()};
    localStorage.setItem('alarmTime', JSON.stringify(alarmTime));
});

MODAL_WINDOW.addEventListener('click', () => {
    MODAL_WINDOW.classList.add('hide');
});