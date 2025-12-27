(function () {
  const modal = document.getElementById("storyModal");
  const frame = document.getElementById("storyFrame");
  if (!modal || !frame) return;


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
    // Prevent link navigation if it's an anchor (or inside one)
    const anchor = openBtn.closest("a");
    if (anchor) e.preventDefault();

    const src = openBtn.getAttribute("data-src");
    if (src) openModal(src);
    return;
  }

  if (e.target.closest("[data-close-modal]")) {
    closeModal();
    return;
  }
});

})();
