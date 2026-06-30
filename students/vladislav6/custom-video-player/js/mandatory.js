import { video, playPauseBtn, volume, togglePlayPause } from "./main.js";

let isTyping = false;
const input = document.querySelector('input[type=text]');
if (input) {
  input.addEventListener('focus', () => isTyping = true);
  input.addEventListener('blur', () => isTyping = false);
}

document.addEventListener('keydown', (e) => {
  if (isTyping) return;

  if (e.key === ' ') {
    togglePlayPause();
  }

  if (e.key === 'm') {
    const isVolume = video.volume > 0;
    video.volume = isVolume ? 0 : 1;
    volume.value = isVolume ? 0 : 1;
  }

  if (e.key === ',') {
    video.currentTime -= 10;
  }

  if (e.key === '.') {
    video.currentTime += 25;
  }

  if (e.key === 'f') {
    video.requestFullscreen();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});