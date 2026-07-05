const main = document.querySelector('.main');
const switchKeys = document.querySelector('.change_layout');
const keyWrapper = document.querySelector('.keys_wrapper');
const preset1 = document.querySelector('.preset_1');
const preset2 = document.querySelector('.preset_2');
const preset3 = document.querySelector('.preset_3');
const switchMode = document.querySelector('.change_mode');
const drumKeysWrapper = document.querySelectorAll(".drum_key_wrapper");
const darkDrumKeysText = document.querySelectorAll(".drum_key_text");
const darkDrumKeysLetter = document.querySelectorAll(".drum_key_letter");
const buttonFunct = document.querySelectorAll(".button_funct");


document.querySelectorAll('.drum_key_wrapper').forEach(element => {
    element.addEventListener('click', function () {
        const secondChild = this.children[1];
        const text = secondChild.textContent.trim().toLowerCase();

        if (switchMode.classList.contains('dark')) {
            element.classList.add("playing_dark")
        } else {
            element.classList.add("playing_light")
        }

        const soundPath = returnSoundPath(this)
        playSound(soundPath)
    });
    element.addEventListener("transitionend", (event) => {

        if (switchMode.classList.contains('dark')) {
            element.classList.remove("playing_dark")
        } else {
            element.classList.remove("playing_light")
        }
    })
});

document.addEventListener('keydown', function (e) {
    const keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const keysRu = ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д'];
    if (keysRu.includes(e.key.toLowerCase())) {
        const ruKeyPosition = keysRu.indexOf(e.key)
        const enKey = keys[ruKeyPosition]
        keyBoardKeyPressed(enKey)
    } else if (keys.includes(e.key.toLowerCase())) {
        keyBoardKeyPressed(e.key)
    }
});

function keyBoardKeyPressed(key) {
    const elementId = `key_${key.toUpperCase()}`;
    const element = document.getElementById(elementId);
    if (switchMode.classList.contains('dark')) {
        element.classList.add("playing_dark")
    } else {
        element.classList.add("playing_light")
    }

    const soundPath = returnSoundPath(element)
    playSound(soundPath)
}

function returnSoundPath(element) {
    const secondChild = element.children[1];
    const text = secondChild.textContent.trim().toLowerCase();
    let soundPath;
    const isOriginal = keyWrapper.classList.contains('original')

    if (isOriginal) {
        soundPath = `./sounds/original/${text}.wav`
    } else {
        if (text.includes("#")) {
            soundPath = `./sounds/alternate/${text.replace("#", "")}s.wav`
        } else {
            soundPath = `./sounds/alternate/${text}.wav`
        }
    }

    return soundPath
}

function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.play();
}

switchKeys.addEventListener('click', () => {
    switchSound()
})


function switchSound() {
    const keysOriginal = ['Clap', 'Hihat', 'Kick', 'Openhat', 'Boom', 'Ride', 'Snare', 'Tom', 'Tink'];
    const keysAlternate = ["C1", "D1", "E1", "F1", "G1", "G#1", "A1", "B1", "C2"];
    const isOriginal = keyWrapper.classList.contains('original')

    if (isOriginal) {
        changeKeysText(keysAlternate)
        keyWrapper.classList.remove("original")
    } else {
        changeKeysText(keysOriginal)
        keyWrapper.classList.add("original")
    }
}

function changeKeysText(array) {
    for (let i = 0; i < keyWrapper.children.length; i++) {
        const firstChild = keyWrapper.children[i];
        const keyText = firstChild.children[1];
        keyText.innerText = array[i]
    }
}

