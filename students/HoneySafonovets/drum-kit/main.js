const main = document.querySelector('.drum');
const drumBtns = document.querySelectorAll('.drum__box-item');
const audio65 = new Audio('../shared/clap.wav');
const audio83 = new Audio('../shared/hihat.wav');
const audio68 = new Audio('../shared/kick.wav');
const audio70 = new Audio('../shared/openhat.wav');
const audio71 = new Audio('../shared/boom.wav');
const audio72 = new Audio('../shared/ride.wav');
const audio74 = new Audio('../shared/snare.wav');
const audio75 = new Audio('../shared/tom.wav');
const audio76 = new Audio('../shared/tink.wav');


// Additional variable
const btnTheme = document.querySelector('.theme-widget');
const imgChange = document.querySelector('.theme-widget__item');
const btnsTools = document.querySelectorAll('.choose-tools-item');
let isSun = 1;

document.addEventListener('DOMContentLoaded', () => {
  const isSunStorage = localStorage.getItem('isSun');
  isSun = Number(isSunStorage);
  getThemeInStorage(Number(isSunStorage));
});


// Functions for clicking and use keyboard
document.addEventListener('keydown', (event) => {
  if (event.which === 65) {
    audio65.currentTime = 0;
    audio65.play()
    document.querySelector('[data-key="65"]').classList.add('playing');
  }
  if (event.which === 83) {
    audio83.currentTime = 0;
    audio83.play()
    document.querySelector('[data-key="83"]').classList.add('playing');
  }
  if (event.which === 68) {
    audio68.currentTime = 0;
    audio68.play()
    document.querySelector('[data-key="68"]').classList.add('playing');
  }
  if (event.which === 70) {
    audio70.currentTime = 0;
    audio70.play()
    document.querySelector('[data-key="70"]').classList.add('playing');
  }
  if (event.which === 71) {
    audio71.currentTime = 0;
    audio71.play()
    document.querySelector('[data-key="71"]').classList.add('playing');
  }
  if (event.which === 72) {
    audio72.currentTime = 0;
    audio72.play()
    document.querySelector('[data-key="72"]').classList.add('playing');
  }
  if (event.which === 74) {
    audio74.currentTime = 0;
    audio74.play()
    document.querySelector('[data-key="74"]').classList.add('playing');
  }
  if (event.which === 75) {
    audio75.currentTime = 0;
    audio75.play()
    document.querySelector('[data-key="75"]').classList.add('playing');
  }
  if (event.which === 76) {
    audio76.currentTime = 0;
    audio76.play()
    document.querySelector('[data-key="76"]').classList.add('playing');
  }
});

document.addEventListener('keyup', (event) => {
  if (event.which === 65) {
    document.querySelector('[data-key="65"]').classList.remove('playing');
  }
  if (event.which === 83) {
    document.querySelector('[data-key="83"]').classList.remove('playing');
  }
  if (event.which === 68) {
    document.querySelector('[data-key="68"]').classList.remove('playing');
  }
  if (event.which === 70) {
    document.querySelector('[data-key="70"]').classList.remove('playing');
  }
  if (event.which === 71) {
    document.querySelector('[data-key="71"]').classList.remove('playing');
  }
  if (event.which === 72) {
    document.querySelector('[data-key="72"]').classList.remove('playing');
  }
  if (event.which === 74) {
    document.querySelector('[data-key="74"]').classList.remove('playing');
  }
  if (event.which === 75) {
    document.querySelector('[data-key="75"]').classList.remove('playing');
  }
  if (event.which === 76) {
    document.querySelector('[data-key="76"]').classList.remove('playing');
  }
});

