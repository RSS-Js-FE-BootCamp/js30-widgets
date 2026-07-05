const secondHand = document.querySelector(".second-hand");
const minutesHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

const digitalTime = document.querySelector(".digital-time");
const digitalWeekday = document.querySelector(".digital-weekday");
const digitalDate = document.querySelector(".digital-date");
const digitalYear = document.querySelector(".digital-year");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  digitalTime.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  digitalDate.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
  const secondDegrees = (seconds / 60) * 360 + 90;
  const minDegrees = (minutes / 60) * 360 + 90;
  const hourDegrees = (hours / 12) * 360 + 90;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  minutesHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  console.log(seconds);

  digitalWeekday.textContent = weekdays[now.getDay()];
}

setInterval(setDate, 1000);
