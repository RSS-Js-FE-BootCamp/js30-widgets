const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreCounter = document.querySelector('.score__counter')
const buttonStart = document.querySelector('.game__button_start')

let actualHole
let isGameGoing = false
let currentScore = 0

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
	const time = getRandomTime(200, 1000)
	const currentHole = holes[getrandomHole(holes)]

	currentHole.classList.add('show-mole')
	setTimeout(() => {
		currentHole.classList.remove('show-mole')
		if (isGameGoing) showMole()
	}, time)
}

function turnOnGame() {
	currentScore = 0
	scoreCounter.textContent = currentScore
	isGameGoing = true
	showMole()
	setTimeout(() => {
		isGameGoing = false
	}, 10000);
}

function clickOnMole(e) {
	if (!e.isTrusted) return
	currentScore++
	scoreCounter.textContent = currentScore
	this.classList.remove('show-mole')
}

export function addStartPlaying() {
	buttonStart.addEventListener('click', () => {
		if (!isGameGoing) turnOnGame()
	})
	moles.forEach(mole => mole.addEventListener('click', clickOnMole))
}