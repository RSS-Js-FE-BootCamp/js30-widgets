# 🚀 JS30 Widgets — @KrychVas

**Pull Request:** [Link to Pull Request](буде_тут_за_хвилину)  
**Live Preview:** [Link to Netlify Preview](буде_тут_після_деплою)

---

### 🟢 Widget 1: Drum Kit
**Score: 65 / 65**

**Stage 1 - Reproduction (20/20)**
- [x] The widget visually matches the original demo (layout, key colors, key interactions with the custom background image) (+10)
- [x] The core behaviour of the original widget works end-to-end (sounds play correctly, transitions trigger properly, and there are no console errors) (+10)

**Stage 2 - Mandatory additional feature - press keys with click (15/15)**
- [x] The mandatory additional feature described in the widget's task file (mouse click support) is implemented and works correctly (+10)
- [x] The feature is seamlessly integrated with the rest of the UI (clicking a pad plays the audio and triggers the exact same dynamic CSS transition as the keyboard press) (+5)

**Stage 3 - Optional improvements (30/30)**
- [x] **Multiple instruments (Acoustic Piano Mode & Electronic Beats):** Added a functional sound-pack selector that dynamically changes sound assets, updates button descriptions in real-time, and modifies UI styling to match the selected instrument (+10)
- [x] **Web Audio API Oscillator Synthesizer:** Implemented a pure JavaScript audio generation engine for the piano mode. It completely resolves potential CORS/network caching issues when loading external MP3 files by synthesizing pure triangle waves and smooth exponential gain volume decay (+10)
- [x] **Full Chromatic Scale (Sharp/Flat Keys Integration):** Created realistic piano black keys using CSS pseudo-elements (`::after`), mapped them to the upper row of the keyboard layout (W, E, T, Y, U, O), and fully synchronized both mouse clicks and keyboard events for a complete piano playing experience (+10)
- [x] **Dynamic SVG Emoji Favicon Switcher:** Added browser UI enhancement that automatically detects the active mode and switches the tab favicon between a drum (`🥁`) and a piano (`🎹`) using a lightweight data-URI SVG string (+10) 

---

### 🟡 Widget 2: JS Clock
**Score: 0 / 65**
- [ ] *In progress / Not started yet. Will be submitted in the next stage.*