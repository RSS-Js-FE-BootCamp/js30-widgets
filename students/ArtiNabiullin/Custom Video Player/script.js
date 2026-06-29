/* consts */
const player = document.querySelector(".media-player");
const video = player.querySelector(".video-viewer");
const progress = player.querySelector(".timeline");
const progressBar = player.querySelector(".timeline__filled");
const toggle = player.querySelector(".play-toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".media-player__slider");
const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
const movieCatalog = document.querySelector(".movie-catalog");
const videoNavigation = document.querySelector(".video-navigation");
const prevVideoButton = document.querySelector(".prev-video");
const nextVideoButton = document.querySelector(".next-video");
const videos = [
  {
    title: "Video",
    genre: "with sound",
    year: 2026,
    src: "./videos/30901-383991318.mp4",
    poster: "./img/1.png",
  },
  {
    title: "Video",
    genre: "with sound",
    year: 2025,
    src: "./videos/30901-383991318.mp4",
    poster: "./img/2.png",
  },
  {
    title: "Nature",
    genre: "Horse",
    year: 2026,
    src: "./videos/206294_medium.mp4",
    poster: "./img/3.png",
  },
  {
    title: "Nature",
    genre: "Bird",
    year: 2024,
    src: "./videos/214669_medium.mp4",
    poster: "./img/4.png",
  },
];

/* functions */
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updateButton() {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function isTyping(event) {
  const element = event.target;
  const tagName = element.tagName.toLowerCase();

  const textInputTypes = [
    "text",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "number",
  ];

  return (
    tagName === "textarea" ||
    element.isContentEditable ||
    (tagName === "input" && textInputTypes.includes(element.type))
  );
}

function changePlaybackRate(step) {
  const newRate = video.playbackRate + step;
  const limitedRate = Math.min(Math.max(newRate, 0.5), 2);

  video.playbackRate = limitedRate;
  playbackRateSlider.value = limitedRate;
}

function toggleMute() {
  video.muted = !video.muted;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    movieCatalog.classList.add("movie-catalog--hidden");
    videoNavigation.classList.add("video-navigation--hidden");
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function changeVolume(step) {
  const newVolume = clamp(video.volume + step, 0, 1);

  video.volume = newVolume;
  video.muted = newVolume === 0;

  const volumeSlider = player.querySelector('input[name="volume"]');
  volumeSlider.value = newVolume;
}

function seekBy(seconds) {
  video.currentTime = clamp(video.currentTime + seconds, 0, video.duration);
}

function seekToPercent(percent) {
  video.currentTime = video.duration * percent;
}

function toggleCaptions() {
  const track = video.textTracks[0];

  if (!track) return;

  track.mode = track.mode === "showing" ? "hidden" : "showing";
}

function stepFrame(direction) {
  video.pause();

  const frameTime = 1 / 25;
  video.currentTime = clamp(
    video.currentTime + frameTime * direction,
    0,
    video.duration,
  );
}

function handleKeyboardControl(event) {
  console.log(event.key, event.code, event.shiftKey);

  if (isTyping(event)) return;

  const key = event.key.toLowerCase();

  const isSpeedUpKey =
    event.key === ">" || (event.shiftKey && event.code === "Period");

  const isSpeedDownKey =
    event.key === "<" || (event.shiftKey && event.code === "Comma");

  if (isSpeedUpKey) {
    event.preventDefault();
    changePlaybackRate(0.1);
    return;
  }

  if (isSpeedDownKey) {
    event.preventDefault();
    changePlaybackRate(-0.1);
    return;
  }

  if (event.key >= "0" && event.key <= "9") {
    event.preventDefault();
    seekToPercent(Number(event.key) / 10);
    return;
  }

  switch (key) {
    case " ":
    case "k":
      event.preventDefault();
      togglePlay();
      break;

    case "m":
      toggleMute();
      break;

    case "f":
      toggleFullscreen();
      break;

    case "arrowright":
    case "l":
      event.preventDefault();
      seekBy(10);
      break;

    case "arrowleft":
    case "j":
      event.preventDefault();
      seekBy(-10);
      break;

    case "arrowup":
      event.preventDefault();
      changeVolume(0.05);
      break;

    case "arrowdown":
      event.preventDefault();
      changeVolume(-0.05);
      break;

    case ",":
      event.preventDefault();
      stepFrame(-1);
      break;

    case ".":
      event.preventDefault();
      stepFrame(1);
      break;

    case "c":
      toggleCaptions();
      break;
  }
}
/* listeners */

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
document.addEventListener("keydown", handleKeyboardControl);
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    movieCatalog.classList.remove("movie-catalog--hidden");
    videoNavigation.classList.remove("video-navigation--hidden");
  }
});
prevVideoButton.addEventListener("click", showPrevVideo);
nextVideoButton.addEventListener("click", showNextVideo);

let currentVideoIndex = 0;

renderMovieCatalog();
loadVideo(currentVideoIndex);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate),
);
skipButtons.forEach((button) => button.addEventListener("click", skip));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

/* download videos */

function loadVideo(index) {
  currentVideoIndex = index;

  const currentVideo = videos[currentVideoIndex];

  video.src = currentVideo.src;
  video.poster = currentVideo.poster;
  video.load();

  player.classList.add("media-player--visible");

  document
    .querySelectorAll(".movie-card")
    .forEach((card) => card.classList.remove("movie-card--active"));

  document
    .querySelector(`[data-video-index="${currentVideoIndex}"]`)
    ?.classList.add("movie-card--active");
}

function showNextVideo() {
  const nextIndex = (currentVideoIndex + 1) % videos.length;
  loadVideo(nextIndex);
}

function showPrevVideo() {
  const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  loadVideo(prevIndex);
}

function renderMovieCatalog() {
  movieCatalog.innerHTML = videos
    .map(
      (movie, index) => `
      <button class="movie-card" data-video-index="${index}">
      <img class="movie-card__poster" src="${movie.poster}" alt="${movie.title}" />
      <span class="movie-card__title">${movie.title}</span>
      <span class="movie-card__meta">${movie.genre} · ${movie.year}</span>
      </button>
    `,
    )
    .join("");

  movieCatalog.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", () => {
      loadVideo(Number(card.dataset.videoIndex));
    });
  });
}
