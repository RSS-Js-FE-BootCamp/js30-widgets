const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const digitalTime = document.getElementById('digital-time');
const digitalDate = document.getElementById('digital-date');

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = (seconds / 60) * 360;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 3600) * 360;
  const hourDeg = ((hours % 12) / 12) * 360 + (minutes / 720) * 360;

  if (seconds === 0) {
    secondHand.style.transition = 'none';
  } else {
    secondHand.style.transition = '';
  }

  secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  digitalTime.textContent = now.toLocaleTimeString('en-GB');
  digitalDate.innerHTML = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const circumference = 283;
  
  document.getElementById('seconds-ring').style.strokeDashoffset = 
    circumference - (seconds / 60) * circumference;
  document.getElementById('seconds-value').textContent = 
    String(seconds).padStart(2, '0');

  document.getElementById('minutes-ring').style.strokeDashoffset = 
    circumference - (minutes / 60) * circumference;
  document.getElementById('minutes-value').textContent = 
    String(minutes).padStart(2, '0');

  document.getElementById('hours-ring').style.strokeDashoffset = 
    circumference - ((hours % 12) / 12) * circumference;
  document.getElementById('hours-value').textContent = 
    String(hours).padStart(2, '0');
}

function renderClockFace() {
  const clock = document.querySelector('.clock');
  const numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  numbers.forEach((num, i) => {
    const span = document.createElement('span');
    span.classList.add('clock-number');
    span.textContent = num;

    const angle = (i / 12) * 360 - 90;
    const radius = 42;
    const x = 50 + radius * Math.cos(angle * Math.PI / 180);
    const y = 50 + radius * Math.sin(angle * Math.PI / 180);

    span.style.left = `${x}%`;
    span.style.top = `${y}%`;

    clock.appendChild(span);
  });
}

const themeBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('clock-theme');
if (saved === 'light') document.body.classList.add('light');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('clock-theme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
});

renderClockFace();
updateClock();
setInterval(updateClock, 1000);

console.log('%c=== Self-evaluation: JS Clock ===', 'font-weight:bold;font-size:14px');
console.table([
  { stage: 1, item: 'Visual match with original', points: 10 },
  { stage: 1, item: 'Hands rotate correctly in real time', points: 10 },
  { stage: 2, item: 'Digital clock panel with time, date, weekday, year', points: 15 },
  { stage: 3, item: 'Clock face numbers rendered dynamically', points: 10 },
  { stage: 3, item: 'Dark/light theme toggle with localStorage', points: 10 },
  { stage: 3, item: 'Circular progress rings for seconds/minutes/hours', points: 10 },
]);
console.log('Claimed total: 65/65');