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

console.log('%c=== Self-evaluation: Drum Kit ===', 'font-weight:bold;font-size:14px');
console.table([
  { stage: 1, item: 'Visual match with original', points: 10 },
  { stage: 1, item: 'Core behaviour - keyboard plays sounds', points: 10 },
  { stage: 2, item: 'Mouse click plays sounds with same feedback', points: 15 },
]);
console.log('Claimed total: 35/65');