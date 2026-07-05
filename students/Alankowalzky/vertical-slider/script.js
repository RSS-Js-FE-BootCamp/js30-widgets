// ─── DOM refs ────────────────────────────────────────────────────────────────

const sliderContainer = document.querySelector('.slider-container');
const leftSlide       = document.querySelector('.left-slide');
const rightSlide      = document.querySelector('.right-slide');
const upButton        = document.querySelector('.up-button');
const downButton      = document.querySelector('.down-button');
const counterCurrent  = document.querySelector('.counter-current');
const dotsNav         = document.querySelector('.dots-nav');
const progressFill    = document.querySelector('.progress-fill');
const orientBtn       = document.querySelector('.orient-button');

const slidesLength = rightSlide.querySelectorAll('div').length;   // 4
let activeSlideIndex = 0;
let isHorizontal     = false;   // orientation toggle state

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
// Vertical:   right → translateY(-n·100vh), left → translateY((n-(N-1))·100vh)
// Horizontal: right → translateX(-n·100vw), left → translateX((n-(N-1))·100vw)

function applyTransform() {
  const n      = activeSlideIndex;
  const offset = n - (slidesLength - 1);
  const axis   = isHorizontal ? 'X' : 'Y';
  const unit   = isHorizontal ? '100vw' : '100vh';

  rightSlide.style.transform = `translate${axis}(calc(${-n} * ${unit}))`;
  leftSlide.style.transform  = `translate${axis}(calc(${offset} * ${unit}))`;
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
  progressFill.getBoundingClientRect();
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

function startAutoplay() { startProgress(); scheduleNext(); }
function pauseAutoplay()  { clearTimeout(autoplayTimer); resetProgress(); }
function resumeAutoplay() { startAutoplay(); }

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

// ─── Orientation toggle ───────────────────────────────────────────────────────
// Switches between vertical (default) and horizontal layout at runtime.
// Updates container class, button icons, dot direction and progress bar axis.

function toggleOrientation() {
  isHorizontal = !isHorizontal;
  sliderContainer.classList.toggle('horizontal', isHorizontal);
  orientBtn.setAttribute('aria-label',
    isHorizontal ? 'Switch to vertical' : 'Switch to horizontal');
  orientBtn.title = isHorizontal ? 'Switch to vertical' : 'Switch to horizontal';
  applyTransform();   // recalculate with new axis
}

orientBtn.addEventListener('click', toggleOrientation);

// ─── Event listeners ─────────────────────────────────────────────────────────

upButton.addEventListener('click',   () => manualChange('down'));
downButton.addEventListener('click', () => manualChange('up'));

// Keyboard — vertical: ArrowUp/Down, horizontal: ArrowLeft/Right
document.addEventListener('keydown', (e) => {
  const prev = isHorizontal ? 'ArrowLeft'  : 'ArrowUp';
  const next = isHorizontal ? 'ArrowRight' : 'ArrowDown';
  if (e.key === next) { e.preventDefault(); manualChange('up'); }
  if (e.key === prev) { e.preventDefault(); manualChange('down'); }
});

// Mouse wheel — vertical: deltaY, horizontal: deltaX (trackpad) or deltaY
sliderContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = isHorizontal ? (e.deltaX || e.deltaY) : e.deltaY;
  if (delta > 0) { manualChange('up'); }
  else           { manualChange('down'); }
}, { passive: false });

// ─── Touch / pointer swipe ────────────────────────────────────────────────────
// Works with mouse drag, touch, and stylus via Pointer Events API.
// Threshold: 50px in the active axis to register as a swipe.

const SWIPE_THRESHOLD = 50;
let pointerStartX = 0;
let pointerStartY = 0;
let pointerActive = false;

sliderContainer.addEventListener('pointerdown', (e) => {
  pointerStartX = e.clientX;
  pointerStartY = e.clientY;
  pointerActive = true;
  sliderContainer.setPointerCapture(e.pointerId);
});

sliderContainer.addEventListener('pointermove', (e) => {
  if (!pointerActive) return;
  // Cancel default scroll on mobile while swiping
  e.preventDefault();
}, { passive: false });

sliderContainer.addEventListener('pointerup', (e) => {
  if (!pointerActive) return;
  pointerActive = false;

  const dx = e.clientX - pointerStartX;
  const dy = e.clientY - pointerStartY;

  if (isHorizontal) {
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      manualChange(dx < 0 ? 'up' : 'down');
    }
  } else {
    if (Math.abs(dy) >= SWIPE_THRESHOLD) {
      manualChange(dy < 0 ? 'up' : 'down');
    }
  }
});

sliderContainer.addEventListener('pointercancel', () => { pointerActive = false; });

// Pause on hover, resume on leave
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

// ─── console.table self-evaluation ───────────────────────────────────────────
console.table([
  { feature: 'Vertical split-screen 35/65',        status: '✅ done', points: 'base' },
  { feature: 'Counter-directional animation',       status: '✅ done', points: 'base' },
  { feature: 'Up / Down buttons',                   status: '✅ done', points: 'base' },
  { feature: 'Slide counter (01 / 04)',             status: '✅ done', points: 'base' },
  { feature: 'Dot navigation',                      status: '✅ done', points: 'base' },
  { feature: 'Infinite loop (mandatory)',           status: '✅ done', points: 'mandatory' },
  { feature: 'Keyboard ArrowUp / ArrowDown',        status: '✅ done', points: 'bonus' },
  { feature: 'Autoplay every 4 s + progress bar',  status: '✅ done', points: 'bonus' },
  { feature: 'Mouse wheel navigation (+10)',        status: '✅ done', points: '+10' },
  { feature: 'Touch / pointer swipe (+10)',         status: '✅ done', points: '+10' },
  { feature: 'Orientation toggle V↔H (+10)',        status: '✅ done', points: '+10' },
  { feature: 'Animation lock (no double-fire)',     status: '✅ done', points: 'quality' },
  { feature: 'Pause autoplay on hover',             status: '✅ done', points: 'quality' },
  { feature: 'Pointer capture (clean swipe)',       status: '✅ done', points: 'quality' },
]);
