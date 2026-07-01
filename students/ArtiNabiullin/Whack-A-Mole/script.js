import { addScore, renderScoreBoard, getScores } from "./storage.js";

const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const levelBoard = document.querySelector(".level");
const bestScoreBoard = document.querySelector(".best-score");
const targetBoard = document.querySelector(".target");
const clicksBoard = document.querySelector(".clicks");
const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", startGame);

const levels = [
  {
    level: 1,
    molesCount: 1,
    minTime: 600,
    maxTime: 1200,
    gameTime: 10000,
    maxClicks: 20,
  },
  {
    level: 2,
    molesCount: 1,
    minTime: 450,
    maxTime: 1000,
    gameTime: 10000,
    maxClicks: 18,
  },
  {
    level: 3,
    molesCount: 2,
    minTime: 350,
    maxTime: 800,
    gameTime: 9000,
    maxClicks: 17,
  },
  {
    level: 4,
    molesCount: 2,
    minTime: 250,
    maxTime: 700,
    gameTime: 8000,
    maxClicks: 15,
  },
  {
    level: 5,
    molesCount: 3,
    minTime: 200,
    maxTime: 500,
    gameTime: 7000,
    maxClicks: 15,
  },
];

let lastHole;
let isPlaying = false;
let timeUp = false;
let score = 0;
let level = 1;
let bestScore = 0;
let clicksLeft = 20;
let playerName = "";
playerName = prompt("Введите имя") || "Player";

function updateLevelInfo() {
  levelBoard.textContent = level;
  targetBoard.textContent = level * 5;
}

updateLevelInfo();
renderScoreBoard();

function randTime(min, max) {
  return Math.random() * (max - min) + min;
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function getRandomHoles(count) {
  const selectedHoles = [];
  while (selectedHoles.length < count) {
    const hole = randomHole(holes);

    if (!selectedHoles.includes(hole)) {
      selectedHoles.push(hole);
    }
  }

  return selectedHoles;
}

function peep() {
  const currentLevel = levels[level - 1];
  const time = randTime(currentLevel.minTime, currentLevel.maxTime);

  const activeHoles = getRandomHoles(currentLevel.molesCount);

  activeHoles.forEach((hole) => {
    hole.classList.add("up");
  });

  setTimeout(() => {
    activeHoles.forEach((hole) => {
      hole.classList.remove("up");
    });
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  if (isPlaying) return;
  isPlaying = true;

  const currentLevel = levels[level - 1];

  timeUp = false;
  score = 0;
  clicksLeft = currentLevel.maxClicks;

  scoreBoard.textContent = score;
  clicksBoard.textContent = clicksLeft;

  peep();

  setTimeout(() => {
    timeUp = true;
    finishGame();
  }, currentLevel.gameTime);
}

function finishGame() {
  timeUp = true;
  alert(`Игра окончена! Ваш счет: ${score}`);

  isPlaying = false;

  const passedLevel = score >= level * 5;

  if (passedLevel && level < levels.length) {
    level++;
    updateLevelInfo();
    playSound("levelUp");
  } else {
    playSound("gameOver");
  }

  if (score > bestScore) {
    bestScore = score;
    bestScoreBoard.textContent = bestScore;
    localStorage.setItem("bestScore", bestScore);
  }

  addScore(playerName, score);

  renderScoreBoard();
}

function bonk(e) {
  if (!e.isTrusted || !isPlaying) return;

  this.classList.add("hit");

  score++;
  this.parentElement.classList.remove("up");
  scoreBoard.textContent = score;

  playSound("hit");
  createParticles(e.clientX, e.clientY);

  setTimeout(() => {
    this.classList.remove("hit");
  }, 150);
}

moles.forEach((mole) => {
  mole.addEventListener("click", bonk);
});

const game = document.querySelector(".game");

game.addEventListener("click", (e) => {
  if (!isPlaying) return;

  clicksLeft--;
  clicksBoard.textContent = clicksLeft;

  if (!e.target.classList.contains("mole")) {
    playSound("miss");
  }

  if (clicksLeft === 0) {
    timeUp = true;
    finishGame();
  }
});

// create particles

function createParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);

    particle.animate(
      [
        { transform: "translate(0,0) scale(1)", opacity: 1 },
        {
          transform: `translate(${Math.random() * 80 - 40}px, ${
            Math.random() * 80 - 40
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: "ease-out",
      },
    ).onfinish = () => particle.remove();
  }
}

// sounds

const sounds = {
  hit: new Audio("./sounds/hit-sound-in-game.mp3"),
  miss: new Audio("./sounds/single-click.mp3"),
  levelUp: new Audio("./sounds/lost-money-on-the-game-account.mp3"),
  gameOver: new Audio("./sounds/the-sound-of-victory-in-the-game-level.mp3"),
};

let isSoundEnabled = true;

function playSound(name) {
  if (!isSoundEnabled) return;

  const sound = sounds[name];
  if (!sound) return;

  sound.currentTime = 0;
  sound.play();
}
