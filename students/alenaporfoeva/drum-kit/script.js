const drumMap = new Map([
    ['KeyA', 'assets/sounds_clap.wav'],
    ['KeyS', 'assets/sounds_hihat.wav'],
    ['KeyD', 'assets/sounds_kick.wav'],
    ['KeyF', 'assets/sounds_openhat.wav'],
    ['KeyG', 'assets/sounds_boom.wav'],
    ['KeyH', 'assets/sounds_ride.wav'],
    ['KeyJ', 'assets/sounds_snare.wav'],
    ['KeyK', 'assets/sounds_tom.wav'],
    ['KeyL', 'assets/sounds_tink.wav']
]);

function animate(id) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 100);
    }
}

drumMap.forEach((audioFile, key) => {
    const button = document.getElementById(key);

    if (button) {
        button.addEventListener("click", () => {
            new Audio(audioFile).play();
            animate(key);
        });
    }
});

document.addEventListener('keydown', (event) => {
    if (drumMap.has(event.code)) {
        const audioFile = drumMap.get(event.code);
        new Audio(audioFile).play();
        animate(event.code);
    }
});

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️ Light Mode';
    } else {
        themeToggle.textContent = '🌙 Dark Mode';
    }
});