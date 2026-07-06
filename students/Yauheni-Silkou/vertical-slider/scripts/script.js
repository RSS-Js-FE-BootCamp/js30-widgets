const leftTrack = document.getElementById("left-track");
const rightTrack = document.getElementById("right-track");
const upButton = document.getElementById("up-button");
const downButton = document.getElementById("down-button");

const realSlidesCount = leftTrack.children.length;
let currentIndex = 0;
function updateTrackPosition() {
  leftTrack.style.transition = "transform 0.5s ease-in-out";
  rightTrack.style.transition = "transform 0.5s ease-in-out";

  leftTrack.style.transform = `translateY(-${currentIndex * 100}vh)`;
  rightTrack.style.transform = `translateY(-${(realSlidesCount - currentIndex - 1) * 100}vh)`;
}

function changeSlide(direction) {
  if (direction === "next") {
    if (currentIndex < realSlidesCount - 1) {
      currentIndex++;
    }
  } else if (direction === "prev") {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }
  updateTrackPosition();
}

upButton.addEventListener("click", () => changeSlide("next"));
downButton.addEventListener("click", () => changeSlide("prev"));

leftTrack.style.transform = `translateY(0vh)`;
rightTrack.style.transform = `translateY(-${(realSlidesCount - 1) * 100}vh)`;
