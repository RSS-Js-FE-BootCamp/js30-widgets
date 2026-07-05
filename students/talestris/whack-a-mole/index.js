const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const startBtn = document.querySelector(".start-btn");
const gameArea = document.querySelector(".game");

const level = document.querySelector(".level");
const highScoreDisplay = document.querySelector(".high-score");

const hitSound = new Audio("./hit.mp3");
const missSound = new Audio("./miss.mp3");
const startSound = new Audio("./start.mp3");
const levelUpSound = new Audio("./level-up.mp3");
const gameOverSound = new Audio("./game-over.mp3");

const timeLeftDisplay = document.querySelector(".time-left");

const resetBtn = document.querySelector(".reset-btn");

let countdown;
let clicksLeft = 0;
let maxClicksPerRound = 50;

let gameTimeout;

let isMuted = false;

let gameActive = false;

startBtn.addEventListener("click", startGame);

let lastHole;
let timeUp = false;
let score = 0;

let currentLevel =
  parseInt(localStorage.getItem("talestris-moleCurrentLevel")) || 1;
let highScore = parseInt(localStorage.getItem("talestris-moleHighScore")) || 0;
const pointsToWin = 10;

level.textContent = currentLevel;
highScoreDisplay.textContent = highScore;

resetBtn.addEventListener("click", () => {
  localStorage.removeItem("talestris-moleHighScore");
  localStorage.removeItem("talestris-moleCurrentLevel");

  currentLevel = 1;
  highScore = 0;
  level.textContent = currentLevel;
  highScoreDisplay.textContent = highScore;
});

function startCountdown(seconds) {
  clearInterval(countdown);

  timeLeftDisplay.classList.remove("hurry");
  timeLeftDisplay.textContent = seconds;

  countdown = setInterval(() => {
    seconds--;
    timeLeftDisplay.textContent = seconds;

    if (seconds <= 10) {
      timeLeftDisplay.classList.add("hurry");
    }

    if (seconds <= 0) {
      clearInterval(countdown);
    }
  }, 1000);
}

function getLevelSpeed() {
  if (currentLevel === 1) return { min: 600, max: 1600 };
  if (currentLevel === 2) return { min: 550, max: 1550 };
  return { min: 450, max: 1250 };
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
  timeLeftDisplay.textContent = 25;
  timeLeftDisplay.classList.remove("hurry");

  timeUp = false;
  score = 0;
  gameActive = false;
  clicksLeft = maxClicksPerRound;

  startBtn.disabled = true;
  startBtn.textContent = "Playing...";

  if (!isMuted) {
    startSound.currentTime = 0;
    startSound.play().catch((err) => console.log("Audio play blocked", err));
  }

  setTimeout(() => {
    if (!timeUp) {
      gameActive = true;
      stickOut();
      startCountdown(25);
    }
  }, 500);

  gameTimeout = setTimeout(() => {
    timeUp = true;
    gameActive = false;
    startBtn.disabled = false;
    startBtn.textContent = "Start!";

    clearInterval(countdown);
    endGameCheck();
  }, 25500);
}

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
  if (!gameActive || clicksLeft <= 0) return;
  clicksLeft--;

  e.stopPropagation();

  /*if (this.isHit) return;
  this.isHit = true;*/
  score++;

  if (!isMuted) {
    hitSound.currentTime = 0;
    hitSound.play().catch((err) => console.log("Audio play blocked", err));
  }

  this.classList.add("hit");

  setTimeout(() => {
    this.classList.remove("up");
    this.classList.remove("hit");
    this.isHit = false;
  }, 250);

  scoreBoard.textContent = score;

  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    localStorage.setItem("talestris-moleHighScore", highScore);
  }
}

function missClick(e) {
  if (!gameActive) return;
  if (e.target.tagName === "BUTTON") return;
  if (e.target.classList.contains("mole")) return;

  if (clicksLeft <= 0) return;
  clicksLeft--;

  if (!isMuted) {
    missSound.currentTime = 0;
    missSound.play().catch((err) => console.log("Audio play blocked", err));
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
    if (!isMuted) {
      levelUpSound.currentTime = 0;
      levelUpSound
        .play()
        .catch((err) => console.log("Audio play blocked", err));
    }

    if (currentLevel < 3) {
      currentLevel++;
      showMessage(`Great job! Welcome to Level ${currentLevel}!`);
    } else {
      showMessage(
        "🎉 AMAZING! You are the ultimate Mole Whacker! You have beaten the game!",
      );
      currentLevel = 1;
    }
  } else {
    if (!isMuted) {
      gameOverSound.currentTime = 0;
      gameOverSound
        .play()
        .catch((err) => console.log("Audio play blocked", err));
    }

    if (currentLevel === 3) {
      currentLevel = 1;
      showMessage(`Game Over! Level 3 is tough. Starting over from Level 1!`);
    } else {
      showMessage(
        `Game Over! You needed ${pointsToWin} points. Try Level ${currentLevel} again!`,
      );
    }
  }
  localStorage.setItem("talestris-moleCurrentLevel", currentLevel);
  level.textContent = currentLevel;
}

function decreaseClicks() {
  clicksLeft--;

  if (clicksLeft <= 0 && gameActive) {
    endGameEarly();
  }
}

function endGameEarly() {
  timeUp = true;
  gameActive = false;
  startBtn.disabled = false;
  startBtn.textContent = "Start!";

  clearInterval(countdown);
  clearTimeout(gameTimeout);

  endGameCheck();
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
