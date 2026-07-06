const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main-slide');

const mainItems = Array.from(mainSlide.children);
const sidebarItems = Array.from(sidebar.children);

const slidesCount = mainItems.length;
let activeSlideIndex = 1;
let isAnimating = false;

//клонируем последний слайд с картинкой в начало, а первый в конец mainSlide
mainSlide.prepend(mainItems[slidesCount - 1].cloneNode(true));
mainSlide.append(mainItems[0].cloneNode(true));

//клонируем последний слайд в начало, первый слайд в конец sidebar
sidebar.prepend(sidebarItems[slidesCount - 1].cloneNode(true));
sidebar.append(sidebarItems[0].cloneNode(true));

//клон + 7 реальных + клон
const totalSlidesCount = slidesCount + 2;

sidebar.style.top = `-${(totalSlidesCount - 1) * 100}vh`;

jumpToSlide(activeSlideIndex);

upButton.addEventListener('click', () => {
  changeSlide('up');
});

downButton.addEventListener('click', () => {
  changeSlide('down');
});

//прокручивание колесиком мыши
container.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    changeSlide('up');
  }

  if (event.deltaY < 0) {
    changeSlide('down');
  }
});

//перелистывание слайдов кнопками клавиатуры вверх-вниз
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    changeSlide('down');
  }

  if (event.key === 'ArrowDown') {
    changeSlide('up');
  }
});

//после окончания анимации проверяем, не попали ли мы на клон
mainSlide.addEventListener('transitionend', () => {
  if (activeSlideIndex === totalSlidesCount - 1) {
    activeSlideIndex = 1;
    jumpToSlide(activeSlideIndex);
  }

  if (activeSlideIndex === 0) {
    activeSlideIndex = slidesCount;
    jumpToSlide(activeSlideIndex);
  }

  isAnimating = false;
});

//пересчет при ресайзе окна
window.addEventListener('resize', () => {
  jumpToSlide(activeSlideIndex);
});

function changeSlide(direction) {
  if (isAnimating) return;

  isAnimating = true;

  if (direction === 'up') {
    activeSlideIndex++;
  }

  if (direction === 'down') {
    activeSlideIndex--;
  }

  moveToSlide(activeSlideIndex);
}

//плавный переход к слайду
function moveToSlide(index) {
  const height = container.clientHeight;

  mainSlide.classList.remove('no-transition');
  sidebar.classList.remove('no-transition');

  mainSlide.style.transform = `translateY(-${index * height}px)`;
  sidebar.style.transform = `translateY(${index * height}px)`;
}

//мгновенный переход, когда слайдер дошел до конца
function jumpToSlide(index) {
  const height = container.clientHeight;

  mainSlide.classList.add('no-transition');
  sidebar.classList.add('no-transition');

  mainSlide.style.transform = `translateY(-${index * height}px)`;
  sidebar.style.transform = `translateY(${index * height}px)`;

  mainSlide.offsetHeight;
  sidebar.offsetHeight;

  requestAnimationFrame(() => {
    mainSlide.classList.remove('no-transition');
    sidebar.classList.remove('no-transition');
  });
}


//автоплей
const autoplayButton = document.querySelector('.autoplay-button');

let autoplayId = null;


autoplayButton.addEventListener('click', () => {
  if (autoplayId) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

function startAutoplay() {
  autoplayId = setInterval(() => {
    changeSlide('up');
  }, 2000);

  autoplayButton.textContent = '⏸';
  autoplayButton.setAttribute('aria-label', 'Stop autoplay');
}

function stopAutoplay() {
  clearInterval(autoplayId);
  autoplayId = null;

  autoplayButton.textContent = '▶';
  autoplayButton.setAttribute('aria-label', 'Start autoplay');
}
