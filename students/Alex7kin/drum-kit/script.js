 function play(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }

function playSound(e) {
    if (e.repeat) return; // Prevents the sound from playing multiple times if the key is held down
    play(e.keyCode);
  }

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
  }

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', () => play(key.dataset.key));
});
window.addEventListener('keydown', playSound);