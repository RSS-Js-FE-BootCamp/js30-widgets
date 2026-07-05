// const wrapper = document.getElementById("leafs");
// const btn = document.getElementById("button");
// const scoreEl = document.getElementById("score");
// const levelBadge = document.getElementById("level-badge");
// const bestBadge = document.getElementById("best-badge");
// const audio = new Audio("./audio/Lyagushki.mp3");
// const win = new Audio("./audio/win.mp3");
// win.volume = 0.5;
// const loss = new Audio("./audio/loss.mp3");

// let score = 0;
// let frogsSpawned = 0;
// let currentLevel = 1; // от 1 до 3
// let spawnTimeoutId = null;
// let frogTimeoutId = null;
// let currentFrog = null;
// let isGameActive = false;
// let gameEnded = false;

// const FROGS_PER_LEVEL = 10; // 10 лягушек на уровень, всего 30
// const leafPositions = [];

// // настройки скорости для каждого уровня
// const LEVEL_SETTINGS = {
//   1: { spawnDelay: 1900, frogLifetime: 1400 },
//   2: { spawnDelay: 1500, frogLifetime: 1100 },
//   3: { spawnDelay: 1100, frogLifetime: 850 },
// };

// // ==================== LOCALSTORAGE (РЕКОРД) ====================
// function loadBestScore() {
//   const best = Number(localStorage.getItem("frogGame_bestScore")) || 0;
//   bestBadge.textContent = `Рекорд: ${best}`;
//   return best;
// }

// function saveBestScoreIfBetter(finalScore) {
//   const best = loadBestScore();
//   if (finalScore > best) {
//     localStorage.setItem("frogGame_bestScore", String(finalScore));
//   }
//   loadBestScore(); // обновляем текст на экране
// }

// // показываем рекорд сразу при открытии страницы
// loadBestScore();

// // ==================== КУВШИНКИ ====================
// for (let i = 0; i < 6; i++) {
//   const leaf = document.createElement("img");
//   leaf.classList.add("leaf");
//   leaf.src = "./image/11.png";
//   wrapper.appendChild(leaf);
// }

// function calculateLeafPositions() {
//   leafPositions.length = 0;
//   const leaves = document.querySelectorAll(".leaf");
//   const wrapperRect = wrapper.getBoundingClientRect();

//   leaves.forEach((leaf) => {
//     const rect = leaf.getBoundingClientRect();
//     leafPositions.push({
//       left: rect.left - wrapperRect.left,
//       top: rect.top - wrapperRect.top,
//       width: rect.width,
//     });
//   });
// }

// // ==================== ЛОГИКА УРОВНЕЙ ====================
// function getTotalFrogs() {
//   return FROGS_PER_LEVEL * 3; // 30 лягушек за всю игру
// }

// function updateLevelIfNeeded() {
//   // после каждых 10 появившихся лягушек — переход на следующий уровень
//   const newLevel = Math.min(3, Math.floor(frogsSpawned / FROGS_PER_LEVEL) + 1);
//   if (newLevel !== currentLevel) {
//     currentLevel = newLevel;
//     levelBadge.textContent = `Уровень: ${currentLevel}`;
//   }
// }

// // ==================== СПАВН ЛЯГУШЕК ====================
// function spawnFrog() {
//   if (!isGameActive) return;

//   if (frogsSpawned >= getTotalFrogs()) {
//     endGame();
//     return;
//   }

//   frogsSpawned++;
//   updateLevelIfNeeded();

//   const randomPos =
//     leafPositions[Math.floor(Math.random() * leafPositions.length)];

//   const frog = document.createElement("img");
//   frog.classList.add("frog");
//   frog.src = "./image/3.png";
//   frog.style.position = "absolute";
//   frog.style.left = `${randomPos.left + randomPos.width / 2 - 60}px`;
//   frog.style.top = `${Math.max(randomPos.top - 100, 0)}px`;
//   frog.style.cursor = "pointer";

//   frog.addEventListener("click", (e) => {
//     e.stopPropagation();
//     catchFrog(frog);
//   });

//   wrapper.appendChild(frog);
//   currentFrog = frog;

//   const settings = LEVEL_SETTINGS[currentLevel];
//   frogTimeoutId = setTimeout(() => {
//     if (currentFrog === frog) {
//       frog.remove();
//       currentFrog = null;
//     }
//     scheduleNextSpawn();
//   }, settings.frogLifetime);
// }

// function scheduleNextSpawn() {
//   if (!isGameActive) return;

//   if (frogsSpawned >= getTotalFrogs()) {
//     endGame();
//     return;
//   }

//   const settings = LEVEL_SETTINGS[currentLevel];
//   spawnTimeoutId = setTimeout(spawnFrog, settings.spawnDelay);
// }

