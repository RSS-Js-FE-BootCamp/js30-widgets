document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelectorAll('.key');
    const sequenceInput = document.getElementById('sequence-input');
    const playSequenceBtn = document.getElementById('play-sequence');
    const modeToggle = document.getElementById('mode-toggle');
    const drumView = document.getElementById('drum-view');
    const pianoView = document.getElementById('piano-view');
    const pianoKeys = document.querySelectorAll('.piano-key');
    
    let isPlayingSequence = false;
    let sequenceTimeouts = [];
    let currentMode = 'drums'; // 'drums' or 'piano'

    let audioCtx = null;
    
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

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

    const VALID_KEYS = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'w', 'e', 't', 'y', 'u']);

    sequenceInput.addEventListener('input', () => {
        sequenceInput.value = sequenceInput.value
            .replace(/[^a-zA-Z]/g, '')  
            .slice(0, 18);          
    });

    function playPianoSound(freq) {
        initAudio();
        
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 1.5);
    }

    function playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        const keyEl = document.querySelector(`.key[data-key="${key}"]`);
        if (!audio) return;

        audio.currentTime = 0;
        audio.play().catch(() => {});
        keyEl.classList.add('playing');
        spawnFloatingNote(keyEl);
        showLight(COLORS[key]);

        setTimeout(() => {
            keyEl.classList.remove('playing');
        }, 200);
    }

    function showLight(color) {
        const circle = document.createElement('div');
        circle.className = 'light-circle';
        circle.style.background = color;
        circle.style.left = (10 + Math.random() * 80) + '%';
        circle.style.top = (10 + Math.random() * 60) + '%';
        document.body.appendChild(circle);
        setTimeout(() => circle.remove(), 2000);
    }

    function spawnFloatingNote(keyEl) {
        const note = document.createElement('div');
        note.classList.add('floating-note');
        
        // Для пианино показываем ноту, для барабанов - название звука
        const noteText = keyEl.dataset.note || (keyEl.querySelector('.sound')?.textContent || '');
        note.textContent = noteText;
        
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

    // ── Переключение режима ──
    modeToggle.addEventListener('click', () => {
        initAudio();
        
        if (currentMode === 'drums') {
            currentMode = 'piano';
            drumView.classList.remove('active');
            pianoView.classList.add('active');
            modeToggle.textContent = 'Drums';
        } else {
            currentMode = 'drums';
            pianoView.classList.remove('active');
            drumView.classList.add('active');
            modeToggle.textContent = 'Piano';
        }
    });

    function playPianoKey(keyEl) {
        if (!keyEl) return;
        const freq = parseFloat(keyEl.dataset.freq);
        playPianoSound(freq);
        keyEl.classList.add('playing');
        spawnFloatingNote(keyEl);
        showLight('#64c8ff');
        
        setTimeout(() => {
            keyEl.classList.remove('playing');
        }, 200);
    }

    function playSequence() {
        if (isPlayingSequence) return;

        const input = sequenceInput.value.toLowerCase().trim();
        if (!input) return;

        const sequence = input.split('').filter(k => VALID_KEYS.has(k));
        if (sequence.length === 0) return;

        isPlayingSequence = true;
        playSequenceBtn.textContent = 'Playing...';
        playSequenceBtn.classList.add('playing');
        sequenceInput.disabled = true;
        playSequenceBtn.disabled = true;

        const DELAY = 400; 
        let currentIndex = 0;

        function playNext() {
            if (currentIndex >= sequence.length || !isPlayingSequence) {
                stopSequencePlayback();
                return;
            }

            const key = sequence[currentIndex];
            
            if (currentMode === 'piano') {
                const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
                playPianoKey(pianoKey);
            } else {
                playSound(key);
            }
            
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
        playSequenceBtn.textContent = 'Play Sequence';
        playSequenceBtn.classList.remove('playing');
        playSequenceBtn.disabled = false;
        sequenceInput.disabled = false;
    }

    playSequenceBtn.addEventListener('click', playSequence);

    // ── Ручное воспроизведение ──
    window.addEventListener('keydown', (e) => {
        if (isPlayingSequence) return; 

        const key = e.key.toLowerCase();
        
        if (currentMode === 'piano') {
            const pianoKey = document.querySelector(`.piano-key[data-key="${key}"]`);
            if (pianoKey) {
                const freq = parseFloat(pianoKey.dataset.freq);
                playPianoSound(freq);
                pianoKey.classList.add('playing');
                spawnFloatingNote(pianoKey);
                showLight('#64c8ff');
                
                setTimeout(() => {
                    pianoKey.classList.remove('playing');
                }, 200);
            }
        } else {
            // Режим барабанов
            if (VALID_KEYS.has(key)) {
                playSound(key);
            }
        }
    });

    keys.forEach((key) => {
        key.addEventListener('click', () => {
            if (!isPlayingSequence && currentMode === 'drums') {
                playSound(key.dataset.key);
            }
        });
        key.addEventListener('transitionend', removeTransition);
    });
    
    // Обработчики для клавиш пианино
    pianoKeys.forEach((key) => {
        key.addEventListener('mousedown', () => {
            if (currentMode === 'piano') {
                const freq = parseFloat(key.dataset.freq);
                playPianoSound(freq);
                key.classList.add('playing');
                spawnFloatingNote(key);
                showLight('#64c8ff');
                
                setTimeout(() => {
                    key.classList.remove('playing');
                }, 200);
            }
        });
    });
});
