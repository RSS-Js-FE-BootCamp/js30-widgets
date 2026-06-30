const cardsContainer = document.querySelector('.content__wrapper')

const response = await fetch('./js/json/videos.json')
const mediaData = await response.json()

function createCardElement() {
	const newCard = document.createElement('div')
	newCard.classList.add('new-card')

	const newCardImgContainer = document.createElement('div')
	newCardImgContainer.classList.add('new-card__img_wrapper')
	newCard.append(newCardImgContainer)

	const newCardImg = document.createElement('img')
	newCardImg.classList.add('new-card__image')
	newCardImgContainer.append(newCardImg)

	const newCardTitle = document.createElement('div')
	newCardTitle.classList.add('new-card__title')
	newCard.append(newCardTitle)

	return newCard
}

export function fillCardsContainer() {
	for (let i = 0; i < mediaData.length; i++) {
		const newCard = createCardElement()
		newCard.querySelector('.new-card__image').src = mediaData[i].previewUrl
		newCard.querySelector('.new-card__title').textContent = mediaData[i].title
		cardsContainer.append(newCard)
	}
}