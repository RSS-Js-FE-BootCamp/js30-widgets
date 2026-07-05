const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const digitalDisplay = document.getElementById('digital'); 

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

const padZero = (num) => String(num).padStart(2, '0');

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hour = now.getHours();

  digitalDisplay.textContent = `${padZero(hour)}:${padZero(mins)}:${padZero(seconds)}`;

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

  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);
setDate();

const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const backgrounds = [
  'url("https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1950&q=80")', 
  'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1950&q=80")',
  'url("https://unsplash.it/1500/1000?image=881&blur=5")'  
];

let currentBgIndex = 0;
const bgToggleBtn = document.getElementById('bg-toggle');

bgToggleBtn.addEventListener('click', () => {
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  document.documentElement.style.backgroundImage = backgrounds[currentBgIndex];
});

const clockFace = document.querySelector('.clock-face');
const dialToggleBtn = document.getElementById('dial-toggle');
const numbersColorGroup = document.getElementById('numbers-color-group');

const arabicNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

let currentDialMode = 2; 

function renderClockNumbers(mode) {
  const oldNumbers = document.querySelectorAll('.clock-number');
  oldNumbers.forEach(num => num.remove());

  if (mode === 2) return;

  const numbersArray = mode === 0 ? arabicNumbers : romanNumbers;
  const radius = 125; 

  numbersArray.forEach((num, index) => {
    const numberElement = document.createElement('div');
    numberElement.classList.add('clock-number');
    numberElement.textContent = num;

    const angle = ((index + 1) * 30 - 90) * (Math.PI / 180);
    const x = Math.round(radius * Math.cos(angle));
    const y = Math.round(radius * Math.sin(angle));

    numberElement.style.transform = `translate(${x}px, ${y}px)`;
    clockFace.appendChild(numberElement);
  });
}

dialToggleBtn.addEventListener('click', () => {
  currentDialMode = (currentDialMode + 1) % 3;
  
  if (currentDialMode === 0) {
    dialToggleBtn.textContent = '🔢 ARABIC';
    numbersColorGroup.style.display = 'flex'; 
    digitalDisplay.style.display = 'none';    
  } else if (currentDialMode === 1) {
    dialToggleBtn.textContent = '🏛️ ROMAN';
    numbersColorGroup.style.display = 'flex'; 
    digitalDisplay.style.display = 'none';   
  } else {
    dialToggleBtn.textContent = '⭕ NO NUMBERS';
    numbersColorGroup.style.display = 'none'; 
    digitalDisplay.style.display = 'block';   
  }
  
  renderClockNumbers(currentDialMode);
});

renderClockNumbers(currentDialMode);