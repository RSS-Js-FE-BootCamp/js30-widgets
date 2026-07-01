/* Original Widget + Mandatory Additional Feature*/

const KEYS = document.querySelectorAll('.key');
const KEYS_FOR_MOUSE = document.querySelector('.instrument');

function playSound(event) {
    const key_code = event.keyCode || event.target.closest('.key')?.dataset.key;
    const audio = document.querySelector(`audio[data-key = '${key_code}']`);
    const key = document.querySelector(`.key[data-key = '${key_code}']`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('animated');
};

window.addEventListener('keydown', playSound);
KEYS_FOR_MOUSE.addEventListener('click', playSound);

function removeAnimation(event) {
    if (event.propertyName !== 'transform') return;

    this.classList.remove('animated');
};

KEYS.forEach(key => key.addEventListener('transitionend', (removeAnimation)));


/*Switch Animation*/


const SWITCHERS = document.querySelectorAll('.switch');

