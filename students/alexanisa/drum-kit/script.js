function playSound(keyCode) {
    let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    key.classList.add('playing');

    const rect = key.getBoundingClientRect();
    createParticle(rect.left + rect.width /2, rect.top);
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

let selectButtons = document.querySelectorAll('.kit-btn');

for(let selectButton of selectButtons) {
    selectButton.addEventListener('click', function() {
        let data = this.dataset.kit;
        let audios = document.querySelectorAll('audio');

        for (let audio of audios) {
            if (audio.src.includes('sounds-default')) {audio.src = audio.src.replace('sounds-default/',`sounds-two/`)}
            else {audio.src = audio.src.replace('sounds-two/',`sounds-default/`);}
        }

        selectButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    })
}

function createParticle(x, y) {
    const emojis = ['&#127925;', '&#129345;', '&#10024;', '&#128150;', '&#128171;', '&#127926;', '&#11088;', '&#127752;'];
    let span = document.createElement('span');
    let randomIndex = Math.floor(Math.random() * emojis.length);
    span.innerHTML = emojis[randomIndex];
    span.classList.add('particle');
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    document.body.appendChild(span);
    setTimeout(()=> span.remove(),1000);
}