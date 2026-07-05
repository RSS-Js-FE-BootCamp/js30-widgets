import {
  player,
  video,
  btnPlay,
  btnVolume,
  inputVolume,
  inputSpeed,
  btnRewindForward,
  btnRewindBack,
  track,
  btnFullScreen,
  controlPanel,
  biblioteka,
  initPlayer,
  tooglePlay,
  changeVolume,
  changeVolumeWithKey,
  toogleMute,
  playbackRate,
  changeSpeedWithKey,
  rewindVideo,
  updateTrack,
  printRange,
  handleTrack,
  toggleFullscreen,
  handleFullScreen,
  updateTime,
  startTimer,
  resetTimer,
  switchVideo,
  showNextFrame,
  showPrevFrame,
  moveToPoint,
} from "./modules/handles.js";

import { initSlider, scroll } from "./modules/slider.js";

export let isMouseIverPanel = false;

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initPlayer();
  biblioteka.addEventListener("click", (event) => {
    switchVideo(event);
    scroll();
  });

  //   Обработчик движения мыши
  player.addEventListener("mousemove", () => {
    resetTimer();
    startTimer();
  });

  controlPanel.addEventListener("mouseenter", () => {
    resetTimer();
    isMouseIverPanel = true;
  });

  controlPanel.addEventListener("mouseleave", () => {
    resetTimer();
    startTimer();
    isMouseIverPanel = false;
  });

  //   Обработчик полноэкранного режима
  btnFullScreen.addEventListener("click", toggleFullscreen);
  document.addEventListener("fullscreenchange", handleFullScreen);

  //   Обработчик дорожки
  video.addEventListener("timeupdate", updateTrack);
  track.addEventListener("input", (event) => handleTrack(event));
  video.addEventListener("ended", () => {
    resetTimer();
    btnPlay.classList.remove("is-pause");
  });

  // Обработчики перемотки
  btnRewindForward.addEventListener("click", (event) => {
    const step = +event.target.dataset.step;
    rewindVideo(step);
  });

  btnRewindBack.addEventListener("click", (event) => {
    const step = +event.target.dataset.step;
    rewindVideo(step);
  });

  //   Обрфботчик скорости
  inputSpeed.addEventListener("input", (event) => playbackRate(event));

  //   Обработчик mute
  btnVolume.addEventListener("click", toogleMute);

  //   Обработчик изменения звука
  inputVolume.addEventListener("input", (event) => changeVolume(event));

  //   Обработчики play/pause
  btnPlay.addEventListener("click", tooglePlay);
  video.addEventListener("click", tooglePlay);

  //   Обработчик клавиш
  player.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "Space":
        event.preventDefault();
        tooglePlay();
        break;
      case "KeyK":
        event.preventDefault();
        tooglePlay();
        break;
      case "ArrowRight":
        event.preventDefault();
        rewindVideo(5);
        break;
      case "ArrowLeft":
        event.preventDefault();
        rewindVideo(-5);
        break;
      case "KeyJ":
        event.preventDefault();
        rewindVideo(-10);
        break;
      case "KeyL":
        event.preventDefault();
        rewindVideo(10);
        break;
      case "KeyM":
        event.preventDefault();
        toogleMute();
        break;
      case "ArrowUp":
        event.preventDefault();
        changeVolumeWithKey(0.05);
        break;
      case "ArrowDown":
        event.preventDefault();
        changeVolumeWithKey(-0.05);
        break;
      case "KeyF":
        event.preventDefault();
        toggleFullscreen();
        break;
      case "Period":
        event.preventDefault();
        if (event.shiftKey) {
          changeSpeedWithKey(0.05);
        } else {
          showNextFrame();
        }
        break;
      case "Comma":
        event.preventDefault();
        if (event.shiftKey) {
          console.log(inputSpeed.value);
          changeSpeedWithKey(-0.05);
        } else {
          showPrevFrame();
        }
        break;
      case "Digit0":
        event.preventDefault();
        moveToPoint(0);
        break;
      case "Digit1":
        event.preventDefault();
        moveToPoint(10);
        break;
      case "Digit2":
        event.preventDefault();
        moveToPoint(20);
        break;
      case "Digit3":
        event.preventDefault();
        moveToPoint(30);
        break;
      case "Digit4":
        event.preventDefault();
        moveToPoint(40);
        break;
      case "Digit5":
        event.preventDefault();
        moveToPoint(50);
        break;
      case "Digit6":
        event.preventDefault();
        moveToPoint(60);
        break;
      case "Digit7":
        event.preventDefault();
        moveToPoint(70);
        break;
      case "Digit8":
        event.preventDefault();
        moveToPoint(80);
        break;
      case "Digit9":
        event.preventDefault();
        moveToPoint(90);
        break;
    }
  });

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lastPosition", video.currentTime);
  });
});
