(function () {
  "use strict";

  // Scroll animation (tương đương useReplayAnimation)
  const animatedEls = document.querySelectorAll("#stats [data-animate]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);

        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay * 80); // index * 0.08s
        } else {
          // Replay: ẩn lại khi ra khỏi viewport
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
})();