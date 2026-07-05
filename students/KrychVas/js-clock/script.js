const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  
 
  if (seconds === 0) {
    secondHand.style.transition = 'none';
  } else {
    secondHand.style.transition = ''; 
  }
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
setDate();

// --- Логіка кастомізації кольорів (Stage 3) ---

// Знаходимо обидва інпути всередині панелі .controls
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  // Цей рядок бере назву інпуту (base або hand) і оновлює відповідну CSS-змінну в :root
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

// Слухаємо зміну значення (change) та рух повзунка (mousemove) для кожного інпуту
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));