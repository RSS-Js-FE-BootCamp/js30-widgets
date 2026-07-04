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
    const delay = randomDelay(200, 1000);
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
    showCritter();
    setTimeout(() => (timeUp = true), 10000);
}

function whack(event) {
    if (!event.isTrusted) return;
    points++;
    this.parentNode.classList.remove('burrow-active');
    pointsBoard.textContent = points;
}

startBtn.addEventListener('click', startGame);
critters.forEach((critter) => critter.addEventListener('click', whack));
