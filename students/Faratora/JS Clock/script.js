const secondHand = document.getElementById('second-hand');
const minHand = document.getElementById('min-hand');
const hourHand = document.getElementById('hour-hand');

const digitalTime = document.getElementById('digital-time');
const digitalDay = document.getElementById('digital-day');
const digitalDate = document.getElementById('digital-date');
const digitalYear = document.getElementById('digital-year');

const hoursProgress = document.getElementById('hours-progress');
const minutesProgress = document.getElementById('minutes-progress');
const secondsProgress = document.getElementById('seconds-progress');

const themeBtn = document.getElementById('theme-btn');
const citiesGrid = document.getElementById('cities-grid');

// === КУКУШКА ===
const cuckooDoor = document.getElementById('cuckoo-door');
const cuckooBird = document.getElementById('cuckoo-bird');
const cuckooIndicator = document.getElementById('cuckoo-indicator');
const cuckooSoundBtn = document.getElementById('cuckoo-sound-btn');
let isCuckooActive = false;
let lastCuckooHour = -1;
let cuckooAudioCtx = null;
let cuckooSoundEnabled = false;

// Инициализация AudioContext по клику
if (cuckooSoundBtn) {
  cuckooSoundBtn.addEventListener('click', () => {
    if (!cuckooAudioCtx) {
      cuckooAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    cuckooAudioCtx.resume().then(() => {
      cuckooSoundEnabled = true;
      cuckooSoundBtn.textContent = '🔊 Звук кукушки включён';
      cuckooSoundBtn.classList.add('enabled');
    });
  });
}

// === БУДИЛЬНИК ===
const alarmHoursInput = document.getElementById('alarm-hours');
const alarmMinutesInput = document.getElementById('alarm-minutes');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const clearAlarmBtn = document.getElementById('clear-alarm-btn');
const snoozeBtn = document.getElementById('snooze-btn');
const alarmStatus = document.getElementById('alarm-status');

let alarmTime = null;
let isAlarmRinging = false;
let alarmSound = null;

function createAlarmSound() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.value = 800;
    
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.5);
    
    const playAlarm = () => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      
      function playBeep(frequency, duration, volume) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }
      
      const pattern = [
        { freq: 800, duration: 0.2, volume: 0.3 },
        { freq: 1000, duration: 0.2, volume: 0.3 },
        { freq: 800, duration: 0.2, volume: 0.3 },
        { freq: 1000, duration: 0.3, volume: 0.3 }
      ];
      
      let time = 0;
      pattern.forEach((p, index) => {
        setTimeout(() => {
          playBeep(p.freq, p.duration, p.volume);
        }, time * 1000);
        time += p.duration + 0.1;
      });
    };
    
    return playAlarm;
  } catch (e) {
    console.warn('Web Audio API не поддерживается');
    return () => {
      console.log('🔔 БУДИЛЬНИК!');
    };
  }
}

function ringAlarm() {
  if (!isAlarmRinging) return;
  
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(freq, duration, volume) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    }
    
    playBeep(800, 0.2, 0.3);
    setTimeout(() => playBeep(1000, 0.2, 0.3), 200);
    setTimeout(() => playBeep(800, 0.2, 0.3), 400);
    setTimeout(() => playBeep(1000, 0.3, 0.3), 600);
    
  } catch (e) {
    console.log('🔔 БУДИЛЬНИК!');
  }
  
  if (isAlarmRinging) {
    setTimeout(ringAlarm, 1500);
  }
}

