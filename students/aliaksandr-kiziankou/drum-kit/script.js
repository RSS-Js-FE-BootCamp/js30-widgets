const KEYS = document.querySelectorAll('.key');
const SWITCHERS = document.querySelectorAll('.switch');

const crashAudio = document.querySelector(`audio[data-key='70'][data-instrument='drums']`);
if (crashAudio) {
    crashAudio.volume = 0.5;
}

let currentInstrument = 'drums';

function playSound(event) {
    const key_code = event.keyCode || this.dataset.key;
    const audio = document.querySelector(`audio[data-key = '${key_code}'][data-instrument = '${currentInstrument}']`);
    const key = document.querySelector(`.key[data-key = '${key_code}']`);

    if (!audio) return;

    checkSpam();

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

let cutMode = localStorage.getItem('cutMode') === 'true';
let lastPlayedAudio = null;

if (cutMode) {
    CUT_SWITCH.classList.add('active');
}

CUT_SWITCH.addEventListener('click' , () => {
    cutMode = CUT_SWITCH.classList.toggle('active');
    localStorage.setItem('cutMode', cutMode);
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
};

BEATS.forEach(beat => beat.addEventListener('click', playBack));


/*--------------------Info Switch--------------------*/


const INFO_SWITCH = document.querySelector('.info-switch');
const INFO = document.querySelectorAll('.info');

function infoSwitcher() {
    INFO.forEach(info => info.classList.toggle('hidden'));
    INFO_SWITCH.classList.toggle('active');
}

INFO_SWITCH.addEventListener('click', infoSwitcher);


/*--------------------Spam Alert--------------------*/


let pressCount = 0;
let pressTimer = null;
let alertShown = false;

function checkSpam() {
    pressCount ++;

    if (pressCount === 1) {
        pressTimer = setTimeout(() => {
            pressCount = 0;
            alertShown = false;
        }, 1500);
    }

    if (pressCount > 9 && !alertShown) {
        alert('Please STOP SPAMMING 🥁');
        alertShown = true;
        clearTimeout(pressTimer);
        pressCount = 0;
    }
}