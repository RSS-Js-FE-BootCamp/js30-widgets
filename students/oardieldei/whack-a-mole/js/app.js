import { addStartPlaying } from "./game.js"
import { addExplosionToClicks } from "./particle-burst.js"

export function runApp() {
	addStartPlaying()
	addExplosionToClicks()
}