import { playSelectVideo } from "./catalog.js";

const posters = document.querySelector('.posters');
const slides = posters.querySelector('.slides');
let transformTo = 0;

export const removeClass = (elements, elementClass) =>
  elements.forEach((element) =>
    element.classList.remove(elementClass));

const moveSlide = (moveTo, nextPrev) => {
  const slidesChildren = [...slides.children];
  slidesChildren.forEach((slide) =>
    slide.style.transform = `translateX(${moveTo}%)`);
  removeClass(slidesChildren, 'active-slide');
  nextPrev.classList.add('active-slide');
};

const switchVideo = (e) => {
  const activeSlide = posters.querySelector('.active-slide');
  const isLeftArrow = e.target.closest('.left-arrow');
  const isRightArrow = e.target.closest('.right-arrow');
  const isSlide = e.target.closest('.slide');
  
  if (!isLeftArrow && ! isRightArrow && !isSlide) return;

  if (isLeftArrow && activeSlide.previousElementSibling) {
    transformTo += 100;
    moveSlide(transformTo, activeSlide.previousElementSibling);
  }

  if (isRightArrow && activeSlide.nextElementSibling) {
    transformTo -= 100;
    moveSlide(transformTo, activeSlide.nextElementSibling);
  }

  if (isSlide) {
    const videoPoster = isSlide.firstElementChild;
    const allPosters = [...document.querySelectorAll('.poster')];
    removeClass(allPosters, 'active-poster');
    videoPoster.classList.add('active-poster');
    playSelectVideo(`./assets/videos/${videoPoster.dataset.id}.mp4`);
  }

};

posters.addEventListener('click', switchVideo);