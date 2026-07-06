import { fillCardsContainer } from "./cards-media.js"

const returnBtn = document.querySelector('.back')

export function addReturnAction() {
	returnBtn.addEventListener('click', fillCardsContainer)
}