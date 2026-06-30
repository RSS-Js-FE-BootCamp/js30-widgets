document.addEventListener('DOMContentLoaded', function () {
    console.log('Скрипт загружен!');
    const keys = document.querySelectorAll('.key');

    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
        // Сбрасываем время воспроизведения, чтобы можно было быстро нажимать повторно
        if (!audio) return;

        audio.currentTime = 0;
        audio.play();
        keyEl.classList.add('playing');
    }

    function handleKeyboard(e) {
        const key = e.key.toLowerCase();
        playSoundByKey(key);
    }

    function handleClick(e) {
        const key = e.currentTarget.dataset.key;
        playSoundByKey(key);
    }

    window.addEventListener('keydown', handleKeyboard);

    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }

    keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

    window.addEventListener('keydown', function (e) {
        const key = e.key.toLowerCase();
        console.log('Нажата клавиша:', key);
        playSound(key);
    });

    keys.forEach((keyEl) => {
        keyEl.addEventListener('click', () => {
            const key = keyEl.getAttribute('data-key');
            if (key) playSound(key);
        });
    });
});
