let secondArrow = document.querySelector('.second-arrow');
let minuteArrow = document.querySelector('.min-arrow');
let hourArrow = document.querySelector('.hour-arrow');

function setTime() {
  const time = new Date();

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondsArrowNow = (seconds / 60) * 360;
  const minutesArrowNow = (minutes / 60) * 360  + (minutes / 60) * 6;
  const hoursArrowNow = (hours % 12) * 30  + (seconds / 60) * 6;

  secondArrow.style.transform = `rotate(${secondsArrowNow}deg)`;
  minuteArrow.style.transform = `rotate(${minutesArrowNow}deg)`;
  hourArrow.style.transform = `rotate(${hoursArrowNow}deg)`;
}

setTime();

setInterval(setTime, 1000);