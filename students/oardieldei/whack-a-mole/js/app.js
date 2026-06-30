import { addStartPlaying } from "./game.js"
import { addExplosionToClicks } from "./particle-burst.js"
import { addMuteBtnPower } from "./audio.js"
import { showLeaders } from "./leaderboard.js"

export function runApp() {
	addStartPlaying()
	addExplosionToClicks()
	addMuteBtnPower()
	showLeaders()

	console.log('Привет! В папке с проектом есть README.md, там вся информация для облегчения проверки.')
}