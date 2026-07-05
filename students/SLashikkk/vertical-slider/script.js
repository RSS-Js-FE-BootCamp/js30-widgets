const sliderContainer = document.querySelector(".slider__container");
const slideRight = document.querySelector(".right__side ul");
const slideLeft = document.querySelector(".left__side");
const upButton = document.querySelector(".btn__next");
const downButton = document.querySelector(".btn__prev");

const slides = slideRight.querySelectorAll("li");
const slidesText = slideLeft.querySelectorAll("div");
const slidesLength = slides.length;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slidesLength - 1].cloneNode(true);
const firstTextClone = slidesText[0].cloneNode(true);
const lastTextClone = slidesText[slidesLength - 1].cloneNode(true);
slideRight.append(firstClone);
slideRight.prepend(lastClone);
slideLeft.append(firstTextClone);
slideLeft.prepend(lastTextClone);

let activesIndex = 1;
let sliderHeight = sliderContainer.clientHeight;
let isTransitioning = false;

const setInitialPosition = () => {
  slideLeft.style.transition = "none";
  slideRight.style.transition = "none";

  slideLeft.style.top = `-${slidesLength * 100}vh`;

  slideRight.style.transform = `translateY(-${activesIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${(activesIndex - 1) * sliderHeight}px)`;
};

setInitialPosition();

const changeSlide = (direction) => {
  if (isTransitioning) return;
  isTransitioning = true;

  slideRight.style.transition = "transform 0.4s ease-in-out";
  slideLeft.style.transition = "transform 0.4s ease-in-out";

  if (direction === "up") {
    activesIndex++;
  } else {
    activesIndex--;
  }

  updateTransform();
};

const updateTransform = () => {
  slideRight.style.transform = `translateY(-${activesIndex * sliderHeight}px)`;
  slideLeft.style.transform = `translateY(${(activesIndex - 1) * sliderHeight}px)`;
};

slideRight.addEventListener("transitionend", () => {
  if (activesIndex === slidesLength + 1) {
    slideRight.style.transition = "none";
    slideLeft.style.transition = "none";
    activesIndex = 1;
    updateTransform();
  }
  if (activesIndex === 0) {
    slideRight.style.transition = "none";
    slideLeft.style.transition = "none";
    activesIndex = slidesLength;
    updateTransform();
  }
  isTransitioning = false;
});

window.addEventListener("resize", () => {
  sliderHeight = sliderContainer.clientHeight;
  setInitialPosition();
});

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

sliderContainer.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    changeSlide("up");
  } else {
    changeSlide("down");
  }
});
