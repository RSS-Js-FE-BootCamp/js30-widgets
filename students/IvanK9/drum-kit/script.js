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

// INSTRUMENTS

const instrumentsBtn = document.querySelector(".header__btn--instruments");
const instrumentIcon = document.querySelector(".header__btn--instruments img");
let currentInstrument = "drum";

const drumSettings = {
  65: { sound: "clap.wav", label: "clap" },
  83: { sound: "hihat.wav", label: "hihat" },
  68: { sound: "kick.wav", label: "kick" },
  70: { sound: "openhat.wav", label: "openhat" },
  71: { sound: "boom.wav", label: "boom" },
  72: { sound: "ride.wav", label: "ride" },
  74: { sound: "snare.wav", label: "snare" },
  75: { sound: "tom.wav", label: "tom" },
  76: { sound: "tink.wav", label: "tink" },
};

const pianoSettings = {
  65: { sound: "do.wav", label: "do" },
  83: { sound: "re.wav", label: "re" },
  68: { sound: "mi.wav", label: "mi" },
  70: { sound: "fa.wav", label: "fa" },
  71: { sound: "sol.wav", label: "salt" },
  72: { sound: "la.wav", label: "la" },
  74: { sound: "si.wav", label: "c" },
  75: { sound: "do2.wav", label: "do 2" },
  76: { sound: "re2.wav", label: "re 2" },
};

instrumentsBtn.addEventListener("click", () => {
  const audios = document.querySelectorAll("audio");
  const keysElements = document.querySelectorAll(".keys__item");

  if (currentInstrument === "drum") {
    currentInstrument = "piano";
    instrumentIcon.src = "./image/drum.png";

    audios.forEach((audio) => {
      const keyCode = audio.getAttribute("data-key");
      audio.src = `./audio/piano/${pianoSettings[keyCode].sound}`;
    });

    keysElements.forEach((key) => {
      const keyCode = key.getAttribute("data-key");
      const subtitle = key.querySelector(".keys__subtitle");
      if (subtitle) {
        subtitle.textContent = pianoSettings[keyCode].label;
      }
    });
  } else {
    currentInstrument = "drum";
    instrumentIcon.src = "./image/piano.png";

    audios.forEach((audio) => {
      const keyCode = audio.getAttribute("data-key");
      audio.src = `./audio/${drumSettings[keyCode].sound}`;
    });

    keysElements.forEach((key) => {
      const keyCode = key.getAttribute("data-key");
      const subtitle = key.querySelector(".keys__subtitle");
      if (subtitle) {
        subtitle.textContent = drumSettings[keyCode].label;
      }
    });
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
