const inputs = document.querySelectorAll(".controls input");
const presets = document.querySelectorAll(".preset-item");
const resetBtn = document.querySelector(".btn-reset");
const fileInput = document.querySelector(".btn-upload");
const mainImage = document.querySelector(".main-img");
const saveBtn = document.querySelector(".btn-save");

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

function resetAllFilters() {
  inputs.forEach((input) => {
    if (input.type === "color") {
      input.value = "#9fcfb2";
    } else {
      input.value = input.getAttribute("value");
    }

    const suffix = input.dataset.sizing || "";
    document.documentElement.style.setProperty(
      `--${input.name}`,
      input.value + suffix,
    );
  });
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

function saveImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = mainImage.naturalWidth;
  canvas.height = mainImage.naturalHeight;

  const styles = getComputedStyle(document.documentElement);
  const blur = styles.getPropertyValue("--blur").trim() || "0px";
  const brightness = styles.getPropertyValue("--brightness").trim() || "100%";
  const saturate = styles.getPropertyValue("--saturate").trim() || "100%";

  const blurScale = mainImage.naturalWidth / mainImage.clientWidth;
  const realBlur = parseFloat(blur) * blurScale;

  ctx.filter = `blur(${realBlur}px) brightness(${brightness}) saturate(${saturate})`;

  ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);

  const link = document.createElement("a");
  link.download = "filtered-image.jpg";
  link.href = canvas.toDataURL("image/jpeg", 0.9);

  link.click();
}

inputs.forEach((input) => input.addEventListener("input", handleUpdate));
presets.forEach((preset) => preset.addEventListener("click", applyPreset));

resetBtn.addEventListener("click", resetAllFilters);
fileInput.addEventListener("change", handleFileUpload);
saveBtn.addEventListener("click", saveImage);
