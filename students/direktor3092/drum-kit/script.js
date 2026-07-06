const keyNames = {
  65: 'C', 83: 'D', 68: 'E', 70: 'F', 71: 'G', 72: 'A', 74: 'B', 75: 'C', 76: 'D'
};
const drumSoundNames = {
  65: 'clap', 83: 'hihat', 68: 'kick', 70: 'openhat',
  71: 'boom', 72: 'ride', 74: 'snare', 75: 'tom', 76: 'tink'
};
const instrumentPaths = {
  drums: 'sounds/drums/',
  piano: 'sounds/piano/'
};

const soundFiles = {
  65: 'clap.wav',
  83: 'hihat.wav',
  68: 'kick.wav',
  70: 'openhat.wav',
  71: 'boom.wav',
  72: 'ride.wav',
  74: 'snare.wav',
  75: 'tom.wav',
  76: 'tink.wav'
};

const audioCache = {};

let currentInstrument = 'drums';

function playSound(keyCode) {
  const file = soundFiles[keyCode];
  if (!file) return;
  const folder = instrumentPaths[currentInstrument];
  const path = folder + file;
  if (!audioCache[path]) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    audioCache[path] = audio;
  }

  const audio = audioCache[path];
  audio.currentTime = 0;
  audio.play().catch(e => console.warn('Audio error:', e));
}

function animateKey(keyCode) {
  const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!keyElement) return;
  keyElement.classList.add('playing');
  setTimeout(() => {
    keyElement.classList.remove('playing');
  }, 100);
}


const noteDisplay = document.getElementById('current-note');

function updateCurrentNote(keyCode) {
  if (currentInstrument === 'drums') {
    const name = drumSoundNames[keyCode] || '?';
    noteDisplay.textContent = `🥁 ${name}`;
  } else {
    const note = keyNames[keyCode] || '?';
    noteDisplay.textContent = `🎵 ${note} (🎹 Piano)`;
  }
}

function updateLabels() {
  document.querySelectorAll('.key').forEach(key => {
    const keyCode = parseInt(key.dataset.key, 10);
    const soundSpan = key.querySelector('.sound');
    if (!soundSpan) return;
    if (currentInstrument === 'drums') {
      soundSpan.textContent = drumSoundNames[keyCode] || '';
    } else {
      soundSpan.textContent = keyNames[keyCode] || '';
    }
  });
}

function spawnFloatingNote(keyCode, x, y) {
  const emojis = ['🎵', '🎶', '🥁', '✨', '🎹', '❤️', '💥'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  const note = document.createElement('div');
  note.className = 'floating-note';
  note.textContent = emoji;
  note.style.left = (x - 20) + 'px';
  note.style.top = (y - 20) + 'px';
  note.style.fontSize = (2 + Math.random() * 1.5) + 'rem';
  note.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 1200);
}

const instrumentBtns = document.querySelectorAll('.instrument-btn');

instrumentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    instrumentBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentInstrument = btn.dataset.instrument;
    updateLabels();
    noteDisplay.textContent = `🎵 Инструмент: ${btn.textContent}`;
    setTimeout(() => {
      updateCurrentNote(65);
    }, 300);
  });
});

function handleKeyDown(e) {
  const keyCode = e.keyCode;
  if (!soundFiles[keyCode]) return;
  playSound(keyCode);
  animateKey(keyCode);
  updateCurrentNote(keyCode);
  spawnFloatingNote(keyCode, window.innerWidth / 2, window.innerHeight / 2);
}

window.addEventListener('keydown', handleKeyDown);

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('click', () => {
    const keyCode = parseInt(key.dataset.key, 10);
    if (soundFiles[keyCode]) {
      playSound(keyCode);
      animateKey(keyCode);
      updateCurrentNote(keyCode);
      const rect = key.getBoundingClientRect();
      spawnFloatingNote(keyCode, rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  });
});

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('drum-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.textContent = '☀️ Светлая';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  themeToggle.textContent = isLight ? '☀️ Светлая' : '🌙 Тёмная';
  localStorage.setItem('drum-theme', isLight ? 'light' : 'dark');
});

updateLabels();
updateCurrentNote(65);
