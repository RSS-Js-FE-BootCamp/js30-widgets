//ОСНОВНОЙ ФУНКЦИОНАЛ
const keys = document.querySelectorAll('.key');

//удаляет класс анимации, когда событие закончилось
const removeTransition = (event) => {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
}

//воспроизведение аудио при нажатии на клавишу
const playSound = (event) => {
  const audio = document.querySelector(`audio[data-key="${event.code}"]`);
  const key = document.querySelector(`.key[data-key="${event.code}"]`);

  if (!audio || !key) {
    return;
  }

  key.classList.add('playing');

  audio.currentTime = 0;
  audio.play();
}

//слушатель окончания анимации
keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);
});

window.addEventListener('keydown', playSound);


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
