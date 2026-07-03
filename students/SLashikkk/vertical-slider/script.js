const sliderContainer = document.querySelector(".slider__container");

const slideRight = document.querySelector(".right__side");
const slideLeft = document.querySelector(".left__side");

const upButton = document.querySelector(".btn__prev");
const downButton = document.querySelector(".btn__next");

const slidesLength = document.querySelectorAll(".right__side li").length;

console.log(slidesLength);

let activesIndex = 0;

slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;