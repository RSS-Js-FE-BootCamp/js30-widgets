const secondArrow = document.querySelector(".second-arrow");
const minArrow = document.querySelector(".min-arrow");
const hourArrow = document.querySelector(".hour-arrow");

function setDate() {
  const now = new Date();

  // Second
  const currentSeconds = now.getSeconds();
  const secondDegrees = (currentSeconds / 60) * 360 + 90;
  secondArrow.style.transform = `rotate(${secondDegrees}deg)`;

  // Minutes
  const currentMinutes = now.getMinutes();
  const minDegrees = (currentMinutes / 60) * 360 + 90;
  minArrow.style.transform = `rotate(${minDegrees}deg)`;

  // Hours
  const currentHours = now.getHours();
  const hourDegrees = (currentHours / 12) * 360 + 90;
  hourArrow.style.transform = `rotate(${hourDegrees}deg)`;
}
setInterval(setDate, 1000);
setDate();
