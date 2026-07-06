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
