function playSound(event) {
    const keyCode = event.keyCode || event.currentTarget.dataset.key;

    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);
    
    if(!audio || !key) return;

    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}

function removeTransition(event) {
    if(event.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', playSound));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);


// // ------------------------------------------------------------------------------
// // ON KEYDOWN 
// // ------------------------------------------------------------------------------

// function handleKeyDown(event) {
//     // const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
//     if (!key) return;
//     playSound(event);
// }


// // ------------------------------------------------------------------------------
// // ON CLICK 
// // ------------------------------------------------------------------------------
// function handleClick(event) {
//     // const keyClick = document.querySelector(`'.key'.[data-key='${event.currentTarget}']`);
//     if (!keyClick) return;
//     playSound(event);
//     keyClick.addEventListener('click', playSound);
// }

