(function () {
  "use strict";

  // ===== General fade + slide =====
  const animatedEls = document.querySelectorAll(
    "#compliance [data-animate]:not([data-animate-flow]):not([data-animate-line])"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);

        if (entry.isIntersecting) {
          // delay base 0.1 + index * 0.08 for cards
          const baseDelay = el.classList.contains("compliance-card")
            ? 100 + delay * 80
            : delay * 80;
          setTimeout(() => {
            el.classList.add("is-visible");
          }, baseDelay);
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

  // ===== Flow nodes (scale) + lines (scaleX) =====
  const flowNodes = document.querySelectorAll("#compliance [data-animate-flow]");
  const flowLines = document.querySelectorAll("#compliance [data-animate-line]");

  const flowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // reset all when leaving
          flowNodes.forEach((n) => n.classList.remove("is-visible"));
          flowLines.forEach((l) => l.classList.remove("is-visible"));
          return;
        }

        // Animate nodes
        flowNodes.forEach((node) => {
          const delay = parseInt(node.dataset.delay || "0", 10);
          setTimeout(() => {
            node.classList.add("is-visible");
          }, delay * 350);
        });

        // Animate lines (after node delay + 0.2s)
        flowLines.forEach((line) => {
          const delay = parseInt(line.dataset.delay || "0", 10);
          setTimeout(() => {
            line.classList.add("is-visible");
          }, delay * 350 + 200);
        });
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.2,
    }
  );

  // Observe the flow container once
  const flowContainer = document.querySelector("#compliance .compliance-flow");
  if (flowContainer) {
    flowObserver.observe(flowContainer);
  }
})();