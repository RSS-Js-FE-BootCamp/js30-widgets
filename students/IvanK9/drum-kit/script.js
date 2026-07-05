function playSound(e) {
  const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const list = document.querySelector(".keys__list");
  const el = list.querySelector(`.keys__item[data-key="${e.keyCode}"]`);

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
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playSound);
