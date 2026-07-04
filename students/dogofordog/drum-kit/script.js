function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio) return; 

  audio.currentTime = 0; 
  audio.play();

  key.classList.add('playing');
}

function removePlaying(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

window.addEventListener('keydown', (e) => playSound(e.code));

document.querySelector('.keys').addEventListener('click', (e) => {
  const key = e.target.closest('.key');
  if (!key) return;
  playSound(key.dataset.key);
});

document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('transitionend', removePlaying);
});