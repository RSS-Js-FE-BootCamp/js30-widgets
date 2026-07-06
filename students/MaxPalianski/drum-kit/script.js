const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
speedSlider.addEventListener('input', () => {
    speedValue.textContent = speedSlider.value;
});
let comboCount = 0;
let comboTimeout = null;
const comboCountElement = document.getElementById('comboCounter');

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 8;
        this.speedY = (Math.random() - 0.5) * 8;
        this.color = `rgba(255, 198, 0, ${Math.random() * 0.5 + 0.5})`;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.98;
        this.speedY *= 0.98;
        this.alpha -= this.decay;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffc600';
        ctx.fill();
        ctx.restore();
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

function playDrum(code) {
    const audio = document.querySelector(`audio[data-key="${code}"]`)
    const key = document.querySelector(`.key[data-key="${code}"]`);
    if (!audio || !key) return;
    key.classList.add('playing');
    audio.playbackRate = speedSlider.value;

    const rect = key.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(x, y));
    }

    audio.currentTime = 0;
    audio.play();
    clearTimeout(comboTimeout);
    comboCount++;
    comboCountElement.textContent = comboCount;
    comboCountElement.classList.add('bump');
    setTimeout(() => comboCountElement.classList.remove('bump'), 50);
    comboTimeout = setTimeout(() => {
        comboCount = 0;
        comboCountElement.textContent = comboCount;
    }, 1500);
    document.body.style.filter = 'brightness(1.8)';
    setTimeout(() => {
        document.body.style.filter = 'none';
        key.classList.remove('playing');
    }, 100);
}

window.addEventListener('keydown', (e) => {
    playDrum(e.code);
});

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('mousedown', () => {
    const keyCode = key.dataset.key;
    playDrum(keyCode);
}));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

const demoBtn = document.getElementById('demoBtn');
let demoInterval = null;
demoBtn.addEventListener('click', () => {
    if(demoInterval) {
        demoBtn.classList.remove('active');
        clearInterval(demoInterval);
        demoInterval = null;
        demoBtn.textContent = 'Auto Jam';     
    } else {
        demoBtn.classList.add('active');
        demoBtn.textContent = 'Stop Jam';
        demoInterval = setInterval(() => {
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const keyCode = randomKey.dataset.key;
            playDrum(keyCode);
        }, 250);
    }
});
