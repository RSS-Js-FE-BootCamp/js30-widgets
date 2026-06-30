import './mandatory.js';
import './catalog.js';
import './slider.js';

export const player = document.querySelector('.player');
export const video = player.querySelector('.video');
export const controlBar = document.querySelector('.control-bar');
export const playPauseBtn = controlBar.querySelector('.play-pause');
export const volume = controlBar.querySelector('.volume');
export const speed = controlBar.querySelector('.speed');
export const progress = document.querySelector('.progress');
export const progressBar = progress.querySelector('.progress-bar');

export const togglePlayPause = () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = '❚❚';
  } else {
    video.pause();
    playPauseBtn.textContent = '►';
  }
};

const progressBarTimeUpdate = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  if (video.currentTime === video.duration) {
    playPauseBtn.textContent = '►';
  }
};

const scrubbing = (e) => {
  const rect = progress.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  video.currentTime = ratio * video.duration;
};

const playPause = (e) => {
  if (
    !e.target.closest('.play-pause') &&
    !e.target.closest('.video')
  ) return;
  togglePlayPause();
};

const setVolume = (e) => {
  e.target.title = e.target.value;
  video.volume = e.target.value;
};

const setSpeed = (e) => {
  e.target.title = e.target.value;
  video.playbackRate = e.target.value;
};

const skip = (e) => {
  if (
    !e.target.closest('.move-back') &&
    !e.target.closest('.move-forward')
  ) return;
  video.currentTime += parseFloat(e.target.dataset.skip);
};

let isDragableProgress = false;
progress.addEventListener('click', scrubbing);
progress.addEventListener('mousedown', () => isDragableProgress = true);
progress.addEventListener('mousemove', (e) => isDragableProgress && scrubbing(e));
progress.addEventListener('mouseup', () => isDragableProgress = false);
progress.addEventListener('mouseleave', () => isDragableProgress = false);

player.addEventListener('click', playPause);
video.addEventListener('timeupdate', progressBarTimeUpdate);
volume.addEventListener('input', setVolume);
speed.addEventListener('input', setSpeed);
controlBar.addEventListener('click', skip);