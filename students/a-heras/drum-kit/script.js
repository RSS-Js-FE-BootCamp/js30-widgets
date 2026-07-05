const keys = document.querySelectorAll('.key');

function activateKey(keyCode) {
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!key) {
    return;
  }

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
