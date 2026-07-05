// 1. Елементи керування
const volumeControl = document.querySelector('#volume');
const soundPackSelect = document.querySelector('#sound-pack');
const toggleHintsBtn = document.querySelector('#toggle-hints');
const keys = document.querySelectorAll('.key');

// База даних звуків для перемикання паків
const soundPacks = {
  original: {
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
  electronic: {
    // Перемішуємо стабільні звуки, створюючи абсолютно новий кастомний пресет!
    65: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/boom.wav",
    83: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/snare.wav",
    68: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tom.wav",
    70: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/tink.wav",
    71: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/ride.wav",
    72: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/openhat.wav",
    74: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/kick.wav",
    75: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/hihat.wav",
    76: "https://raw.githubusercontent.com/wesbos/JavaScript30/master/01%20-%20JavaScript%20Drum%20Kit/sounds/clap.wav"
  }
};

// 2. Функція відтворення звуку
function playSound(e) {
  const keyCode = e.keyCode || this.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  
  if (!audio) return;

  audio.volume = volumeControl.value;
  audio.currentTime = 0;
  audio.play();
  
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

// 3. ФІЧА 3: Зміна звукового паку
soundPackSelect.addEventListener('change', (e) => {
  const selectedPack = e.target.value;
  
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    const keyCode = audio.getAttribute('data-key');
    if (soundPacks[selectedPack][keyCode]) {
      audio.src = soundPacks[selectedPack][keyCode];
    }
  });
});

// 4. ФІЧА 2: Перемикання підказок
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

// 5. Слухачі подій
window.addEventListener('keydown', playSound);
keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition);
});