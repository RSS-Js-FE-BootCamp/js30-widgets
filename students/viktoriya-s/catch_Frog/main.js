// const wrapper = document.getElementById("leafs");
// const btn = document.getElementById("button");
// const audio = new Audio("./audio/Lyagushki.mp3");
// console.log(btn);

// for (let i = 0; i < 6; i++) {
//   const leaf = document.createElement("img");
//     leaf.classList.add("leaf");
//   leaf.src = "./image/11.png";
//   leaf.style.left = `${Math.random() * 100}%`;
//   leaf.style.animationDuration = `${Math.random() * 2 + 3}s`;
//   wrapper.appendChild(leaf);
// }

// btn.addEventListener("click", () => {
//     console.log("click");
//     const frog = document.createElement("img");
//   frog.classList.add("frog");
//   frog.src = "./image/3.png";
//     wrapper.appendChild(frog);
//     audio.play();
//   });

// const frog = document.querySelectorAll(".frog");

// /////////////////////////////////////////////////////////////////////////

// const wrapper = document.getElementById("leafs");
// const btn = document.getElementById("button");
// const audio = new Audio("./audio/Lyagushki.mp3");

// let score = 0;
// let gameInterval = null;
// let currentFrog = null;

// const TOTAL_FROGS = 20;
// const FROG_LIFETIME = 800; // сколько мс лягушка "сидит", прежде чем ускакать

// // создаём кувшинки и сразу запоминаем их позиции
// const leafPositions = [];

// for (let i = 0; i < 6; i++) {
//   const leaf = document.createElement("img");
//   leaf.classList.add("leaf");
//   leaf.src = "./image/11.png";
//   wrapper.appendChild(leaf);
// }

// // позиции считаем ПОСЛЕ того, как все кувшинки добавлены в DOM,
// // чтобы getBoundingClientRect() вернул реальные координаты
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
//       height: rect.height,
//     });
//   });
// }

// function spawnFrog() {
//   // если предыдущая лягушка не поймана — убираем её (ускакала)
//   if (currentFrog) {
//     currentFrog.remove();
//     currentFrog = null;
//   }

//   const randomPos =
//     leafPositions[Math.floor(Math.random() * leafPositions.length)];

//   const frog = document.createElement("img");
//   frog.classList.add("frog");
//   frog.src = "./image/3.png";
//   frog.style.position = "absolute";
//   frog.style.left = `${randomPos.left}px`;
//   frog.style.top = `${randomPos.top}px`;
//   frog.style.width = `${randomPos.width}px`;
//   frog.style.cursor = "pointer";

//   frog.addEventListener("click", (e) => {
//     e.stopPropagation();
//     catchFrog(frog);
//   });

//   wrapper.appendChild(frog);
//   currentFrog = frog;

//   // если не поймали вовремя — лягушка исчезает сама
//   setTimeout(() => {
//     if (currentFrog === frog) {
//       frog.remove();
//       currentFrog = null;
//     }
//   }, FROG_LIFETIME);
// }

// function catchFrog(frog) {
//   score++;
//   scoreEl.textContent = score;
//   frog.remove();
//   currentFrog = null;

//   audio.currentTime = 0;
//   audio.play();

//   if (score >= TOTAL_FROGS) {
//     endGame();
//   }
// }

// function endGame() {
//   clearInterval(gameInterval);
//   gameInterval = null;
//   if (currentFrog) {
//     currentFrog.remove();
//     currentFrog = null;
//   }
//   btn.textContent = "Игра окончена! Начать заново";
//   btn.disabled = false;
// }

// function startGame() {
//   score = 0;
//   scoreEl.textContent = score;
//   btn.textContent = "Идёт игра...";
//   btn.disabled = true;

//   calculateLeafPositions();

//   gameInterval = setInterval(spawnFrog, 1500); // новая лягушка каждые 1.5 сек
// }

// btn.addEventListener("click", () => {
//   if (gameInterval) return; // игра уже идёт
//   startGame();
// });

// /////////////////////////////////////////////////////////////////////////////////////////

const wrapper = document.getElementById("leafs");
const btn = document.getElementById("button");
const scoreEl = document.getElementById("score");
const audio = new Audio("./audio/Lyagushki.mp3");

let score = 0; // сколько поймано
let frogsSpawned = 0; // сколько всего появилось
let gameInterval = null;
let currentFrog = null;

const TOTAL_FROGS = 20;
const FROG_LIFETIME = 1200; // время жизни одной лягушки — увеличено, чтобы успевать кликать
const leafPositions = [];

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
      height: rect.height,
    });
  });
}

function spawnFrog() {
  // если уже показали все 20 — останавливаем игру и не создаём новую
  if (frogsSpawned >= TOTAL_FROGS) {
    endGame();
    return;
  }

  if (currentFrog) {
    currentFrog.remove();
    currentFrog = null;
  }

  frogsSpawned++;

  const randomPos =
    leafPositions[Math.floor(Math.random() * leafPositions.length)];

  const frog = document.createElement("img");
  frog.classList.add("frog");
  frog.src = "./image/3.png";
  frog.style.position = "absolute";
  frog.style.left = `${randomPos.left + randomPos.width / 2 - 60}px`;
  frog.style.top = `${randomPos.top - 100}px`;
  frog.style.cursor = "pointer";

  frog.addEventListener("click", (e) => {
    e.stopPropagation();
    catchFrog(frog);
  });

  wrapper.appendChild(frog);
  currentFrog = frog;

  setTimeout(() => {
    if (currentFrog === frog) {
      frog.remove();
      currentFrog = null;
    }
    // если это была последняя лягушка (поймана или нет) — завершаем игру
    if (frogsSpawned >= TOTAL_FROGS) {
      endGame();
    }
  }, FROG_LIFETIME);
}

function catchFrog(frog) {
  score++;
  scoreEl.textContent = score;
  frog.remove();
  currentFrog = null;

  audio.currentTime = 0;
  audio.play();

  // если поймали последнюю (20-ю) — завершаем игру сразу, не дожидаясь таймаута
  if (frogsSpawned >= TOTAL_FROGS) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);
  gameInterval = null;

  if (currentFrog) {
    currentFrog.remove();
    currentFrog = null;
  }

  if (score >= TOTAL_FROGS) {
    btn.textContent = "Победа! Играть снова";
  } else {
    btn.textContent = `Проигрыш (поймано ${score} из ${TOTAL_FROGS}). Играть снова`;
  }
  btn.disabled = false;
}

function startGame() {
  score = 0;
  frogsSpawned = 0;
  scoreEl.textContent = score;
  btn.textContent = "Идёт игра...";
  btn.disabled = true;

  calculateLeafPositions();

  gameInterval = setInterval(spawnFrog, 1200);
}

btn.addEventListener("click", () => {
  if (gameInterval) return;
  startGame();
});