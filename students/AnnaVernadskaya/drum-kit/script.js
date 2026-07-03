//ОСНОВНОЙ ФУНКЦИОНАЛ
const keys = document.querySelectorAll('.key');

//запись мелодии
const recordButton = document.querySelector('[data-action="record"]');
const stopButton = document.querySelector('[data-action="stop"]');
const playButton = document.querySelector('[data-action="play"]');

let isRecording = false;
let isPlayingRecord = false;
let recordStartTime = 0;
let recordedMelody = [];

//воспроизведение аудио
const playSound = (keyCode) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio || !key) {
    return;
  }

    //запись мелодии
    if (isRecording && !isPlayingRecord) {
    recordedMelody.push({
      keyCode: keyCode,
      time: Date.now() - recordStartTime,
    });
  }

  key.classList.add('playing');

  audio.currentTime = 0;
  audio.play();
};

//удаляет класс анимации, когда событие закончилось
const removeTransition = (event) => {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
};

//воспроизведение аудио при нажатии на клавишу
const handleKeydown = (event) => {
  playSound(event.code);
};

//слушатель окончания анимации + мышка
keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);

  //слушатель клика по кнопкам
  key.addEventListener('click', (event) => {
    playSound(key.dataset.key);

    //нота при клике
    createFloatingNote(event);
  });
});

window.addEventListener('keydown', handleKeydown);

// ПЕРЕКЛЮЧЕНИЕ ТЕМ
const themeButtons = document.querySelectorAll('.theme-switcher__button');
const body = document.body;

const setTheme = (theme) => {
    body.classList.remove('theme-demo', 'theme-custom');
    body.classList.add(`theme-${theme}`);

    themeButtons.forEach((button) => {
      button.classList.remove('theme-switcher__button--active');

    if (button.dataset.theme === theme) {
      button.classList.add('theme-switcher__button--active');
    }
  });

  localStorage.setItem('drum-kit-theme', theme);
};

const savedTheme = localStorage.getItem('drum-kit-theme') || 'demo';

setTheme(savedTheme);

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setTheme(button.dataset.theme);
  });
});


//символ ноты при клике
const createFloatingNote = (event) => {
  const note = document.createElement('span');
  note.classList.add('floating-note');
  note.textContent = '♪';

  note.style.left = `${event.clientX}px`;
  note.style.top = `${event.clientY}px`;

  document.body.append(note);

  note.addEventListener('animationend', () => {
    note.remove();
  });
};

//запись мелодии

recordButton.addEventListener('click', () => {
  recordedMelody = [];
  recordStartTime = Date.now();
  isRecording = true;

  recordButton.classList.add('recorder__button--active');

  recordButton.disabled = true;
  stopButton.disabled = false;
  playButton.disabled = true;
});

stopButton.addEventListener('click', () => {
  isRecording = false;

  recordButton.classList.remove('recorder__button--active');

  recordButton.disabled = false;
  stopButton.disabled = true;

  if (recordedMelody.length > 0) {
    playButton.disabled = false;
  }
});

playButton.addEventListener('click', () => {
  if (recordedMelody.length === 0) {
    return;
  }

  isPlayingRecord = true;
  playButton.disabled = true;
  recordButton.disabled = true;

  recordedMelody.forEach((note) => {
    setTimeout(() => {
      playSound(note.keyCode);
    }, note.time);
  });

  const lastNote = recordedMelody[recordedMelody.length - 1];

  setTimeout(() => {
    isPlayingRecord = false;
    playButton.disabled = false;
    recordButton.disabled = false;
  }, lastNote.time + 500);
});