function setAlarm() {
  const hours = parseInt(alarmHoursInput.value);
  const minutes = parseInt(alarmMinutesInput.value);
  
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    alert('Пожалуйста, введите корректное время (часы: 0-23, минуты: 0-59)');
    return;
  }
  
  alarmTime = { hours, minutes };
  isAlarmRinging = false;
  
  alarmStatus.textContent = `⏰ Будильник установлен на ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  alarmStatus.className = 'alarm-status active';
  
  setAlarmBtn.disabled = true;
  clearAlarmBtn.disabled = false;
  snoozeBtn.disabled = true;
  
  console.log(`Будильник установлен на ${hours}:${minutes}`);
}

function clearAlarm() {
  alarmTime = null;
  isAlarmRinging = false;
  
  alarmStatus.textContent = '⏰ Будильник отключен';
  alarmStatus.className = 'alarm-status';
  
  setAlarmBtn.disabled = false;
  clearAlarmBtn.disabled = true;
  snoozeBtn.disabled = true;
  
  console.log('Будильник отключен');
}

function snoozeAlarm() {
  if (!alarmTime) return;
  
  let newMinutes = alarmTime.minutes + 5;
  let newHours = alarmTime.hours;
  
  if (newMinutes >= 60) {
    newMinutes -= 60;
    newHours = (newHours + 1) % 24;
  }
  
  alarmTime = { hours: newHours, minutes: newMinutes };
  isAlarmRinging = false;
  
  alarmStatus.textContent = `⏰ Отложено на 5 минут (${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')})`;
  alarmStatus.className = 'alarm-status active';
  
  snoozeBtn.disabled = true;
  
  console.log(`Будильник отложен до ${newHours}:${newMinutes}`);
}

function checkAlarm() {
  if (!alarmTime || isAlarmRinging) return;
  
  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  if (currentHours === alarmTime.hours && currentMinutes === alarmTime.minutes) {
    isAlarmRinging = true;
    alarmStatus.textContent = '🔔 БУДИЛЬНИК ЗВОНИТ! 🔔';
    alarmStatus.className = 'alarm-status ringing';
    
    snoozeBtn.disabled = false;
    clearAlarmBtn.disabled = false;
    
    ringAlarm();
    
    console.log('🔔 Будильник сработал!');
  }
}

const cities = [
  { name: 'Москва', timezone: 'Europe/Moscow' },
  { name: 'Лондон', timezone: 'Europe/London' },
  { name: 'Нью-Йорк', timezone: 'America/New_York' },
  { name: 'Токио', timezone: 'Asia/Tokyo' },
  { name: 'Сидней', timezone: 'Australia/Sydney' },
  { name: 'Дубай', timezone: 'Asia/Dubai' },
  { name: 'Париж', timezone: 'Europe/Paris' },
  { name: 'Лос-Анджелес', timezone: 'America/Los_Angeles' }
];

function createCityCards() {
  citiesGrid.innerHTML = '';
  cities.forEach(city => {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.dataset.timezone = city.timezone;
    card.innerHTML = `
      <div class="city-name">${city.name}</div>
      <div class="city-time" id="city-time-${city.timezone.replace('/', '-')}">--:--:--</div>
      <div class="city-date" id="city-date-${city.timezone.replace('/', '-')}">--</div>
      <div class="city-offset">${getTimezoneOffset(city.timezone)}</div>
    `;
    citiesGrid.appendChild(card);
  });
}

function getTimezoneOffset(timezone) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ru', {
      timeZone: timezone,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    return tzPart ? tzPart.value : 'UTC';
  } catch (e) {
    return 'UTC';
  }
}

