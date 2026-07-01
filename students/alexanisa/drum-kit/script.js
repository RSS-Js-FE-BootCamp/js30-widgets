function playSound(keyCode) {
    let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');
}

window.addEventListener('keydown', function(e) {
    playSound(e.keyCode);
});

let keys = document.querySelectorAll('.key');
for (let key of keys) {
    key.addEventListener('click', function () {
        playSound(this.dataset.key);
});
}

keys.forEach(function(key) {
    key.addEventListener('transitionend', removeTransition);
});

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

let btn = document.querySelector('.theme-toggle');
let body = document.querySelector('body');

btn.addEventListener('click', function() {
    body.classList.toggle('light');

    btn.textContent = body.classList.contains('light')? 'Dark' : 'Light';

})