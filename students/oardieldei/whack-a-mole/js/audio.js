const muteBtn = document.querySelector('.mute__icon')

let isMuted = false

if (localStorage.getItem('ismuted')) {
	isMuted = JSON.parse(localStorage.getItem('ismuted'))
	if (isMuted) {
		muteBtn.classList.add('muted')
	}
}

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

export function playNextLevel() {
	if (isMuted) return
	const sound = new Audio('./sounds/nextlevel.mp3')
	sound.play().catch(error => {
		console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
	})
}

function muteUnmute() {
	isMuted = !isMuted
	muteBtn.classList.toggle('muted')
	localStorage.setItem('ismuted', JSON.stringify(isMuted))
}

export function addMuteBtnPower() {
	muteBtn.addEventListener('click', muteUnmute)
}

