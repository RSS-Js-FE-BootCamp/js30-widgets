# Photofilter — JS30 Task 5

A lightweight photo-filter editor built with **pure vanilla JavaScript** — no frameworks, no libraries.  
Users drag sliders to apply CSS filter properties to an image and see the result instantly.

---

## Demo

Live at `/photofilter/` on the project server.

---

## Features

### Mandatory
- **CSS custom properties** — every slider writes to a `--variable` on `:root` via `document.documentElement.style.setProperty()`; the image `filter:` rule reads them automatically
- **Core JS30 pattern** — `querySelectorAll('.controls input')` → `forEach` → `addEventListener('change' / 'mousemove', handleUpdate)` + `dataset.sizing` for CSS units
- **9 CSS filters** — Blur, Brightness, Contrast, Saturate, Hue Rotate, Sepia, Grayscale + **Invert** and **Opacity** (2 extra beyond the original JS30 project)
- **Presets** — row of thumbnail cards, each pre-configured with a filter combination; clicking a preset applies it to the main image and syncs all slider positions

### Optional (+10 pts each)
- **Gallery** — Prev / Next buttons + keyboard ← → to browse 6 built-in images
- **Image upload** — `<input type="file">` button and drag-and-drop onto the photo
- **Save PNG** — renders filtered image to `<canvas>` (using `CanvasRenderingContext2D.filter`), exports via `canvas.toBlob()` and `URL.createObjectURL()`
- **Reset** — restores all sliders to their default values
- **Live CSS output** — footer bar shows the current `filter:` rule; "Copy CSS" copies it to the clipboard via `navigator.clipboard.writeText()`

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styles | CSS custom properties, CSS `filter`, CSS Grid/Flexbox |
| Logic | Vanilla ES2020 (`const`, arrow functions, template literals, `forEach`, `dataset`) |
| Export | Canvas API — `canvas.toBlob()`, `URL.createObjectURL()` |
| No frameworks | Zero React / Vue / jQuery — any framework usage voids all points |

---

## Development stages

| Commit | Scope |
|--------|-------|
| `feat(photofilter): add HTML structure matching JS30 reference` | `h2`, 3 controls, single `<img>` |
| `style(photofilter): add CSS matching reference color scheme and layout` | `#193549` bg, CSS variables in `:root`, image styling |
| `feat(photofilter): implement CSS custom properties update via slider inputs` | `querySelectorAll`, `handleUpdate`, `setProperty`, `dataset.sizing` |
| `feat(photofilter): add extra CSS filters and preset thumbnails` | 9 filters, preset cards, new editor layout |
| `feat(photofilter): add image gallery with prev/next navigation and keyboard support` | `GALLERY` array, Prev/Next buttons, `ArrowLeft`/`ArrowRight` |
| `feat(photofilter): add image upload via file input and drag-and-drop` | `<input type="file">`, `dragenter`/`dragleave`/`dragover`/`drop` |
| `feat(photofilter): add reset button, canvas export, and live CSS preview` | Reset, `canvas.toBlob()`, live `filter:` string, clipboard |

---

## Self-evaluation