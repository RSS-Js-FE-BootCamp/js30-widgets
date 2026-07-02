import './mandatory.js';
import './upload.js';
import './download.js';

const filtersElement = document.querySelector('.filters');
export const filterInputs = filtersElement.querySelectorAll('input');
const highlight = document.querySelector('.highlight');
const showAside = document.querySelector('.aside-btn');
const preview = document.querySelector('.preview');
export const gallery = document.querySelector('.gallery');

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export const img = new Image();

const showFilters = () => {
  filtersElement.classList.toggle('show');
  if (filtersElement.classList.contains('show')) {
    showAside.textContent = 'Hide filters';
    preview.style.marginLeft = '0px';
    gallery.style.width = 'calc(100% - 320px)';
    gallery.style.marginLeft = '0px';
  } else {
    showAside.textContent = 'Show filters';
    preview.style.marginLeft = 'auto';
    gallery.style.width = '100%';
  }
};

export const filterState = function(...filters) {
  return filters.reduce((state, filter) => {
    const name = filter.name;
    const value = filter.value;
    state[name] = value;
    return state;
  }, {});
};

export const setFiltersToPicture = (filters) => {
  const {
    spacing,
    blur,
    color,
    brightness,
    contrast,
    grayscale,
    hue,
    invert,
    saturate,
    sepia
  } = filters;

  const filterTools = `
    blur(${blur}px)
    brightness(${brightness})
    contrast(${contrast})
    grayscale(${grayscale}%)
    hue-rotate(${hue}deg)
    invert(${invert}%)
    saturate(${saturate})
    sepia(${sepia}%)
    `; 
  highlight.style.color = color;
  ctx.filter = filterTools;
  ctx.drawImage(img, 0, 0);
  ctx.lineWidth = spacing;
  ctx.strokeStyle = color;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
};

const onPictureEdit = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  filters[name] = value;
  setFiltersToPicture(filters);
};

const filters = filterState(...filterInputs);
img.onload = () => setFiltersToPicture(filters);

filtersElement.addEventListener('input', onPictureEdit);
showAside.addEventListener('click', showFilters);
window.addEventListener('resize', () => {
  if (
    window.innerWidth >= 900 &&
    preview.hasAttribute('style')
  ) {
    filtersElement.classList.remove('show');
    preview.removeAttribute('style');
    gallery.removeAttribute('style');
    showAside.textContent = 'Show filters';
  }
});