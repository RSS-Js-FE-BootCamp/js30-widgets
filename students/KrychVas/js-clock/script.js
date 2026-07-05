const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalDisplay = document.getElementById('digital'); // Новий елемент

// --- Елементи для звуку (Stage 3) ---
const soundToggle = document.getElementById('sound-toggle');
let isSoundOn = false;

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playTickSound() {
  if (!audioCtx) audioCtx = new AudioContext();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = 'sine'; 
  osc.frequency.setValueAtTime(350, audioCtx.currentTime); 
  
  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); 
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.015);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.015);
}

soundToggle.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    soundToggle.textContent = '🔊';
    soundToggle.classList.add('active');
    if (!audioCtx) audioCtx = new AudioContext();
    playTickSound(); 
  } else {
    soundToggle.textContent = '🔇';
    soundToggle.classList.remove('active');
  }
});

// Допоміжна функція для додавання ведучого нуля (наприклад, 9 -> 09)
const padZero = (num) => String(num).padStart(2, '0');

// --- Основна логіка годинника ---
function setDate() {
  const now = new Date();

  // Отримуємо поточні значення часу
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hour = now.getHours();

  // Оновлюємо цифрове табло
  digitalDisplay.textContent = `${padZero(hour)}:${padZero(mins)}:${padZero(seconds)}`;

  // 1. Рух секундної стрілки
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  if (seconds === 0) {
    secondHand.style.transition = 'none';
  } else {
    secondHand.style.transition = ''; 
  }
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  if (isSoundOn) {
    playTickSound();
  }

  // 2. Рух хвилинної стрілки
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  // 3. Рух годинної стрілки
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
setDate();

// --- Логіка кастомізації кольорів ---
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

// Масив із посиланнями на фонові зображення
const backgrounds = [
  'url(https://unsplash.it/1500/1000?image=881&blur=5)',
  'url("https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1950&q=80")'  
];

let currentBgIndex = 0;
const bgToggleBtn = document.getElementById('bg-toggle');

bgToggleBtn.addEventListener('click', () => {
  // Збільшуємо індекс на 1, а якщо дійшли до кінця — повертаємося на 0
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  
  // Змінюємо властивість background безпосередньо у тегу html
  document.documentElement.style.background = backgrounds[currentBgIndex];
  document.documentElement.style.backgroundSize = 'cover';
  document.documentElement.style.backgroundPosition = 'center';
});