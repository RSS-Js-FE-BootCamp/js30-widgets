// 1. Знаходимо наш повзунок гучності на самому початку
const volumeControl = document.querySelector('#volume');

// 2. Функція відтворення звуку
function playSound(e) {
  // Визначаємо код клавіші (підтримує і клавіатуру, і кліки мишкою)
  const keyCode = e.keyCode || this.getAttribute('data-key');
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  
  if (!audio) return; // Якщо елемент не знайдено — виходимо

  // Встановлюємо актуальну гучність з повзунка перед відтворенням
  audio.volume = volumeControl.value;

  audio.currentTime = 0; // Скидаємо час на початок для швидких повторних кліків
  audio.play();
  
  key.classList.add('playing'); // Додаємо ефект підсвічування
}

// 3. Функція видалення ефекту підсвічування після завершення CSS-анімації
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

// 4. Глобальний слухач для клавіатури
window.addEventListener('keydown', playSound);

// 5. Навішуємо слухачі кліків та завершення анімації на кожну клавішу барабанів
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('click', playSound);
  key.addEventListener('transitionend', removeTransition);
});