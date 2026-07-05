const video = document.querySelector('video');
const btnPlayPause = document.querySelector('.button__play-pause');
const btnVolume = document.querySelector('.button__volume');
const btnDecreaseSpeed = document.querySelector('.button__speed-decrease');
const btnIncreaseSpeed = document.querySelector('.button__speed-increase');
const btnFullscreen = document.querySelector('.button__fullscreen');

const min = 0.25;
const max = 2.0;
const speed = 0.25;

// keystrokes
const handleKeyboard = (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseVideo();
  } else if (e.code === 'KeyM') {
    e.preventDefault();
    controlTheSound();
  } else if (e.code === 'Comma') {
    e.preventDefault();
    changeVideoSpeedDecrease();
  } else if (e.code === 'Period') {
    e.preventDefault();
    changeVideoSpeedIncrease();
  } else if (e.code === 'KeyF') {
    e.preventDefault();
    enterFullscreen();
  }
};

const addKeyboardEvent = () => {
  document.addEventListener('keydown', handleKeyboard);
};

// implement play/pause
const playPauseVideo = () => {
  video.paused ? video.play() : video.pause();
};

// implement volume
const controlTheSound = () => {
  video.muted = !video.muted;
};

// implement video playback speed
const changeVideoSpeedDecrease = () => {
  if (video.playbackRate <= min) {
    return;
  } else {
    video.playbackRate -= speed;
  }
};

const changeVideoSpeedIncrease = () => {
  if (video.playbackRate >= max) {
    return;
  } else {
    video.playbackRate += speed;
  }
};

// implement fullscreen
const enterFullscreen = () => {
  document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
};

addKeyboardEvent();
btnPlayPause.addEventListener('click', playPauseVideo);
btnVolume.addEventListener('click', controlTheSound);
btnDecreaseSpeed.addEventListener('click', changeVideoSpeedDecrease);
btnIncreaseSpeed.addEventListener('click', changeVideoSpeedIncrease);
btnFullscreen.addEventListener('click', enterFullscreen);