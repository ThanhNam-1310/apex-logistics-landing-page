(function () {
  "use strict";

  // ===== Scroll Animation (tương đương useReplayAnimation) =====
  const animatedEls = document.querySelectorAll("[data-animate]");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || "0", 10);

      if (entry.isIntersecting) {
        // Delay theo index giống motion
        setTimeout(() => {
          el.classList.add("is-visible");
        }, delay * 100);
      } else {
        // Replay: ẩn lại khi ra khỏi viewport
        el.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedEls.forEach((el) => observer.observe(el));

  // ===== Tilt effect (horizontal axis, maxRotate ~6deg) =====
  const tiltCards = document.querySelectorAll("[data-tilt]");

  tiltCards.forEach((card) => {
    const inner = card.querySelector(".vm-image-inner");
    if (!inner) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Horizontal axis tilt (xoay quanh trục X)
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
})();