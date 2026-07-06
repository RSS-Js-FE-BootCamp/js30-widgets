import { createPlayer } from "./create-player.js"

const response = await fetch('./js/json/videos.json')
const mediaData = await response.json()

export function createWrapper(currentVideo) {
	const wrapper = document.createElement('ul')
	wrapper.classList.add('playlist__wrapper')

	for (let i = 0; i < mediaData.length; i++) {
		wrapper.append(createItem(i, currentVideo))
	}

	return wrapper
}

function createItem(videoIndex, currentVideo) {
	const newItem = document.createElement('li')
	newItem.classList.add('playlist__item')
	if (currentVideo === videoIndex) {
		newItem.classList.add('playlist__item_active')
	} else {
		newItem.addEventListener('click', () => {
			createPlayer(videoIndex)
		})
	}

	const itemImageWrapper = document.createElement('div')
	itemImageWrapper.classList.add('playlist__item__image_wrapper')
	newItem.append(itemImageWrapper)

	const itemImage = document.createElement('img')
	itemImage.classList.add('playlist__item__image')
	itemImage.src = mediaData[videoIndex].previewUrl
	itemImageWrapper.append(itemImage)

	const itemTitle = document.createElement('div')
	itemTitle.classList.add('playlist__item__title')
	itemTitle.textContent = mediaData[videoIndex].title
	newItem.append(itemTitle)

	return newItem
}