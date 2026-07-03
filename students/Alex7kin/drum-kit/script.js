// ============================================================
// PART 1: THE INSTRUMENTS (which sound each key makes)
// ============================================================
//
// The 9 pads on screen never change. They are always the keys:
// A S D F G H J K L.
// For each key we save: the sound file, a text label, and sometimes
// a "rate" that makes the sound higher.

// The key codes for A S D F G H J K L.
// A "key code" is just the number the keyboard sends for each key.
const KEY_ORDER = [65, 83, 68, 70, 71, 72, 74, 75, 76]; // A S D F G H J K L

// Drum sounds. Each number (key code) points to one drum sound.
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

// Piano has only 7 sound files (the notes C D E F G A B).
// But we have 9 keys. So the last 2 keys reuse C and D and play them
// higher. "rate: 2" means "play 2x faster" = a higher sound.
const PIANO_NOTES = [
  { file: 'c6', label: 'Do' },
  { file: 'd6', label: 'Re' },
  { file: 'e6', label: 'Mi' },
  { file: 'f6', label: 'Fa' },
  { file: 'g6', label: 'Sol' },
  { file: 'a6', label: 'La' },
  { file: 'b6', label: 'Si' },
  { file: 'c6', label: 'Do↑', rate: 2 },
  { file: 'd6', label: 'Re↑', rate: 2 },
];

// Build the PIANO object: link each key code to one piano note.
const PIANO = {};
KEY_ORDER.forEach((code, i) => {
  const note = PIANO_NOTES[i];
  PIANO[code] = { src: `sounds/piano/${note.file}.mp3`, label: note.label, rate: note.rate };
});

// All the instruments we can play. We can add more here later.
const instruments = {
  Drums: DRUMS,
  Piano: PIANO,
};

// Which instrument is playing now. We start with Drums.
let current = 'Drums';


// ============================================================
// PART 2: PLAYING A SOUND
// ============================================================

// We load each sound file one time and keep it in "cache".
// Loading the same file again and again would be slow, so we save it.
const cache = {};
function load(src) {
  // If we did not load this sound yet, load it now and save it.
  if (!cache[src]) cache[src] = new Audio(src);
  return cache[src];
}

// Load every sound now, before the user plays, so there is no delay later.
Object.values(instruments).forEach(map =>
  Object.values(map).forEach(pad => load(pad.src))
);

// Play the sound for one key.
function play(keyCode) {
  // Find the pad (sound + label) for this key in the current instrument.
  const pad = instruments[current][keyCode];
  if (!pad) return; // this key has no sound, so do nothing

  // Make a COPY of the sound (cloneNode). We use a copy so many sounds
  // can play at the same time and not stop each other.
  const note = load(pad.src).cloneNode();
  note.playbackRate = pad.rate || 1; // higher sound if "rate" is set, else normal
  note.play();

  // Find this pad on the screen and make it light up.
  const key = document.querySelector(`div[data-key="${keyCode}"]`);
  if (key) key.classList.add('playing');
}

// When the "light up" animation finishes, remove the light-up style.
function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // wait for the right animation
  this.classList.remove('playing');
}


// ============================================================
// PART 3: CHANGING THE INSTRUMENT (Drums <-> Piano)
// ============================================================

function setInstrument(name) {
  if (!instruments[name]) return; // unknown instrument, do nothing
  current = name;

  // Change the text on each pad to match the new instrument.
  document.querySelectorAll('.key').forEach(key => {
    const pad = instruments[name][key.dataset.key];
    const label = key.querySelector('.sound');
    if (pad && label) label.textContent = pad.label;
  });

  // Mark the correct button (Drums or Piano) as the active one.
  document.querySelectorAll('.instrument').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.instrument === name);
  });
}

// Number key "1" chooses Drums, "2" chooses Piano.
const SWITCH_KEYS = { 49: 'Drums', 50: 'Piano' };

// This runs every time the user presses a key on the keyboard.
function playSound(e) {
  if (e.repeat) return; // if the key is held down, ignore the extra events

  // If the user pressed 1 or 2, change the instrument and stop here.
  if (SWITCH_KEYS[e.keyCode]) {
    setInstrument(SWITCH_KEYS[e.keyCode]);
    return;
  }

  play(e.keyCode); // play the sound for this key

  // If a song is playing, also check if this press hit a note.
  if (game) judgeHit(e.keyCode);
}


// ============================================================
// PART 4: CONNECTING EVERYTHING (event listeners)
// ============================================================

// For each pad on the screen:
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('transitionend', removeTransition);      // remove the light-up
  key.addEventListener('click', () => play(key.dataset.key));   // play on mouse click
});

