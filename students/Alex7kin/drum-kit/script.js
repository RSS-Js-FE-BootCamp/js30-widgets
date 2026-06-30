// Instruments
// The physical pads never change (keys A S D F G H J K L).
//  Each instrument is just a map of keyCode -> { src, label, rate }

const KEY_ORDER = [65, 83, 68, 70, 71, 72, 74, 75, 76]; // A S D F G H J K L

const DRUMS = {
  65: { src: 'sounds/drums/clap.wav',    label: 'clap' },
  83: { src: 'sounds/drums/hihat.wav',   label: 'hihat' },
  68: { src: 'sounds/drums/kick.wav',    label: 'kick' },
  70: { src: 'sounds/drums/openhat.wav', label: 'openhat' },
  71: { src: 'sounds/drums/boom.wav',    label: 'boom' },
  72: { src: 'sounds/drums/ride.wav',    label: 'ride' },
  74: { src: 'sounds/drums/snare.wav',   label: 'snare' },
  75: { src: 'sounds/drums/tom.wav',     label: 'tom' },
  76: { src: 'sounds/drums/tink.wav',    label: 'tink' },
};

// Piano has 7 samples (a C-major octave, c6..b6).
// The last two pads reuse c6/d6 pitched up an octave (rate 2)
const PIANO_NOTES = [
  { file: 'c6', label: 'C' },
  { file: 'd6', label: 'D' },
  { file: 'e6', label: 'E' },
  { file: 'f6', label: 'F' },
  { file: 'g6', label: 'G' },
  { file: 'a6', label: 'A' },
  { file: 'b6', label: 'B' },
  { file: 'c6', label: 'C↑', rate: 2 },
  { file: 'd6', label: 'D↑', rate: 2 },
];

const PIANO = {};
KEY_ORDER.forEach((code, i) => {
  const note = PIANO_NOTES[i];
  PIANO[code] = { src: `sounds/piano/${note.file}.mp3`, label: note.label, rate: note.rate };
});

const instruments = {
  Drums: DRUMS,
  Piano: PIANO,
};

let current = 'Drums';

// Playback
// Preload each sample once, then clone it per hit so notes can overlap
// (and each can carry its own pitch) instead of cutting one another off.
const cache = {};
function load(src) {
  if (!cache[src]) cache[src] = new Audio(src);
  return cache[src];
}
Object.values(instruments).forEach(map =>
  Object.values(map).forEach(pad => load(pad.src))
);

function play(keyCode) {
  const pad = instruments[current][keyCode];
  if (!pad) return;

  const note = load(pad.src).cloneNode();
  note.playbackRate = pad.rate || 1;
  note.play();

  const key = document.querySelector(`div[data-key="${keyCode}"]`);
  if (key) key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

// Instrument switching
function setInstrument(name) {
  if (!instruments[name]) return;
  current = name;

  // Re-label the pads to match the new sound set.
  document.querySelectorAll('.key').forEach(key => {
    const pad = instruments[name][key.dataset.key];
    const label = key.querySelector('.sound');
    if (pad && label) label.textContent = pad.label;
  });

  // Highlight the active selector button.
  document.querySelectorAll('.instrument').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.instrument === name);
  });
}

// Number keys 1 and 2 switch instruments from the keyboard.
const SWITCH_KEYS = { 49: 'Drums', 50: 'Piano' };

function playSound(e) {
  if (e.repeat) return; // Prevents repeats while a key is held down
  if (SWITCH_KEYS[e.keyCode]) {
    setInstrument(SWITCH_KEYS[e.keyCode]);
    return;
  }
  play(e.keyCode);
}

// Wiring
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('click', () => play(key.dataset.key));
});

document.querySelectorAll('.instrument').forEach(btn => {
  btn.addEventListener('click', () => setInstrument(btn.dataset.instrument));
});

window.addEventListener('keydown', playSound);

setInstrument(current); // sync labels & active button on load
