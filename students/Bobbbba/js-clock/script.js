const secondHand = document.querySelector('.second-hand');
const minutesHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date()
    
    
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`
    
    

    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + 90;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`


    const hours = now.getHours();
    const hoursDegrees = ((hours / 60) * 360)+ 90 ;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
    

    const date = now.getDate()
    console.log(date)
}



setInterval(setDate, 1000)


// цифровые часы
function updateTime() {
    const digitNow = new Date();
    const digitHours = digitNow.getHours().toString().padStart(2, '0');
    const digitMinutes = digitNow.getMinutes().toString().padStart(2, '0');
    const digitSeconds = digitNow.getSeconds().toString().padStart(2, '0');

    const timeString = `${digitHours}:${digitMinutes}:${digitSeconds}`
    document.querySelector('.digital-time').innerText = timeString

}
 
setInterval(updateTime, 1000)

function updateDateInfo() {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const nowDate = new Date();
    const dateInfi = new Intl.DateTimeFormat('en-EN', options).format(nowDate)
    document.querySelector('.digital-date').innerText = dateInfi
}
setInterval(updateDateInfo, 1000)

const themeButton = document.querySelector('.black-theme');

function changeTheme() {
    if (document.body.classList.contains('dark')) {
        themeButton.textContent = 'Light theme';
    } else {
        themeButton.textContent = 'Black theme'
    }
}
changeTheme();

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    localStorage.setItem(
        'theme',
        document.body.classList.contains('dark') ? 'dark':'light'
    )
    changeTheme();
})