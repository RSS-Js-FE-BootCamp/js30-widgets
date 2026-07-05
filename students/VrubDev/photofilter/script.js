const inputs = document.querySelectorAll(".controls input");
const presets = document.querySelectorAll(".preset-item");
const fileInput = document.querySelector(".btn-upload");
const mainImage = document.querySelector(".main-img");

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

function handleFileUpload() {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      mainImage.src = e.target.result;

      const presetImages = document.querySelectorAll(".preset-item img");
      presetImages.forEach((img) => (img.src = e.target.result));
    };
    reader.readAsDataURL(file);
  }
}

inputs.forEach((input) => input.addEventListener("input", handleUpdate));
presets.forEach((preset) => preset.addEventListener("click", applyPreset));

fileInput.addEventListener("change", handleFileUpload);