const patternAlt1 = [
    { key: 'C1', dur: 0.4 }, { key: 'E1', dur: 0.4 }, { key: 'G1', dur: 0.4 }, { key: 'C2', dur: 0.4 },
    { key: 'B1', dur: 0.8 }, { key: 'A1', dur: 0.4 }, { key: 'G1', dur: 0.4 },
    { key: 'F1', dur: 0.4 }, { key: 'E1', dur: 0.4 }, { key: 'D1', dur: 0.4 }, { key: 'C1', dur: 0.4 },
    { key: 'G1', dur: 0.8 }, { key: 'G#1', dur: 0.2 }, { key: 'A1', dur: 0.2 },
    { key: 'A1', dur: 0.4 }, { key: 'B1', dur: 0.4 }, { key: 'C2', dur: 0.4 }, { key: 'B1', dur: 0.4 },
    { key: 'A1', dur: 0.4 }, { key: 'G1', dur: 0.4 }, { key: 'F1', dur: 0.4 }, { key: 'E1', dur: 0.4 },
    { key: 'D1', dur: 0.4 }, { key: 'C1', dur: 0.4 }, { key: 'D1', dur: 0.4 }, { key: 'E1', dur: 0.4 },
    { key: 'F1', dur: 0.8 }, { key: 'G1', dur: 0.4 }, { key: 'C1', dur: 0.4 }
];
const patternAlt2 = [
    { key: 'C1', dur: 0.3 }, { key: 'D1', dur: 0.3 }, { key: 'E1', dur: 0.3 }, { key: 'F1', dur: 0.3 },
    { key: 'G1', dur: 0.3 }, { key: 'A1', dur: 0.3 }, { key: 'B1', dur: 0.3 }, { key: 'C2', dur: 0.3 },
    { key: 'B1', dur: 0.3 }, { key: 'A1', dur: 0.3 }, { key: 'G1', dur: 0.3 }, { key: 'F1', dur: 0.3 },
    { key: 'E1', dur: 0.3 }, { key: 'D1', dur: 0.3 }, { key: 'C1', dur: 0.6 }
];
const patternAlt3 = [
    { key: 'C1', dur: 0.2 }, { key: 'G1', dur: 0.2 }, { key: 'E1', dur: 0.2 }, { key: 'G1', dur: 0.2 },
    { key: 'C1', dur: 0.2 }, { key: 'G1', dur: 0.2 }, { key: 'E1', dur: 0.2 }, { key: 'G1', dur: 0.2 },
    { key: 'C2', dur: 0.2 }, { key: 'G1', dur: 0.2 }, { key: 'E1', dur: 0.2 }, { key: 'G1', dur: 0.2 },
    { key: 'C1', dur: 0.4 }
];


const patternOrig1 = [
    { key: 'Kick', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 },
    { key: 'Kick', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 },
    { key: 'Kick', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 },
    { key: 'Kick', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 },
    { key: 'Kick', dur: 0.5 }, { key: 'Openhat', dur: 0.5 }, { key: 'Snare', dur: 0.5 }, { key: 'Openhat', dur: 0.5 },
    { key: 'Kick', dur: 0.5 }, { key: 'Openhat', dur: 0.5 }, { key: 'Snare', dur: 0.5 }, { key: 'Openhat', dur: 0.5 },
    { key: 'Boom', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 },
    { key: 'Boom', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }, { key: 'Snare', dur: 0.5 }, { key: 'Hihat', dur: 0.25 }
];
const patternOrig2 = [
    { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 }, { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 },
    { key: 'Kick', dur: 0.4 }, { key: 'Clap', dur: 0.4 }, { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 },
    { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 }, { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 },
    { key: 'Kick', dur: 0.4 }, { key: 'Clap', dur: 0.4 }, { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 },
    { key: 'Snare', dur: 0.4 }, { key: 'Openhat', dur: 0.4 }, { key: 'Snare', dur: 0.4 }, { key: 'Openhat', dur: 0.4 },
    { key: 'Kick', dur: 0.4 }, { key: 'Clap', dur: 0.4 }, { key: 'Snare', dur: 0.4 }, { key: 'Openhat', dur: 0.4 },
    { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 }, { key: 'Tom', dur: 0.4 }, { key: 'Ride', dur: 0.4 },
    { key: 'Kick', dur: 0.8 }, { key: 'Clap', dur: 0.4 }, { key: 'Tom', dur: 0.4 }
];
const patternOrig3 = [
    { key: 'Boom', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Hihat', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Boom', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Snare', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Boom', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Hihat', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Boom', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Snare', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Openhat', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Clap', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Openhat', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Clap', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Boom', dur: 0.25 }, { key: 'Tink', dur: 0.25 }, { key: 'Hihat', dur: 0.25 }, { key: 'Tink', dur: 0.25 },
    { key: 'Boom', dur: 0.5 }, { key: 'Tink', dur: 0.25 }, { key: 'Snare', dur: 0.25 }
];

