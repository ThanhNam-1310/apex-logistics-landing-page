(function () {
  "use strict";

  const topbar = document.querySelector(".topbar");
  const navbar = document.querySelector(".navbar");
  const mobileBtn = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("mobileMenuBackdrop");
  const langTrigger = document.getElementById("languageTrigger");
  const langMenu = document.getElementById("languageMenu");
  const langOptions = document.querySelectorAll(".language-option");
  const currentFlag = document.getElementById("currentLanguageFlag");
  const currentLabel = document.getElementById("currentLanguageLabel");

  const navLinks = document.querySelectorAll(
    ".desktop-nav a, .mobile-nav-link"
  );

  if (!mobileBtn || !mobileMenu || !backdrop) {
    console.warn("[header] Missing mobile menu elements");
  }

  // ===== Header scroll: full | hidden | nav =====
  function updateHeaderState() {
    const scrollY = window.scrollY;
    let headerState = "full";

    if (scrollY <= 10) {
      headerState = "full";
    } else if (scrollY <= 100) {
      headerState = "hidden";
    } else {
      headerState = "nav";
    }

    if (topbar) {
      if (headerState === "full") {
        topbar.classList.remove("is-hidden");
      } else {
        topbar.classList.add("is-hidden");
      }
    }

    if (navbar) {
      if (headerState === "hidden") {
        navbar.classList.add("is-hidden");
        navbar.classList.remove("is-sticky");
      } else {
        navbar.classList.remove("is-hidden");
        if (headerState === "nav") {
          navbar.classList.add("is-sticky");
        } else {
          navbar.classList.remove("is-sticky");
        }
      }
    }
  }

  // ===== Active section =====
  function updateActiveSection() {
    const sections = ["home", "about", "services", "contact", "banner"];
    let current = "";

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id === "banner" ? "#home" : "#" + id;
          break;
        }
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === current) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      updateHeaderState();
      updateActiveSection();
    },
    { passive: true }
  );

  updateHeaderState();
  updateActiveSection();

  // ===== Mobile menu =====
  function openMobileMenu() {
    if (!mobileMenu || !backdrop || !mobileBtn) return;
    mobileMenu.classList.add("is-open");
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    mobileBtn.classList.add("is-open");
    mobileBtn.setAttribute("aria-expanded", "true");
    mobileBtn.setAttribute("aria-label", "Đóng menu");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    if (!mobileMenu || !backdrop || !mobileBtn) return;
    mobileMenu.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    mobileBtn.classList.remove("is-open");
    mobileBtn.setAttribute("aria-expanded", "false");
    mobileBtn.setAttribute("aria-label", "Mở menu");
    document.body.classList.remove("menu-open");
  }

  if (mobileBtn) {
    mobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains("is-open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileMenu);
  }

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target =
          document.querySelector(href) ||
          (href === "#home" ? document.getElementById("banner") : null);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
      closeMobileMenu();
    });
  });

  document.querySelectorAll(".desktop-nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target =
          document.querySelector(href) ||
          (href === "#home" ? document.getElementById("banner") : null);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // ===== Language dropdown =====
  if (langTrigger && langMenu) {
    langTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = langMenu.classList.toggle("is-open");
      langTrigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    langOptions.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const label = opt.dataset.label;
        const flag = opt.dataset.flag;

        if (currentFlag && flag) {
          currentFlag.src = flag;
          currentFlag.alt = label || "";
        }
        if (currentLabel && label) {
          currentLabel.textContent = label;
        }

        langOptions.forEach((o) => {
          o.classList.remove("active");
          o.setAttribute("aria-selected", "false");
        });
        opt.classList.add("active");
        opt.setAttribute("aria-selected", "true");

        langMenu.classList.remove("is-open");
        langTrigger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !langTrigger.contains(e.target) &&
        !langMenu.contains(e.target)
      ) {
        langMenu.classList.remove("is-open");
        langTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileMenu();
      if (langMenu) {
        langMenu.classList.remove("is-open");
        if (langTrigger) langTrigger.setAttribute("aria-expanded", "false");
      }
    }
  });
})();
