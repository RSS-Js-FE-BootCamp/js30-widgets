// ================= FILTERS ==================
const containerFilters = document.querySelector('.filters-container');
const inputs = containerFilters.querySelectorAll('input');

function updateFilter(e) {
  const el = e.target;
  const suffix = el.dataset.sizing || '';

  document.documentElement.style.setProperty(`--${el.name}`, el.value + suffix);
}

inputs.forEach((input) => input.addEventListener('input', updateFilter));
