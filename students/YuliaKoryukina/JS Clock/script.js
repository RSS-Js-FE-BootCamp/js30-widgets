const secondArrow = document.querySelector(".second-arrow");
const minArrow = document.querySelector(".min-arrow");
const hourArrow = document.querySelector(".hour-arrow");
const digitalTime = document.querySelector(".digital-time");
const digitalDate = document.querySelector(".digital-date");
const digitalDay = document.querySelector(".digital-day");
const themeText = document.querySelector(".welcome-text");

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
  // Greetings on time
  if (currentHours >= 5 && currentHours < 12) {
    themeText.textContent = "Доброе утро!";
  } else if (currentHours >= 12 && currentHours < 18) {
    themeText.textContent = "Добрый день!";
  } else if (currentHours >= 18 && currentHours < 23) {
    themeText.textContent = "Добрый вечер!";
  } else {
    themeText.textContent = "Доброй ночи!";
  }
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
// Digital Clock BG color
const themeClick = document.querySelector(".theme-click");
const digitalClockPanel = document.querySelector(".digital-clock");
const savedTheme = localStorage.getItem("clock-theme");
if (savedTheme === "light") {
  digitalClockPanel.classList.add("light-theme");
} else if (savedTheme === "dark") {
  digitalClockPanel.classList.remove("light-theme");
}
themeClick.addEventListener("click", function () {
  if (digitalClockPanel.classList.contains("light-theme")) {
    digitalClockPanel.classList.remove("light-theme");
    localStorage.setItem("clock-theme", "dark");
  } else {
    digitalClockPanel.classList.add("light-theme");
    localStorage.setItem("clock-theme", "light");
  }
});
setInterval(setDate, 1000);
setDate();
