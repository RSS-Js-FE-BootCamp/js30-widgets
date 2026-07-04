import { addStartPlaying } from "./game.js"
import { addExplosionToClicks } from "./particle-burst.js"
import { addMuteBtnPower } from "./audio.js"
import { showLeaders } from "./leaderboard.js"

export function runApp() {
	addStartPlaying()
	addExplosionToClicks()
	addMuteBtnPower()
	showLeaders()
}