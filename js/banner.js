(function () {
  const SLIDES_COUNT = 4;
  const AUTO_INTERVAL = 5000;
  const SLIDE_GAP = 46;

  let current = 0;
  let isDesktop = false;
  let slideWidth = 1100;
  let autoTimer = null;

  const mobileSlides = document.querySelectorAll(".banner__mobile-slide");
  const desktopSlides = document.querySelectorAll(".banner__desktop-slide");
  const dots = document.querySelectorAll(".banner__dot");
  const desktopContainer = document.querySelector(".banner__desktop");

  // ----- Helpers -----
  function getPosition(index) {
    let pos = index - current;
    if (pos > SLIDES_COUNT / 2) pos -= SLIDES_COUNT;
    if (pos < -SLIDES_COUNT / 2) pos += SLIDES_COUNT;
    return pos;
  }

  function updateMobile() {
    mobileSlides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });
  }

  function updateDesktop() {
    desktopSlides.forEach((slide, i) => {
      const pos = getPosition(i);
      const isMain = pos === 0;
      const x = pos * (slideWidth + SLIDE_GAP);

      slide.style.width = slideWidth + "px";
      slide.style.transform = `translateX(calc(-50% + ${x}px))`;
      slide.classList.toggle("is-main", isMain);
    });
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function goTo(index) {
    current = ((index % SLIDES_COUNT) + SLIDES_COUNT) % SLIDES_COUNT;
    updateMobile();
    updateDesktop();
    updateDots();
    resetAuto();
  }

  function next() {
    goTo(current + 1);
  }

  function resetAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(next, AUTO_INTERVAL);
  }

  // ----- Resize -----
  function handleResize() {
    const w = window.innerWidth;
    isDesktop = w >= 1024;
    slideWidth = Math.min(1260, Math.floor(w * 0.82));
    updateDesktop();
  }

  // ----- Scroll (thay đổi chiều cao desktop) -----
  function handleScroll() {
    if (!desktopContainer) return;
    const scrollY = window.scrollY;
    const hidden = scrollY > 10 && scrollY <= 100;
    desktopContainer.classList.toggle("is-header-hidden", hidden);
  }

  // ----- Events -----
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.dataset.index);
      goTo(idx);
    });
  });

  desktopSlides.forEach((slide) => {
    slide.addEventListener("click", () => {
      if (slide.classList.contains("is-main")) return;
      const idx = Number(slide.dataset.index);
      goTo(idx);
    });
  });

  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll, { passive: true });

  // ----- Init -----
  handleResize();
  handleScroll();
  updateMobile();
  updateDesktop();
  updateDots();
  resetAuto();
})();