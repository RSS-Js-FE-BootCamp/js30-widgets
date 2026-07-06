const sliderContainer = document.getElementById("main-slider");
const leftTrack = document.getElementById("left-track");
const rightTrack = document.getElementById("right-track");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");

const realSlidesCount = leftTrack.children.length;
let currentIndex = 1;
let isTransitioning = false;

function setupInfiniteTracks() {
  const firstLeftClone = leftTrack.firstElementChild.cloneNode(true);
  const lastLeftClone = leftTrack.lastElementChild.cloneNode(true);
  leftTrack.appendChild(firstLeftClone);
  leftTrack.insertBefore(lastLeftClone, leftTrack.firstElementChild);

  const firstRightClone = rightTrack.firstElementChild.cloneNode(true);
  const lastRightClone = rightTrack.lastElementChild.cloneNode(true);
  rightTrack.appendChild(firstRightClone);
  rightTrack.insertBefore(lastRightClone, rightTrack.firstElementChild);
}

setupInfiniteTracks();

function updateSliderPosition(animate = true) {
  const transitionStyle = animate ? "transform 0.5s ease-in-out" : "none";
  leftTrack.style.transition = transitionStyle;
  rightTrack.style.transition = transitionStyle;

  leftTrack.style.transform = `translateY(-${currentIndex * 100}vh)`;
  rightTrack.style.transform = `translateY(-${(realSlidesCount - currentIndex + 1) * 100}vh)`;
}

function changeSlide(direction) {
  if (isTransitioning) return;
  isTransitioning = true;

  if (direction === "next") {
    currentIndex++;
  } else if (direction === "prev") {
    currentIndex--;
  }
  updateSliderPosition(true);
}

function handleTransitionEnd() {
  isTransitioning = false;

  if (currentIndex === realSlidesCount + 1) {
    currentIndex = 1;
    updateSliderPosition(false);
  } else if (currentIndex === 0) {
    currentIndex = realSlidesCount;
    updateSliderPosition(false);
  }
}

leftTrack.addEventListener("transitionend", handleTransitionEnd);

upButton.addEventListener("click", () => changeSlide("next"));
downButton.addEventListener("click", () => changeSlide("prev"));

sliderContainer.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    if (event.deltaY > 0) {
      changeSlide("next");
    } else {
      changeSlide("prev");
    }
  },
  { passive: false },
);

updateSliderPosition(false);
