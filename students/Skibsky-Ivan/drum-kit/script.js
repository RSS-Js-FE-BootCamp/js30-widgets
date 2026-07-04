function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSoundByKey(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio || !key) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = document.querySelector('.keys');

window.addEventListener('keydown', (e) => {
  playSoundByKey(e.keyCode)
});
keys.addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;
  playSoundByKey(key.dataset.key);
});
keys.addEventListener('transitionend', removeTransition);
