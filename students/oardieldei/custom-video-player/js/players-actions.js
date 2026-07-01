import { createPlayer } from "./create-player.js"

const response = await fetch('./js/json/videos.json')
const mediaData = await response.json()

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
	video.addEventListener('timeupdate', () => {
		updateTiming(video)
	})
}

export function updateTiming(video) {
	const timingItem = document.querySelector('.controls__duration')
	timingItem.textContent = `${getCurrentTime(video)} / ${getDuration(video)}`

	const progressBar = document.querySelector('.progress__filled')
	progressBar.style.width = (video.currentTime / video.duration) * 100 + '%'
}

export function progressbarAction(video) {
	const progress = document.querySelector(".progress")

	let isDragging = false

	function scrub(e) {
		const rect = progress.getBoundingClientRect();
		const x = e.clientX - rect.left

		let percent = x / rect.width
		percent = Math.min(1, Math.max(0, percent))

		video.currentTime = percent * video.duration
	}

	progress.addEventListener("pointerdown", (e) => {
		isDragging = true
		progress.setPointerCapture(e.pointerId)
		scrub(e)
	})

	progress.addEventListener("pointermove", (e) => {
		if (!isDragging) return
		scrub(e)
	})

	progress.addEventListener("pointerup", (e) => {
		isDragging = false
		progress.releasePointerCapture(e.pointerId)
	})

	progress.addEventListener("pointercancel", () => {
		isDragging = false
	})
}

export function playAnotherVideo(index) {
	const btsWrapper = document.querySelector('.controls__change_track__wrapper')
	btsWrapper.children[0].addEventListener('click', () => {
		if (index === 0) {
			createPlayer(mediaData.length - 1)
		} else {
			createPlayer(--index)
		}
	})
	btsWrapper.children[1].addEventListener('click', () => {
		if (index === mediaData.length - 1) {
			createPlayer(0)
		} else {
			createPlayer(++index)
		}
	})
}