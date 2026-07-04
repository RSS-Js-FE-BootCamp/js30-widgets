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
    points++;
    this.parentNode.classList.remove('burrow-active');
    pointsBoard.textContent = points;
}

startBtn.addEventListener('click', startGame);
critters.forEach((critter) => critter.addEventListener('click', whack));

// --- Levels & localStorage ---
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
    // localStorage недоступен при открытии через file://
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
        // игра работает и без сохранения
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
