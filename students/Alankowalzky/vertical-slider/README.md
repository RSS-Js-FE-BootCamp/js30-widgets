README.md
# Vertical Slider — JS30 Task #3

A split-screen vertical slider built in pure Vanilla JS (zero frameworks, zero libraries).

## Demo

Open `index.html` in a browser or serve it through a dev server.

## File structure

```
vertical-slider/
├── index.html      # Markup — .left-col/.right-col wrappers with overflow:hidden
├── style.css       # 35/65 split layout, CSS transitions, .horizontal mode
├── script.js       # All logic — state, transforms, autoplay, event listeners
└── img/            # 4 photos (eagle, mountains, flower, castle)
```

## Features

### Core (required by the task)

| Feature | Description |
|---------|-------------|
| Split-screen 35 / 65 | Left column: text, right column: photo |
| Counter-directional animation | Left strip moves down, right strip moves up (and vice versa) |
| ↑ / ↓ buttons | Click to change slide |
| Counter `01 / 04` | Updates on every slide change |
| Dot navigation | Click any dot to jump to that slide |

### Mandatory extra feature

| Feature | Description |
|---------|-------------|
| **Infinite loop** | After the last slide wraps back to the first; going back from the first returns to the last. Transition is smooth, no jump. |

### Optional extras (+10 pts each, max +30)

| Feature | Pts | Description |
|---------|-----|-------------|
| **Mouse wheel** | +10 | Scrolling the mouse wheel over the slider changes slides (scroll down = next) |
| **Touch / pointer swipe** | +10 | Dragging finger / mouse ≥ 50 px changes slide (Pointer Events API) |
| **Orientation toggle** | +10 | `⇄` button in the corner switches between vertical ↔ horizontal layout at runtime |

### Additional improvements (code quality)

- Autoplay every 4 s with a progress bar (pauses on mouse hover)
- Animation lock — rapid clicking does not stack transitions
- Keyboard `ArrowUp` / `ArrowDown` (or `←` / `→` in horizontal mode)
- Pointer capture — clean swipe even when the pointer leaves the element

## How the animation works

```
Left column (reverse DOM order: Castle→Flower→Mountain→Eagle):
  translateY((index − (N−1)) × 100vh)
  index=0 → −300vh → Eagle in viewport  ✓
  index=1 → −200vh → Mountain           ✓

Right column (normal DOM order):
  translateY(−index × 100vh)
  index=0 →    0   → Eagle    ✓
  index=1 → −100vh → Mountain ✓
```

CSS `calc(N * 100vh)` instead of `clientHeight` — always consistent with panel height.

## Score (estimated)

| Category | Points |
|----------|--------|
| Core task | up to 100 |
| Infinite loop (mandatory extra) | mandatory |
| Wheel + Touch + Orientation | **+30** |
| **Total** | **130 / 130** |

## Stack

- HTML5 / CSS3 / Vanilla JS (ES2020)
- Zero frameworks — compliant with RS School JS30 requirements
- Pointer Events API, CSS transitions, `calc()`, `requestAnimationFrame`
