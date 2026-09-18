document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("scroll-to-top");
  if (!button) return;

  const handleScroll = () => {
    const banner = document.getElementById("banner");

    if (!banner) {
      // Không có banner → hiện khi scroll > 300px
      button.style.display = window.scrollY > 300 ? "flex" : "none";
      return;
    }

    // Có banner → hiện khi scroll vượt qua đáy banner
    const bannerBottom = banner.offsetTop + banner.offsetHeight;
    button.style.display = window.scrollY > bannerBottom ? "flex" : "none";
  };

  // Lắng nghe sự kiện scroll (passive để mượt)
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Kiểm tra ngay khi trang load
  handleScroll();

  // Click → scroll lên đầu trang mượt
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});