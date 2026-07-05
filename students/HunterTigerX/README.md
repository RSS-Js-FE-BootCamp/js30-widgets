1. Task: [JS30-Widgets](https://github.com/rolling-scopes-school/tasks/blob/master/stage0.5%20Bootcamp/tasks/js30/js30.md)
2. Screenshots:


| Widget | Screenshot |
|---|---|
| Drum Kit | 
<img width="1280" height="617" alt="image" src="https://github.com/user-attachments/assets/ebedc258-bde3-4ed6-ac9c-94d495a0f224" />
 |
| Custom Video Player | 
<img width="1280" height="616" alt="image" src="https://github.com/user-attachments/assets/90ded853-002d-4615-ab4c-b803a775a380" />
 |

3. Done 05.07.2026 / deadline 06.07.2026
4. Score: 130 / 130

---


### 🟢 Widget 2: Drum Kit
**Score: 65 / 65**

**Stage 1 - Reproduction (0/20)**
- [x] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [x] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature (0/15)**
- [x] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [x] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (30/30)**
- [x] Multiple instruments - switching the instrument swaps the set of sounds played by the same pads (+10)
- [ ] Floating hearts / notes that spawn on click (+0)
- [ ] Polished pad animation on press, e.g. a Material-style ripple (+0)
- [x] A "play a predefined melody" mode with animated key highlights timed to the playback (+10)
- [ ] A "light show" where each note paints an abstract visual pattern on a backdrop (+0)
- [ ] A full virtual piano with octaves and a wider keyboard mapping (+0)
- [x] Dark / light theme toggle that persists across reloads (+10)

---

### 🟢 Widget 4: Custom Video Player
**Score: 65 / 65**

**Stage 1 - Reproduction (0/20)**
- [x] The widget visually matches the original demo (layout, key colors, key interactions) (+10)
- [x] The core behaviour of the original widget works end-to-end (no broken features, no console errors) (+10)

**Stage 2 - Mandatory additional feature (0/15)**
- [x] The mandatory additional feature described in the widget's task file is implemented and works correctly (+10)
- [x] The feature is integrated with the rest of the UI (does not break Stage 1 functionality, handles edge cases reasonably) (+5)

**Stage 3 - Optional improvements (0/30)**
- [x] Support additional YouTube-style hotkeys: Arrow keys for seek/volume, J/K/L, 0-9 for percent-jump, C for captions (+2 each, up to +20 total, 42/20)
- [x] A video carousel / slider - switch between several video sources with prev / next controls and a thumbnail strip (+10)
- [x] A mini movie catalog - a "kinopoisk" of your own where each tile opens a video in the player (+10)

---

### 🛠 Engineering & delivery requirements (applies to all widgets)

- [ ] JavaScript code is readable, not minified or obfuscated (-10 if violated per widget)
- [ ] No forbidden JS library/framework is used (jQuery, React, Vue, Angular, etc.) (-65, the whole widget is voided)
- [ ] Commit history reflects real development (not a single dump commit) (-10 if violated per widget)
- [ ] PR is open against main of the shared repository, with working Netlify preview links for all widgets (-10 if violated; without preview a widget cannot be scored)

---

### 📝 Total Summary
<!-- Leave only the widgets you implemented (usually 2 widgets) -->

| Widget | Score |
|---|---|
| Drum Kit | 65 / 65 |
| Custom Video Player | 65 / 65 |
| **Max Score** | **130** |

### 📝 Commenary

Added buttons for player

"0" - Jump to 0% mark in the video  
"1" - Jump to 10% mark in the video  
"2" - Jump to 20% mark in the video  
"3" - Jump to 30% mark in the video  
"4" - Jump to 40% mark in the video  
"5" - Jump to 50% mark in the video  
"6" - Jump to 60% mark in the video  
"7" - Jump to 70% mark in the video  
"8" - Jump to 80% mark in the video  
"9" - Jump to 90% mark in the video  
"SHIFT" + "," - Decrease playback speed  
"SHIFT" + "." - Increase playback speed  
"," - Skip to the next frame (when playback is paused)  
"." - Skip to the next frame (when playback is paused)  
"k" - Pause or resume playback  
"j" - Skip back 10 seconds  
"l" - Skip forward 10 seconds  
"Arrow left" - Fast forward 5s  
"Arrow right" - Fast backward -5s  
"Arrow up" - Increase sound volume  
"Arrow down" - Decrease sound volume  

At first I added a mini movie catalog, but on the same page, then I turned it into slider. I'm not sure if it counts for both, it depends on the perspective.