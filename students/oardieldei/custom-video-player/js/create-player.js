const playerContainer = document.querySelector('.content__wrapper')
const titleItem = document.querySelector('.full__title')

const response = await fetch('./js/json/videos.json')
const mediaData = await response.json()

let isPlaying = false

export function createPlayer(videoIndex) {
	titleItem.textContent = mediaData[videoIndex].title
	playerContainer.innerHTML = ''
	playerContainer.append(createPlayerElem(videoIndex))
}

function createPlayerElem(videoIndex) {
	const playerWrapper = document.createElement('div')
	playerWrapper.classList.add('player')

	playerWrapper.append(createPlayerViewer(videoIndex))
	playerWrapper.append(createPlayerControls())

	return playerWrapper
}

function createPlayerViewer(videoIndex) {
	const videoViewer = document.createElement('video')
	videoViewer.classList.add('player__video')
	videoViewer.classList.add('viewer')
	videoViewer.src = mediaData[videoIndex].videoUrl

	return videoViewer
}

function createPlayerControls() {
	const playerControlsWrapper = document.createElement('div')
	playerControlsWrapper.classList.add('player__controls__wrapper')

	const playerProgress = document.createElement('div')
	playerProgress.classList.add('progress')
	playerControlsWrapper.append(playerProgress)

	const playerProgressFilled = document.createElement('div')
	playerProgressFilled.classList.add('progress__filled')
	playerProgress.append(playerProgressFilled)

	const playerControls = document.createElement('div')
	playerControlsWrapper.classList.add('player__controls')
	playerControlsWrapper.append(playerControls)

	const playerLeftSide = document.createElement('div')
	playerLeftSide.classList.add('player__left_side')
	playerControls.append(playerLeftSide)

	const playerPlayPauseBtn = document.createElement('button')
	playerPlayPauseBtn.classList.add('player__button')
	playerPlayPauseBtn.classList.add('toggle')
	playerPlayPauseBtn.classList.add('player__control')
	playerPlayPauseBtn.title = 'Toggle Play'
	playerPlayPauseBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 5L19 12L7 19Z"/></svg>'
	playerLeftSide.append(playerPlayPauseBtn)
	playerPlayPauseBtn.addEventListener('click', () => {
		togglePlayPause(playerPlayPauseBtn)
	})

	return playerControlsWrapper
}

function togglePlayPause(elem) {
	if (isPlaying) {
		elem.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 5L19 12L7 19Z"/></svg>'
	} else {
		elem.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>'
	}
	isPlaying = !isPlaying
}