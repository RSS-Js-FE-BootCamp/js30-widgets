import { switchVideo } from "./handles.js";

const btnPrev = document.querySelector(".slider-prev");
const btnNext = document.querySelector(".slider-next");
const sliderTrack = document.querySelector(".slider-track");
export const items = document.querySelectorAll(".slider-item");
const sliderVisible = document.querySelector(".slider-visible");
const mediaQuery = window.matchMedia("(max-width: 768px)");
let countVisibleItem = 3;
let sliderItemWidth = document.querySelector(".slider-item").offsetWidth;
let sliderTrackWidth = sliderTrack.offsetWidth;
const GAP = 15;
let shift = (sliderTrackWidth / 12) * countVisibleItem + GAP * countVisibleItem;
let maxShift = sliderItemWidth * 6 + GAP * 6;

let isAnimation = false;

function returnCountVisibleSlide() {
  if (mediaQuery) {
    return 3;
  }
  return 2;
}

export function initSlider() {
  function handleTabletChange(e) {
    if (e.matches) {
      countVisibleItem = returnCountVisibleSlide();
      sliderItemWidth = document.querySelector(".slider-item").offsetWidth;
      sliderTrackWidth = sliderTrack.offsetWidth;
      shift =
        (sliderTrackWidth / 12) * countVisibleItem + GAP * countVisibleItem;
      maxShift = sliderItemWidth * 4 + GAP * 4;
    } else {
      countVisibleItem = returnCountVisibleSlide();
      sliderItemWidth = document.querySelector(".slider-item").offsetWidth;
      sliderTrackWidth = sliderTrack.offsetWidth;
      shift =
        (sliderTrackWidth / 12) * countVisibleItem + GAP * countVisibleItem;
      maxShift = sliderItemWidth * 6 + GAP * 6;
    }
    sliderTrack.style.transform = `translateX(-${shift}px)`;
  }

  window.addEventListener("resize", () => {
    handleTabletChange(mediaQuery);
  });

  function nextSlide() {
    if (isAnimation) return;
    isAnimation = true;

    if (shift >= maxShift) {
      shift = 0;
      sliderTrack.style.transition = `none`;
      sliderTrack.style.transform = `translateX(${shift}px)`;

      setTimeout(() => {
        shift += sliderItemWidth + GAP;
        sliderTrack.style.transition = `transform 0.3s`;
        sliderTrack.style.transform = `translateX(-${shift}px)`;
      }, 0);
    } else {
      shift += sliderItemWidth + GAP;

      sliderTrack.style.transition = `transform 0.3s`;
      sliderTrack.style.transform = `translateX(-${shift}px)`;
    }

    setTimeout(() => {
      isAnimation = false;
    }, 300);
  }

  function prevSlide() {
    if (isAnimation) return;
    isAnimation = true;

    if (shift <= 1) {
      shift = maxShift;
      sliderTrack.style.transition = `none`;
      sliderTrack.style.transform = `translateX(-${shift}px)`;

      setTimeout(() => {
        shift -= sliderItemWidth + GAP;

        sliderTrack.style.transition = `transform 0.3s`;
        sliderTrack.style.transform = `translateX(-${shift}px)`;
      }, 0);
    } else {
      shift -= sliderItemWidth + GAP;

      sliderTrack.style.transition = `transform 0.3s`;
      sliderTrack.style.transform = `translateX(-${shift}px)`;
    }

    setTimeout(() => {
      isAnimation = false;
    }, 300);
  }

  function createClone() {
    const itemToCloneNext = [...items].slice(0, countVisibleItem);
    const itemToClonePrev = [...items].slice(countVisibleItem);

    for (let i = 0; i < itemToCloneNext.length; i++) {
      const cloneNext = itemToCloneNext[i].cloneNode(true);
      const clonePrev =
        itemToClonePrev[itemToClonePrev.length - 1 - i].cloneNode(true);
      sliderTrack.append(cloneNext);
      sliderTrack.prepend(clonePrev);
    }
  }

  createClone();

  btnNext.addEventListener("click", nextSlide);
  btnPrev.addEventListener("click", prevSlide);

  sliderVisible.addEventListener("click", (event) => {
    switchVideo(event);
  });
}

export function scroll() {
  const stepWidth = sliderItemWidth + GAP;
  let leftPhysicalIndex = Math.round(shift / stepWidth);
  let centerPhysicalIndex = leftPhysicalIndex + 1;
  if (centerPhysicalIndex < 0) centerPhysicalIndex = 0;
  if (centerPhysicalIndex > 11) centerPhysicalIndex = 11;
  const allActiveSlides = sliderTrack.querySelectorAll(".active");
  const allSlides = sliderTrack.querySelectorAll(".slider-item");
  allSlides.forEach((slide) => {
    slide.style.transform = "none";
  });
  const activeIndexes = [...allSlides].reduce((acc, current, idx) => {
    if (current.classList.contains("active")) {
      acc.push(idx);
    }
    return acc;
  }, []);

  const currentSlide = Array.from(allSlides).find(
    (el, ind) => ind === centerPhysicalIndex,
  );

  const closest =
    Math.abs(activeIndexes[0] - centerPhysicalIndex) <=
    Math.abs(activeIndexes[1] - centerPhysicalIndex)
      ? activeIndexes[0]
      : activeIndexes[1];

  const longest =
    closest === activeIndexes[0] ? activeIndexes[1] : activeIndexes[0];

  sliderTrack.style.transition = `transform 0.3s`;

  if (
    stepWidth * closest - stepWidth >= maxShift ||
    stepWidth * closest - stepWidth <= 0
  ) {
    shift = stepWidth * longest - stepWidth;
  } else {
    shift = stepWidth * closest - stepWidth;
  }

  sliderTrack.style.transform = `translateX(-${shift}px)`;
}
