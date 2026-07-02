const audios = Array.from(document.getElementsByTagName('audio'))
const cards = Array.from(document.getElementsByClassName('key'))

let isPlaying = false
const html = document.documentElement

function playSound(sound, card) {
    if(!sound || !card) return;
    
    if(!sound.paused) {
        sound.pause();
        sound.currentTime = 0;
        card.classList.remove('playing');
        return;
    }
    
    audios.forEach(a => {
        if(a !== sound && !a.paused) {
            a.pause();
            a.currentTime = 0;
        }
    });
    cards.forEach(c => c.classList.remove('playing'));
    
    sound.play();
    card.classList.add('playing');
    
    sound.addEventListener('ended', () => {
        card.classList.remove('playing');
    }, { once: true });
}

	window.addEventListener('DOMContentLoaded',()=>{
		const theme = localStorage.getItem('theme')
		html.dataset.theme = theme;
	})
	window.addEventListener('keydown', (e)=>{
		const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`)
		const card = document.querySelector(`.key[data-key="${e.keyCode}"]`)
		playSound(sound,card)
		})

	document.addEventListener('click',(e)=>{
    const key = e.target.closest('.key');

    if(key) {
        const sound = document.querySelector(`audio[data-key="${key.dataset.key}"]`);
        playSound(sound, key);
		}
		if(e.target.closest('.theme')){
			html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme',html.dataset.theme)
		}
    if(e.target.closest('.play-btn')) {
        const sequence = [0, 2, 4, 6, 7];
        let idx = 0;
        function playNext() {
            if(idx >= sequence.length) return;
            const card = cards[sequence[idx]];
            const sound = audios[sequence[idx]];
            if(sound && card) {
                const handler = () => {
                    sound.removeEventListener('ended', handler);
                    idx++;
                    playNext();
                };
                sound.addEventListener('ended', handler);
                playSound(sound, card);
            }
        }
        playNext();
    }
	})
	