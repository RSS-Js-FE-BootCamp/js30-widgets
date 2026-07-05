const keys = document.querySelectorAll('.key');
const themeToggle = document.querySelector('.theme-toggle');
const notesLayer = document.querySelector('.notes-layer');
const themeStorageKey = 'a-heras-drum-kit-theme';
const floatingSymbols = ['♪', '♫', '✦', '✧'];

function setTheme(theme) {
  const isLight = theme === 'light';

  document.body.classList.toggle('light-theme', isLight);
  themeToggle.textContent = isLight ? 'Dark mode' : 'Light mode';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  localStorage.setItem(themeStorageKey, theme);
}

function createRipple(key, pointerPosition) {
  const ripple = document.createElement('span');
  const rect = key.getBoundingClientRect();
  const x = pointerPosition ? pointerPosition.x - rect.left : rect.width / 2;
  const y = pointerPosition ? pointerPosition.y - rect.top : rect.height / 2;

  ripple.className = 'ripple';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  key.append(ripple);

  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

function createFloatingNote(key) {
  const rect = key.getBoundingClientRect();
  const note = document.createElement('span');
  const randomSymbol = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];

  note.className = 'floating-note';
  note.textContent = randomSymbol;
  note.style.left = `${rect.left + rect.width / 2}px`;
  note.style.top = `${rect.top + rect.height / 2}px`;
  notesLayer.append(note);

  note.addEventListener('animationend', () => {
    note.remove();
  });
}

function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  audio.play();
}

function activateKey(keyCode, pointerPosition) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!key) {
    return;
  }

  playSound(keyCode);
  key.classList.add('playing');
  createRipple(key, pointerPosition);
  createFloatingNote(key);
}

function removePlayingClass(event) {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.currentTarget.classList.remove('playing');
}

window.addEventListener('keydown', (event) => {
  activateKey(event.code);
});

keys.forEach((key) => {
  key.addEventListener('click', (event) => {
    activateKey(key.dataset.key, {
      x: event.clientX,
      y: event.clientY,
    });
  });

  key.addEventListener('transitionend', removePlayingClass);
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';

  setTheme(nextTheme);
});

setTheme(localStorage.getItem(themeStorageKey) || 'dark');
