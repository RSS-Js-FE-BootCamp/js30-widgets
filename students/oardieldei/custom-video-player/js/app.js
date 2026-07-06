import { fillCardsContainer } from "./cards-media.js"
import { addThemeChanger, loadTheme } from "./theme-changer.js"
import { addReturnAction } from "./return.js"

export function runApp() {
	fillCardsContainer()
	loadTheme()
	addThemeChanger()
	addReturnAction()
}