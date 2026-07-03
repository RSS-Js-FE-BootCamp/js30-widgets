const secondArrow = document.querySelector(".second-arrow");
const minArrow = document.querySelector(".min-arrow");
const hourArrow = document.querySelector(".hour-arrow");
const digitalTime = document.querySelector(".digital-time");
const digitalDate = document.querySelector(".digital-date");
const digitalDay = document.querySelector(".digital-day");

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
  // Digital Clock
  digitalTime.textContent = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  digitalDate.textContent = now.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  digitalDay.textContent = now.toLocaleDateString("ru-RU", {
    weekday: "long",
  });
}
const themeClick = document.querySelector(".theme-click");
const digitalClockPanel = document.querySelector(".digital-clock");
themeClick.addEventListener("click", function () {
  digitalClockPanel.classList.toggle("light-theme");
});
setInterval(setDate, 1000);
setDate();
