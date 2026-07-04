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
        MINS_HAND.style.transition = 'none';
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