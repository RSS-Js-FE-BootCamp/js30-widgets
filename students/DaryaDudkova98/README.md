# JS30 Widgets - @DaryaDudkova98

**Pull Requests:**

- [Photo Filter & Whack-A-Mole Widgets](https://github.com/RSS-Js-FE-BootCamp/js30-widgets/pull/57)

### Photo Filter (CSS Variables and JS)

- [x] Reproduced the original widget
- [x] Implemented the mandatory features:
  - [x] CSS Variables for styling (`:root`)
  - [x] Range inputs for controlling: Spacing, Blur, Scale, Rotate, Saturate
  - [x] Color picker for Base color
  - [x] JavaScript for updating CSS variables dynamically
  - [x] Live preview of changes
- [x] Optional improvements:
  - [x] Value display next to each slider
  - [x] Presets (Vintage, Neon, Warm, Cold, B&W, Reset)
  - [x] Upload custom photo
  - [x] Download edited photo with applied filters
  - [x] Drag & Drop support for photo upload
  - [x] Additional filters: Brightness, Contrast, Hue Rotate, Grayscale, Sepia
  - [x] Smooth animations for value updates
  - [x] Responsive design

## Links

- [Live Demo - Photo Filter](https://deploy-preview-57--js-30-widget-gallery.netlify.app/students/DaryaDudkova98/Photofilter/)
- [Pull Request]()

### Controls
- **Spacing**: Controls padding around the image
- **Blur**: Applies blur effect to the image
- **Scale**: Zooms in/out the image (0.5x - 2x)
- **Rotate**: Rotates the image (0° - 360°)
- **Saturate**: Adjusts color saturation (0% - 200%)
- **Brightness**: Adjusts image brightness (0% - 200%)
- **Contrast**: Adjusts image contrast (0% - 200%)
- **Hue Rotate**: Shifts colors in the image (0° - 360°)
- **Grayscale**: Converts image to black & white (0% - 100%)
- **Sepia**: Applies sepia tone (0% - 100%)
- **Base Color**: Changes the background color behind the image

### Presets
- **Vintage**: Sepia tone with reduced brightness
- **Neon**: High saturation with purple hue
- **Warm**: Yellow-orange warm tones
- **Cold**: Blue cool tones
- **B&W**: Black and white with high contrast
- **Reset**: Resets all settings to default

### Features
- **Upload Photo**: Upload custom images
- **Drag & Drop**: Drag images directly onto the page
- **Download**: Save edited photo

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Canvas API (for downloading edited photos)
- FileReader API (for photo upload)

## How to Use

1. Open the widget
2. Upload a photo using the "Upload Photo" button or drag & drop
3. Adjust sliders to apply effects
4. Click presets for quick styles
5. Click "DOWNLOAD" to save the edited photo

## Screenshot

![Photo Filter Widget](./screenshot.png) *(optional)*

## Notes

- The widget is fully responsive
- All filters are applied in real-time using CSS variables
- The download feature uses Canvas to preserve all applied effects
- No external libraries used - pure HTML/CSS/JS

## Student Info

- **Name:** Darya Dudkova
- **GitHub:** @DaryaDudkova98
- **Course:** RSS-Js-FE-BootCamp
- Repository: https://github.com/RSS-Js-FE-BootCamp/js30-widgets
- Branch: `DaryaDudkova98-widgets`

## Whack-A-Mole Widget

### Live Demo
[Whack-A-Mole](https://deploy-preview-57--js-30-widget-gallery.netlify.app/students/DaryaDudkova98/Whack-A-Mole/)

### What was implemented

#### Mandatory Features
- [x] Reproduced the original widget from JS30
- [x] Random mole appearance with variable timing (200-1000ms)
- [x] Score tracking with real-time updates
- [x] Game timer (10 seconds per round)
- [x] Start button to begin the game
- [x] 6 holes with animated moles

#### Optional Improvements
- [x] **Hit Animation** - mole reacts with a satisfying hit effect
- [x] **Sound Effects** - hit sound (`bank.mp3`) and victory sound (`victory.mp3`)
- [x] **Game Statistics** - tracks total games played and best score
- [x] **Local Storage** - saves best score between sessions
- [x] **Reset Stats** - button to reset all statistics
- [x] **Victory Message** - celebration popup with confetti-like effect
- [x] **Game Over Message** - informative end screen with score display
- [x] **Play Again** - quick restart from popup messages
- [x] **Immediate Win** - game ends instantly if you beat the record
- [x] **Visual Effects**:
  - Mole hit animation (scale, rotation, brightness)
  - Victory popup animation
  - Button hover/active states
  - Card layout for holes
- [x] **Responsive Design** - works on different screen sizes

### Game Features

| Feature | Description |
|---------|-------------|
| **Game Duration** | 10 seconds per round |
| **Mole Speed** | Random 200-1000ms visibility |
| **Scoring** | +1 point per successful hit |
| **Best Score** | Saved in browser's Local Storage |
| **Hit Sound** | Plays on each successful hit |
| **Victory Sound** | Plays when new record is set |

### How to Play

1. Click **"Start!"** button to begin
2. Moles will randomly appear from holes
3. Click on moles to score points
4. Each mole is worth 1 point
5. Game lasts 10 seconds
6. Try to beat your best score!
7. If you beat the record, you win instantly!

### Visual Effects

- **Mole Hit**: The mole squishes, flashes, and disappears
- **Victory Popup**: Animated celebration with golden gradient
- **Game Over Popup**: Clean dark design with score summary

### Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Audio API
- Local Storage API