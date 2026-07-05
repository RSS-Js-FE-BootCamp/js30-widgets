function playPad(keyCode) {
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio || !key) {
        return;
    }

    audio.currentTime = 0;
    audio.play();

    key.classList.add('key--playing');
}

function handleKeydown(event) {
    playPad(event.keyCode);
}

function handleClick(event) {
    const keyCode = event.currentTarget.dataset.key;

    playPad(keyCode);
}

function removeTransition(event) {
    if (event.propertyName !== 'transform') {
        return;
    }

    event.target.classList.remove('key--playing');
}

const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', handleClick);
});

window.addEventListener('keydown', handleKeydown);