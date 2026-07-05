# JS30 Widgets — Photo Filter

## Pull Request:

## 🛠️ Implemented Features

### Core Functionality (Stage 1 & 2)
* **Dynamic CSS Variables:** Sliders interactively modify root CSS variables (`--blur`, `--brightness`, `--saturate`, etc.), updating image presentation in real-time.
* **Highlight Synchronization:** The "JS" text elements in the title dynamic update their color based on the selected theme or configuration.
* **Responsive Preset Layouts:** Features a clean grid displaying a built-in gallery of customizable image filter presets.

### Optional Improvements (Stage 3 — Max Score Capped at +30)
1. **Local Image Upload (+10 points):** Integrated a hidden `<input type="file">` file-picker inside an interactive styled `<label>`. Leverages the asynchronous `FileReader` API to dynamically load images into both the main display and all preset thumbnail elements.
2. **Reset All Configuration (+10 points):** Implemented an elegant master reset system using native HTML `value` attributes to instantly restore all slider coordinates and CSS root definitions.
3. **Baked Image Download (+10 points):** Implemented full pixel-level photo rendering via a virtual HTML5 `<canvas>` element. Correctly scales image filter parameters (such as the blur radius ratio) based on the image's `naturalWidth` to export pristine high-resolution `.jpg` images directly to disk.

---

## 📊 Self-Assessment / Score Breakdown

| Criteria | Max Points | My Score |
| :--- | :---: | :---: |
| **Stage 1: Reproduction & Visual Match** (No console errors, crisp layout) | 20 | **20** |
| **Stage 2: Mandatory Features & UI Integration** (Fully cohesive sliders/presets) | 15 | **15** |
| **Stage 3: Optional Improvements** (Local Upload, Master Reset, Canvas Export) | 30 | **30** |
| **Total Score** | **65 / 65** | **65 / 65** |

