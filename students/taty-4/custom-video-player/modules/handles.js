import { isMouseIverPanel } from "../script.js";

export const player = document.querySelector(".player");
export const video = document.querySelector(".player__video");
export const btnPlay = document.querySelector(".player__play");
export const btnVolume = document.querySelector(".player__volume");
export const inputVolume = document.querySelector("input[name='volume']");
export const inputSpeed = document.querySelector("input[name='playbackRate']");
export const btnRewindForward = document.querySelector(
  ".player__rewind-forward",
);
export const btnRewindBack = document.querySelector(".player__rewind-back");
export const track = document.querySelector(".player__track");
export const btnFullScreen = document.querySelector(".player__full-screen");
const fullTimeTxt = document.querySelector(".player__time--full");
const currentTimeTxt = document.querySelector(".player__time--current");
export const controlPanel = document.querySelector(".player-controls");
export const biblioteka = document.querySelector(".biblioteka-list");
const posters = document.querySelectorAll(".biblioteka__item");
const titleVideo = document.querySelector(".title-video");
const speedText = document.querySelector(".speed-txt");
const COLOR_ACTIVE = "#E50914";
const COLOR_BG = "#E0E0E0";

export function initPlayer() {
  video.volume = inputVolume.value;
  const part = 1;
  video.src = `./assets/videos/part${part}.mp4`;
  video.poster = `./assets/posters/poster${part}.webp`;
  titleVideo.textContent = `Sprite Fright (part ${part})`;
  posters.forEach((poster, index) => {
    if (index === +part - 1) {
      poster.classList.add("active");
    } else {
      poster.classList.remove("active");
    }
  });
  updateTrack();
  printRange(inputVolume);
  printRange(inputSpeed);
}

initPlayer();

//   TooglePlay
export function tooglePlay() {
  if (video.paused) {
    video.play();
    resetTimer();
    startTimer();
  } else {
    video.pause();
    resetTimer();
  }
  btnPlay.classList.toggle("is-pause");
}

//   Volume
export function changeVolume(e) {
  video.volume = +e.target.value;
  video.muted = +e.target.value <= 0;
  btnVolume.classList.toggle("is-mute", video.muted);
  printRange(inputVolume);
}

export function changeVolumeWithKey(step) {
  if (Math.round((video.volume + step) * 100) / 100 < 0) {
    video.muted = true;
    btnVolume.classList.toggle("is-mute", video.muted);
    return;
  } else if (Math.round((video.volume + step) * 100) / 100 <= 0 > 1) {
    return;
  } else {
    video.muted = false;
    btnVolume.classList.toggle("is-mute", video.muted);
    inputVolume.value = +(video.volume + +step).toFixed(2);
    video.volume = Math.round((video.volume + step) * 100) / 100;
    console.log(video.volume, video.muted);
    inputVolume.value = video.volume;
    printRange(inputVolume);
  }
  resetTimer();
  startTimer();
}

//   Mute
export function toogleMute() {
  video.muted = !video.muted;
  btnVolume.classList.toggle("is-mute", video.muted);
  inputVolume.value = video.muted ? "0" : video.volume;
  printRange(inputVolume);
  resetTimer();
  startTimer();
}

//   Speed
export function playbackRate(e) {
  const name = e.target.name;
  video[name] = e.target.value;
  speedText.textContent = Number(e.target.value).toFixed(2);
  printRange(e.target);
}

export function changeSpeedWithKey(step) {
  video.playbackRate += step;
  inputSpeed.value = video.playbackRate;
  speedText.textContent = Number(inputSpeed.value).toFixed(2);
  printRange(inputSpeed);
  resetTimer();
  startTimer();
}

//   Перемотка
export function rewindVideo(step) {
  video.currentTime += step;
  resetTimer();
  startTimer();
}

//   Дорожка воспроизведени
export function updateTrack() {
  let percent = 0;
  if (!video.duration) {
    track.value = 0;
  } else {
    percent = (video.currentTime / video.duration) * 100;
    track.value = percent;
  }

  track.style.background = `linear-gradient(to right, ${COLOR_ACTIVE} 0%, ${COLOR_ACTIVE} ${percent}%, ${COLOR_BG} ${percent}%, ${COLOR_BG} 100%)`;
  updateTime();
}

