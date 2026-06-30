import { playSoundGameOver, playSoundMoleUp, playSoundHit, playNextLevel } from "./audio.js"

const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreCounter = document.querySelector('.score__counter')
const buttonStart = document.querySelector('.game__button_start')
const levelUpElem = document.querySelector('.game__level_up')

let actualHole
let isGameGoing = false
let currentScore = 0
let levelScore = 0
let currentLevel = 1
let gameTimer = null
let moleTimer = null

function getRandomTime(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function getrandomHole(holes) {
	const index = Math.floor(Math.random() * holes.length)
	if (index === actualHole) return getrandomHole(holes)

	actualHole = index
	return index
}

function showMole() {
	const minTime = 400 / currentLevel
	const maxTime = 2000 / currentLevel

	const currentHole = holes[getrandomHole(holes)]

	playSoundMoleUp()
	currentHole.classList.add('show-mole')
	moleTimer = setTimeout(() => {
		currentHole.classList.remove('show-mole')

		if (isGameGoing) {
			showMole()
		}
	}, getRandomTime(minTime, maxTime))
}

function turnOnGame() {
	currentLevel = 1
	currentScore = 0
	levelScore = 0
	scoreCounter.textContent = currentScore
	isGameGoing = true

	showMole()
	startRoundTimer()
}

function clickOnMole(e) {
	const hole = e.target.closest('.hole')

	if (!e.isTrusted) return
	if (hole.classList.contains('killed')) return

	levelScore++
	currentScore++
	scoreCounter.textContent = currentScore

	playSoundHit()

	hole.classList.add('killed')
	hole.classList.remove('show-mole')
	setTimeout(() => {
		hole.classList.remove('killed')
	}, 600)

	if (levelScore >= 5) {
		nextLevel()
	}
}

function startRoundTimer() {
	clearTimeout(gameTimer)

	gameTimer = setTimeout(() => {
		isGameGoing = false

		clearTimeout(moleTimer)
		document.querySelector('.show-mole')?.classList.remove('show-mole')

		playSoundGameOver()
	}, 10000)
}

function nextLevel() {
	currentLevel++
	levelScore = 0

	clearTimeout(moleTimer)
	levelUpInfo()

	document.querySelector('.show-mole')?.classList.remove('show-mole')

	startRoundTimer()
	showMole()
}

function levelUpInfo() {
	playNextLevel()
	levelUpElem.classList.remove('hidden_elem')
	setTimeout(() => {
		levelUpElem.classList.add('hidden_elem')
	}, 1000);
}

export function addStartPlaying() {
	buttonStart.addEventListener('click', () => {
		if (!isGameGoing) turnOnGame()
	})
	moles.forEach(mole => mole.addEventListener('click', (e) => { clickOnMole(e) }))
}