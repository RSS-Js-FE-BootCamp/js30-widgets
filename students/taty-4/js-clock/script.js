const secondHand = document.querySelector(".sec-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");
const container = document.querySelector(".marks-container");
const digitalClock = document.querySelector(".digital-clock");
const dateContainer = document.querySelector(".date-container");
const btnThemeContainer = document.querySelector(".themes-container");
const btnTimeContainer = document.querySelector(".relax-time-btn");
const allBtnTime = document.querySelectorAll(".time-btn");
const btnPlay = document.querySelector(".play");
const timerTxt = document.querySelector(".timer-txt");
const btnStartAlarm = document.querySelector(".btn-start-alarm");
const btnSnoozeAlarm = document.querySelector(".btn-snooze-alarm");
const inputTime = document.querySelector(".input-time");
const beforeAlarm = document.querySelector(".before-alarm");

function setTime() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  if ((seconds / 60) * 360 <= 0) {
    secondHand.style.transition = "none";
    secondHand.style.transform = `translateY(-40%) rotate(${secondsDegrees}deg)`;
    secondHand.style.transition =
      "transform 0.03s cubic-bezier(0.52, 0.1, 0.67, 2.49);";
  }
  secondHand.style.transform = `translateY(-40%) rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + 90;
  minHand.style.transform = `translateY(-40%) rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 90;
  hourHand.style.transform = `translateY(-40%) rotate(${hoursDegrees}deg)`;

  const secondsDigital = String(seconds).padStart(2, "0");
  const minutesDigital = String(minutes).padStart(2, "0");
  const hoursDigital = String(hours).padStart(2, "0");

  digitalClock.textContent = `${hoursDigital}:${minutesDigital}:${secondsDigital}`;
}

for (let i = 0; i < 60; i++) {
  const mark = document.createElement("div");
  mark.classList.add("mark");

  if (i % 5 === 0) {
    mark.classList.add("hour");
  }

  mark.style.transform = `rotate(${i * 6}deg)`;

  container.appendChild(mark);
}

function setDate() {
  const now = new Date();

  const options = {
    weekday: "long",

    month: "long",
    day: "numeric",
  };

  let formattedDate = now.toLocaleDateString("ru-RU", options);
  formattedDate = `${formattedDate} ${now.getFullYear()}`;

  dateContainer.textContent = formattedDate;
}

btnThemeContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-theme");
  if (!button) return;

  localStorage.setItem("theme", button.dataset.theme);
  document.body.className = button.dataset.theme;
});

let audio;

btnTimeContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".time-btn");
  if (!button) return;

  allBtnTime.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
});

function createAudio() {
  const min = 1;
  const max = 5;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const audio = new Audio(`./audio/${random}.mp3`);
  audio.loop = true;
  return audio;
}

let timerAudio = null;

function startAudioTimer() {
  const time = +document.querySelector(".time-btn.active").dataset.time;
  updateTimeAudio(time);
  audio = createAudio();
  audio.play();
  btnPlay.textContent = "■ Стоп";
  allBtnTime.forEach((btn) => btn.classList.add("active"));
  timerAudio = setTimeout(() => {
    audio.pause();
    btnPlay.textContent = "▶ Старт"; //
    timerTxt.textContent = "Пора работать!";
    allBtnTime.forEach((btn) => btn.classList.remove("active"));
    audio = null;
    timerAudio = null;
  }, time * 60000);
}

let timerAudioTime = null;

function updateTimeAudio(time) {
  let allSeconds = time * 60;
  timerAudioTime = setInterval(() => {
    allSeconds -= 1;
    const minutes = Math.floor(allSeconds / 60);
    const seconds = Math.round(allSeconds - minutes * 60);
    timerTxt.textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
    if (allSeconds <= 0) {
      clearInterval(timerAudioTime);
      timerAudioTime = null;
    }
  }, 1000);
}

function offRelax() {
  if (!audio) return;
  audio.pause();
  btnPlay.textContent = "▶ Старт"; //
  clearTimeout(timerAudio);
  clearInterval(timerAudioTime);
  timerAudioTime = null;
  timerAudio = null;
  timerTxt.textContent = "";
  allBtnTime.forEach((btn) => btn.classList.remove("active"));
  audio = null;
}

btnPlay.addEventListener("click", () => {
  if (!audio) {
    startAudioTimer();
  } else {
    offRelax();
  }
});

let timerIdAlarm = null;
let alarmTriggered = false;
let isSetAlarm = false;
const alarmAudio = new Audio("./audio/alarm.mp3");
alarmAudio.loop = true;

function startAlarm(time) {
  const alarmTime = time;
  beforeAlarm.textContent = `Будильник прозвенит в ${alarmTime}`;
  isSetAlarm = true;

  timerIdAlarm = setInterval(() => {
    if (alarmTriggered) return;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    if (currentTime === alarmTime) {
      offRelax();
      beforeAlarm.textContent = "Будильник звонит";
      alarmTriggered = true;
      btnSnoozeAlarm.disabled = false;
      alarmAudio.play();
    }
  }, 1000);
}

function snoozeAllarm() {
  offAlarm();
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);
  const nexTime = now.toTimeString().slice(0, 5);
  startAlarm(nexTime);
}

inputTime.addEventListener("input", () => {
  btnStartAlarm.disabled = !inputTime.value;
});

function offAlarm() {
  alarmAudio.pause();
  clearInterval(timerIdAlarm);
  alarmAudio.currentTime = 0;
  isSetAlarm = false;
  btnSnoozeAlarm.disabled = true;
  alarmTriggered = false;
}

btnStartAlarm.addEventListener("click", () => {
  if (isSetAlarm) {
    offAlarm();
    beforeAlarm.textContent = "Будильник не заведен";
    btnStartAlarm.textContent = "Старт";
  } else {
    const time = inputTime.value;
    startAlarm(time);
    btnStartAlarm.textContent = "Отключить";
  }
});

btnSnoozeAlarm.addEventListener("click", () => {
  snoozeAllarm();
});

function initClock() {
  const theme = localStorage.getItem("theme") || "forest";
  document.body.className = theme;
  setDate();
  setTime();
  setInterval(setTime, 1000);
}

initClock();
