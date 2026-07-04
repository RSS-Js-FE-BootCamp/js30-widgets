function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  key.classList.add('playing');
}

function removePlaying(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function spawnNote(x, y) {
  const notes = ['♩', '♪', '♫', '♬'];
  const note = document.createElement('span');
  note.classList.add('floating-note');
  note.textContent = notes[Math.floor(Math.random() * notes.length)];
  note.style.left = `${x}px`;
  note.style.top = `${y}px`;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 1000);
}

window.addEventListener('keydown', (e) => playSound(e.code));

document.querySelector('.keys').addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;
  playSound(key.dataset.key);
  spawnNote(e.clientX, e.clientY);
});

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('transitionend', removePlaying);
});

const themeBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('drum-theme');
if (saved === 'light') document.body.classList.add('light');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('drum-theme', isLight ? 'light' : 'dark');
  themeBtn.textContent = isLight ? '🌙' : '☀️';
});

console.log('%c=== Self-evaluation: Drum Kit ===', 'font-weight:bold;font-size:14px');
console.table([
  { stage: 1, item: 'Visual match with original', points: 10 },
  { stage: 1, item: 'Core behaviour - keyboard plays sounds', points: 10 },
  { stage: 2, item: 'Mouse click plays sounds with same feedback', points: 15 },
  { stage: 3, item: 'Floating notes spawn on click', points: 10 },
  { stage: 3, item: 'Dark/light theme toggle with localStorage', points: 10 },
]);
console.log('Claimed total: 55/65');