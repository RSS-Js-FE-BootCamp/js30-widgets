const video = document.querySelector('video');
const btnPlayPause = document.querySelector('.button__play-pause');
const btnFullscreen = document.querySelector('.button__fullscreen');

// keystrokes
const handleKeyboard = (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    playPauseVideo();
  }

  if (e.code === 'KeyF') {
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

// implement fullscreen
const enterFullscreen = () => {
  document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
};

addKeyboardEvent();
btnPlayPause.addEventListener('click', playPauseVideo);
btnFullscreen.addEventListener('click', enterFullscreen);