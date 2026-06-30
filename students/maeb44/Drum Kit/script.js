const audios = Array.from(document.getElementsByTagName('audio'))
const cards = Array.from(document.getElementsByClassName('key'))

let isPlaying = false
const html = document.documentElement


	window.addEventListener('DOMContentLoaded',()=>{
		const theme = localStorage.getItem('theme')
		html.dataset.theme = theme;
	})

	window.addEventListener('keydown', async (e)=>{
		const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`)
		const card = document.querySelector(`.key[data-key="${e.keyCode}"]`)
		if(!sound) return
		if(isPlaying){
			audios.forEach(audio=>{
				audio.pause()
				audio.currentTime = 0
			})
			cards.forEach(card=>{
				card.classList.remove('playing')
			})
			isPlaying = false;
		}
		
			try{
				await sound.play();
				isPlaying = true
				card.classList.add('playing')
				
				sound.addEventListener('ended',()=>{
					card.classList.remove("playing")
					isPlaying = false;
				})
			}
			catch(error){
				console.log("воспроизведение прервано")
			}
	})
	document.addEventListener('click',(e)=>{
		if(e.target.closest('.key')){
			const sound = document.querySelector(`audio[data-key="${e.target.dataset.key}"]`)
			const card = document.querySelector(`.key[data-key="${e.target.dataset.key}"]`)
			if(isPlaying){
				audios.forEach(audio=>{
					audio.pause()
					audio.currentTime = 0
				})
				cards.forEach(card=>{
					card.classList.remove('playing')
				})
			}
			if(sound)	{
				isPlaying = true
				card.classList.toggle('playing')
				sound.play()
			}
		}
		if(e.target.closest('.theme')){
			html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme',html.dataset.theme)
		}
	})