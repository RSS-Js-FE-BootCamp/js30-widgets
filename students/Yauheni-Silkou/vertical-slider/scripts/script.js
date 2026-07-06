const sliderContainer = document.getElementById("main-slider");
const leftTrack = document.getElementById("left-track");
const rightTrack = document.getElementById("right-track");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");

const realSlidesCount = leftTrack.children.length;
const orientationButton = document.getElementById("orientation-toggle");
let currentIndex = 1;
let isTransitioning = false;
let isHorizontal = false;

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

  if (!isHorizontal) {
    leftTrack.style.transform = `translateY(-${currentIndex * 100}vh)`;
    rightTrack.style.transform = `translateY(-${(realSlidesCount - currentIndex + 1) * 100}vh)`;
  } else {
    leftTrack.style.transform = `translateX(-${currentIndex * 100}vw)`;
    rightTrack.style.transform = `translateX(-${(realSlidesCount - currentIndex + 1) * 100}vw)`;
  }
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

// Optional improvements

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

orientationButton.addEventListener("click", () => {
  isHorizontal = !isHorizontal;
  sliderContainer.classList.toggle("horizontal", isHorizontal);
  updateSliderPosition(false);
});

updateSliderPosition(false);

let startX = 0;
let startY = 0;
let isDragging = false;

sliderContainer.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".nav-button") || event.target.closest(".button"))
    return;

  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;

  sliderContainer.setPointerCapture(event.pointerId);
});

sliderContainer.addEventListener("pointermove", (event) => {
  if (!isDragging) return;
});

sliderContainer.addEventListener("pointerup", (event) => {
  if (!isDragging) return;
  isDragging = false;
  sliderContainer.releasePointerCapture(event.pointerId);

  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  const swipeThreshold = 50;
  if (!isHorizontal) {
    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        changeSlide("prev");
      } else {
        changeSlide("next");
      }
    }
  } else {
    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        changeSlide("prev");
      } else {
        changeSlide("next");
      }
    }
  }
});
