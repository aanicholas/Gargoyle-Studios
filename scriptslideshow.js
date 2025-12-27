(function initSlideshow(){
  const slider = document.querySelector(".slideshow");
  if (!slider) return;

  const viewport = slider.querySelector(".slideshow__viewport");
  const slides = Array.from(slider.querySelectorAll(".slideshow__slide"));
  const dotsWrap = slider.querySelector(".slideshow__dots");
  const btns = slider.querySelectorAll(".slideshow__btn");

  if (!viewport || slides.length === 0 || !dotsWrap) return;

  // Build dots
  dotsWrap.innerHTML = "";
  const dots = slides.map((_, i) => {
    const b = document.createElement("button");
    b.className = "slideshow__dot";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");

    b.addEventListener("click", (e) => {
      e.preventDefault();
      slides[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });

    dotsWrap.appendChild(b);
    return b;
  });

  function setActiveDot(activeIndex){
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === activeIndex ? "true" : "false"));
  }

  function getActiveIndex(){
    const v = viewport.getBoundingClientRect();
    let bestIndex = 0;
    let bestDist = Infinity;

    for (let i = 0; i < slides.length; i++){
      const r = slides[i].getBoundingClientRect();
      const dist = Math.abs(r.left - v.left);
      if (dist < bestDist){
        bestDist = dist;
        bestIndex = i;
      }
    }
    return bestIndex;
  }

  let rafId = 0;
  function onScroll(){
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      setActiveDot(getActiveIndex());
    });
  }

  viewport.addEventListener("scroll", onScroll, { passive: true });

  // Arrow buttons: go to previous/next slide based on active index
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = Number(btn.dataset.dir || "1");
      const current = getActiveIndex();
      const next = Math.min(slides.length - 1, Math.max(0, current + dir));
      slides[next].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setActiveDot(next);
    });
  });

  // Keyboard support when viewport is focused
  viewport.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();

    const dir = e.key === "ArrowRight" ? 1 : -1;
    const current = getActiveIndex();
    const next = Math.min(slides.length - 1, Math.max(0, current + dir));
    slides[next].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveDot(next);
  });

  // Initial state
  setActiveDot(getActiveIndex());
})();
