console.log('Drum Kit');

const audio = new Audio();

audio.addEventListener('canplaythrough', () => audio.play());

const soundsUrls = {
  clap: 'https://js3001.github.io/sounds/clap.wav',
  hithap: 'https://js3001.github.io/sounds/hihat.wav',
  kick: 'https://js3001.github.io/sounds/kick.wav',
  openhat: 'https://js3001.github.io/sounds/openhat.wav',
  boom: 'https://js3001.github.io/sounds/boom.wav',
  ride: 'https://js3001.github.io/sounds/ride.wav',
  snare: 'https://js3001.github.io/sounds/snare.wav',
  tom: 'https://js3001.github.io/sounds/tom.wav',
  tink: 'https://js3001.github.io/sounds/tink.wav'
};

const keyNames = {
  a: 'clap',
  s: 'hithap',
  d: 'kick',
  f: 'openhat',
  g: 'boom',
  h: 'ride',
  j: 'snare',
  k: 'tom',
  l: 'tink'
}

const keyWordsContainer = document.querySelector('.drum-kit__keywords');

function clickHandler(event) {
  let key = event.target;

  if (key.className !== 'drum-kit__button') {
    key = key.closest('.drum-kit__button');
  }

  if (key && key.className === 'drum-kit__button') playSound(key.dataset.key);
}

function keyWordsHandler({ code }) {
  const key = code.slice(3).toLowerCase();

  if (!Object.hasOwn(keyNames, key)) return;

  playSound(key);
}

function playSound(key) {
  const nameKey = keyNames[key];
  audio.src = soundsUrls[nameKey];
  markButton(key);
}

function markButton(key) {
  console.dir(keyWordsContainer);
  [...keyWordsContainer.children].forEach(keyElem => {
    if (keyElem.dataset.key !== key) {
      keyElem.classList.remove('drum-kit__button_marked');
    } else {
      keyElem.classList.add('drum-kit__button_marked');
    }
  });
}

keyWordsContainer.addEventListener('click', clickHandler);

document.addEventListener('keydown', keyWordsHandler);