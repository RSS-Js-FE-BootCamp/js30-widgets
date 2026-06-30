export function playPause(video) {
	if (video.paused) {
		video.play()
	} else {
		video.pause()
	}
}
export function watchPlayPause(video) {
	const playPauseBtn = document.querySelector('.play_pause__button')

	if (playPauseBtn) {
		playPauseBtn.addEventListener('click', () => playPause(video))
	}

	video.addEventListener('play', () => {
		if (playPauseBtn) {
			playPauseBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
		}
	})

	video.addEventListener('pause', () => {
		if (playPauseBtn) {
			playPauseBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 5L19 12L7 19Z"/></svg>'
		}
	})
}

export function addFullscreenAction() {
	const fulscreenButton = document.querySelector('.fulscreen__button')
	const playerItem = document.querySelector('.player')
	fulscreenButton.addEventListener('click', () => {
		playerItem.requestFullscreen()
	})
}

function getReadableTime(time) {
	const minutes = Math.floor(time / 60)
	let seconds = Math.round(time % 60)
	if (seconds < 10) seconds = '0' + seconds

	return `${minutes}:${seconds}`
}

export function getDuration(video) {
	const duration = video.duration
	return getReadableTime(duration)
}

function getCurrentTime(video) {
	const currentTime = video.currentTime
	return getReadableTime(currentTime)
}

export function setTimimg(video) {
	const timingItem = document.querySelector('.controls__duration')
	video.addEventListener('timeupdate', () => {
		timingItem.textContent = `${getCurrentTime(video)} / ${getDuration(video)}`
	})
}