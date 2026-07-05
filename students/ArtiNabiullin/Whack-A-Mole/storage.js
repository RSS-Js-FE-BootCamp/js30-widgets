export const STORAGE_KEY = "whack-a-mole-scores";

export function getScores() {
  const scores = localStorage.getItem(STORAGE_KEY);
  return scores ? JSON.parse(scores) : [];
}

export function saveScores(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function addScore(name, score) {
  const scores = getScores();

  const player = scores.find((item) => item.name === name);

  if (player) {
    if (score > player.score) {
      player.score = score;
    }
  } else {
    scores.push({ name, score });
  }

  scores.sort((a, b) => b.score - a.score);

  saveScores(scores.slice(0, 10));
}

export function renderScoreBoard() {
  const scores = getScores();
  const list = document.querySelector(".scoreboard");

  list.innerHTML = "";

  scores.forEach((player, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <span class="name">${player.name}</span>
      <span class="points">${player.score}</span>
    `;

    list.appendChild(li);
  });
}