// Clicking a "Drums" or "Piano" button changes the instrument.
document.querySelectorAll('.instrument').forEach(btn => {
  btn.addEventListener('click', () => setInstrument(btn.dataset.instrument));
});

// Listen for every key press on the whole page.
window.addEventListener('keydown', playSound);

setInstrument(current); // set the labels and active button when the page loads


// ============================================================
// PART 5: THE RHYTHM GAME
// ============================================================
//
// How the game works, step by step:
//  - A song is a list of notes. Each note says: "press THIS key at THIS time".
//  - A note looks like a pad. It falls down from the top of the screen.
//  - The note is EXACTLY over its pad at the moment you should press it.
//  - You press the key when the note lines up with the pad.
//  - The pad flashes a color to show how good your timing was.
//
// The falling note and the timing check use the SAME clock.
// So what you SEE is always the same as what the game CHECKS.

const LEAD = 1200;                         // ms: how long a note falls before you hit it
const PERFECT = 60, GOOD = 120, HIT = 180; // ms: how close your press must be
const POINTS = { PERFECT: 100, GOOD: 50 }; // points you get for each result

// A note's position is a % from the top of the lane.
// The note falls at a steady speed and reaches TARGET at hit time.
const ENTER = -25;  // start: above the pad (off screen)
const TARGET = 55;  // hit: right on top of the pad
const EXIT = 130;   // end: below the pad (the note gets deleted)
const SPEED = (TARGET - ENTER) / LEAD; // how much % the note falls each ms

const BPM = 100;          // beats per minute (the song speed)
const BEAT = 60000 / BPM; // ms: how long one beat lasts

// A song = a list of keys, one per beat. (null would mean a silent beat.)
// You can change these numbers to write your own song.
const PATTERNS = {
  // Easy drum groove
  Drums: { step: BEAT, keys: [
    65, 83, 68, 70,  71, 70, 68, 83,
    65, 83, 68, 70,  71, 70, 68, 83,
  ]},
  // Easy piano melody
  Piano: { step: BEAT, keys: [
    68, 68, 70, 71,  71, 70, 68, 83,
    65, 65, 83, 68,  68, 83, 83,
  ]},
};

// Turn the song list into real notes.
// Each note gets a time "t" = the ms when it should be hit.
function buildBeatmap() {
  const song = PATTERNS[current] || PATTERNS.Drums;
  return song.keys
    // give each key a hit time; empty beats (null) become null
    .map((key, i) => key ? { t: LEAD + 400 + i * song.step, key, judged: false, el: null } : null)
    .filter(Boolean); // remove the nulls, keep only real notes
}

// Build the game area. Around each pad we add a "lane" with a "fall"
// layer behind it. The notes fall inside the fall layer.
const fallEls = {};   // key -> the falling layer for that key
const padByKey = {};  // key -> the pad element for that key
document.querySelectorAll('.key').forEach(key => {
  const lane = document.createElement('div');
  lane.className = 'lane';
  const fall = document.createElement('div');
  fall.className = 'fall';
  key.parentNode.insertBefore(lane, key);
  lane.append(fall, key); // fall goes first, so the pad shows ON TOP of the notes
  fallEls[key.dataset.key] = fall;
  padByKey[key.dataset.key] = key;
});

// Get the screen parts we need (score, combo, buttons, etc).
const keysEl = document.querySelector('.keys');
const hud = document.getElementById('hud');
const verdictEl = document.getElementById('verdict');
const scoreEl = document.getElementById('score');
const comboEl = document.getElementById('combo');
const playBtn = document.getElementById('play-song');

// "game" holds everything about the current play. null = no game running.
let game = null; // { notes, startTime, raf, score, combo, best }
let verdictTimer = 0;

// Create one falling note on the screen.
function spawnNote(n) {
  const fall = fallEls[n.key];
  if (!fall) return;
  const el = document.createElement('div');
  el.className = 'note';
  el.innerHTML = padByKey[n.key].innerHTML; // copy the pad look, so the note matches it
  fall.appendChild(el);
  n.el = el; // remember the note's element, so we can move and remove it later
}

// Delete a note from the screen.
function removeNote(n) {
  if (n.el) { n.el.remove(); n.el = null; }
}

// Flash a pad: green = perfect, yellow = good, red = miss.
function flashPad(keyCode, type) {
  const pad = padByKey[keyCode];
  if (!pad) return;
  pad.classList.add('judge-' + type);
  setTimeout(() => pad.classList.remove('judge-' + type), 200); // remove the color after 200ms
}

