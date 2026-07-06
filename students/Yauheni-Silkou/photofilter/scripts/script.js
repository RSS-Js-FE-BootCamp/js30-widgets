import { presetProfiles } from "./presets.js";

const inputs = document.querySelectorAll(".controls-grid input");
const mainImage = document.getElementById("target-photo");

function updateVariable() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix,
  );

  const matchingDisplay = document.querySelector(
    `.value-display[data-link="${this.name}"]`,
  );
  if (matchingDisplay) {
    matchingDisplay.textContent = this.value + suffix;
  }

  updateLiveFilterString();
}

inputs.forEach((element) => {
  element.addEventListener("change", updateVariable);
  element.addEventListener("input", updateVariable);
});

const presetButtons = document.querySelectorAll(".preset-button");

presetButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const profile = presetProfiles[this.dataset.preset];
    if (!profile) return;

    inputs.forEach((input) => {
      const propertyKey =
        input.name === "hue-rotate" ? "hueMinusRotate" : input.name;
      if (profile[propertyKey] !== undefined) {
        input.value = profile[propertyKey];
        updateVariable.call(input);
      }
    });
  });
});

// Optional improvements

document.getElementById("reset-button").addEventListener("click", () => {
  inputs.forEach((input) => {
    if (input.type === "color") {
      input.value = "#ffc600";
    } else if (
      ["brightness", "contrast", "saturate", "opacity"].includes(input.name)
    ) {
      input.value = "100";
    } else if (input.name === "spacing") {
      input.value = "10";
    } else {
      input.value = "0";
    }
    updateVariable.call(input);
  });
});

document.getElementById("upload-file").addEventListener("change", function () {
  if (this.files && this.files[0]) {
    mainImage.src = URL.createObjectURL(this.files[0]);
  }
});

document.getElementById("save-button").addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = mainImage.naturalWidth || mainImage.width;
  canvas.height = mainImage.naturalHeight || mainImage.height;

  const {
    blurVal,
    brightVal,
    contrastVal,
    grayscaleVal,
    invertVal,
    sepiaVal,
    saturateVal,
    hueVal,
    opacityVal,
    baseColor,
    spacingVal,
  } = getCurrentFilterValues();

  context.fillStyle = baseColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.filter = `blur(${blurVal}) brightness(${brightVal}) contrast(${contrastVal}) grayscale(${grayscaleVal}) invert(${invertVal}) sepia(${sepiaVal}) saturate(${saturateVal}) hue-rotate(${hueVal}) opacity(${opacityVal})`;

  const offset = spacingVal || 0;
  context.drawImage(
    mainImage,
    offset,
    offset,
    canvas.width - offset * 2,
    canvas.height - offset * 2,
  );

  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.download = "master-filtered-image.png";
    link.href = URL.createObjectURL(blob);
    link.click();
  }, "image/png");
});

document.getElementById("copy-button").addEventListener("click", () => {
  const filterText = document.getElementById(
    "filter-string-display",
  ).textContent;
  const copyButton = document.getElementById("copy-button");

  navigator.clipboard
    .writeText(filterText)
    .then(() => {
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copied!";
      updateLiveFilterString();
      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 1200);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
});

// Helper Functions

function updateLiveFilterString() {
  const {
    blurVal,
    brightVal,
    contrastVal,
    grayscaleVal,
    invertVal,
    sepiaVal,
    saturateVal,
    hueVal,
    opacityVal,
  } = getCurrentFilterValues();

  const filterText = `filter: blur(${blurVal}) brightness(${brightVal}) contrast(${contrastVal}) grayscale(${grayscaleVal}) invert(${invertVal}) sepia(${sepiaVal}) saturate(${saturateVal}) hue-rotate(${hueVal}) opacity(${opacityVal});`;

  document.getElementById("filter-string-display").textContent = filterText;
}

function getCurrentFilterValues() {
  const computedStyle = getComputedStyle(document.documentElement);

  return {
    blurVal: computedStyle.getPropertyValue("--blur").trim(),
    brightVal: computedStyle.getPropertyValue("--brightness").trim(),
    contrastVal: computedStyle.getPropertyValue("--contrast").trim(),
    grayscaleVal: computedStyle.getPropertyValue("--grayscale").trim(),
    invertVal: computedStyle.getPropertyValue("--invert").trim(),
    sepiaVal: computedStyle.getPropertyValue("--sepia").trim(),
    saturateVal: computedStyle.getPropertyValue("--saturate").trim(),
    hueVal: computedStyle.getPropertyValue("--hue-rotate").trim(),
    opacityVal: computedStyle.getPropertyValue("--opacity").trim(),
    baseColor: computedStyle.getPropertyValue("--base").trim(),
    spacingVal: parseFloat(computedStyle.getPropertyValue("--spacing")),
  };
}

// Initialization Checks

updateLiveFilterString();
