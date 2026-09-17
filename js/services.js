(function () {
  "use strict";

  // ===== Scroll Animation =====
  const animatedEls = document.querySelectorAll("#services [data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);

        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay * 80);
        } else {
          el.classList.remove("is-visible");
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  animatedEls.forEach((el) => observer.observe(el));

  // ===== Tilt effect (maxRotate = 12) =====
  const tiltCards = document.querySelectorAll("#services [data-tilt]");

  tiltCards.forEach((card) => {
    const maxRotate = parseFloat(card.dataset.maxRotate || "12");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotate;
      const rotateY = ((x - centerX) / centerX) * maxRotate;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
})();