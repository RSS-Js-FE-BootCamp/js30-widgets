import { filterInputs } from "./main.js";

const resetBtn = document.querySelector('.reset');

export const reset = () => {
  filterInputs.forEach((filter) => {
    filter.value = filter.dataset.init;
    filter.dispatchEvent(new Event('input', { bubbles: true }));
  });
};

resetBtn.addEventListener('click', reset);