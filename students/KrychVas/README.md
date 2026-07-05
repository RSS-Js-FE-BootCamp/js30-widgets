# 🚀 JS30 Widgets — @KrychVas

**Pull Request:** [Link to Pull Request](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/91)  
**Live Preview (Drum Kit):** [Link to Netlify Preview](https://deploy-preview-91--js-30-widget-gallery.netlify.app/students/KrychVas/drum-kit/index.html)  
**Live Preview (JS Clock):** [Link to Netlify Preview](https://deploy-preview-91--js-30-widget-gallery.netlify.app/students/KrychVas/js-clock/index.html)

---

### 🟢 Widget 1: Drum Kit
**Score: 65 / 65**

<img width="1880" height="874" alt="Screenshot 2026-07-05 174712" src="https://github.com/user-attachments/assets/a83d7258-5ce5-4ed1-97d7-91bc1cded8ac" />

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

### 🟢 Widget 2: JS Clock
**Score: 65 / 65**

<img width="1902" height="881" alt="Screenshot 2026-07-05 174337" src="https://github.com/user-attachments/assets/7d0ed943-4bf0-4fdf-835f-3c4935d78422" />


**Stage 1 - Reproduction (20/20)**
- [x] The widget visually matches the original demo (layout, clock face, smooth arrow movements) (+10)
- [x] The core behaviour works flawlessly end-to-end (accurate time rendering, seamless 0-second boundary transition reset, no console errors) (+10)

**Stage 2 - Mandatory additional feature - digital display (15/15)**
- [x] Implemented a real-time digital display showing the exact current time in standard `HH:MM:SS` format (+10)
- [x] Perfectly integrated with the analog interface, dynamically adapting to the dynamic control flow (+5)

**Stage 3 - Optional improvements (30/30)**
- [x] **Web Audio API Real-time Ticking Sound:** Developed a completely synthetic oscillator-based audio generator mimicking a realistic clock mechanical tick on every second change, bypasses network assets, and features a user-friendly UI sound toggle switch (+10)
- [x] **Dynamic Background Image Carousel:** Added an interactive background cycler linked to high-quality unsplash visual assets that provides seamless background switching on client request (+10)
- [x] **Smart Dial Modes & Color Input Autohide:** Designed an intuitive 3-state control cycle (Arabic, Roman, No Numbers). It features smart interface responsiveness by automatically hiding the digital display when numbers clutter the dial, and dynamically showing/hiding color pickers to match the current view (+10)
- [x] **Cohesive Control Panel Theme Styling:** Completely overhauled native browser HTML color inputs using custom border-radius properties and CSS state selectors to match the exact design tokens, width, height, and hover animations of the general interface buttons (+10)
