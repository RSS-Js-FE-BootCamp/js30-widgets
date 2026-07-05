console.log(`### 🟢 Widget 1: JS Clock
**Score: 65 / 65**

**Stage 1 - Reproduction (20/20)**
- [+] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [+] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature (15/15)**
- [+] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [+] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (30/30)**
- [ +] A multi-timezone view showing time at several cities of the world simultaneously (+10)
- [+] Dark / light theme toggle that persists across reloads (+10)
- [] An online alarm clock with sound and dismiss/snooze controls (+10)
- [] A cuckoo clock - at the top of each hour the bird pops out and chimes (+10)
- [ ] A "do nothing for 2 minutes" / "Quiet Place" relaxation mode with a timer that resets on user input (+10)
- [+] Circular progress diagrams for seconds / minutes / hours rendered next to the face (+10)

---`)

const html = document.documentElement
const secHand = document.querySelector('.sec-hand')
const minHand = document.querySelector('.min-hand')
const hourHand = document.querySelector('.hour-hand')
const digitalDate = document.querySelector('.OUR')
const UK = document.querySelector(".UK")
const US = document.querySelector(".US")






const clockDeg = 6;
const hourDeg = 30;
const time = new Date()

function reloadRing(time){
		const minRing = document.querySelector('#minutes-ring')
		const hourRing = document.querySelector('#hours-ring')
		const secRing = document.querySelector('#seconds-ring')

		let secondsProgress = (time.getSeconds() / 60) * 100;
		let minutesProgress = (time.getMinutes() / 60) * 100;
		let hoursProgress = (time.getHours()%12 / 12) * 100;
		
		secRing.lastElementChild.textContent = secondsProgress.toFixed(0) + '%'
		hourRing.lastElementChild.textContent = hoursProgress.toFixed(0) + '%'
		minRing.lastElementChild.textContent = minutesProgress.toFixed(0) + '%'

		secRing.style.setProperty('--progress', `${secondsProgress}%`);
		hourRing.style.setProperty('--progress', `${hoursProgress}%`);
		minRing.style.setProperty('--progress', `${minutesProgress}%`);
}


function BuildDigitalDate (time){
	const DAY_OF_WEEK = [
		'SUNDAY',    
		'MONDAY',    
		'TUESDAY',   
		'WEDNESDAY', 
		'THURSDAY',  
		'FRIDAY',    
		'SATURDAY'   
	];
	const MONTH_OF_DATE = [
		'JANUARY',   
		'FEBRUARY',  
		'MARCH',     
		'APRIL',     
		'MAY',       
		'JUNE',      
		'JULY',      
		'AUGUST',    
		'SEPTEMBER', 
		'OCTOBER',   
		'NOVEMBER',  
		'DECEMBER'   
	]
	const hours = String(time.getHours()).padStart(2,'0')
	const minutes = String(time.getMinutes()).padStart(2,'0')
	const seconds = String(time.getSeconds()).padStart(2,'0')
	const month = MONTH_OF_DATE[time.getMonth()]
	const day = DAY_OF_WEEK[time.getDay()]
	const dayOfMonth = time.getDate()
	return `${hours}:${minutes}:${seconds} ${day} ${dayOfMonth} ${month}`
}


	window.addEventListener('DOMContentLoaded',()=>{
		const seconds = time.getSeconds()
		const minutes = time.getMinutes() + seconds / 60;
		const hours = (time.getHours()%12) + minutes / 60;

		reloadRing(time)
		digitalDate.textContent = BuildDigitalDate(time)
		
		US.textContent = `America/Los-Angeles `+time.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
		});

		UK.textContent = `Europe/London `+  time.toLocaleTimeString('en-US', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

		secHand.style.transform = `translateX(50%) rotate(${6 * seconds}deg)`
		minHand.style.transform = `translateX(50%) rotate(${6 * minutes}deg)`
		hourHand.style.transform = `translateX(50%) rotate(${30 * hours}deg)`
		const theme = localStorage.getItem('theme')
		html.dataset.theme = theme;
	})

	setInterval(()=>{
		const time = new Date()

		digitalDate.textContent = BuildDigitalDate(time)
		reloadRing(time)

		US.textContent = `America/Los-Angeles: `+time.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
		});
		UK.textContent = `Europe/London: `+  time.toLocaleTimeString('en-US', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    })

		const seconds = time.getSeconds()
		const minutes = time.getMinutes() + seconds / 60;
		const hours = (time.getHours()%12) + minutes / 60;
		secHand.style.transform = `translateX(50%) rotate(${6 * seconds}deg)`
		minHand.style.transform = `translateX(50%) rotate(${6 * minutes}deg)`
		hourHand.style.transform = `translateX(50%) rotate(${30 * hours}deg)`
	},1000);
	
	
		document.addEventListener('click',(e)=>{
		if(e.target.closest('.theme')){
			html.dataset.theme = html.dataset.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme',html.dataset.theme)
		}
		})
