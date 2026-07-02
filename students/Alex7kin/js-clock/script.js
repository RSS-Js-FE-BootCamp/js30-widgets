const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

// Digital date lines
const weekdayEl = document.querySelector('#weekday');
const dateEl = document.querySelector('#date');
const yearEl = document.querySelector('#year');

// The number shown in the middle of each ring
const valSeconds = document.querySelector('#valSeconds');
const valMinutes = document.querySelector('#valMinutes');
const valHours = document.querySelector('#valHours');

// The colored arcs we grow and shrink
const ringSeconds = document.querySelector('#ringSeconds');
const ringMinutes = document.querySelector('#ringMinutes');
const ringHours = document.querySelector('#ringHours');

// The quote bar at the top of the screen
const quoteBox = document.querySelector('#quote');
const quoteTextEl = document.querySelector('#quoteText');
const quoteAuthorEl = document.querySelector('#quoteAuthor');

// Words for each number. Position 0 comes first, because
// getDay() and getMonth() start counting at 0, not 1.
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

// Each ring is a circle with radius 52 (see the SVG in index.html).
// The length once around a circle is 2 * PI * radius — we call it CIRCLELENGTH.
const RADIUS = 52;
const CIRCLELENGTH = 2 * Math.PI * RADIUS;

// Tell every arc that its dash is exactly one full circle long.
// Now, by hiding part of that dash, we can reveal any fraction of the ring.
[ringSeconds, ringMinutes, ringHours].forEach(ring => {
  ring.style.strokeDasharray = CIRCLELENGTH;
});

// fraction goes from 0 to 1. 0 = empty ring, 1 = full ring.
function setRing(ring, fraction) {
  // strokeDashoffset hides the start of the dash.
  // offset 0 shows the whole ring; offset CIRCLELENGTH hides all of it.
  ring.style.strokeDashoffset = CIRCLELENGTH * (1 - fraction);
}

// --- One loop for the whole clock ---
// requestAnimationFrame runs this ~60 times a second (once per screen frame).
// Every frame we move the things that must glide (the hands, the seconds ring).
// The things that only change once a second (the numbers, the minute/hour rings,
// the date, the quote) update inside the "second changed" block, so we don't
// redo that work 60 times a second.
let lastShownSecond = -1;
function animate() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const wholeSecond = now.getSeconds();

  // Smooth values, e.g. 12.734 seconds instead of a whole 12.
  const seconds = wholeSecond + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = now.getHours() + minutes / 60;

  // Every frame: point the hands and fill the seconds ring.
  // (+90 lines things up so 0 points straight up to 12.)
  secondHand.style.transform = `rotate(${(seconds / 60) * 360 + 90}deg)`;
  minsHand.style.transform   = `rotate(${(minutes / 60) * 360 + 90}deg)`;
  hourHand.style.transform   = `rotate(${(hours / 12) * 360 + 90}deg)`;
  setRing(ringSeconds, seconds / 60);

  // Once a second: everything that shows whole numbers or words.
  if (wholeSecond !== lastShownSecond) {
    const mins = now.getMinutes();
    const hour = now.getHours();

    // Ring numbers (two digits: 9 -> "09") and the minute / hour rings.
    valSeconds.textContent = String(wholeSecond).padStart(2, '0');
    valMinutes.textContent = String(mins).padStart(2, '0');
    valHours.textContent   = String(hour).padStart(2, '0');
    setRing(ringMinutes, mins / 60); // fills once every hour
    setRing(ringHours, hour / 24);   // fills once every 24-hour day

    // Date words.
    weekdayEl.textContent = weekdays[now.getDay()];
    dateEl.textContent = `${now.getDate()} ${months[now.getMonth()]}`;
    yearEl.textContent = now.getFullYear();

    // A new minute (seconds hit 0) -> a new quote.
    // Skip the very first frame (lastShownSecond === -1) so we don't load twice
    // together with the initial loadQuote() if the page opens right at :00.
    if (wholeSecond === 0 && lastShownSecond !== -1) {
      loadQuote();
    }

    lastShownSecond = wholeSecond;
  }

  requestAnimationFrame(animate); // run again on the next frame
}
requestAnimationFrame(animate);