// Clicks on Button
main.addEventListener('mousedown', (event) => {
  const drum = event.target.closest('.drum__box-item');
  if (!drum) return;
  
  if (event.isTrusted) {
    const element = event.target.closest('[data-key]')

    if (element.dataset.key === '65') {
      audio65.currentTime = 0;
      audio65.play()
      document.querySelector('[data-key="65"]').classList.add('playing');
    }
    if (element.dataset.key === '83') {
      audio83.currentTime = 0;
      audio83.play()
      document.querySelector('[data-key="83"]').classList.add('playing');
    }
    if (element.dataset.key === '68') {
      audio68.currentTime = 0;
      audio68.play()
      document.querySelector('[data-key="68"]').classList.add('playing');
    }
    if (element.dataset.key === '70') {
      audio70.currentTime = 0;
      audio70.play()
      document.querySelector('[data-key="70"]').classList.add('playing');
    }
    if (element.dataset.key === '71') {
      audio71.currentTime = 0;
      audio71.play()
      document.querySelector('[data-key="71"]').classList.add('playing');
    }
    if (element.dataset.key === '72') {
      audio72.currentTime = 0;
      audio72.play()
      document.querySelector('[data-key="72"]').classList.add('playing');
    }
    if (element.dataset.key === '74') {
      audio74.currentTime = 0;
      audio74.play()
      document.querySelector('[data-key="74"]').classList.add('playing');
    }
    if (element.dataset.key === '75') {
      audio75.currentTime = 0;
      audio75.play()
      document.querySelector('[data-key="75"]').classList.add('playing');
    }
    if (element.dataset.key === '76') {
      audio76.currentTime = 0;
      audio76.play()
      document.querySelector('[data-key="76"]').classList.add('playing');
    }
  }
});

main.addEventListener('mouseup', (event) => {
  const drum = event.target.closest('.drum__box-item');
  if (!drum) return;

  const element = event.target.closest('[data-key]');

  if (element.dataset.key === '65') {
    document.querySelector('[data-key="65"]').classList.remove('playing');
  }
  if (element.dataset.key === '83') {
    document.querySelector('[data-key="83"]').classList.remove('playing');
  }
  if (element.dataset.key === '68') {
    document.querySelector('[data-key="68"]').classList.remove('playing');
  }
  if (element.dataset.key === '70') {
    document.querySelector('[data-key="70"]').classList.remove('playing');
  }
  if (element.dataset.key === '71') {
    document.querySelector('[data-key="71"]').classList.remove('playing');
  }
  if (element.dataset.key === '72') {
    document.querySelector('[data-key="72"]').classList.remove('playing');
  }
  if (element.dataset.key === '74') {
    document.querySelector('[data-key="74"]').classList.remove('playing');
  }
  if (element.dataset.key === '75') {
    document.querySelector('[data-key="75"]').classList.remove('playing');
  }
  if (element.dataset.key === '76') {
    document.querySelector('[data-key="76"]').classList.remove('playing');
  }
});

// Change theme
function getThemeInStorage(isSun) {
  if (isSun === 0) {
    imgChange.src = '../shared/moon.png';
    document.documentElement.classList.add('body-light');
    btnTheme.classList.add('theme-widget-light');
  } else {
    document.documentElement.classList.remove('body-light');
    btnTheme.classList.remove('theme-widget-light');
    imgChange.src = '../shared/sun.png';
  }
};

btnTheme.addEventListener('click', (e) => {
  document.documentElement.classList.toggle('body-light');
  btnTheme.classList.toggle('theme-widget-light');
  if (isSun === 1) {
    imgChange.src = '../shared/moon.png';
    isSun = 0;
    localStorage.setItem('isSun', 0);
    return;
  }
  if (isSun === 0) {
    imgChange.src = '../shared/sun.png';
    isSun = 1;
    localStorage.setItem('isSun', 1);
    return;
  }
});

// Choose buttons
btnsTools.forEach((item) => {
  item.addEventListener('mousedown', (event) => {
    const tool = event.target.closest('.choose-tools-item');
    if (!tool) return;

    if (event.target.closest('.drums')) {
      document.querySelector('#drums').classList.add('playing');
    }
    if (event.target.closest('.piano')) {
      document.querySelector('#piano').classList.add('playing');
    }
  });
});

btnsTools.forEach((item) => {
  item.addEventListener('mouseup', (event) => {
    const tool = event.target.closest('.choose-tools-item');
    if (!tool) return;

    if (event.target.closest('.drums')) {
      document.querySelector('#drums').classList.remove('playing');
    }
    if (event.target.closest('.piano')) {
      document.querySelector('#piano').classList.remove('playing');
    }
  });
});