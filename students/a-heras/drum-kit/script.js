const keys = document.querySelectorAll('.key');

function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  if (!audio) {
    return;
  }

  audio.currentTime = 0;
  audio.play();
}

function activateKey(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!key) {
    return;
  }

  playSound(keyCode);
  key.classList.add('playing');
}

function removePlayingClass(event) {
  if (event.propertyName !== 'transform') {
    return;
  }

  event.currentTarget.classList.remove('playing');
}

window.addEventListener('keydown', (event) => {
  activateKey(event.code);
});

keys.forEach((key) => {
  key.addEventListener('click', () => {
    activateKey(key.dataset.key);
  });

  key.addEventListener('transitionend', removePlayingClass);
});
