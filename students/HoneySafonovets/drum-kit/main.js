const main = document.querySelector('.drum');
const drumBtns = document.querySelectorAll('.drum__box-item');
let audio65 = new Audio('../shared/clap.wav');
let audio83 = new Audio('../shared/hihat.wav');
let audio68 = new Audio('../shared/kick.wav');
let audio70 = new Audio('../shared/openhat.wav');
let audio71 = new Audio('../shared/boom.wav');
let audio72 = new Audio('../shared/ride.wav');
let audio74 = new Audio('../shared/snare.wav');
let audio75 = new Audio('../shared/tom.wav');
let audio76 = new Audio('../shared/tink.wav');


// Additional variable
const btnTheme = document.querySelector('.theme-widget');
const imgChange = document.querySelector('.theme-widget__item');
const btnsTools = document.querySelectorAll('.choose-tools-item');
const piano = document.querySelector('#piano');
const drums = document.querySelector('#drums');
let isSun = 1;
let isTools = 1;

document.addEventListener('DOMContentLoaded', () => {
  const isSunStorage = localStorage.getItem('isSun');
  isSun = Number(isSunStorage);
  getThemeInStorage(Number(isSunStorage));
});


function boom(item) {
  if (isTools === 0) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    item.appendChild(ripple);
    ripple.innerHTML = 'DING';

    ripple.classList.add('ripple-moving');

    // Remove function
    setTimeout(() => ripple.remove(), 300);
  } else {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    item.appendChild(ripple);
    ripple.innerHTML = 'BOOM';

    ripple.classList.add('ripple-moving');

    // Remove function
    setTimeout(() => ripple.remove(), 300);
  }
}

// drumBtns.forEach((item) => {
//   item.addEventListener('click', (event) => boom(item))
// });

// Functions for clicking and use keyboard
document.addEventListener('keydown', (event) => {
  if (event.which === 65) {
    audio65.currentTime = 0;
    audio65.play()
    document.querySelector('[data-key="65"]').classList.add('playing');
    boom(document.querySelector('[data-key="65"]'));
  }
  if (event.which === 83) {
    audio83.currentTime = 0;
    audio83.play()
    document.querySelector('[data-key="83"]').classList.add('playing');
    boom(document.querySelector('[data-key="83"]'));
  }
  if (event.which === 68) {
    audio68.currentTime = 0;
    audio68.play()
    document.querySelector('[data-key="68"]').classList.add('playing');
    boom(document.querySelector('[data-key="68"]'));
  }
  if (event.which === 70) {
    audio70.currentTime = 0;
    audio70.play()
    document.querySelector('[data-key="70"]').classList.add('playing');
    boom(document.querySelector('[data-key="70"]'));
  }
  if (event.which === 71) {
    audio71.currentTime = 0;
    audio71.play()
    document.querySelector('[data-key="71"]').classList.add('playing');
    boom(document.querySelector('[data-key="71"]'));
  }
  if (event.which === 72) {
    audio72.currentTime = 0;
    audio72.play()
    document.querySelector('[data-key="72"]').classList.add('playing');
    boom(document.querySelector('[data-key="72"]'));
  }
  if (event.which === 74) {
    audio74.currentTime = 0;
    audio74.play()
    document.querySelector('[data-key="74"]').classList.add('playing');
    boom(document.querySelector('[data-key="74"]'));
  }
  if (event.which === 75) {
    audio75.currentTime = 0;
    audio75.play()
    document.querySelector('[data-key="75"]').classList.add('playing');
    boom(document.querySelector('[data-key="75"]'));
  }
  if (event.which === 76) {
    audio76.currentTime = 0;
    audio76.play()
    document.querySelector('[data-key="76"]').classList.add('playing');
    boom(document.querySelector('[data-key="76"]'));
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
      boom(document.querySelector('[data-key="65"]'));
    }
    if (element.dataset.key === '83') {
      audio83.currentTime = 0;
      audio83.play()
      document.querySelector('[data-key="83"]').classList.add('playing');
      boom(document.querySelector('[data-key="83"]'));
    }
    if (element.dataset.key === '68') {
      audio68.currentTime = 0;
      audio68.play()
      document.querySelector('[data-key="68"]').classList.add('playing');
      boom(document.querySelector('[data-key="68"]'));
    }
    if (element.dataset.key === '70') {
      audio70.currentTime = 0;
      audio70.play()
      document.querySelector('[data-key="70"]').classList.add('playing');
      boom(document.querySelector('[data-key="70"]'));
    }
    if (element.dataset.key === '71') {
      audio71.currentTime = 0;
      audio71.play()
      document.querySelector('[data-key="71"]').classList.add('playing');
      boom(document.querySelector('[data-key="71"]'));
    }
    if (element.dataset.key === '72') {
      audio72.currentTime = 0;
      audio72.play()
      document.querySelector('[data-key="72"]').classList.add('playing');
      boom(document.querySelector('[data-key="72"]'));
    }
    if (element.dataset.key === '74') {
      audio74.currentTime = 0;
      audio74.play()
      document.querySelector('[data-key="74"]').classList.add('playing');
      boom(document.querySelector('[data-key="74"]'));
    }
    if (element.dataset.key === '75') {
      audio75.currentTime = 0;
      audio75.play()
      document.querySelector('[data-key="75"]').classList.add('playing');
      boom(document.querySelector('[data-key="75"]'));
    }
    if (element.dataset.key === '76') {
      audio76.currentTime = 0;
      audio76.play()
      document.querySelector('[data-key="76"]').classList.add('playing');
      boom(document.querySelector('[data-key="76"]'));
    }
  }
});

