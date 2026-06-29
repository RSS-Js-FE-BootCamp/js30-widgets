const holes = document.querySelectorAll('.hole')
const moles = document.querySelectorAll('.mole')
const scoreCounter = document.querySelector('.score__counter')

let actualHole

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
	}, time);
}