const keys = document.querySelectorAll('.key');

const removeTransition = (event) => {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.target.classList.remove('playing');
}

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

keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);
});

window.addEventListener('keydown', playSound);
