const burrows = document.querySelectorAll('.burrow');
const pointsBoard = document.querySelector('.points');
const critters = document.querySelectorAll('.critter');
const startBtn = document.querySelector('.start-btn');

let lastBurrow;
let timeUp = false;
let points = 0;

function randomDelay(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function pickBurrow() {
    let burrow;
    do {
        burrow = burrows[Math.floor(Math.random() * burrows.length)];
    } while (burrow === lastBurrow);
    lastBurrow = burrow;
    return burrow;
}

function showCritter() {
    const { min, max } = getDelayRange();
    const delay = randomDelay(min, max);
    const burrow = pickBurrow();
    burrow.classList.add('burrow-active');

    setTimeout(() => {
        burrow.classList.remove('burrow-active');
        if (!timeUp) showCritter();
    }, delay);
}

function startGame() {
    pointsBoard.textContent = 0;
    points = 0;
    timeUp = false;
    startBtn.disabled = true;
    startBtn.textContent = 'Playing...';
    showCritter();
    setTimeout(() => {
        timeUp = true;
        startBtn.disabled = false;
        finishRound();
    }, 10000);
}

function whack(event) {
    if (!event.isTrusted) return;

    const burrow = this.parentNode;
    if (!burrow.classList.contains('burrow-active') || this.classList.contains('critter-whacked')) {
        return;
    }

    points++;
    pointsBoard.textContent = points;

    burrow.classList.remove('burrow-active');
    burrow.classList.add('burrow-hit');
    this.classList.add('critter-whacked');
    spawnParticles(burrow);

    setTimeout(() => {
        burrow.classList.remove('burrow-hit');
        this.classList.remove('critter-whacked');
    }, 450);
}

function spawnParticles(burrow) {
    const burst = document.createElement('div');
    burst.className = 'particles';
    burrow.appendChild(burst);

    const colors = ['#8B4513', '#D2691E', '#FFD700', '#ffc600', '#654321', '#f4a460'];
    const count = 14;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('span');
        const isStar = i % 4 === 0;
        particle.className = isStar ? 'particle particle--star' : 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 140}px`);
        particle.style.setProperty('--ty', `${-30 - Math.random() * 90}px`);
        particle.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
        particle.style.animationDelay = `${Math.random() * 0.08}s`;
        burst.appendChild(particle);
    }

    setTimeout(() => burst.remove(), 650);
}

startBtn.addEventListener('click', startGame);
critters.forEach((critter) => critter.addEventListener('click', whack));

//Levels localStorage
const levelBoard = document.querySelector('.level');
const bestScoreBoard = document.querySelector('.best-score');
const STORAGE = { level: 'whackLevel', best: 'whackBestScore' };
const POINTS_TO_LEVEL_UP = 5;

let currentLevel = 1;
let bestScore = 0;

try {
    currentLevel = Number(localStorage.getItem(STORAGE.level)) || 1;
    bestScore = Number(localStorage.getItem(STORAGE.best)) || 0;
} catch (e) {
}

function getDelayRange() {
    const step = currentLevel - 1;
    return {
        min: Math.max(80, 200 - step * 25),
        max: Math.max(300, 1000 - step * 70),
    };
}

function saveProgress() {
    try {
        localStorage.setItem(STORAGE.level, currentLevel);
        localStorage.setItem(STORAGE.best, bestScore);
    } catch (e) {
    }
}

function updateStats() {
    levelBoard.textContent = currentLevel;
    bestScoreBoard.textContent = bestScore;
}

function finishRound() {
    if (points > bestScore) {
        bestScore = points;
    }

    const leveledUp = points >= POINTS_TO_LEVEL_UP;
    if (leveledUp) {
        currentLevel++;
    }

    updateStats();
    saveProgress();

    if (leveledUp) {
        startBtn.textContent = `Level ${currentLevel}!`;
    } else {
        startBtn.textContent = `Need ${POINTS_TO_LEVEL_UP} pts to level up`;
    }
}

updateStats();

//Reset progress
const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener('click', () => {
    currentLevel = 1;
    bestScore = 0;
    pointsBoard.textContent = 0;
    startBtn.textContent = 'Start!';

    try {
        localStorage.removeItem(STORAGE.level);
        localStorage.removeItem(STORAGE.best);
    } catch (e) {}

    updateStats();
});
