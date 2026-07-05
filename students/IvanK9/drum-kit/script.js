// THEME

const themeBtn = document.querySelector(".header__btn--theme");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// PLAY

function playSound(e) {
  const keyCode =
    e.type === "keydown" ? e.keyCode : e.currentTarget.getAttribute("data-key");
  const sound = document.querySelector(`audio[data-key="${keyCode}"]`);
  const list = document.querySelector(".keys__list");
  const el = list.querySelector(`.keys__item[data-key="${keyCode}"]`);

  if (!sound) return;

  sound.currentTime = 0;
  sound.play();
  el.classList.add("keys__item--playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("keys__item--playing");
}

const keys = document.querySelectorAll(".keys__item");

keys.forEach((key) => {
  key.addEventListener("click", playSound);
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);
