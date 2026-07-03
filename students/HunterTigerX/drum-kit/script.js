document.querySelectorAll('.drum_key_wrapper').forEach(element => {
    element.addEventListener('click', function () {
        const secondChild = this.children[1];
        const text = secondChild.textContent.trim().toLowerCase();
        element.classList.add("playing")
        const soundPath = returnSoundPath(this)
        playSound(soundPath)
    });
    element.addEventListener("transitionend", (event) => {
        element.classList.remove("playing")
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
    element.classList.add("playing")
    const soundPath = returnSoundPath(element)
    playSound(soundPath)
}

function returnSoundPath(element) {
    const secondChild = element.children[1];
    const text = secondChild.textContent.trim().toLowerCase();
    const soundPath = `./sounds/${text}.wav`
    return soundPath
}

function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.play();
}