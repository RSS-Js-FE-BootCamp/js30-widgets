function updateRange(range) {
	const percent = (range.value - range.min) / (range.max - range.min) * 100
	range.style.setProperty('--progress', `${percent}%`)
}

export function updateRanges() {
	const ranges = document.querySelectorAll('.controls__input')
	ranges.forEach(range => {
		updateRange(range)
		range.addEventListener('input', () => updateRange(range))
	})
}