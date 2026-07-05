
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const leftSlider = document.querySelector('.left-slider');
const rightSlider = document.querySelector('.right-slider');
const container = document.querySelector('.main-container');

const slidesCount = rightSlider.querySelectorAll('div').length;

function slide(){




leftSlider.style.top = `-${(slidesCount-1)*100}vh`;


upBtn.addEventListener('click', () => {
    changeSlide('up');
})

downBtn.addEventListener('click', () => {
    changeSlide('down');
})

}

let aciveSlide = 0;
function changeSlide(direction){
 if (direction === 'up'){
    aciveSlide++;
    if(aciveSlide===slidesCount){
        aciveSlide = 0;
    }
 }else if( direction === 'down'){
    aciveSlide--;
    if(aciveSlide<0){
        aciveSlide=slidesCount-1;
    }
 }

 const height = container.clientHeight;
 rightSlider.style.transform = `translateY(-${aciveSlide*height}px)`;
 leftSlider.style.transform = `translateY(${aciveSlide*height}px)`
}




document.addEventListener('DOMContentLoaded', function() {
     
   slide();
    
  
});