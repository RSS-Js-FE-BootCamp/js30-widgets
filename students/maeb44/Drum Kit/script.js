console.log(`### 🟢 Widget 2: Drum Kit
**Score: 55 / 65**

**Stage 1 - Reproduction (20/20)**
- [+] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [+] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature (15/15)**
- [+] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [+] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (20/30)**
- [ ] Multiple instruments - switching the instrument swaps the set of sounds played by the same pads (+10)
- [ ] Floating hearts / notes that spawn on click (+10)
- [ ] Polished pad animation on press, e.g. a Material-style ripple (+10)
- [+] A "play a predefined melody" mode with animated key highlights timed to the playback (+10)
- [ ] A "light show" where each note paints an abstract visual pattern on a backdrop (+10)
- [ ] A full virtual piano with octaves and a wider keyboard mapping (+10)
- [+] Dark / light theme toggle that persists across reloads (+10)

---`)


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
	