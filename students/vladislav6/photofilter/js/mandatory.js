import { reset } from "./reset.js";

const gallery = document.querySelector('.gallery');

const blurInput = document.getElementById('blur');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const hue = document.getElementById('hue');
const invert = document.getElementById('invert');
const saturate = document.getElementById('saturate');
const sepia = document.getElementById('sepia');

const setNewValue = (input, value) => {
  reset();
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
};

const selectView = (e) => {
  const isView = e.target.closest('.picture-select');
  if (!isView) return;

  const select = e.target.parentElement.dataset.select;
  const value = e.target.parentElement.dataset.value;

  switch (select) {
    case 'blur': setNewValue(blurInput, value);
      break;
    case 'brightness': setNewValue(brightness, value);
      break;
    case 'contrast': setNewValue(contrast, value);
      break;
    case 'grayscale': setNewValue(grayscale, value);
      break;
    case 'hue': setNewValue(hue, value);
      break;
    case 'invert': setNewValue(invert, value);
      break;
    case 'saturate': setNewValue(saturate, value);
      break;
    case 'sepia': setNewValue(sepia, value);
      break;
    default: reset();
  }
};

gallery.addEventListener('click', selectView);