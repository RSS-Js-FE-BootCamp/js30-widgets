document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.key');
    const sequenceInput = document.getElementById('sequence-input');
    const playSequenceBtn = document.getElementById('play-sequence');
    let isPlayingSequence = false;
    let sequenceTimeouts = [];

    // Цвет каждой клавиши
    const COLORS = {
        a: '#ff4444',
        s: '#ffaa00',
        d: '#ffdd44',
        f: '#44dd44',
        g: '#44aaff',
        h: '#4466ff',
        j: '#aa44ff',
        k: '#ff44aa',
        l: '#ff6688',
    };

    // Допустимые клавиши (из data-key атрибутов)
    const VALID_KEYS = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);

    // ── Фильтрация ввода ──
    sequenceInput.addEventListener('input', () => {
        // Оставляем только допустимые буквы
        sequenceInput.value = sequenceInput.value
            .replace(/[^a-zA-Z]/g, '')  // убираем всё кроме букв
            .slice(0, 18);               // максимум 18 символов (2 * 9 клавиш)
    });

    // ── Воспроизведение звука ──
    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
        if (!audio) return;

        audio.currentTime = 0;
        audio.play().catch(() => {});
        keyEl.classList.add('playing');
        spawnFloatingNote(keyEl);
        showLight(COLORS[key]);

        // Убрать подсветку через 200мс
        setTimeout(() => {
            keyEl.classList.remove('playing');
        }, 200);
    }

    // ── Цветное пятно на фоне ──
    function showLight(color) {
        const circle = document.createElement('div');
        circle.className = 'light-circle';
        circle.style.background = color;
        circle.style.left = (10 + Math.random() * 80) + '%';
        circle.style.top = (10 + Math.random() * 60) + '%';
        document.body.appendChild(circle);
        setTimeout(() => circle.remove(), 2000);
    }

    // ── Всплывающая подсказка ──
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

    // ── Удаление подсветки клавиши ──
    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        e.target.classList.remove('playing');
    }

    // ── Воспроизведение последовательности ──
    function playSequence() {
        if (isPlayingSequence) return;

        const input = sequenceInput.value.toLowerCase().trim();
        if (!input) return;

        // Фильтруем только допустимые клавиши
        const sequence = input.split('').filter(k => VALID_KEYS.has(k));
        if (sequence.length === 0) return;

        isPlayingSequence = true;
        playSequenceBtn.textContent = '⏹ Playing...';
        playSequenceBtn.classList.add('playing');
        sequenceInput.disabled = true;
        playSequenceBtn.disabled = true;

        const DELAY = 400; // задержка между шагами
        let currentIndex = 0;

        function playNext() {
            if (currentIndex >= sequence.length || !isPlayingSequence) {
                stopSequencePlayback();
                return;
            }

            const key = sequence[currentIndex];
            playSound(key);
            currentIndex++;

            const timeout = setTimeout(playNext, DELAY);
            sequenceTimeouts.push(timeout);
        }

        playNext();
    }

    function stopSequencePlayback() {
        isPlayingSequence = false;
        sequenceTimeouts.forEach(t => clearTimeout(t));
        sequenceTimeouts = [];

        // Восстановить интерактивность
        playSequenceBtn.textContent = '▶ Play Sequence';
        playSequenceBtn.classList.remove('playing');
        playSequenceBtn.disabled = false;
        sequenceInput.disabled = false;
    }

    playSequenceBtn.addEventListener('click', playSequence);

    // ── Ручное воспроизведение ──
    window.addEventListener('keydown', (e) => {
        if (isPlayingSequence) return; // блокируем во время воспроизведения

        const key = e.key.toLowerCase();
        if (VALID_KEYS.has(key)) {
            playSound(key);
        }
    });

    keys.forEach((key) => {
        key.addEventListener('click', () => {
            if (!isPlayingSequence) {
                playSound(key.dataset.key);
            }
        });
        key.addEventListener('transitionend', removeTransition);
    });
});
