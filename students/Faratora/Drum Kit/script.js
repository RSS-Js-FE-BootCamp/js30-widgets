document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.key');

    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
        if (!audio) return;

        audio.currentTime = 0;
        audio.play();
        keyEl.classList.add('playing');
        spawnFloatingNote(keyEl);
    }

    function spawnFloatingNote(keyEl) {
        const note = document.createElement('div');
        note.classList.add('floating-note');
        note.textContent = keyEl.querySelector('.sound').textContent;
        
        const rect = keyEl.getBoundingClientRect();
        note.style.left = rect.left + rect.width / 2 + 'px';
        note.style.top = rect.top + 'px';
        
        document.body.appendChild(note);
        
        setTimeout(() => note.remove(), 1000);
    }

    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }

    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        playSound(key);
    });

    keys.forEach((key) => {
        key.addEventListener('click', () => playSound(key.dataset.key));
        key.addEventListener('transitionend', removeTransition);
    });

    console.log('Скрипт загружен!');
});