document.addEventListener('mouseup', (event) => {
  document.querySelector('[data-key="65"]').classList.remove('playing');
  document.querySelector('[data-key="83"]').classList.remove('playing');
  document.querySelector('[data-key="68"]').classList.remove('playing');
  document.querySelector('[data-key="70"]').classList.remove('playing');
  document.querySelector('[data-key="71"]').classList.remove('playing');
  document.querySelector('[data-key="72"]').classList.remove('playing');
  document.querySelector('[data-key="74"]').classList.remove('playing');
  document.querySelector('[data-key="75"]').classList.remove('playing');
  document.querySelector('[data-key="76"]').classList.remove('playing');

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

// document.addEventListener('mouseleave', (event) => {
//   console.log('Work')
//   document.querySelector('[data-key="65"]').classList.remove('playing');
//   document.querySelector('[data-key="83"]').classList.remove('playing');
//   document.querySelector('[data-key="68"]').classList.remove('playing');
//   document.querySelector('[data-key="70"]').classList.remove('playing');
//   document.querySelector('[data-key="71"]').classList.remove('playing');
//   document.querySelector('[data-key="72"]').classList.remove('playing');
//   document.querySelector('[data-key="74"]').classList.remove('playing');
//   document.querySelector('[data-key="75"]').classList.remove('playing');
//   document.querySelector('[data-key="76"]').classList.remove('playing');
// });

// Change theme
function getThemeInStorage(isSun) {
  if (isSun === 0) {
    imgChange.src = '../shared/moon.png';
    document.documentElement.classList.add('body-light');
    btnTheme.classList.add('theme-widget-light');
    btnsTools.forEach((e) => {
      e.classList.add('choose-tools-item-light');
    });
  } else {
    document.documentElement.classList.remove('body-light');
    btnTheme.classList.remove('theme-widget-light');
    imgChange.src = '../shared/sun.png';
    btnsTools.forEach((e) => {
      e.classList.remove('choose-tools-item-light');
    });
  }
};

btnTheme.addEventListener('click', (e) => {
  document.documentElement.classList.toggle('body-light');
  btnTheme.classList.toggle('theme-widget-light');
  btnsTools.forEach((e) => {
    e.classList.toggle('choose-tools-item-light');
  });
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

// Choose tools
function madePiano() {
  isTools = 0;
  // Change audio
  audio65 = new Audio('../shared/do.mp3');
  audio83 = new Audio('../shared/re.mp3');
  audio68 = new Audio('../shared/mi.mp3');
  audio70 = new Audio('../shared/fa.mp3');
  audio71 = new Audio('../shared/salt.mp3');
  audio72 = new Audio('../shared/la.mp3');
  audio74 = new Audio('../shared/c.mp3');
  audio75 = new Audio('../shared/do.mp3');
  audio76 = new Audio('../shared/re.mp3');
  drumKit = document.querySelectorAll('.drum__box-item');

  document.querySelector('[data-name="clap"]').innerHTML = 'note C';
  document.querySelector('[data-name="hihat"]').innerHTML = 'note D';
  document.querySelector('[data-name="kick"]').innerHTML = 'note E';
  document.querySelector('[data-name="openhat"]').innerHTML = 'note F';
  document.querySelector('[data-name="boom"]').innerHTML = 'note G';
  document.querySelector('[data-name="ride"]').innerHTML = 'note A';
  document.querySelector('[data-name="snare"]').innerHTML = 'note B';
  document.querySelector('[data-name="tom"]').innerHTML = 'note C';
  document.querySelector('[data-name="tink"]').innerHTML = 'note D';

  piano.classList.toggle('choose-tools-item-active');
  drums.classList.remove('choose-tools-item-active');
}

function madeDrums() {
  isTools = 1;
  // Change audio
  audio65 = new Audio('../shared/clap.wav');
  audio83 = new Audio('../shared/hihat.wav');
  audio68 = new Audio('../shared/kick.wav');
  audio70 = new Audio('../shared/openhat.wav');
  audio71 = new Audio('../shared/boom.wav');
  audio72 = new Audio('../shared/ride.wav');
  audio74 = new Audio('../shared/snare.wav');
  audio75 = new Audio('../shared/tom.wav');
  audio76 = new Audio('../shared/tink.wav');
  drumKit = document.querySelectorAll('.drum__box-item');

  document.querySelector('[data-name="clap"]').innerHTML = 'clap';
  document.querySelector('[data-name="hihat"]').innerHTML = 'hihat';
  document.querySelector('[data-name="kick"]').innerHTML = 'kick';
  document.querySelector('[data-name="openhat"]').innerHTML = 'openhat';
  document.querySelector('[data-name="boom"]').innerHTML = 'boom';
  document.querySelector('[data-name="ride"]').innerHTML = 'ride';
  document.querySelector('[data-name="snare"]').innerHTML = 'snare';
  document.querySelector('[data-name="tom"]').innerHTML = 'tom';
  document.querySelector('[data-name="tink"]').innerHTML = 'tink';

  drums.classList.toggle('choose-tools-item-active');
  piano.classList.remove('choose-tools-item-active');
}

piano.addEventListener('click', () => madePiano())
drums.addEventListener('click', () => madeDrums())