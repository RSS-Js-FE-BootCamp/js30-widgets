const leaderboardItems = document.querySelectorAll('.lb__item')

let leaderboard = [
	{
		user: 'Nobody',
		score: 0,
		level: 0,
	},
	{
		user: 'Nobody',
		score: 0,
		level: 0,
	},
	{
		user: 'Nobody',
		score: 0,
		level: 0,
	},
	{
		user: 'Nobody',
		score: 0,
		level: 0,
	},
	{
		user: 'Nobody',
		score: 0,
		level: 0,
	}
]

if (localStorage.getItem('best')) leaderboard = JSON.parse(localStorage.getItem('best'))

export function getLeaderboard() {
	return leaderboard
}

function sortLeaderboard() {
	leaderboard.sort((a, b) => b.score - a.score)
}

export function addNewScore(newScore, newLevel) {
	if (newScore > leaderboard[leaderboard.length - 1].score) {
		let name = prompt('Your name:')
		if (name === null || name.trim() === '') {
			name = 'Anonymous'
		}

		leaderboard[leaderboard.length - 1] = {
			user: name,
			score: newScore,
			level: newLevel,
		}

		sortLeaderboard()

		localStorage.setItem('best', JSON.stringify(leaderboard))
		showLeaders()
	}
}

export function showLeaders() {
	for (let i = 0; i < 5; i++) {
		leaderboardItems[i].textContent = `${i + 1}. ${leaderboard[i].user} - ${leaderboard[i].score} hits (${leaderboard[i].level} level)`
	}
}