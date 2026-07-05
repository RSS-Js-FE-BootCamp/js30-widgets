const hourHand = document.querySelector(".clock__hand--hour");
const minuteHand = document.querySelector(".clock__hand--minute");
const secondHand = document.querySelector(".clock__hand--second");

const digitalTime = document.querySelector(".clock__digital-wrapper");

const sidebar = document.querySelector(".sidebar");
const sidebarBtnOpen = document.querySelector(".controls__btn--sidebar");
const sidebarBtnClose = document.querySelector(".sidebar__btn--close");
const sidebarItems = document.querySelectorAll(".sidebar__item");

const formatter = new Intl.DateTimeFormat("ru", {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
});

function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();

  if (seconds === 0) {
    secondHand.style.transition = "none";
  } else {
    secondHand.style.transition = "";
  }

  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = (minutes / 60) * 360 + 90;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = (hours / 12) * 360 + 90;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

  const digitalDateTime =
    formatter.format(now).charAt(0).toUpperCase() +
    formatter.format(now).slice(1);

  digitalTime.textContent = digitalDateTime;

  sidebarItems.forEach((item) => {
    const timezone = item.getAttribute("data-timezone");

    const cityFormatter = new Intl.DateTimeFormat("ru", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: timezone,
    });

    const clockCity = item.querySelector(".sidebar__item-clock");

    if (clockCity) {
      clockCity.textContent = cityFormatter.format(now);
    }
  });
}

setInterval(setDate, 1000);
setDate();

// THEME

const themeBtn = document.querySelector(".controls__btn--theme");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

sidebarBtnOpen.addEventListener("click", () =>
  sidebar.classList.add("sidebar--open"),
);
sidebarBtnClose.addEventListener("click", () =>
  sidebar.classList.remove("sidebar--open"),
);
