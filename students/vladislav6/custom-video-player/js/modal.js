import { search, searchVideo } from "./catalog.js";

const closeModal = (e) => {
  if (e.target.closest('.modal')) return;
  document.body.removeChild(document.querySelector('.overlay'));
};

const searchVideoByTag = (e) => {
  e.preventDefault();
  if (!e.target.closest('.tag')) return;

  search.value = e.target.textContent;
  searchVideo();
  document.body.removeChild(document.querySelector('.overlay'));
};

export function openModal(card) {
  const {
    id,
    duration,
    isAiGenerated,
    name,
    tags,
    type,
    user,
    userURL,
    videos,
  } = card;

  const tagLinks = tags
    .split(',')
    .map((tag) => {
      const tagTrim = tag.trim();
      const a = document.createElement('a');
      a.classList.add('tag');
      a.href = `#${tagTrim}`;
      a.textContent = tagTrim;
      return a;
    });

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const container = document.createElement('div');
  container.classList = 'container';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.classList.add('close-modal');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = `Video ${id}`;
  const nameElement = document.createElement('span');
  nameElement.textContent = name;
  const picture = document.createElement('img');
  picture.src = videos.small.thumbnail;
  picture.alt = name;
  const tagsElement = document.createElement('p');
  tagsElement.classList.add('tags-block');
  tagsElement.textContent = 'Tags: ';
  const typeElement = document.createElement('p');
  typeElement.textContent = `Type: ${type}`
  const author = document.createElement('p');
  author.textContent = 'Author: ';
  const link = document.createElement('a');
  link.href = userURL;
  link.textContent = user;
  link.target = '_blank';

  tagsElement.append(...tagLinks);
  author.append(link);
  modal.append(title, nameElement, picture, tagsElement, typeElement, author);
  container.append(closeBtn, modal);
  overlay.append(container);

  tagsElement.addEventListener('click', searchVideoByTag);
  overlay.addEventListener('click', closeModal);

  document.body.append(overlay);
}