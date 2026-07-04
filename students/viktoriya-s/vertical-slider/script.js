(function () {
  const leftSlides = Array.from(
    document.querySelectorAll(".left-slide .description"),
  );
  const rightSlides = Array.from(
    document.querySelectorAll(".right-slide .slide"),
  );
  const total = leftSlides.length;
  let current = 0;
  let isAnimating = false;

  function circularOffset(i, cur, n) {
    let diff = i - cur;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }

  // текущие смещения — нужны, чтобы понять, насколько реально сдвигается каждый слайд
  let leftOffsets = leftSlides.map((_, i) => circularOffset(i, current, total));
  let rightOffsets = rightSlides.map((_, i) =>
    circularOffset(i, current, total),
  );

  function apply(el, offsetValue, mirrored, instant) {
    if (instant) {
      el.style.transition = "none";
    }
    el.style.transform = `translateY(${(mirrored ? -offsetValue : offsetValue) * 100}%)`;

    if (instant) {
      void el.offsetHeight; // форсируем рефлоу
      requestAnimationFrame(() => {
        el.style.transition = ""; // возвращаем transition из CSS
      });
    } else {
      el.style.transition = "";
    }
  }

  function render(isInitial) {
    const newLeftOffsets = leftSlides.map((_, i) =>
      circularOffset(i, current, total),
    );
    const newRightOffsets = rightSlides.map((_, i) =>
      circularOffset(i, current, total),
    );

    leftSlides.forEach((el, i) => {
      const from = leftOffsets[i];
      const to = newLeftOffsets[i];
      // если сдвиг больше одного шага — это "прыжок" через видимую зону
      const instant = isInitial || Math.abs(to - from) > 1;
      apply(el, to, false, instant);
      el.classList.toggle("active", i === current);
    });

    rightSlides.forEach((el, i) => {
      const from = rightOffsets[i];
      const to = newRightOffsets[i];
      const instant = isInitial || Math.abs(to - from) > 1;
      apply(el, to, true, instant);
    });

    leftOffsets = newLeftOffsets;
    rightOffsets = newRightOffsets;
  }

  function goTo(direction) {
    if (isAnimating) return;
    isAnimating = true;
    current = (current + direction + total) % total;
    render(false);
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  document
    .querySelector(".down-button")
    .addEventListener("click", () => goTo(1));
  document
    .querySelector(".up-button")
    .addEventListener("click", () => goTo(-1));

  render(true); // первичная расстановка без анимации
})();
