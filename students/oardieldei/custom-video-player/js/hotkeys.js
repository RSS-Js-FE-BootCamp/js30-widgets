import { updateRanges } from "./input-range-bg.js"

const codeMap = {
	Space: (video) => {
		video.paused ? video.play() : video.pause()
	},
	KeyK: (video) => {
		video.paused ? video.play() : video.pause()
	},
	ArrowRight: (video) => {
		video.currentTime += 5
	},
	ArrowLeft: (video) => {
		video.currentTime -= 5
	},
	KeyL: (video) => {
		video.currentTime += 10
	},
	KeyJ: (video) => {
		video.currentTime -= 10
	},
	ArrowUp: (video) => {
		changeVolume(video, 'up')
	},
	ArrowDown: (video) => {
		changeVolume(video, 'down')
	},
	KeyM: (video) => {
		muteUnmuteVolume(video)
	},
	KeyF: (video) => {
		toggleFullscreen()
	},
	Digit0: (video) => {
		percentJump(video, 0)
	},
	Digit1: (video) => {
		percentJump(video, 10)
	},
	Digit2: (video) => {
		percentJump(video, 20)
	},
	Digit3: (video) => {
		percentJump(video, 30)
	},
	Digit4: (video) => {
		percentJump(video, 40)
	},
	Digit5: (video) => {
		percentJump(video, 50)
	},
	Digit6: (video) => {
		percentJump(video, 60)
	},
	Digit7: (video) => {
		percentJump(video, 70)
	},
	Digit8: (video) => {
		percentJump(video, 80)
	},
	Digit9: (video) => {
		percentJump(video, 90)
	},
}

const keyMap = {
	j: (video) => video.currentTime -= 10,
	l: (video) => video.currentTime += 10,
	"<": (video) => {
		changeSpeed(video, 'down')
	},
	">": (video) => {
		changeSpeed(video, 'up')
	},
}

export function createHotKeys(video) {
	const player = document.querySelector('.player')

	document.addEventListener('keydown', (e) => {
		const isInsidePlayer =
			player.contains(document.activeElement) ||
			player.matches(':hover')

		if (!isInsidePlayer) return

		const action =
			codeMap[e.code] ||
			keyMap[e.key]

		if (!action) return

		e.preventDefault()
		action(video)
	})
}

function muteUnmuteVolume(video) {
	const volumeBtn = document.querySelector('.volume__btn')
	const volumeInput = document.querySelector('.volume__input')

	if (+volumeInput.value === 0) {
		if (localStorage.getItem('lastvolume')) {
			updateVolume(+localStorage.getItem('lastvolume'))
		} else {
			updateVolume(1)
		}
	} else {
		localStorage.setItem('lastvolume', volumeInput.value)
		updateVolume(0)
	}
	updateRanges()

	function updateVolume(value) {
		video.volume = value
		volumeInput.value = value
		if (+value === 0) {
			volumeBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8L21 16"/><path d="M21 8L17 16"/></svg>'
		} else {
			volumeBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8C18.5 9.2 19.3 10.5 19.3 12C19.3 13.5 18.5 14.8 17 16"/></svg>'
		}
		localStorage.setItem('volume', value)
	}
}

function changeSpeed(video, type) {
	const inputRange = document.querySelector('.speed__input')
	const infoText = document.querySelector('.speed__info')

	function updateSpeed(value) {
		video.playbackRate = value
		inputRange.value = value
		infoText.textContent = value + 'x'
	}

	if (type === 'up') {
		if (video.playbackRate == 2) return
		updateSpeed((video.playbackRate * 10 + 1) / 10)
	}
	if (type === 'down') {
		if (+video.playbackRate == 0.5) return
		updateSpeed((video.playbackRate * 10 - 1) / 10)
	}

	updateRanges()
}

function toggleFullscreen() {
	const playerItem = document.querySelector('.player')

	if (!document.fullscreenElement) {
		playerItem.requestFullscreen()
	} else {
		document.exitFullscreen()
	}

}

function changeVolume(video, type) {
	const volumeBtn = document.querySelector('.volume__btn')
	const volumeInput = document.querySelector('.volume__input')


	function updateVolume(value) {
		video.volume = value
		volumeInput.value = value
		if (+value === 0) {
			volumeBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8L21 16"/><path d="M21 8L17 16"/></svg>'
		} else {
			volumeBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8C18.5 9.2 19.3 10.5 19.3 12C19.3 13.5 18.5 14.8 17 16"/></svg>'
		}
		localStorage.setItem('volume', value)
	}

	if (type === 'up') {
		((volumeInput.value * 10 + 1) / 10) > 1 ? updateVolume(1) : updateVolume((volumeInput.value * 10 + 1) / 10)
	}

	if (type === 'down') {
		((volumeInput.value * 10 - 1) / 10) < 0 ? updateVolume(0) : updateVolume((volumeInput.value * 10 - 1) / 10)
	}

	updateRanges()
}

function percentJump(video, percent) {
	const newTime = video.duration * percent / 100
	video.currentTime = newTime
}