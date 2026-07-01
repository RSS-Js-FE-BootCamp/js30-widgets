import { updateRanges } from "./input-range-bg.js"
import {
	playPause,
	watchPlayPause,
	addFullscreenAction,
	setTimimg,
	updateTiming,
	progressbarAction,
	playAnotherVideo,
	skipActions,
	changeSpeed,
	changeVolume
} from "./players-actions.js"
import { createHotKeys } from "./hotkeys.js"

const playerContainer = document.querySelector('.content__wrapper')
const titleItem = document.querySelector('.full__title')

const response = await fetch('./js/json/videos.json')
const mediaData = await response.json()

let isMuted = false
let currentVideoIndex = 0

export function createPlayer(videoIndex) {
	currentVideoIndex = videoIndex
	titleItem.textContent = mediaData[videoIndex].title
	playerContainer.innerHTML = ''

	const playerWrapper = document.createElement('div')
	playerWrapper.classList.add('player')

	const videoViewer = document.createElement('video')
	videoViewer.classList.add('player__video')
	videoViewer.classList.add('viewer')
	videoViewer.src = mediaData[videoIndex].videoUrl

	playerWrapper.append(videoViewer)
	playerWrapper.append(createPlayerControls())

	playerContainer.append(playerWrapper)

	addActions(videoViewer)
}

function createPlayerControls() {
	const playerControlsWrapper = document.createElement('div')
	playerControlsWrapper.classList.add('player__controls__wrapper')

	playerControlsWrapper.append(createProgressBar())
	playerControlsWrapper.append(createControls())

	return playerControlsWrapper
}

function createProgressBar() {
	const playerProgress = document.createElement('div')
	playerProgress.classList.add('progress')

	const playerProgressFilled = document.createElement('div')
	playerProgressFilled.classList.add('progress__filled')
	playerProgress.append(playerProgressFilled)

	return playerProgress
}

function createControls() {
	const playerControls = document.createElement('div')
	playerControls.classList.add('player__controls')
	playerControls.classList.add('good-flex')
	playerControls.append(createControlsLeftSide())
	playerControls.append(createControlsRightSide())

	return playerControls
}

function createControlsLeftSide() {
	const playerLeftSide = document.createElement('div')
	playerLeftSide.classList.add('player__left_side')
	playerLeftSide.classList.add('good-flex')
	playerLeftSide.append(createPlayPauseBtn())
	playerLeftSide.append(createVolumeItem())
	playerLeftSide.append(createDurationInfo())
	playerLeftSide.append(createSkipBtns())

	return playerLeftSide
}

function createControlsRightSide() {
	const playerRightSide = document.createElement('div')
	playerRightSide.classList.add('player__right_side')
	playerRightSide.classList.add('good-flex')
	playerRightSide.append(createSpeedItem())
	playerRightSide.append(createСhangeTrackBtns())
	playerRightSide.append(createFullScreenBtn())

	return playerRightSide
}

function createPlayPauseBtn() {
	const playerPlayPauseBtn = document.createElement('button')
	playerPlayPauseBtn.classList.add('play_pause__button')
	playerPlayPauseBtn.classList.add('toggle')
	playerPlayPauseBtn.classList.add('player__control')
	playerPlayPauseBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 5L19 12L7 19Z"/></svg>'


	return playerPlayPauseBtn
}

function createVolumeItem() {
	const volumeWrapper = document.createElement('div')
	volumeWrapper.classList.add('volume__wrapper')
	volumeWrapper.classList.add('good-flex')

	const volumeIcon = document.createElement('button')
	volumeIcon.classList.add('player__control')
	volumeIcon.classList.add('volume__btn')
	volumeIcon.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8C18.5 9.2 19.3 10.5 19.3 12C19.3 13.5 18.5 14.8 17 16"/></svg>'
	volumeWrapper.append(volumeIcon)

	const volumeInputRange = document.createElement('input')
	volumeInputRange.classList.add('volume__input')
	volumeInputRange.classList.add('controls__input')
	volumeInputRange.type = 'range'
	volumeInputRange.name = 'volume'
	volumeInputRange.min = '0'
	volumeInputRange.max = '1'
	volumeInputRange.step = '0.05'
	volumeInputRange.value = '1'
	volumeWrapper.append(volumeInputRange)

	return volumeWrapper
}