// --- Draw the hour numbers (1..12) around the clock face ---
const clockFace = document.querySelector('.clock-face');
for (let hour = 1; hour <= 12; hour++) {
  // An invisible full-size box. Its center is the center of the clock.
  const wrap = document.createElement('div');
  wrap.className = 'number';
  // Spin the whole box so its top point lands where this hour belongs.
  // 360 degrees / 12 hours = 30 degrees per hour.
  wrap.style.transform = `rotate(${hour * 30}deg)`;

  // The number sits at the top of that box.
  const label = document.createElement('span');
  label.textContent = hour;
  // Spin the number back the same amount, so it stays upright and easy to read.
  label.style.transform = `rotate(${-hour * 30}deg)`;

  wrap.appendChild(label);
  clockFace.appendChild(wrap);
}

// --- Theme toggle ---
const themeToggle = document.querySelector('#themeToggle');

// Show the right icon for the theme we are currently in.
// In dark theme we offer the sun (click to go light); in light theme we offer the moon.
function updateToggleIcon() {
  const current = document.documentElement.getAttribute('data-theme');
  themeToggle.textContent = current === 'dark' ? '☀️' : '🌙';
}
updateToggleIcon();

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', next); // change the colors now
  localStorage.setItem('theme', next);                       // remember for next reload
  updateToggleIcon();
});

// --- Random quote at the top ---

// Shown only if the very first request to the internet fails.
const FALLBACK_QUOTE = {
  quote: 'Keep going. Everything you need will come to you.',
  author: 'ALEX7KIN'
};

// Have we managed to show at least one real quote yet?
let hasQuote = false;

// Swap the quote with a "drop down from the top" animation.
// element.animate([from, to], options) plays an animation and returns an object;
// its .finished is a promise, so we can 'await' each step in order.
async function showQuote(text, author) {
  // 1) fade the old quote out and lift it up a little
  await quoteBox.animate(
    [ { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-14px)' } ],
    { duration: 250, easing: 'ease-in', fill: 'forwards' }
  ).finished;

  // 2) swap in the new words while the bar is invisible
  quoteTextEl.textContent = `“${text}”`;
  quoteAuthorEl.textContent = author ? `— ${author}` : '';

  // 3) drop the new quote down from above and fade it in
  await quoteBox.animate(
    [ { opacity: 0, transform: 'translateY(-24px)' },
      { opacity: 1, transform: 'translateY(0)' } ],
    { duration: 350, easing: 'ease-out', fill: 'forwards' }
  ).finished;
}

// Get one random quote from the internet and show it.
// try/catch means: try the risky thing; if it fails, run the catch instead of crashing.
async function loadQuote() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('Server answered with ' + response.status);

    const data = await response.json(); // data looks like { quote: "...", author: "..." }
    await showQuote(data.quote, data.author);
    hasQuote = true;
  } catch (error) {
    console.log('Could not load a quote:', error);
    // If we already have a quote on screen, just keep it until the next try.
    // Only for a failed FIRST load do we show the built-in fallback.
    if (!hasQuote) {
      await showQuote(FALLBACK_QUOTE.quote, FALLBACK_QUOTE.author);
    }
  }
}

loadQuote(); // show one quote right away
// After this, the animate() loop near the top changes the quote by itself
// whenever the seconds hit 0 (see the "load a new quote" line there).

// --- Music button ---
const musicBtn = document.querySelector('#musicBtn');
const music = new Audio('sounds/youseebiggirl.m4a');
music.volume = 0.2; // 20% volume
music.loop = true; // play again when it ends

musicBtn.addEventListener('click', () => {
  music.play().catch(err => console.log('Could not play the music:', err));
  musicBtn.textContent = 'OK, spend some time listening to music and think about quotes';
}, { once: true });
