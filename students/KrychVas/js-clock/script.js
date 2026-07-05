const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

// --- Елементи для звуку (Stage 3) ---
const soundToggle = document.getElementById('sound-toggle');
let isSoundOn = false; // За замовчуванням звук вимкнено

// Ініціалізуємо Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

// Функція генерації реалістичного глухого механічного цокання
function playTickSound() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // Синусоїдальна хвиля дає м'який, природний звук
  osc.type = 'sine'; 
  
  // Низька частота (350Hz) робить звук глухим, як у справжньому дерев'яному чи пластиковому корпусі
  osc.frequency.setValueAtTime(350, audioCtx.currentTime); 
  
  // Надшвидке згасання (0.015 с) створює ефект чіткого механічного "тук"
  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime); 
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.015);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.015);
}

// Перемикач звуку (Mute/Unmute)
soundToggle.addEventListener('click', () => {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    soundToggle.textContent = '🔊';
    soundToggle.classList.add('active');
    // Створюємо аудіо-контекст першим кліком користувача
    if (!audioCtx) audioCtx = new AudioContext();
    playTickSound(); 
  } else {
    soundToggle.textContent = '🔇';
    soundToggle.classList.remove('active');
  }
});

// --- Основна логіка годинника ---
function setDate() {
  const now = new Date();

  // 1. Рух секундної стрілки
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  
  // Прибираємо ефект "відкручування назад" на 0-й секунді
  if (seconds === 0) {
    secondHand.style.transition = 'none';
  } else {
    secondHand.style.transition = ''; 
  }
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  // Відтворюємо звук цокання щосекунди, якщо активовано кнопку
  if (isSoundOn) {
    playTickSound();
  }

  // 2. Рух хвилинної стрілки
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  // 3. Рух годинної стрілки
  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Запуск годинника
setInterval(setDate, 1000);
setDate();

// --- Логіка кастомізації кольорів (Stage 3) ---
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));