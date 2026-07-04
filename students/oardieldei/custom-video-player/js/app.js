import { fillCardsContainer } from "./cards-media.js"
import { addThemeChanger, loadTheme } from "./theme-changer.js"

export function runApp() {
	fillCardsContainer()
	loadTheme()
	addThemeChanger()
}