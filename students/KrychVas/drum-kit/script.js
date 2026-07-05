// 1. Елементи керування
const volumeControl = document.querySelector('#volume');
const soundPackSelect = document.querySelector('#sound-pack');
const toggleHintsBtn = document.querySelector('#toggle-hints');
const keys = document.querySelectorAll('.key');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// База даних звуків, частот та текстових підказок
const soundPacks = {
  original: {
    sounds: {
      65: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/clap.wav",
      83: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav",
      68: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/kick.wav",
      70: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav",
      71: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav",
      72: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav",
      74: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav",
      75: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav",
      76: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav"
    },
    names: { 65: "clap", 83: "hihat", 68: "kick", 70: "openhat", 71: "boom", 72: "ride", 74: "snare", 75: "tom", 76: "tink" }
  },
  electronic: {
    sounds: {
      65: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav",
      83: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav",
      68: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav",
      70: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav",
      71: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav",
      72: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav",
      74: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/kick.wav",
      75: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav",
      76: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/clap.wav"
    },
    names: { 65: "e-boom", 83: "e-snare", 68: "e-tom", 70: "e-tink", 71: "e-ride", 72: "e-open", 74: "e-kick", 75: "e-hihat", 76: "e-clap" }
  },
  piano: {
    // Всі частоти зібрані в один список клавіш клавіатури
    frequencies: {
      65: 261.63, // A -> Do
      87: 277.18, // W -> Do# (чорна)
      83: 293.66, // S -> Re
      69: 311.13, // E -> Re# (чорна)
      68: 329.63, // D -> Mi
      70: 349.23, // F -> Fa
      84: 369.99, // T -> Fa# (чорна)
      71: 392.00, // G -> Sol
      89: 415.30, // Y -> Sol# (чорна)
      72: 440.00, // H -> La
      85: 466.16, // U -> La# (чорна)
      74: 493.88, // J -> Si
      75: 523.25, // K -> Do 2
      79: 554.37, // O -> Do# 2 (чорна)
      76: 587.33  // L -> Re 2
    },
    names: { 65: "Do", 83: "Re", 68: "Mi", 70: "Fa", 71: "Sol", 72: "La", 74: "Si", 75: "Do 2", 76: "Re 2" }
  }
};

// Співвідношення між кодами чорних клавіш та батьківськими білими клавішами
const blackKeyMap = {
  87: 65, // W висить на клавіші A
  69: 83, // E висить на клавіші S
  84: 70, // T висить на клавіші F
  89: 71, // Y висить на клавіші G
  85: 72, // U висить на клавіші H
  79: 75  // O висить на клавіші K
};

// Спеціальна карта для кліків мишкою по зонах
const whiteToBlackClickMap = {
  65: 87, 83: 69, 70: 84, 71: 89, 72: 85, 75: 79
};

function playPianoTone(frequency) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'triangle';
  oscillator.frequency.value = frequency;
  
  const currentVolume = volumeControl.value;
  gainNode.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1.0);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 1.0);
}

// Головна функція
function playSound(e) {
  let keyCode = e.type === 'click' ? this.getAttribute('data-key') : e.keyCode;
  
  // Якщо режим піаніно, перевіряємо чи це клік мишкою у правій частині клавіші (зона чорної кнопки)
  if (soundPackSelect.value === 'piano' && e.type === 'click') {
    const clickX = e.offsetX;
    const buttonWidth = this.offsetWidth;
    // Якщо клікнули на крайні 18 пікселів справа, де візуально знаходиться чорна кнопка
    if (clickX > (buttonWidth - 18) && whiteToBlackClickMap[keyCode]) {
      keyCode = whiteToBlackClickMap[keyCode];
    }
  }

  // Шукаємо візуальний елемент для підсвічування
  let visualKeyCode = keyCode;
  let isBlack = false;
  
  if (blackKeyMap[keyCode]) {
    visualKeyCode = blackKeyMap[keyCode];
    isBlack = true;
  }

  const key = document.querySelector(`.key[data-key="${visualKeyCode}"]`);

  if (soundPackSelect.value === 'piano') {
    const freq = soundPacks.piano.frequencies[keyCode];
    if (!freq) return;
    playPianoTone(freq);
    
    if (key) {
      key.classList.add(isBlack ? 'black-playing' : 'playing');
    }
  } else {
    // Режим барабанів (ігнорує чорні кнопки з верхнього ряду)
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!audio) return;
    audio.volume = volumeControl.value;
    audio.currentTime = 0;
    audio.play();
    if (key) key.classList.add('playing');
  }
}

function removeTransition(e) {
  if (e.propertyName === 'transform' || e.propertyName === 'background-color') {
    this.classList.remove('playing');
  }
  this.classList.remove('black-playing');
}

// Зміна звукових паків
soundPackSelect.addEventListener('change', (e) => {
  const selectedPack = e.target.value;
  const keysContainer = document.querySelector('.keys');
  
  if (selectedPack === 'piano') {
    keysContainer.classList.add('piano-mode');
  } else {
    keysContainer.classList.remove('piano-mode');
  }
  
  if (selectedPack !== 'piano') {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
      const keyCode = audio.getAttribute('data-key');
      if (soundPacks[selectedPack].sounds[keyCode]) {
        audio.src = soundPacks[selectedPack].sounds[keyCode];
      }
    });
  }

  keys.forEach(key => {
    const keyCode = key.getAttribute('data-key');
    const soundSpan = key.querySelector('.sound');
    if (soundPacks[selectedPack].names[keyCode]) {
      soundSpan.textContent = soundPacks[selectedPack].names[keyCode];
    }
  });
});

toggleHintsBtn.addEventListener('click', () => {
  keys.forEach(key => key.classList.toggle('hints-hidden'));
  if (toggleHintsBtn.textContent === '🚫 Hide Hints') {
    toggleHintsBtn.textContent = '👁️ Show Hints';
    toggleHintsBtn.style.background = '#666';
    toggleHintsBtn.style.color = 'white';
  } else {
    toggleHintsBtn.textContent = '🚫 Hide Hints';
    toggleHintsBtn.style.background = '#ffc600';
    toggleHintsBtn.style.color = 'black';
  }
});

// Слухачі подій
window.addEventListener('keydown', playSound);
keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition);
});