function createDurationInfo() {
	const duration = document.createElement('div')
	duration.classList.add('controls__duration')
	duration.textContent = '0:00 / 7:13'

	return duration
}

function createSkipBtns() {
	const skipBtnsWrapper = document.createElement('div')
	skipBtnsWrapper.classList.add('controls__skip__wrapper')
	skipBtnsWrapper.classList.add('good-flex')

	const skipBackward = document.createElement('div')
	skipBackward.classList.add('controls__skip_backward')
	skipBackward.classList.add('player__control')
	skipBackward.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11 6L4 12L11 18Z"/><path d="M18 6L11 12L18 18Z"/><text x="12" y="22" font-size="5" text-anchor="middle" font-family="Arial">10</text></svg>'
	skipBtnsWrapper.append(skipBackward)

	const skipForward = document.createElement('div')
	skipForward.classList.add('controls__skip_forward')
	skipForward.classList.add('player__control')
	skipForward.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 6L13 12L6 18Z"/><path d="M13 6L20 12L13 18Z"/><text x="12" y="22" font-size="5" text-anchor="middle" font-family="Arial">10</text></svg>'
	skipBtnsWrapper.append(skipForward)

	return skipBtnsWrapper
}

function createСhangeTrackBtns() {
	const changeTrackBtnsWrapper = document.createElement('div')
	changeTrackBtnsWrapper.classList.add('controls__change_track__wrapper')
	changeTrackBtnsWrapper.classList.add('good-flex')

	const changeTrackPrev = document.createElement('div')
	changeTrackPrev.classList.add('controls__change_track_prev')
	changeTrackPrev.classList.add('player__control')
	changeTrackPrev.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="4" y="5" width="2" height="14"/><path d="M18 5L7 12L18 19Z"/></svg>'
	changeTrackBtnsWrapper.append(changeTrackPrev)

	const changeTrackNext = document.createElement('div')
	changeTrackNext.classList.add('controls__change_track_next')
	changeTrackNext.classList.add('player__control')
	changeTrackNext.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="18" y="5" width="2" height="14"/><path d="M6 5L17 12L6 19Z"/></svg>'
	changeTrackBtnsWrapper.append(changeTrackNext)

	return changeTrackBtnsWrapper
}

function createFullScreenBtn() {
	const playerFullscreenBtn = document.createElement('button')
	playerFullscreenBtn.classList.add('fulscreen__button')
	playerFullscreenBtn.classList.add('player__control')
	playerFullscreenBtn.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 10V4H10V6H6V10Z"/><path d="M14 4H20V10H18V6H14Z"/><path d="M4 14H6V18H10V20H4Z"/><path d="M18 14H20V20H14V18H18Z"/></svg>'

	return playerFullscreenBtn
}

function createSpeedItem() {
	const speedWrapper = document.createElement('div')
	speedWrapper.classList.add('speed__wrapper')
	speedWrapper.classList.add('good-flex')

	const speedInputRange = document.createElement('input')
	speedInputRange.classList.add('speed__input')
	speedInputRange.classList.add('controls__input')
	speedInputRange.type = 'range'
	speedInputRange.name = 'speed'
	speedInputRange.min = '0.5'
	speedInputRange.max = '2'
	speedInputRange.step = '0.1'
	speedInputRange.value = '1'
	speedWrapper.append(speedInputRange)

	const speedIcon = document.createElement('div')
	speedIcon.classList.add('player__control')
	speedIcon.classList.add('speed__info')
	speedIcon.textContent = '1x'
	speedWrapper.append(speedIcon)

	return speedWrapper
}

function toggleMuted(elem) {
	if (isMuted) {
		elem.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8C18.5 9.2 19.3 10.5 19.3 12C19.3 13.5 18.5 14.8 17 16"/></svg>'
	} else {
		elem.innerHTML = '<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 9H8L14 4V20L8 15H4Z"/><path d="M17 8L21 16"/><path d="M21 8L17 16"/></svg>'
	}
	isMuted = !isMuted
}

function addActions(video) {
	updateRanges()

	video.addEventListener('click', () => playPause(video))
	watchPlayPause(video)
	addFullscreenAction(video)
	video.addEventListener('canplay', () => {
		updateTiming(video)
	})
	setTimimg(video)
	progressbarAction(video)
	playAnotherVideo(currentVideoIndex)
	skipActions(video)
	changeSpeed(video)
	changeVolume(video)
	createHotKeys(video)
}