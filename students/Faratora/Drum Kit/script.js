document.addEventListener('DOMContentLoaded', function() {
    console.log('Скрипт загружен!');
});

function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const keyEl = document.querySelector(`.key[data-key="${key}"]`);
    // Сбрасываем время воспроизведения, чтобы можно было быстро нажимать повторно
    if (!audio) return;
    
    audio.currentTime = 0;
    audio.play();
    keyEl.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', function(e) {
    const key = e.key.toLowerCase();
    console.log('Нажата клавиша:', key);
    playSound(key);
});
