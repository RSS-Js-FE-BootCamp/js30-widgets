const hourHand = document.querySelector(".clock__hand--hour");
const minuteHand = document.querySelector(".clock__hand--minute");
const secondHand = document.querySelector(".clock__hand--second");

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
}

setInterval(setDate, 1000);
setDate();
