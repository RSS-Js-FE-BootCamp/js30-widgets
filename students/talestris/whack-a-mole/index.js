const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const startBtn = document.querySelector(".start-btn");
const gameArea = document.querySelector(".game");

const level = document.querySelector(".level");
const highScoreDisplay = document.querySelector(".high-score");

startBtn.addEventListener("click", startGame);

let lastHole;
let timeUp = false;
let score = 0;

let currentLevel = parseInt(localStorage.getItem("moleCurrentLevel")) || 1;
let highScore = parseInt(localStorage.getItem("moleHighScore")) || 0;
const pointsToWin = 10;

level.textContent = currentLevel;
highScoreDisplay.textContent = highScore;

function getLevelSpeed() {
  if (currentLevel === 1) return { min: 400, max: 1200 };
  if (currentLevel === 2) return { min: 250, max: 800 };
  return { min: 150, max: 500 };
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];

  if (hole === lastHole) return randomHole(holes);
  lastHole = hole;
  return hole;
}

function stickOut() {
  const speed = getLevelSpeed();
  const time = randomTime(speed.min, speed.max);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) stickOut();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;

  startBtn.disabled = true;
  startBtn.textContent = "Playing...";

  stickOut();

  setTimeout(() => {
    timeUp = true;
    startBtn.disabled = false;
    startBtn.textContent = "Start!";

    endGameCheck();
  }, 10000);
}

const hitSound = new Audio("./hit.mp3");
const missSound = new Audio("./miss.mp3");
let isMuted = false;

const muteBtn = document.querySelector("#mute_btn");
muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  /*
  hitSound.muted = isMuted;
  missSound.muted = isMuted;*/

  muteBtn.textContent = isMuted ? "🔇 Sound: OFF" : "🔊 Sound: ON";
});

function bonk(e) {
  if (!e.isTrusted) return;
  e.stopPropagation();
  score++;

  if (!isMuted) {
    hitSound.currentTime = 0;
    hitSound.play();
  }

  this.classList.remove("up");
  scoreBoard.textContent = score;

  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    localStorage.setItem("moleHighScore", highScore);
  }
}

function missClick(e) {
  if (timeUp) return;

  if (e.target.tagName === "BUTTON") return;

  if (!isMuted) {
    missSound.currentTime = 0;
    missSound.play();
  }
}

gameArea.addEventListener("click", missClick);

const modal = document.querySelector("#game-modal");
const modalText = document.querySelector(".modal-txt");
const modalBtn = document.querySelector("#modal_btn");

modalBtn.addEventListener("click", () => {
  modal.close();
});

function showMessage(text) {
  modalText.textContent = text;
  modal.showModal();
}

function endGameCheck() {
  if (score >= pointsToWin) {
    if (currentLevel < 3) {
      currentLevel++;
      showMessage(`Great job! Welcome to Level ${currentLevel}!`);
    } else {
      showMessage("Congratulations! You beat the game! Resetting to Level 1.");
      currentLevel = 1;
    }
  } else {
    showMessage(
      `Game Over! You needed ${pointsToWin} points. Try Level ${currentLevel} again!`,
    );
  }
  localStorage.setItem("moleCurrentLevel", currentLevel);
  level.textContent = currentLevel;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
