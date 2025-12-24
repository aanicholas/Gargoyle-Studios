(function () {
  const modal = document.getElementById("storyModal");
  const frame = document.getElementById("storyFrame");

  function openModal(src) {
    frame.src = src;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Clear iframe to stop audio / CPU
    frame.src = "";
  }

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-story]");
    if (openBtn) {
      const src = openBtn.getAttribute("data-src");
      if (src) openModal(src);
      return;
    }

    if (e.target.closest("[data-close-modal]")) {
      closeModal();
      return;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
})();
