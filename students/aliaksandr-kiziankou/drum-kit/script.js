/* Original Widget + Mandatory Additional Feature*/
/*
const KEYS = document.querySelectorAll('.key');
const KEYS_FOR_MOUSE = document.querySelector('.instrument');

function playSound(event) {
    const key_code = event.keyCode || event.target.closest('.key')?.dataset.key;
    const audio = document.querySelector(`audio[data-key = '${key_code}']`);
    const key = document.querySelector(`.key[data-key = '${key_code}']`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('animated');
};

window.addEventListener('keydown', playSound);
KEYS_FOR_MOUSE.addEventListener('click', playSound);

function removeAnimation(event) {
    if (event.propertyName !== 'transform') return;

    this.classList.remove('animated');
};

KEYS.forEach(key => key.addEventListener('transitionend', (removeAnimation)));
*/

const KEYS = document.querySelectorAll('.key');
const SWITCHERS = document.querySelectorAll('.switch');

let currentInstrument = 'drums';

function playSound(event) {
    const key_code = event.keyCode || this.dataset.key;
    const audio = document.querySelector(`audio[data-key = '${key_code}'][data-instrument = '${currentInstrument}']`);
    const key = document.querySelector(`.key[data-key = '${key_code}']`);

    if (!audio) return;

    if (cutMode && lastPlayedAudio && lastPlayedAudio !== audio) {
        lastPlayedAudio.pause();
        lastPlayedAudio.currentTime = 0;
    }

    audio.currentTime = 0;
    audio.play();
    key.classList.add('animated');

    lastPlayedAudio = audio;
};

function switchInstrument() {
    currentInstrument = this.dataset.instrument;

    SWITCHERS.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    document.querySelectorAll('.sound').forEach(span => {
        span.textContent = span.dataset[currentInstrument];
    });
}

window.addEventListener('keydown', playSound);
KEYS.forEach(key => key.addEventListener('click', playSound));
SWITCHERS.forEach(btn => btn.addEventListener('click' , switchInstrument));

function removeAnimation(event) {
    if (event.propertyName !== 'transform') return;

    this.classList.remove('animated');
};

KEYS.forEach(key => key.addEventListener('transitionend', (removeAnimation)));


/*--------------------Cut Switch--------------------*/

const CUT_SWITCH = document.querySelector('.cut-switch');

let cutMode = false;
let lastPlayedAudio = null;

CUT_SWITCH.addEventListener('click' , () => {
    cutMode = CUT_SWITCH.classList.toggle('active');
});


/*--------------------Beat Switch--------------------*/


const BEATS = document.querySelectorAll('.beat');

let currentBeat = null;

function playBack() {
    const activeBeat = this.dataset.beats;
    const audio = document.querySelector(`audio[data-beats='${activeBeat}']`);

    if (!audio) return;

    if (currentBeat === activeBeat) {
        audio.pause();
        audio.currentTime = 0;
        this.classList.remove('active');
        currentBeat = null;
    } else {
        if (currentBeat) {
            const prevBeat = document.querySelector(`audio[data-beats='${currentBeat}']`);
            prevBeat.pause();
            prevBeat.currentTime = 0;
        }

        BEATS.forEach(beat => beat.classList.remove('active'));

        audio.play();
        this.classList.add('active');
        currentBeat = activeBeat;
    }
}

BEATS.forEach(beat => beat.addEventListener('click', playBack));