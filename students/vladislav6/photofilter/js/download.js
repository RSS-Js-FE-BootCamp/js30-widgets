import { canvas } from "./main.js";

const download = document.querySelector('.download');

const onDownloadFile = () => {
  const url = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = url;
  link.download = 'edited.jpeg';
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};

download.addEventListener('click', onDownloadFile);