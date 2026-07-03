let slidesText = document.querySelectorAll('.slide-text');
let slidesImage = document.querySelectorAll('.slide-image');
let btnUp = document.querySelector('.btn-up');
let btnDown = document.querySelector('.btn-down');
let sliderLeft = document.querySelector('.slider__left');
let sliderRight = document.querySelector('.slider__right');
let currentSlide = 0;

function updateSlider() {
    slidesText.forEach(slide => slide.classList.remove('active'));
    slidesImage.forEach(slide => slide.classList.remove('active'));
    slidesText[currentSlide].classList.add('active');
    slidesImage[currentSlide].classList.add('active');

    const activeSlide = slidesText[currentSlide];
    const bg = activeSlide.dataset.bg;
    const colorTitle = activeSlide.dataset.titleColor;
    const colorText = activeSlide.dataset.textColor;

    sliderLeft.style.background = bg;
    sliderRight.style.background = bg;

    const h2 = activeSlide.querySelector('h2');
    const p = activeSlide.querySelector('p');
    h2.style.color = colorTitle;
    p.style.color = colorText;
}

function nextSlide() {
    currentSlide++;
    if (currentSlide === slidesText.length) {
        currentSlide = 0;
    }

    updateSlider();
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slidesText.length - 1;
    }

    updateSlider();
}

btnDown.addEventListener('click', nextSlide);
btnUp.addEventListener('click', prevSlide);

updateSlider();