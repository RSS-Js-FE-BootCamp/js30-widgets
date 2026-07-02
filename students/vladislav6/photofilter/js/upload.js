import { picture, gallery } from "./main.js";

const file = document.getElementById('file');
const uploadError = document.querySelector('.upload-error');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setNewSrc = (url) =>
  [...gallery.children].forEach((figure) =>
    figure.firstElementChild.src = url);

const onUplodaFile = (e) => {
  const file = e.target.files[0];
  
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = (event) => {
    if (file.type.startsWith('image/')) {
      const arrayBuffer = event.target.result;
      const blob = new Blob([arrayBuffer], { type: file.type });
      const img = new Image();
      
      img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      
      const ulr = URL.createObjectURL(blob);
      img.src = ulr;
      setNewSrc(ulr);
    }
  };
  
  reader.onerror = () =>
    uploadError.textContent = 'File read error';

  reader.readAsArrayBuffer(file);
};

file.addEventListener('change', onUplodaFile);

document.addEventListener("DOMContentLoaded", () => {
  const img = new Image();
  img.src = './assets/picture.jpg';
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
});