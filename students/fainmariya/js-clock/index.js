const hourHand = document.querySelector(".hour__hand");
const minuteHand = document.querySelector(".minute__hand");
const secondHand = document.querySelector(".second__hand");
const numbers = document.querySelectorAll(".number");
const secondTrail = document.querySelector(".second__trail");

const timeElement = document.querySelector(".time");
const weekdayElement = document.querySelector(".weekday");
const dateElement = document.querySelector(".date");
const yearElement = document.querySelector(".year");

const backgrounds = [
  "./assets/images/background.jpg",
  "./assets/images/background2.jpg",
  "./assets/images/background3.jpg",
  "./assets/images/background4.jpg",
];
let currentBackgroundIndex = 0;
let lastBackgroundChangeSecond = null;
backgrounds.forEach((src) => {
  const img = new Image();
  img.src = src;
});
function addTime(timeNow) {
  let displayTime = [];
  displayTime.push(String(timeNow.hours).padStart(2, "0"));
  displayTime.push(String(timeNow.minutes).padStart(2, "0"));
  displayTime.push(String(timeNow.seconds).padStart(2, "0"));
  let resultTime = displayTime.join(":");

  return resultTime;
}

function addMonth(timeNow) {
  let numMonth = timeNow.month;
  let nameMonth;
  switch (numMonth) {
    case 0:
      nameMonth = "January";
      break;
    case 1:
      nameMonth = "February";
      break;
    case 2:
      nameMonth = "March";
      break;
    case 3:
      nameMonth = "April";
      break;
    case 4:
      nameMonth = "May";
      break;
    case 5:
      nameMonth = "June";
      break;
    case 6:
      nameMonth = "July";
      break;
    case 7:
      nameMonth = "August";
      break;
    case 8:
      nameMonth = "September";
      break;
    case 9:
      nameMonth = "October";
      break;
    case 10:
      nameMonth = "November";
      break;
    case 11:
      nameMonth = "December";
      break;

    default:
      break;
  }
  return nameMonth;
}

function addDay(timeNow) {
  let dayNum = timeNow.weekday;
  let dayName;
  switch (dayNum) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;

    default:
      break;
  }
  return dayName;
}

function updateClock() {
  const date = new Date();
  const timeNow = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    weekday: date.getDay(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  timeElement.textContent = addTime(timeNow);
  weekdayElement.textContent = addDay(timeNow);
  dateElement.textContent = timeNow.date + " " + addMonth(timeNow);
  yearElement.textContent = timeNow.year;

  let secondsAngle = timeNow.seconds * 6;
  secondTrail.style.setProperty("--trail-angle", `${secondsAngle}deg`);
  let minutesAngle = timeNow.minutes * 6 + timeNow.seconds * 0.1;
  let hoursAngle = (timeNow.hours % 12) * 30 + timeNow.minutes * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;

  if (
    timeNow.seconds % 15 === 0 &&
    timeNow.seconds !== lastBackgroundChangeSecond
  ) {
    changeBackground();
    lastBackgroundChangeSecond = timeNow.seconds;
  }
}
function changeBackground() {
  currentBackgroundIndex = currentBackgroundIndex + 1;
  if (currentBackgroundIndex >= backgrounds.length) {
    currentBackgroundIndex = 0;
  }
  document.body.style.backgroundImage = `url("${backgrounds[currentBackgroundIndex]}")`;
}
updateClock();
setInterval(updateClock, 1000);
