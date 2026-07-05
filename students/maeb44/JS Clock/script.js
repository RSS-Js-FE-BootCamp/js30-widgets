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
