const slider = document.querySelector(".slider");
const leftSlide = document.querySelector(".left-slide");
const rightSlide = document.querySelector(".right-slide");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");

let slides = rightSlide.querySelectorAll("div");
let slidesCount = slides.length;
let activeSlideIndex = 0;

// дублируем первый и последний
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slidesCount - 1].cloneNode(true);

rightSlide.appendChild(firstClone);
rightSlide.insertBefore(lastClone, slides[0]);

const leftSlides = leftSlide.querySelectorAll("div");
const firstCloneLeft = leftSlides[0].cloneNode(true);
const lastCloneLeft = leftSlides[leftSlides.length - 1].cloneNode(true);

leftSlide.appendChild(firstCloneLeft);
leftSlide.insertBefore(lastCloneLeft, leftSlides[0]);

slidesCount = rightSlide.querySelectorAll("div").length;

function changeSlide(direction) {
  if (direction === "up") {
    activeSlideIndex++;
  } else {
    activeSlideIndex--;
  }

  rightSlide.style.transition = "transform 0.5s ease-in-out";
  leftSlide.style.transition = "transform 0.5s ease-in-out";

  rightSlide.style.transform = `translateY(-${activeSlideIndex * 100}vh)`;
  leftSlide.style.transform = `translateY(${activeSlideIndex * 100}vh)`;

  // обработка зацикливания
  rightSlide.addEventListener(
    "transitionend",
    () => {
      if (activeSlideIndex === slidesCount - 1) {
        rightSlide.style.transition = "none";
        leftSlide.style.transition = "none";
        activeSlideIndex = 1; // возвращаемся на первый реальный
        rightSlide.style.transform = `translateY(-${activeSlideIndex * 100}vh)`;
        leftSlide.style.transform = `translateY(${activeSlideIndex * 100}vh)`;
      }
      if (activeSlideIndex === 0) {
        rightSlide.style.transition = "none";
        leftSlide.style.transition = "none";
        activeSlideIndex = slidesCount - 2; // возвращаемся на последний реальный
        rightSlide.style.transform = `translateY(-${activeSlideIndex * 100}vh)`;
        leftSlide.style.transform = `translateY(${activeSlideIndex * 100}vh)`;
      }
    },
    { once: true },
  );
}

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));
