//ОСНОВНОЙ ФУНКЦИОНАЛ
const keys = document.querySelectorAll('.key');

//удаляет класс анимации, когда событие закончилось
const removeTransition = (event) => {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
}

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
}

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

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTheme = button.dataset.theme;

    body.classList.remove('theme-demo', 'theme-custom');
    body.classList.add(`theme-${selectedTheme}`);

    themeButtons.forEach((button) => {
      button.classList.remove('theme-switcher__button--active');
    });

    button.classList.add('theme-switcher__button--active');
  });
});