//   Изменение дорожки
export function printRange(input) {
  const value = input.value;
  const min = input.min || 0;
  const max = input.max || 1;

  const percent = ((value - min) / (max - min)) * 100;
  input.style.background = `linear-gradient(to right, ${COLOR_ACTIVE} 0%, ${COLOR_ACTIVE} ${percent}%, ${COLOR_BG} ${percent}%, ${COLOR_BG} 100%)`;
}

export function handleTrack(e) {
  const newTime = (event.target.value / 100) * video.duration;
  video.currentTime = newTime;
  updateTrack();
  updateTime();
}

//   Полноэкранный режим
export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    try {
      player.requestFullscreen();
    } catch (err) {
      console.error(
        `Ошибка при переходе в полноэкранный режим: ${err.message}`,
      );
    }
  } else {
    document.exitFullscreen();
  }
  resetTimer();
  startTimer();
}

export function handleFullScreen() {
  btnFullScreen.classList.toggle("is-full");
}

//   Обновление времени
export function updateTime() {
  let fullMinutes = Math.floor(video.duration / 60);
  let fullSeconds = Math.floor(video.duration - fullMinutes * 60);
  let currentMinutes = Math.floor(video.currentTime / 60);
  let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);

  fullMinutes = fullMinutes < 10 ? `0${fullMinutes}` : `${fullMinutes}`;
  fullSeconds = fullSeconds < 10 ? `0${fullSeconds}` : `${fullSeconds}`;
  currentMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`;
  currentSeconds =
    currentSeconds < 10 ? `0${currentSeconds}` : `${currentSeconds}`;

  if (video.duration) {
    currentTimeTxt.textContent = `${currentMinutes}:${currentSeconds}`;
    fullTimeTxt.textContent = `${fullMinutes}:${fullSeconds}`;
  } else {
    currentTimeTxt.textContent = `00:00`;
    fullTimeTxt.textContent = `00:00`;
  }
}

//   Таймер
let mouseTimer = null;

export function startTimer() {
  if (video.paused || isMouseIverPanel) return;
  mouseTimer = setTimeout(() => {
    controlPanel.classList.add("is-hidden");
  }, 3000);
}

export function resetTimer() {
  if (mouseTimer) {
    controlPanel.classList.remove("is-hidden");
    clearTimeout(mouseTimer);
    mouseTimer = null;
  }
}

//   Переключение видео
export function switchVideo(event) {
  const item =
    event.target.closest(".biblioteka__item") ||
    event.target.closest(".slider-item");
  if (item) {
    const part = item.dataset.part;
    video.src = `./assets/videos/part${part}.mp4`;
    video.currentTime = 0;

    track.value = 0;
    video.poster = `./assets/posters/poster${part}.webp`;
    btnPlay.classList.remove("is-pause");
    const allParts = document.querySelectorAll(`[data-part]`);

    allParts.forEach((part) => {
      part.classList.remove("active");
    });

    const activeParts = document.querySelectorAll(`[data-part='${part}']`);

    activeParts.forEach((activePart) => {
      activePart.classList.add("active");
    });

    updateTitleVideo(`Sprite Fright (part ${part})`);
    resetTimer();
    updateTime();
  }
}

//   Фреймы
const VIDEO_FPS = 24;
const FRAME_DURATION = 1 / VIDEO_FPS;

export function showNextFrame() {
  video.pause();
  btnPlay.classList.remove("is-pause");
  if (video.currentTime + FRAME_DURATION < video.duration) {
    video.currentTime += FRAME_DURATION;
  } else {
    video.currentTime = video.duration;
  }
  resetTimer();
  startTimer();
}

export function showPrevFrame() {
  video.pause();
  btnPlay.classList.remove("is-pause");
  if (video.currentTime - FRAME_DURATION > 0) {
    video.currentTime -= FRAME_DURATION;
  } else {
    video.currentTime = 0;
  }
  resetTimer();
  startTimer();
}

//   Переход по процентам видео
export function moveToPoint(percent) {
  const targetTime = (video.duration / 100) * percent;
  video.currentTime = targetTime;
  updateTrack();
  resetTimer();
  startTimer();
}

//   Обновление названия видео
function updateTitleVideo(name) {
  titleVideo.textContent = name;
}
