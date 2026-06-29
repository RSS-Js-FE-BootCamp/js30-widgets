export function playSoundGameOver() {
	const sound = new Audio('./sounds/end.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}

export function playSoundHit() {
	const sound = new Audio('./sounds/beat.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}

export function playSoundMoleUp() {
	const sound = new Audio('./sounds/up.mp3')
	sound.play().catch(error => {
    console.warn("Звук не воспроизвелся. Возможно, пользователь еще не кликал по странице:", error);
  })
}