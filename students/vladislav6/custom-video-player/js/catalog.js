import { video, togglePlayPause, volume, speed } from "./main.js";
import { openModal } from "./modal.js";

export const search = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
const searchResult = document.createElement('div');
searchResult.classList.add('search-result');
let videoCards = {};

const noResult = () => searchResult.textContent = 'No result';

const clearDom = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const renderCards = (data = []) => {
  videoCards = {};
  clearDom(searchResult);
  if (data.length === 0) {
    noResult();
    return;
  }

  const fragment = document.createDocumentFragment();
  data.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardBlock = document.createElement('div');
    cardBlock.classList.add('card-img');
    
    const cardPic = document.createElement('img');
    cardPic.src = card.videos.small.thumbnail;
    cardPic.alt = card.tags;
    cardPic.width = 200;
    
    const playVideoBtn = document.createElement('button');
    playVideoBtn.textContent = 'Play ►';
    playVideoBtn.dataset.id = card.id;
    playVideoBtn.classList.add('play-video');
    
    const aboutVideoBtn = document.createElement('button');
    aboutVideoBtn.textContent = 'About';
    aboutVideoBtn.dataset.id = card.id;
    aboutVideoBtn.classList.add('about-video');

    cardBlock.append(cardPic);
    cardElement.append(cardBlock, playVideoBtn, aboutVideoBtn);
    fragment.append(cardElement);
    videoCards[card.id] = {...card};
  });
  searchResult.append(fragment);
  search.parentElement.after(searchResult);
};

export const searchVideo = () => {
  if (search.value.length > 0) {
    const searchValue = search.value.split(' ').join('+');
    const url = `https://pixabay.com/api/videos/?key=56488539-03a1f68ad6cb0dce45b228a52&q=${searchValue}`;
    fetch(url)
      .then(response => response.json())
      .then(data => renderCards(data.hits))
      .catch(error => {
        noResult();
        console.log(error);
      });
  } else {
    search.parentElement.after(searchResult);
    searchResult.textContent = 'Empty search query';
  }
};

const watchVideo = (e) => {
  const isVideo = e.target.closest('.play-video');
  const isAbout = e.target.closest('.about-video');

  if (!isVideo && !isAbout) return;

  if (isVideo) {
    const ulr = videoCards[e.target.dataset.id].videos.small.url;
    video.src = ulr;
    togglePlayPause();
    volume.value = 1;
    speed.value = 1;
  }

  if (isAbout) {
    openModal(videoCards[e.target.dataset.id]);
  }
}

renderCards();
searchBtn.addEventListener('click', searchVideo);
searchResult.addEventListener('click', watchVideo);
