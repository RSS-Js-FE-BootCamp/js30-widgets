// (function () {
//   const leftSlides = Array.from(
//     document.querySelectorAll(".left-slide .description"),
//   );
//   const rightSlides = Array.from(
//     document.querySelectorAll(".right-slide .slide"),
//   );
//   const total = leftSlides.length;
//   let current = 0;
//   let isAnimating = false;

//   const clickSound = new Audio("audio/click.mp3");
//   clickSound.volume = 0.5; // громкость от 0 до 1

//   function circularOffset(i, cur, n) {
//     let diff = i - cur;
//     if (diff > n / 2) diff -= n;
//     if (diff < -n / 2) diff += n;
//     return diff;
//   }

//   // текущие смещения — нужны, чтобы понять, насколько реально сдвигается каждый слайд
//   let leftOffsets = leftSlides.map((_, i) => circularOffset(i, current, total));
//   let rightOffsets = rightSlides.map((_, i) =>
//     circularOffset(i, current, total),
//   );

//   function apply(el, offsetValue, mirrored, instant) {
//     if (instant) {
//       el.style.transition = "none";
//     }
//     el.style.transform = `translateY(${(mirrored ? -offsetValue : offsetValue) * 100}%)`;

//     if (instant) {
//       void el.offsetHeight; // форсируем рефлоу
//       requestAnimationFrame(() => {
//         el.style.transition = ""; // возвращаем transition из CSS
//       });
//     } else {
//       el.style.transition = "";
//     }
//   }

//   function render(isInitial) {
//     const newLeftOffsets = leftSlides.map((_, i) =>
//       circularOffset(i, current, total),
//     );
//     const newRightOffsets = rightSlides.map((_, i) =>
//       circularOffset(i, current, total),
//     );

//     leftSlides.forEach((el, i) => {
//       const from = leftOffsets[i];
//       const to = newLeftOffsets[i];
//       // если сдвиг больше одного шага — это "прыжок" через видимую зону
//       const instant = isInitial || Math.abs(to - from) > 1;
//       apply(el, to, false, instant);
//       el.classList.toggle("active", i === current);
//     });

//     rightSlides.forEach((el, i) => {
//       const from = rightOffsets[i];
//       const to = newRightOffsets[i];
//       const instant = isInitial || Math.abs(to - from) > 1;
//       apply(el, to, true, instant);
//     });

//     leftOffsets = newLeftOffsets;
//     rightOffsets = newRightOffsets;
//   }

//   function goTo(direction) {
//     if (isAnimating) return;
//     isAnimating = true;
//     current = (current + direction + total) % total;
//     render(false);
//     setTimeout(() => {
//       isAnimating = false;
//     }, 800);
//   }

//   document.querySelector(".down-button").addEventListener("click", () => {
//     goTo(1);
//     clickSound.currentTime = 0;
//     clickSound.play();
//   });

//   document.querySelector(".up-button").addEventListener("click", () => {
//     goTo(-1);
//     clickSound.currentTime = 0;
//     clickSound.play();
//   });

//   document.addEventListener("keydown", (e) => {
//     clickSound.currentTime = 0;
//   });

//   document.addEventListener("click", (e) => {
//     // не останавливаем, если клик именно по кнопкам up/down —
//     // иначе звук будет обрываться сразу же после запуска
//     if (e.target.closest(".up-button") || e.target.closest(".down-button")) {
//       return;
//     }

//     clickSound.pause();
//     clickSound.currentTime = 0;
//   });

//   document.querySelector(".slider").addEventListener("wheel", (e) => {
//     e.preventDefault();
//     if (e.deltaY > 0) {
//       goTo(1);
//     } else {
//       goTo(-1);
//     }
//   });

//   render(true); // первичная расстановка без анимации
// })();




// //////////////////////////////////////////////////////////////////////////////////////////////

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
  let orientation = "vertical"; // 'vertical' или 'horizontal'

  const clickSound = new Audio("audio/click.mp3");
  clickSound.volume = 0.5;

  function circularOffset(i, cur, n) {
    let diff = i - cur;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }

  let leftOffsets = leftSlides.map((_, i) => circularOffset(i, current, total));
  let rightOffsets = rightSlides.map((_, i) =>
    circularOffset(i, current, total),
  );

  function apply(el, offsetValue, mirrored, instant) {
    if (instant) {
      el.style.transition = "none";
    }

    const finalOffset = mirrored ? -offsetValue : offsetValue;
    const axis = orientation === "vertical" ? "translateY" : "translateX";
    el.style.transform = `${axis}(${finalOffset * 100}%)`;

    if (instant) {
      void el.offsetHeight;
      requestAnimationFrame(() => {
        el.style.transition = "";
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

  document.querySelector(".down-button").addEventListener("click", () => {
    goTo(1);
    clickSound.currentTime = 0;
    clickSound.play();
  });

  document.querySelector(".up-button").addEventListener("click", () => {
    goTo(-1);
    clickSound.currentTime = 0;
    clickSound.play();
  });

  document.querySelector(".slider").addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      goTo(1);
    } else {
      goTo(-1);
    }
  });

  document.addEventListener("click", (e) => {
    // не останавливаем, если клик именно по кнопкам up/down —
    // иначе звук будет обрываться сразу же после запуска
    if (e.target.closest(".up-button") || e.target.closest(".down-button")) {
      return;
    }

    clickSound.pause();
    clickSound.currentTime = 0;
  });

  // === переключение ориентации ===
  document
    .querySelector(".orientation-button")
    .addEventListener("click", () => {
      orientation = orientation === "vertical" ? "horizontal" : "vertical";
      document
        .querySelector(".slider")
        .classList.toggle("horizontal-mode", orientation === "horizontal");
      render(true); // мгновенно перерисовываем без анимации перехода между режимами
    });
  // ================================

  render(true);
})();




