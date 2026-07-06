function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (!audio || !key) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}
window.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  playSound(e.keyCode);
});
const keys = document.querySelectorAll(".key");
keys.forEach((key) =>
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    console.log(e.propertyName);
    e.currentTarget.classList.remove("playing");
  }),
);

/// Mandatory Additional Feature
const startBtn = document.querySelector(".start-game-btn");
const status = document.querySelector(".game-status");
const level = document.querySelector(".game-level");
const sequence = [];
const userSequence = [];
let gameActive = false;

startBtn.addEventListener("click", () => {
  sequence.length = 0;
  userSequence.length = 0;
  gameActive = true;
  nextRound();
});
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const keyCode = key.dataset.key;

    playSound(Number(keyCode));

    if (!gameActive || !playerTurn) return;

    userSequence.push(keyCode);
    checkAnswer();
  });
});

status.textContent = "Watch carefully...";

function nextRound() {
  userSequence.length = 0;

  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  sequence.push(randomKey.dataset.key);

  level.textContent = `Level: ${sequence.length}`;

  playSequence();
}
async function playSequence() {
  playerTurn = false;

  status.textContent = "Watch carefully...";

  for (const keyCode of sequence) {
    playSound(keyCode);
    await delay(600);
  }

  playerTurn = true;
  status.textContent = "Your turn!";
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function checkAnswer() {
  const current = userSequence.length - 1;

  if (userSequence[current] !== sequence[current]) {
    gameOver();
    return;
  }

  if (userSequence.length === sequence.length) {
    setTimeout(nextRound, 1000);
  }
}
function gameOver() {
  gameActive = false;
  playerTurn = false;

  status.textContent = "❌ Game Over!";
  level.textContent = `Level: ${sequence.length}`;

  sequence.length = 0;
  userSequence.length = 0;
}
