let slidesText = document.querySelectorAll('.slide-text');
let slidesImage = document.querySelectorAll('.slide-image');
let btnUp = document.querySelector('.btn-up');
let btnDown = document.querySelector('.btn-down');
let sliderLeft = document.querySelector('.slider__left');
let sliderRight = document.querySelector('.slider__right');
let currentSlide = 0;
let slider = document.querySelector('.slider');

let btnPlay = document.querySelector('.btn-play');
let isPlaying = false;
let timerId = null;

let btnOrient = document.querySelector('.btn-orient');
let isHorizontal = false;

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

    const hint = document.querySelector('.hint');
    if (hint && currentSlide > 0) {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 0.5s';
    }

}

function nextSlide() {
    currentSlide++;
    if (currentSlide === slidesText.length) {
        currentSlide = 0;
    }
    if (isPlaying) {
        clearInterval(timerId);
        timerId = setInterval(nextSlide, 3000);
    }

    updateSlider();
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slidesText.length - 1;
    }
    if (isPlaying) {
        clearInterval(timerId);
        timerId = setInterval(nextSlide, 3000);
    }

    updateSlider();
}

btnDown.addEventListener('click', nextSlide);
btnUp.addEventListener('click', prevSlide);

slider.addEventListener('wheel', function(e) {
    if (e.deltaY > 0) {nextSlide()};
    if (e.deltaY < 0) {prevSlide()};
})

const images = document.querySelectorAll('.slide-image img');
images.forEach(img => {
    img.draggable = false;
});

btnPlay.addEventListener('click', function() {
    if(isPlaying === false) {
        timerId = setInterval(nextSlide, 3000);
        isPlaying =true;
        btnPlay.innerHTML = '&#10074;&#10074;';
    }
    else {
        clearInterval(timerId);
        isPlaying = false;
        btnPlay.innerHTML = '&#9654;';
    }
});

btnOrient.addEventListener('click', function() {
    slidesText.forEach(slide => slide.style.transition = 'none');
    slidesImage.forEach(slide => slide.style.transition = 'none');
    isHorizontal = !isHorizontal;
    slider.classList.toggle('horizontal', isHorizontal);
    btnOrient.classList.toggle('horizontal', isHorizontal);
    btnUp.classList.toggle('horizontal', isHorizontal);
    btnDown.classList.toggle('horizontal', isHorizontal);

    updateSlider();

    setTimeout(() => {
        slidesText.forEach(slide => slide.style.transition = '');
        slidesImage.forEach(slide => slide.style.transition = '');
    }, 50);
})

updateSlider();