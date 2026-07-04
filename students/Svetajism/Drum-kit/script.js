// // ------------------------------------------------------------------------------
// // PLAY SOUND ON KEYDOWN AND CLICK
// // ------------------------------------------------------------------------------

function playSound(event) {
    const keyCode = event.keyCode || event.currentTarget.dataset.key;

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    if(!audio || !key) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');

    createFloatingNote(key);
    paintLightShow();
}

function removeTransition(event) {
    if(event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', playSound));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);


// // ------------------------------------------------------------------------------
// // FLOATING SOUND NAME
// // ------------------------------------------------------------------------------
function createFloatingNote(key) {

    const note = document.createElement('span');
    note.classList.add('note');

    const soundName = key.querySelector('.sound').textContent;
    note.textContent = soundName;

    key.appendChild(note);
    note.addEventListener('animationend', () => {
        note.remove();
    });
}


// // ------------------------------------------------------------------------------
// // RANDOM LIGHT SHOW
// // ------------------------------------------------------------------------------
const canvas = document.querySelector('.lightShow');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);


function paintLightShow() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 80 + 20;
    const hue = Math.random() * 360;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.6)`;

    ctx.fill();
}


// // ------------------------------------------------------------------------------
// // DARK/LIGHT MODE
// // ------------------------------------------------------------------------------
const themeToggle = document.querySelector('.theme-toggle');
const htmlEl = document.documentElement; 

function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);

    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = htmlEl.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';

    applyTheme(next);
}

themeToggle.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);