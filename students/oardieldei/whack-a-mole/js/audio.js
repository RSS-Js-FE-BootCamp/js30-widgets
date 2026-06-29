const muteBtn = document.querySelector('.mute__icon')

let isMuted = false

export function playSoundGameOver() {
	if (isMuted) return
	const sound = new Audio('./sounds/end.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}

export function playSoundHit() {
	if (isMuted) return
	const sound = new Audio('./sounds/beat.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}

export function playSoundMoleUp() {
	if (isMuted) return
	const sound = new Audio('./sounds/up.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}

function muteUnmute() {
	isMuted = !isMuted
	muteBtn.classList.toggle('muted')
}

export function addMuteBtnPower() {
	muteBtn.addEventListener('click', muteUnmute)
}