// function catchFrog(frog) {
//   clearTimeout(frogTimeoutId);

//   score++;
//   scoreEl.textContent = score;
//   frog.remove();
//   currentFrog = null;

//   audio.currentTime = 0;
//   audio.play().catch(() => {});

//   scheduleNextSpawn();
// }

// // ==================== СТАРТ / КОНЕЦ ИГРЫ ====================
// function startGame() {
//   score = 0;
//   frogsSpawned = 0;
//   currentLevel = 1;
//   isGameActive = true;
//   gameEnded = false;

//   scoreEl.textContent = score;
//   levelBadge.textContent = "Уровень: 1";
//   btn.textContent = "Идёт игра...";
//   btn.disabled = true;

//   calculateLeafPositions();
//   spawnFrog();
// }

// function endGame() {
//   if (gameEnded) return;
//   gameEnded = true;
//   isGameActive = false;

//   clearTimeout(spawnTimeoutId);
//   clearTimeout(frogTimeoutId);

//   if (currentFrog) {
//     currentFrog.remove();
//     currentFrog = null;
//   }

//   audio.pause();
//   audio.currentTime = 0;

//   saveBestScoreIfBetter(score);

//   btn.textContent = `Игра окончена! Поймано ${score} из ${getTotalFrogs()}. Играть снова`;
//   btn.disabled = false;
// }

// btn.addEventListener("click", () => {
//   if (isGameActive) return;
//   startGame();
// });

// const soundToggleBtn = document.getElementById("button2");
// let isMuted = false;

// soundToggleBtn.addEventListener("click", () => {
//   isMuted = !isMuted;

//   audio.muted = isMuted;
//   win.muted = isMuted;
//   loss.muted = isMuted;

//   soundToggleBtn.textContent = isMuted
//     ? "🔇 Включить звук"
//     : "🔊 Выключить звук";
// });

// ///////////////////////////////////////////////////////////////////////////////////////////////////
const wrapper = document.getElementById("leafs");
const btn = document.getElementById("button");
const scoreEl = document.getElementById("score");
const levelBadge = document.getElementById("level-badge");
const bestBadge = document.getElementById("best-badge");
const audio = new Audio("./audio/Lyagushki.mp3");
const levelUpSound = new Audio("./audio/123.mp3"); // добавьте свой файл
const win = new Audio("./audio/win.mp3");
win.volume = 0.5;
const loss = new Audio("./audio/loss.mp3");
const splash = new Audio("./audio/splash.mp3");
splash.volume = 1;

let score = 0;
let frogsSpawned = 0;
let currentLevel = 1;
let spawnTimeoutId = null;
let frogTimeoutId = null;
let currentFrog = null;
let isGameActive = false;
let gameEnded = false;
let awaitingLevelStart = false; // НОВОЕ: ждём ли клика для начала следующего уровня

const FROGS_PER_LEVEL = 10;
const leafPositions = [];

const LEVEL_SETTINGS = {
  1: { spawnDelay: 1700, frogLifetime: 1200 },
  2: { spawnDelay: 1300, frogLifetime: 900 },
  3: { spawnDelay: 900, frogLifetime: 650 },
};

function loadBestScore() {
  const best = Number(localStorage.getItem("frogGame_bestScore")) || 0;
  bestBadge.textContent = `Рекорд: ${best}`;
  return best;
}

function saveBestScoreIfBetter(finalScore) {
  const best = loadBestScore();
  if (finalScore > best) {
    localStorage.setItem("frogGame_bestScore", String(finalScore));
  }
  loadBestScore();
}

loadBestScore();

for (let i = 0; i < 6; i++) {
  const leaf = document.createElement("img");
  leaf.classList.add("leaf");
  leaf.src = "./image/11.png";
  wrapper.appendChild(leaf);
}

function calculateLeafPositions() {
  leafPositions.length = 0;
  const leaves = document.querySelectorAll(".leaf");
  const wrapperRect = wrapper.getBoundingClientRect();

  leaves.forEach((leaf) => {
    const rect = leaf.getBoundingClientRect();
    leafPositions.push({
      left: rect.left - wrapperRect.left,
      top: rect.top - wrapperRect.top,
      width: rect.width,
    });
  });
}

function getTotalFrogs() {
  return FROGS_PER_LEVEL * 3;
}

// проверяем, закончился ли текущий уровень (не вся игра)
function isLevelComplete() {
  return frogsSpawned > 0 && frogsSpawned % FROGS_PER_LEVEL === 0;
}