function updateWorldTimes() {
  cities.forEach(city => {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('ru', {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const dateFormatter = new Intl.DateTimeFormat('ru', {
        timeZone: city.timezone,
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const timeStr = formatter.format(now);
      const dateStr = dateFormatter.format(now);
      
      const timeId = `city-time-${city.timezone.replace('/', '-')}`;
      const dateId = `city-date-${city.timezone.replace('/', '-')}`;
      
      const timeEl = document.getElementById(timeId);
      const dateEl = document.getElementById(dateId);
      
      if (timeEl) timeEl.textContent = timeStr;
      if (dateEl) dateEl.textContent = dateStr;
    } catch (e) {
      console.warn(`Timezone ${city.timezone} not supported`);
    }
  });
}

function cuckooChime(chimeCount) {
  if (!cuckooDoor || !cuckooBird || !cuckooIndicator) return;
  if (isCuckooActive) return;
  isCuckooActive = true;

  cuckooIndicator.textContent = `🐦 Кукушка кукует ${chimeCount} раз... 🕐`;
  
  cuckooDoor.classList.add('open');
  
  setTimeout(() => {
    cuckooBird.classList.add('show');
    
    let chimeIndex = 0;
    
    function playChime() {
      if (chimeIndex >= chimeCount) {
        setTimeout(() => {
          cuckooBird.classList.remove('show', 'chiming');
          cuckooDoor.classList.remove('open');
          isCuckooActive = false;
          cuckooIndicator.textContent = 'Кукушка ждёт...';
          lastCuckooHour = -1;
        }, 300);
        return;
      }
      
      cuckooBird.classList.add('chiming');
      playCuckooSound();
      cuckooIndicator.textContent = `🐦 Кукует! ${chimeIndex + 1}/${chimeCount}`;
      
      setTimeout(() => {
        cuckooBird.classList.remove('chiming');
        chimeIndex++;
        setTimeout(playChime, 400);
      }, 300);
    }
    
    setTimeout(playChime, 300);
    
  }, 500);
}

function playCuckooSound() {
  if (!cuckooSoundEnabled || !cuckooAudioCtx) return;
  
  try {
    const osc1 = cuckooAudioCtx.createOscillator();
    const gain1 = cuckooAudioCtx.createGain();
    osc1.connect(gain1);
    gain1.connect(cuckooAudioCtx.destination);
    osc1.type = 'sine';
    osc1.frequency.value = 600;
    gain1.gain.setValueAtTime(0.15, cuckooAudioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, cuckooAudioCtx.currentTime + 0.15);
    osc1.start();
    osc1.stop(cuckooAudioCtx.currentTime + 0.15);
    
    setTimeout(() => {
      const osc2 = cuckooAudioCtx.createOscillator();
      const gain2 = cuckooAudioCtx.createGain();
      osc2.connect(gain2);
      gain2.connect(cuckooAudioCtx.destination);
      osc2.type = 'sine';
      osc2.frequency.value = 400;
      gain2.gain.setValueAtTime(0.12, cuckooAudioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, cuckooAudioCtx.currentTime + 0.2);
      osc2.start();
      osc2.stop(cuckooAudioCtx.currentTime + 0.2);
    }, 150);
    
  } catch (e) {
    console.log('🐦 Ку-ку!');
  }
}

function checkCuckoo() {
  if (!cuckooDoor || !cuckooBird || !cuckooIndicator) return;
  
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Каждый час (в 00 минут)
  if (minutes === 0 && seconds === 0 && hours !== lastCuckooHour && !isCuckooActive) {
    lastCuckooHour = hours;
    cuckooChime(hours === 0 ? 12 : hours);
  }
  
  if (minutes !== 0 && !isCuckooActive) {
    lastCuckooHour = -1;
  }
}

let prevSecond = -1;
let isTransitionDisabled = false;

function updateMainClock() {
  const now = new Date();
  
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const isSecondRollover = prevSecond === 59 && seconds === 0;
  
  const secondsDeg = (seconds / 60) * 360;
  const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  if (isSecondRollover) {
    secondHand.classList.add('no-transition');
    minHand.classList.add('no-transition');
    hourHand.classList.add('no-transition');
    isTransitionDisabled = true;
  }

  secondHand.style.transform = `rotate(${secondsDeg}deg)`;
  minHand.style.transform = `rotate(${minutesDeg}deg)`;
  hourHand.style.transform = `rotate(${hoursDeg}deg)`;

  if (isTransitionDisabled) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        secondHand.classList.remove('no-transition');
        minHand.classList.remove('no-transition');
        hourHand.classList.remove('no-transition');
        isTransitionDisabled = false;
      });
    });
  }

  prevSecond = seconds;

  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  digitalTime.textContent = `${hh}:${mm}:${ss}`;

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  
  digitalDay.textContent = days[now.getDay()];
  digitalDate.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
  digitalYear.textContent = now.getFullYear();

  const secProgress = (seconds / 60) * 100;
  const minProgress = (minutes / 60) * 100;
  const hourProgress = ((now.getHours() % 12) / 12) * 100;

  secondsProgress.textContent = `${Math.round(secProgress)}%`;
  minutesProgress.textContent = `${Math.round(minProgress)}%`;
  hoursProgress.textContent = `${Math.round(hourProgress)}%`;

  document.querySelector('#progress-seconds').style.setProperty('--progress', `${secProgress}%`);
  document.querySelector('#progress-minutes').style.setProperty('--progress', `${minProgress}%`);
  document.querySelector('#progress-hours').style.setProperty('--progress', `${hourProgress}%`);

  updateWorldTimes();
  checkAlarm();
  checkCuckoo();
}

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

setAlarmBtn.addEventListener('click', setAlarm);
clearAlarmBtn.addEventListener('click', clearAlarm);
snoozeBtn.addEventListener('click', snoozeAlarm);
themeBtn.addEventListener('click', toggleTheme);

createCityCards();
updateMainClock();
setInterval(updateMainClock, 1000);
loadTheme();

alarmHoursInput.addEventListener('change', function() {
  let val = parseInt(this.value);
  if (isNaN(val) || val < 0) this.value = 0;
  if (val > 23) this.value = 23;
  if (this.value.length === 1) this.value = '0' + this.value;
});

alarmMinutesInput.addEventListener('change', function() {
  let val = parseInt(this.value);
  if (isNaN(val) || val < 0) this.value = 0;
  if (val > 59) this.value = 59;
  if (this.value.length === 1) this.value = '0' + this.value;
});