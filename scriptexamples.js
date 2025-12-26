(function initFramerSlider(){
  const slider = document.querySelector(".framer-slider");
  if (!slider) return;

  const viewport = slider.querySelector(".framer-slider__viewport");
  const slides = Array.from(slider.querySelectorAll(".framer-slide"));
  const dotsWrap = slider.querySelector(".framer-slider__dots");
  const btns = slider.querySelectorAll(".framer-slider__btn");

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "framer-dot";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.addEventListener("click", () => {
      viewport.scrollTo({ left: slides[i].offsetLeft, behavior: "smooth" });
    });
    dotsWrap.appendChild(b);
    return b;
  });

  function setActiveDotByScroll(){
    const x = viewport.scrollLeft + 8;
    let active = 0;
    for (let i = 0; i < slides.length; i++){
      if (slides[i].offsetLeft <= x) active = i;
    }
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === active ? "true" : "false"));
  }

  viewport.addEventListener("scroll", () => {
    window.requestAnimationFrame(setActiveDotByScroll);
  }, { passive: true });

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.dir || "1");
      const step = viewport.clientWidth * 0.9;
      viewport.scrollBy({ left: dir * step, behavior: "smooth" });
    });
  });

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") viewport.scrollBy({ left: viewport.clientWidth * 0.9, behavior: "smooth" });
    if (e.key === "ArrowLeft") viewport.scrollBy({ left: -viewport.clientWidth * 0.9, behavior: "smooth" });
  });

  setActiveDotByScroll();
})();
