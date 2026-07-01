const buttonA = document.getElementById('KeyA');

buttonA.addEventListener("click", (event) => {
    new Audio("assets/sounds_clap.wav").play();
  });

const buttonS = document.getElementById('KeyS');

buttonS.addEventListener("click", (event) => {
    new Audio("assets/sounds_hihat.wav").play();
  });

const buttonD = document.getElementById('KeyD');

buttonD.addEventListener("click", (event) => {
    new Audio("assets/sounds_kick.wav").play();
  });

const buttonF = document.getElementById('KeyF');

buttonF.addEventListener("click", (event) => {
    new Audio("assets/sounds_openhat.wav").play();
  });

const buttonG = document.getElementById('KeyG');

buttonG.addEventListener("click", (event) => {
    new Audio("assets/sounds_boom.wav").play();
  });

const buttonH = document.getElementById('KeyH');

buttonH.addEventListener("click", (event) => {
    new Audio("assets/sounds_ride.wav").play();
  });

const buttonJ = document.getElementById('KeyJ');

buttonJ.addEventListener("click", (event) => {
    new Audio("assets/sounds_snare.wav").play();
  });

const buttonK = document.getElementById('KeyK');

buttonK.addEventListener("click", (event) => {
    new Audio("assets/sounds_tom.wav").play();
  });

const buttonL = document.getElementById('KeyL');

buttonL.addEventListener("click", (event) => {
    new Audio("assets/sounds_tink.wav").play();
  });

function animate(id) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.classList.add('playing');
        setTimeout(() => btn.classList.remove('playing'), 100);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') { new Audio("assets/sounds_clap.wav").play(); animate('KeyA'); }
    if (event.code === 'KeyS') { new Audio("assets/sounds_hihat.wav").play(); animate('KeyS'); }
    if (event.code === 'KeyD') { new Audio("assets/sounds_kick.wav").play(); animate('KeyD'); }
    if (event.code === 'KeyF') { new Audio("assets/sounds_openhat.wav").play(); animate('KeyF'); }
    if (event.code === 'KeyG') { new Audio("assets/sounds_boom.wav").play(); animate('KeyG'); }
    if (event.code === 'KeyH') { new Audio("assets/sounds_ride.wav").play(); animate('KeyH'); }
    if (event.code === 'KeyJ') { new Audio("assets/sounds_snare.wav").play(); animate('KeyJ'); }
    if (event.code === 'KeyK') { new Audio("assets/sounds_tom.wav").play(); animate('KeyK'); }
    if (event.code === 'KeyL') { new Audio("assets/sounds_tink.wav").play(); animate('KeyL'); }
});