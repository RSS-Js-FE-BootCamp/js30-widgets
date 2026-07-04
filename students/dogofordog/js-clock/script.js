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

renderClockFace();

updateClock();
setInterval(updateClock, 1000);

console.log('%c=== Self-evaluation: JS Clock ===', 'font-weight:bold;font-size:14px');
console.table([
  { stage: 1, item: 'Visual match with original', points: 10 },
  { stage: 1, item: 'Hands rotate correctly in real time', points: 10 },
  { stage: 2, item: 'Digital clock panel with time, date, weekday, year', points: 15 },
  { stage: 3, item: 'Clock face numbers rendered dynamically', points: 10 },
]);
console.log('Claimed total: 45/65');