const noteToKeyId = {
    'C1': 'key_A', 'D1': 'key_S', 'E1': 'key_D', 'F1': 'key_F',
    'G1': 'key_G', 'G#1': 'key_H', 'A1': 'key_J', 'B1': 'key_K', 'C2': 'key_L'
};
const soundToKeyId = {
    'Clap': 'key_A', 'Hihat': 'key_S', 'Kick': 'key_D', 'Openhat': 'key_F',
    'Boom': 'key_G', 'Ride': 'key_H', 'Snare': 'key_J', 'Tom': 'key_K', 'Tink': 'key_L'
};

let timeouts = [];

function playPattern(patternArray) {
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];

    const isOriginal = keyWrapper.classList.contains('original');
    const keyMap = isOriginal ? soundToKeyId : noteToKeyId;

    let currentTime = 0;
    patternArray.forEach(item => {
        const { key, dur } = item;
        const timeoutId = setTimeout(() => {
            const elementId = keyMap[key];
            if (elementId) {
                const element = document.getElementById(elementId);
                if (element) {
                    if (switchMode.classList.contains('dark')) {
                        element.classList.add("playing_dark")
                    } else {
                        element.classList.add("playing_light")
                    }

                    const soundPath = returnSoundPath(element);
                    playSound(soundPath);
                }
            }
        }, currentTime * 1000);
        timeouts.push(timeoutId);
        currentTime += dur;
    });

    const totalDuration = currentTime * 1000 + 200;
    const clearId = setTimeout(() => { timeouts = []; }, totalDuration);
    timeouts.push(clearId);
}

preset1.addEventListener('click', () => {
    const isOriginal = keyWrapper.classList.contains('original');
    const pattern = isOriginal ? patternOrig1 : patternAlt1;
    playPattern(pattern);
});

preset2.addEventListener('click', () => {
    const isOriginal = keyWrapper.classList.contains('original');
    const pattern = isOriginal ? patternOrig2 : patternAlt2;
    playPattern(pattern);
});

preset3.addEventListener('click', () => {
    const isOriginal = keyWrapper.classList.contains('original');
    const pattern = isOriginal ? patternOrig3 : patternAlt3;
    playPattern(pattern);
});

switchMode.addEventListener('click', (e) => {
    if (switchMode.classList.contains('dark')) {
        switchMode.classList.remove('dark');

        main.classList.remove('main_dark')
        main.classList.add('main_light')

        switchMode.innerText = "Switch to Dark Mode";

        Array.from(drumKeysWrapper).map(e => {
            e.classList.remove('drum_key_wrapper_dark')
            e.classList.add('drum_key_wrapper_light')
        })

        Array.from(darkDrumKeysText).map(e => {
            e.classList.remove('drum_key_text_dark')
            e.classList.add('drum_key_text_light')
        })

        Array.from(darkDrumKeysLetter).map(e => {
            e.classList.remove('drum_key_letter_dark')
            e.classList.add('drum_key_letter_light')
        })

        Array.from(buttonFunct).map(e => {
            e.classList.add('button_light')
            e.classList.remove('button_dark')
        })

    } else {

        switchMode.classList.add('dark');
        switchMode.innerText = "Switch to Light Mode";

        main.classList.add('main_dark')
        main.classList.remove('main_light')

        switchMode.innerText = "Switch to Light Mode";

        Array.from(drumKeysWrapper).map(e => {
            e.classList.remove('drum_key_wrapper_light')
            e.classList.add('drum_key_wrapper_dark')
        })

        Array.from(darkDrumKeysText).map(e => {
            e.classList.remove('drum_key_text_light')
            e.classList.add('drum_key_text_dark')
        })

        Array.from(darkDrumKeysLetter).map(e => {
            e.classList.remove('drum_key_letter_light')
            e.classList.add('drum_key_letter_dark')
        })

        Array.from(buttonFunct).map(e => {
            e.classList.remove('button_light')
            e.classList.add('button_dark')
        })

    }
})