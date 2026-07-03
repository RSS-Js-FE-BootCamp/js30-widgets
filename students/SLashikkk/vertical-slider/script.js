const sliderContainer = document.querySelector(".slider__container");

const slideRight = document.querySelector(".right__side");
const slideLeft = document.querySelector(".left__side");

const upButton = document.querySelector(".btn__next");
const downButton = document.querySelector(".btn__prev");

const slidesLength = document.querySelectorAll(".right__side li").length;

console.log(slidesLength);

let activesIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;

  if (direction === "up") {
    activesIndex++;
  }
  if (activesIndex > slidesLength - 1) {
    activesIndex = 0;
  } else if (direction === "down") {
    activesIndex--;
    if (activesIndex < 0) {
      activesIndex = slidesLength - 1;
    }
  }

  slideRight.style.transform = `translateY(-${activesIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${activesIndex * sliderHeight}px)`;
};
