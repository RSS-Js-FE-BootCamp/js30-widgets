const particleCount = 30

function createExplosion(x, y) {
	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div')
		particle.classList.add('particle')

		const colors = ['#ff3366', '#ffcc00', '#33cc33', '#3399ff', '#ff6600'];
		particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

		particle.style.left = x + 'px'
		particle.style.top = y + 'px'

		const destinationX = (Math.random() - 0.5) * 300
		const destinationY = (Math.random() - 0.5) * 300

		particle.style.setProperty('--x', destinationX + 'px')
		particle.style.setProperty('--y', destinationY + 'px')

		document.body.appendChild(particle)

		setTimeout(() => {
			particle.remove();
		}, 600)
	}
}

export function addExplosionToClicks() {
	document.addEventListener('click', function (e) {
		createExplosion(e.clientX, e.clientY)
	})
}