function spawnFrog() {
    if (!isGameActive) return;

    if (frogsSpawned >= getTotalFrogs()) {
        endGame();
        return;
    }

    frogsSpawned++;

    const randomPos =
        leafPositions[Math.floor(Math.random() * leafPositions.length)];

    const frog = document.createElement("img");
    frog.classList.add("frog");
    frog.src = "./image/3.png";
    frog.style.position = "absolute";
    frog.style.left = `${randomPos.left + randomPos.width / 2 - 60}px`;
    frog.style.top = `${Math.max(randomPos.top - 100, 0)}px`;
    frog.style.cursor = "pointer";

    frog.addEventListener("click", (e) => {
        e.stopPropagation();
        catchFrog(frog);
    });

    wrapper.appendChild(frog);
    currentFrog = frog;

    const settings = LEVEL_SETTINGS[currentLevel];
    frogTimeoutId = setTimeout(() => {
        if (currentFrog === frog) {
            frog.remove();
            currentFrog = null;

            // === добавлено: звук промаха ===
            splash.currentTime = 0;
            splash.play().catch(() => { });
            // =================================
        }
        afterFrogResolved();
    }, settings.frogLifetime);
}

// вызывается и после поимки, и после промаха — единая точка проверки
function afterFrogResolved() {
  if (frogsSpawned >= getTotalFrogs()) {
    endGame();
    return;
  }

  if (isLevelComplete()) {
    pauseForNextLevel();
    return;
  }

  scheduleNextSpawn();
}

function scheduleNextSpawn() {
  if (!isGameActive) return;
  const settings = LEVEL_SETTINGS[currentLevel];
  spawnTimeoutId = setTimeout(spawnFrog, settings.spawnDelay);
}

function catchFrog(frog) {
  clearTimeout(frogTimeoutId);

  score++;
  scoreEl.textContent = score;
  frog.remove();
  currentFrog = null;

  audio.currentTime = 0;
  audio.play().catch(() => {});

  setTimeout(() => {
    audio.pause();
  }, 1000);

  afterFrogResolved();
}



// === НОВОЕ: остановка между уровнями ===
function pauseForNextLevel() {
  isGameActive = false; // временно "замораживаем" игру
  awaitingLevelStart = true;
  currentLevel++;

  levelUpSound.currentTime = 0;
  levelUpSound.play().catch(() => {});

  levelBadge.textContent = `Уровень: ${currentLevel}`;
  btn.textContent = `Продолжить ${currentLevel}-й уровень...`;
  btn.disabled = false; // разблокируем кнопку, чтобы можно было кликнуть
}

function continueToNextLevel() {
  awaitingLevelStart = false;
  isGameActive = true;
  btn.textContent = "Идёт игра...";
  btn.disabled = true;

  spawnFrog(); // сразу запускаем первую лягушку нового уровня
}

// ==================== СТАРТ / КОНЕЦ ИГРЫ ====================
function startGame() {
  score = 0;
  frogsSpawned = 0;
  currentLevel = 1;
  isGameActive = true;
  gameEnded = false;
  awaitingLevelStart = false;

  scoreEl.textContent = score;
  levelBadge.textContent = "Уровень: 1";
  btn.textContent = "Идёт игра...";
  btn.disabled = true;

  calculateLeafPositions();
  spawnFrog();
}

function endGame() {
  if (gameEnded) return;
  gameEnded = true;
  isGameActive = false;

  clearTimeout(spawnTimeoutId);
  clearTimeout(frogTimeoutId);

  if (currentFrog) {
    currentFrog.remove();
    currentFrog = null;
  }

  audio.pause();
  audio.currentTime = 0;

  saveBestScoreIfBetter(score);

  // === заменили одну строку на этот блок ===
  if (score >= getTotalFrogs()) {
    btn.textContent = "Победа! Играть снова";
    win.currentTime = 0;
    win.play().catch(() => {});
  } else {
    btn.textContent = `Игра окончена! Поймано ${score} из ${getTotalFrogs()}. Играть снова`;
    loss.currentTime = 0;
    loss.play().catch(() => {});
  }
  // ==========================================

  btn.disabled = false;
}

// === кнопка теперь обрабатывает 3 разных состояния ===
btn.addEventListener("click", () => {
  if (awaitingLevelStart) {
    continueToNextLevel();
  } else if (!isGameActive) {
    startGame();
  }
  // если isGameActive === true и awaitingLevelStart === false — игра уже идёт, клик игнорируем
});

const soundToggleBtn = document.getElementById("button2");
let isMuted = false;

soundToggleBtn.addEventListener("click", () => {
  isMuted = !isMuted;

  audio.muted = isMuted;
  win.muted = isMuted;
  loss.muted = isMuted;
  levelUpSound.muted = isMuted;
  splash.muted = isMuted;

  soundToggleBtn.textContent = isMuted
    ? "🔇 Включить звук"
    : "🔊 Выключить звук";
});