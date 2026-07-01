const filtersElement = document.querySelector('.filters');
const picture = document.querySelector('.picture-edit');
const highlight = document.querySelector('.highlight');

const spacing = document.getElementById('spacing');
const blurInput = document.getElementById('blur');
const baseColor = document.getElementById('color');

const filterState = function(...filters) {
  return filters.reduce((state, filter) => {
    const name = filter.name;
    const value = filter.value;
    state[name] = value;
    return state;
  }, {});
};

const setFiltersToPicture = (filters) => {
  highlight.style.color = filters.color;
  picture.style.padding = `${filters.spacing}px`;
  picture.style.background = filters.color;
  picture.style.filter = `blur(${filters.blur}px)`;
};

const onPictureEdit = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  filters[name] = value;
  setFiltersToPicture(filters);
};

const filters = filterState(spacing, blurInput, baseColor);
setFiltersToPicture(filters);

filtersElement.addEventListener('input', onPictureEdit);