// Start a new game.
function startGame() {
  game = { notes: buildBeatmap(), startTime: performance.now(), raf: 0, score: 0, combo: 0, best: 0 };
  hud.classList.add('on');       // show the score panel
  keysEl.classList.add('live');  // switch the pads to game mode
  playBtn.textContent = '■ Stop';
  renderHud();
  loop(); // start the game loop
}

// Stop the game and clean up.
function stopGame() {
  if (!game) return;
  cancelAnimationFrame(game.raf); // stop the loop
  document.querySelectorAll('.note').forEach(el => el.remove()); // remove all notes
  keysEl.classList.remove('live');
  game = null;
  playBtn.textContent = '▶ Rhythm Game';
}

// The song ended: show the final score.
function finishGame() {
  const { score, best } = game;
  stopGame();
  clearTimeout(verdictTimer);
  hud.classList.add('on');
  verdictEl.className = 'verdict show perfect';
  verdictEl.textContent = `Done! ${score} pts · best combo ${best}`;
}

// THE GAME LOOP.
// This function runs about 60 times per second, again and again,
// while the game is playing. Each run is one "frame".
function loop() {
  // How many ms passed since the game started. This is our clock.
  const elapsed = performance.now() - game.startTime;

  // Look at every note in the song.
  for (const n of game.notes) {
    // 1) Time to appear? Create the note when it enters from the top.
    if (!n.el && !n.judged && elapsed >= n.t - LEAD) spawnNote(n);

    // 2) Move the note down.
    // At time n.t the note sits at TARGET (over the pad). Before that it is
    // higher up; after that it keeps falling and we delete it at the bottom.
    if (n.el) {
      const top = TARGET + SPEED * (elapsed - n.t);
      n.el.style.top = top + '%';
      if (top >= EXIT) removeNote(n); // note reached the bottom, remove it
    }

    // 3) Missed note? If the time passed the hit window and no key was
    // pressed, flash the pad red and count it as a miss.
    if (!n.judged && elapsed > n.t + HIT) {
      n.judged = true;
      flashPad(n.key, 'miss');
      registerMiss();
    }
  }

  // If every note is judged and no notes are left on screen, the song is done.
  if (game.notes.every(n => n.judged) && !document.querySelector('.note')) {
    finishGame();
    return; // stop the loop
  }

  // Ask the browser to run this function again on the next frame.
  game.raf = requestAnimationFrame(loop);
}

// The user pressed a key. Check if it hit a note, and how good the timing was.
function judgeHit(keyCode) {
  const elapsed = performance.now() - game.startTime; // the current game time

  // Find the closest not-yet-judged note for THIS key.
  let best = null, bestOff = Infinity;
  for (const n of game.notes) {
    if (n.judged || n.key !== keyCode) continue; // skip other keys and done notes
    const off = Math.abs(elapsed - n.t); // how far (ms) the press is from hit time
    if (off < bestOff) { bestOff = off; best = n; } // keep the closest one
  }

  // No note close enough? Then it was just a normal sound. You lose nothing.
  if (!best || bestOff > HIT) return;

  best.judged = true; // this note is handled now
  removeNote(best);    // remove it from the screen

  // Give a result based on how close the timing was.
  if (bestOff <= PERFECT)   { flashPad(keyCode, 'perfect'); award('PERFECT'); }
  else if (bestOff <= GOOD) { flashPad(keyCode, 'good');    award('GOOD'); }
  else                      { flashPad(keyCode, 'miss');    registerMiss(); } // too far off
}

// Good hit: grow the combo and add to the score.
function award(verdict) {
  game.combo++;                                // one more hit in a row
  game.best = Math.max(game.best, game.combo); // remember the longest combo
  game.score += POINTS[verdict] + game.combo;  // points + a small combo bonus
  showVerdict(verdict);
  renderHud();
}

// Miss: the combo goes back to 0.
function registerMiss() {
  game.combo = 0;
  showVerdict('MISS');
  renderHud();
}

// Show the result word (PERFECT / GOOD / MISS) for a short time.
function showVerdict(text) {
  verdictEl.textContent = text;
  verdictEl.className = `verdict show ${text.toLowerCase()}`;
  clearTimeout(verdictTimer);
  verdictTimer = setTimeout(() => verdictEl.classList.remove('show'), 220); // hide after 220ms
}

// Update the score and combo numbers on the screen.
function renderHud() {
  scoreEl.textContent = `Score ${game.score}`;
  comboEl.textContent = `Combo ${game.combo}`;
}

// The Play/Stop button: start the game if stopped, stop it if playing.
playBtn.addEventListener('click', () => (game ? stopGame() : startGame()));
