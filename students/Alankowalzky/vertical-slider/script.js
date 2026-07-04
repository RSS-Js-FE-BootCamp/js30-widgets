// ─── Commit 3: Core state & counter-directional animation ───────────────────

const sliderContainer = document.querySelector('.slider-container');
const leftSlide       = document.querySelector('.left-slide');
const rightSlide      = document.querySelector('.right-slide');
const upButton        = document.querySelector('.up-button');
const downButton      = document.querySelector('.down-button');
const counterCurrent  = document.querySelector('.counter-current');
const dotsNav         = document.querySelector('.dots-nav');

const rightSlides  = rightSlide.querySelectorAll('div');
const slidesLength = rightSlides.length;

let activeSlideIndex = 0;

// ─── Build dot indicators ────────────────────────────────────────────────────

function buildDots() {
  for (let i = 0; i < slidesLength; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(i));
    dotsNav.appendChild(dot);
  }
}

// ─── Sync UI (counter + dots) ────────────────────────────────────────────────

function updateUI() {
  counterCurrent.textContent = String(activeSlideIndex + 1).padStart(2, '0');

  dotsNav.querySelectorAll('.dot').forEach((dot, i) => {
    const isActive = i === activeSlideIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

// ─── Apply translateY to both columns ───────────────────────────────────────
// Right column moves UP   (-index * height)
// Left  column moves DOWN (+index * height, offset from its inverted start)

function applyTransform() {
  const height = sliderContainer.clientHeight;

  rightSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  leftSlide.style.transform  = `translateY(${activeSlideIndex * height}px)`;
}

// ─── Change slide (cyclic / infinite loop) ───────────────────────────────────

function changeSlide(direction) {
  if (direction === 'up') {
    activeSlideIndex = activeSlideIndex >= slidesLength - 1
      ? 0
      : activeSlideIndex + 1;
  } else {
    activeSlideIndex = activeSlideIndex <= 0
      ? slidesLength - 1
      : activeSlideIndex - 1;
  }

  applyTransform();
  updateUI();
}

function goToSlide(index) {
  activeSlideIndex = index;
  applyTransform();
  updateUI();
}

// ─── Initial position correction ─────────────────────────────────────────────
// Left column is a strip of N panels stacked top-to-bottom.
// We shift it up by (N-1) panels so panel 0 aligns with the viewport,
// then changeSlide moves it DOWN — opposite to the right column.
// applyTransform() already encodes the reverse-strip offset, so calling it
// at index=0 correctly places Flying Eagle (last DOM panel) in the viewport.

function init() {
  const height = sliderContainer.clientHeight;
  leftSlide.style.transform = `translateY(-${(slidesLength - 1) * height}px)`;

  buildDots();
  applyTransform();
  updateUI();
}

// ─── Event listeners (no onclick in HTML) ───────────────────────────────────

upButton.addEventListener('click',   () => changeSlide('down'));
downButton.addEventListener('click', () => changeSlide('up'));

// Recalculate on resize so clientHeight stays accurate
window.addEventListener('resize', applyTransform);

// ─── Boot ────────────────────────────────────────────────────────────────────

init();
