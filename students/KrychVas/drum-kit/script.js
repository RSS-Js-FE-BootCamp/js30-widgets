function playSound(e) {
  // Шукаємо аудіоелемент з відповідним data-key (працює і для клавіатури, і для кліків)
  const keyCode = e.keyCode || this.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  
  if (!audio) return; // Якщо натиснули іншу клавішу — ігноруємо

  audio.currentTime = 0; // Перемотуємо звук на початок (щоб можна було клікати швидко)
  audio.play();
  
  key.classList.add('playing'); // Додаємо ефект підсвічування
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // Чекаємо саме на завершення анімації transform
  this.classList.remove('playing'); // Прибираємо підсвічування
}

// 1. Слухаємо натискання клавіш на клавіатурі
window.addEventListener('keydown', playSound);

// 2. Слухаємо кліки мишкою по кнопках на екрані (додатковий бонус для зручності)
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition);
});