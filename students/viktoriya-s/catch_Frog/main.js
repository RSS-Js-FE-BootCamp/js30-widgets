const wrapper = document.getElementById("leafs");
console.log(wrapper);

for (let i = 0; i < 6; i++) {
  const leaf = document.createElement("img");
    leaf.classList.add("leaf");
  leaf.src = "./image/11.png";
  leaf.style.left = `${Math.random() * 100}%`;
  leaf.style.animationDuration = `${Math.random() * 2 + 3}s`;
  wrapper.appendChild(leaf);
}