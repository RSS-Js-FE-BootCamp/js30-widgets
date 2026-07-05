const sounds = {
  drum: {
    a: 'clap.wav',
    s: 'hihat.wav',
    d: 'kick.wav',
    f: 'openhat.wav',
    g: 'boom.wav',
    h: 'ride.wav',
    j: 'snare.wav',
    k: 'tom.wav',
    l: 'tink.wav',
  },
  piano: {
    a: 'c6.mp3',
    s: 'd6.mp3',
    e: 'eb.wav',
    d: 'e6.mp3',
    f: 'f6.mp3',
    t: 'gb.wav',
    g: 'g6.mp3',
    y: 'ab.wav',
    h: 'a6.mp3',
    u: 'bb.wav',
    j: 'b6.mp3',
  },
};

// ================ PLAY SOUND ============================
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSoundByKey(keyCode) {
  const activeInstrument = switchBtn.dataset.instrument;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(
    `.${activeInstrument} [data-key="${keyCode}"]`,
  );

  if (!audio || !key) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keysContainer = document.querySelectorAll('.keys-container');

window.addEventListener('keydown', (e) => {
  playSoundByKey(e.key.toLocaleLowerCase());
});
keysContainer.forEach((container) => {
  container.addEventListener('click', (e) => {
    const key = e.target.closest('.drum-key, .piano-key');
    if (!key) return;
    playSoundByKey(key.dataset.key);
  });
});
keysContainer.forEach((container) => {
  container.addEventListener('transitionend', removeTransition);
});

// ================== SWITCH INSTRUMENT ======================
const switchBtn = document.querySelector('.switch-instrument');
const drum = document.querySelector('.drum');
const piano = document.querySelector('.piano');
const audios = document.querySelectorAll('audio');

function dropAudios() {
  audios.forEach((audio) => audio.removeAttribute('src'));
}

function changesSounds(instrument) {
  dropAudios();
  for (let [key, sound] of Object.entries(sounds[instrument])) {
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    const src = `./sounds/${instrument}/${sound}`;
    audio.src = src;
  }
}

function changesInstrument() {
  drum.classList.toggle('active');
  piano.classList.toggle('active');
}

function switchInstrument() {
  let prevInstrument = switchBtn.dataset.instrument;
  const currInstrument = prevInstrument === 'drum' ? 'piano' : 'drum';

  changesInstrument();
  changesSounds(currInstrument);

  switchBtn.dataset.instrument = currInstrument;
  switchBtn.textContent = currInstrument;
}

switchBtn.addEventListener('click', switchInstrument);

changesSounds('drum');
