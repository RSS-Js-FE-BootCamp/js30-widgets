const themeBtn = document.querySelector('.theme')
const bodyItem = document.querySelector('.body')

function changeTheme() {
	bodyItem.classList.toggle('govnotheme')
	if (bodyItem.classList.contains('govnotheme')) {
		localStorage.setItem('theme', 'bad')
	} else {
		localStorage.setItem('theme', 'nice')
	}
}

export function loadTheme() {
	if (localStorage.getItem('theme')) {
		if (localStorage.getItem('theme') == 'bad') {
			bodyItem.classList.add('govnotheme')
		} else {
			bodyItem.classList.remove('govnotheme')
		}
	}
}

export function addThemeChanger() {
	themeBtn.addEventListener('click', changeTheme)
}