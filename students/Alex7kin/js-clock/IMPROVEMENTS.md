# JS Clock — Improvements over the basic clock

## Starting point: the basic JS clock
The basic clock had only:
- an analog face with 3 hands (hour, minute, second);
- the second hand **ticked** once per second (and jumped backwards at 12);
- a fixed photo background;
- no numbers, no date, no digital display, no theme, no sound, no quotes.

---

## Stage 3 — Required optional improvements (30 / 30)

- [x] **Dark / light theme toggle that persists across reloads** (+10)
      One button flips a `data-theme` attribute; all colors come from CSS variables.
      The choice is saved in `localStorage` and re-applied before the page draws
      (no "flash" of the wrong theme).
- [x] **A random quote every minute from an API** (+10)
      Fetched from `dummyjson.com/quotes/random` with `fetch` + `async/await`.
      Safe error handling (`try/catch`) — if the internet fails, the current quote
      stays and the page never breaks.
- [x] **Circular progress diagrams for seconds / minutes / hours** (+10)
      Three SVG rings that fill as time passes, each with its live number in the
      center. Order: HR · MIN · SEC.

---

## Extra improvements (bonus, beyond the rubric)

### Display
- [x] **Digital info panel:** full weekday name, date (day number + month name), year.
- [x] **Live numbers inside each ring** (the current HR / MIN / SEC value).
- [x] **Hour numbers 1–12** placed around the analog face (drawn by a JS loop).

### Motion
- [x] **All three hands glide smoothly** (like a quartz "sweep" clock) instead of
      ticking — driven by `requestAnimationFrame` using milliseconds.
- [x] **Fixed the second-hand "twitch"** at 12 (no more backward jump).
- [x] **Seconds ring glides** in sync with the second hand.

### Quote details
- [x] **Synced to the real minute** — the quote changes exactly at `:00`, in time
      with the clock (not 60 seconds after page load).
- [x] **Slide animation** — the old quote fades up and out, the new one drops down
      from the top and fades in (`element.animate()`).
- [x] **Fallback quote** if the very first load fails, so the bar is never empty.

### Sound
- [x] **Background music** with a "Click Me" button under the clock. The click is the
      user action the browser needs before it is allowed to play sound.

### Layout & code quality
- [x] **Responsive:** on a narrow screen the panel wraps below the clock.
- [x] **One animation loop** drives the whole clock (we merged two timers into one).
- [x] **Safe text rendering** — API text is shown with `textContent`, never
      `innerHTML`, so no injected code can run (protection against XSS).

---

**Result:** from a single ticking analog face to a themeable clock with smooth hands,
progress rings, a full digital date panel, live API quotes, and background music.
