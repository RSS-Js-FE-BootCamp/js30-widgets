const inputs = document.querySelectorAll(".controls input");
function updateVariable() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix,
  );
}

inputs.forEach((element) => {
  element.addEventListener("change", updateVariable);
  element.addEventListener("input", updateVariable);
});
