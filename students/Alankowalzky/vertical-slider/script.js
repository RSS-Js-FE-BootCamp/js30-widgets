// ─── DOM refs ────────────────────────────────────────────────────────────────

const sliderContainer = document.querySelector('.slider-container');
const leftSlide       = document.querySelector('.left-slide');
const rightSlide      = document.querySelector('.right-slide');
const upButton        = document.querySelector('.up-button');
const downButton      = document.querySelector('.down-button');
const counterCurrent  = document.querySelector('.counter-current');
const dotsNav         = document.querySelector('.dots-nav');
const progressFill    = document.querySelector('.progress-fill');

const slidesLength = rightSlide.querySelectorAll('div').length;   // 4
let activeSlideIndex = 0;

// ─── Build dot indicators ────────────────────────────────────────────────────

function buildDots() {
  for (let i = 0; i < slidesLength; i++) {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => { manualChange(i); });
    dotsNav.appendChild(dot);
  }
}

// ─── Sync counter + dots ─────────────────────────────────────────────────────

function updateUI() {
  counterCurrent.textContent = String(activeSlideIndex + 1).padStart(2, '0');
  dotsNav.querySelectorAll('.dot').forEach((dot, i) => {
    const active = i === activeSlideIndex;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-selected', active ? 'true' : 'false');
  });
}

// ─── Apply counter-directional transforms ────────────────────────────────────
// Right column (normal DOM order)  → moves UP:   translateY(-n * 100vh)
// Left  column (reverse DOM order) → moves DOWN: translateY((n-(N-1)) * 100vh)
//   n=0 → -3*100vh → Eagle   (last panel)  in viewport ✓
//   n=1 → -2*100vh → Mountain              ✓
//   n=2 → -1*100vh → Flower               ✓
//   n=3 →  0       → Castle  (first panel) ✓

function applyTransform() {
  const n      = activeSlideIndex;
  const offset = n - (slidesLength - 1);
  rightSlide.style.transform = `translateY(calc(${-n} * 100vh))`;
  leftSlide.style.transform  = `translateY(calc(${offset} * 100vh))`;
}

// ─── Core slide change ───────────────────────────────────────────────────────

function changeSlide(direction) {
  if (direction === 'up') {
    activeSlideIndex = activeSlideIndex >= slidesLength - 1 ? 0 : activeSlideIndex + 1;
  } else {
    activeSlideIndex = activeSlideIndex <= 0 ? slidesLength - 1 : activeSlideIndex - 1;
  }
  applyTransform();
  updateUI();
}

// ─── Animation lock (prevents stacking during 0.5s transition) ───────────────

let isAnimating = false;

function tryChange(direction) {
  if (isAnimating) return;
  isAnimating = true;
  changeSlide(direction);
  setTimeout(() => { isAnimating = false; }, 500);
}

// ─── Autoplay + progress bar ─────────────────────────────────────────────────

const AUTOPLAY_DELAY = 4000;
let autoplayTimer = null;

function startProgress() {
  progressFill.style.transition = 'none';
  progressFill.style.width      = '0%';
  progressFill.getBoundingClientRect();            // force reflow
  progressFill.style.transition = `width ${AUTOPLAY_DELAY}ms linear`;
  progressFill.style.width      = '100%';
}

function resetProgress() {
  progressFill.style.transition = 'none';
  progressFill.style.width      = '0%';
}

function scheduleNext() {
  clearTimeout(autoplayTimer);
  autoplayTimer = setTimeout(() => {
    tryChange('up');
    startProgress();
    scheduleNext();
  }, AUTOPLAY_DELAY);
}

function startAutoplay() {
  startProgress();
  scheduleNext();
}

function pauseAutoplay() {
  clearTimeout(autoplayTimer);
  resetProgress();
}

function resumeAutoplay() {
  startAutoplay();
}

// ─── Manual navigation (resets autoplay timer) ───────────────────────────────

function manualChange(indexOrDirection) {
  pauseAutoplay();
  if (typeof indexOrDirection === 'number') {
    activeSlideIndex = indexOrDirection;
    applyTransform();
    updateUI();
  } else {
    tryChange(indexOrDirection);
  }
  resumeAutoplay();
}

// ─── Event listeners ─────────────────────────────────────────────────────────

upButton.addEventListener('click',   () => manualChange('down'));
downButton.addEventListener('click', () => manualChange('up'));

// ArrowDown = next slide, ArrowUp = previous slide
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); manualChange('up'); }
  if (e.key === 'ArrowUp')   { e.preventDefault(); manualChange('down'); }
});

// Pause on hover so user can read; resume on leave
sliderContainer.addEventListener('mouseenter', pauseAutoplay);
sliderContainer.addEventListener('mouseleave', resumeAutoplay);

// ─── Boot ────────────────────────────────────────────────────────────────────

function init() {
  buildDots();
  applyTransform();
  updateUI();
}

init();
startAutoplay();
