const video = document.querySelector('video');
const btnPlayPause = document.querySelector('.button__play-pause');
const btnVolume = document.querySelector('.button__volume');
const btnFullscreen = document.querySelector('.button__fullscreen');

// keystrokes
const handleKeyboard = (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseVideo();
  } else if (e.code === 'KeyM') {
    e.preventDefault();
    controlTheSound();
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

// implement fullscreen
const enterFullscreen = () => {
  document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
};

addKeyboardEvent();
btnPlayPause.addEventListener('click', playPauseVideo);
btnVolume.addEventListener('click', controlTheSound);
btnFullscreen.addEventListener('click', enterFullscreen);