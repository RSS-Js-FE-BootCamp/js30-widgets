const inputs = document.querySelectorAll(".controls input");
const presets = document.querySelectorAll(".preset-item");

console.log(presets);

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix,
  );
}

function applyPreset() {
  const data = this.dataset;

  for (const filter in data) {
    const input = document.querySelector(`input[name="${filter}"]`);

    if (input) {
      input.value = data[filter];

      const suffix = input.dataset.sizing || "";

      document.documentElement.style.setProperty(
        `--${filter}`,
        data[filter] + suffix,
      );
    }
  }
}

inputs.forEach((input) => input.addEventListener("input", handleUpdate));
presets.forEach((preset) => preset.addEventListener("click", applyPreset));
