//ОСНОВНОЙ ФУНКЦИОНАЛ
const keys = document.querySelectorAll('.key');

//удаляет класс анимации, когда событие закончилось
const removeTransition = (event) => {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
};

//воспроизведение аудио
const playSound = (keyCode) => {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio || !key) {
    return;
  }

  key.classList.add('playing');

  audio.currentTime = 0;
  audio.play();
};

//воспроизведение аудио при нажатии на клавишу
const handleKeydown = (event) => {
  playSound(event.code);
};

//слушатель окончания анимации + мышка
keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);

  //слушатель клика по кнопкам
  key.addEventListener('click', () => {
    playSound(key.dataset.key);
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
