# JS30 Widgets - @taty4

**Pull Request:** 
- [Pull Request 1](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/77)
- [Pull Request 2](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/87)
- [Pull Request 3](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/114)
- [Pull Request 4](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/120)

**Deploy:**
- [Custom Video Player](https://js-30-widget-gallery.netlify.app/students/taty-4/custom-video-player/)
- [JS Clock](https://js-30-widget-gallery.netlify.app/students/taty-4/js-clock/)

## What was implemented

### Widget 4: Custom Video Player

**Score: 65 / 65**

**Stage 1 - Reproduction (20/20)**

- [x] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [x] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature (15/15)**

- [x] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [x] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (30/30)**

- [x] Support additional YouTube-style hotkeys: Arrow keys for seek/volume, J/K/L, 0-9 for percent-jump, C for captions (+2 each, up to +20 total) (+20)
- [x] A video carousel / slider - switch between several video sources with prev / next controls and a thumbnail strip (+10)
- [x] A mini movie catalog - a "kinopoisk" of your own where each tile opens a video in the player (+10)

**Full list hot keys**

- Toggle play/pause - **Space or K**
- Rewind 10 seconds J - **J**
- Rewind 5 seconds - **ArrowLeft**
- Fast forward 10 seconds - **L**
- Fast forward 5 seconds - **ArrowRight**
- Increase volume - **ArrowUp**
- Decrease volume - **ArrowDown**
- Previous frame (turn paused) - **,**
- Next frame (turn paused) - **.**
- Decrease playback rate - **< (SHIFT+,)**
- Increase playback rate - **> (SHIFT+.)**
- Seek to specific point in the video (7 advances to 70% of duration) - **0....9**
- Toggle full screen - **F**
- Toggle mute - **M**


###  Widget 1: JS Clock

**Score: 65 / 65**

**Stage 1 - Reproduction (20/20)**
- [x] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [x] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature - digital clock (15/15)**
- [x] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [x] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (30/30)**
- [ ] A multi-timezone view showing time at several cities of the world simultaneously (+10)
- [x] Dark / light theme toggle that persists across reloads (+10)
- [x] An online alarm clock with sound and dismiss/snooze controls (+10)
- [ ] A cuckoo clock - at the top of each hour the bird pops out and chimes (+10)
- [x] A "do nothing for 2 minutes" / "Quiet Place" relaxation mode with a timer that resets on user input (+10)
- [ ] Circular progress diagrams for seconds / minutes / hours rendered next to the face (+10)

### Engineering & delivery requirements (applies to all widgets)

- [x] JavaScript code is readable, not minified or obfuscated (-10 if violated per widget)
- [x] No forbidden JS library/framework is used (jQuery, React, Vue, Angular, etc.) (-65, the whole widget is voided)
- [x] Commit history reflects real development (not a single dump commit) (-10 if violated per widget)
- [x] PR is open against main of the shared repository, with working Netlify preview links for all widgets (-10 if violated; without preview a widget cannot be scored)



## 📊 Итоговый результат

| Виджет | Stage 1 | Stage 2 | Stage 3 | Всего | Максимум |
|--------|---------|---------|---------|-------|----------|
| 🥁 JS Clock | 20/20 ✅ | 15/15 ✅ | 30/30 ✅ | **65/65** | 65 |
| 🕐 Custom Video Player | 20/20 ✅ | 15/15 ✅ | 30/30 ✅ | **65/65** | 65 |
