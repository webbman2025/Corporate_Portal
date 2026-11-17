(function () {
  function announce(liveRegion, text) {
    if (!liveRegion || !text) return;
    liveRegion.textContent = "";
    window.setTimeout(function () {
      liveRegion.textContent = text;
    }, 50);
  }

  function initHorizontalCarousel(root, options) {
    if (!root || root.dataset.carouselInit === "1") return;
    root.dataset.carouselInit = "1";

    var track = root.querySelector(options.track);
    var slides = root.querySelectorAll(options.slide);
    var dots = root.querySelectorAll(options.dot);
    var prev = options.prev ? root.querySelector(options.prev) : null;
    var next = options.next ? root.querySelector(options.next) : null;
    var live = root.querySelector(options.live);
    var layoutName = options.layoutName;

    if (!track || !slides.length) return;

    var index = 0;
    var total = slides.length;
    var autoplayMs = options.autoplayMs || 6500;
    var timer = null;
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      track.style.transform = "translate3d(-" + index * 100 + "%, 0, 0)";

      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        if (dot.getAttribute("role") === "tab") {
          dot.setAttribute("aria-selected", active ? "true" : "false");
          dot.tabIndex = active ? 0 : -1;
        }
      });

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });

      var label = slides[index].getAttribute("data-slide-label");
      if (label) announce(live, label);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (reducedMotion || document.body.getAttribute("data-layout") !== layoutName) return;
      timer = window.setInterval(function () {
        goTo(index + 1);
      }, autoplayMs);
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(index - 1);
        startAutoplay();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1);
        startAutoplay();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        startAutoplay();
      });
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", function () {
      if (!root.contains(document.activeElement)) startAutoplay();
    });

    goTo(0);
    startAutoplay();

    document.addEventListener("portal-layout-change", function (event) {
      if (event.detail && event.detail.layout === layoutName) startAutoplay();
      else stopAutoplay();
    });
  }

  document.querySelectorAll("[data-emergent-carousel]").forEach(function (root) {
    initHorizontalCarousel(root, {
      track: ".emergent-carousel-track",
      slide: ".emergent-slide",
      dot: ".emergent-carousel-dot",
      prev: "[data-carousel-prev]",
      next: "[data-carousel-next]",
      live: ".emergent-carousel-live",
      layoutName: "emergent"
    });
  });

  document.querySelectorAll("[data-zoho-carousel]").forEach(function (root) {
    initHorizontalCarousel(root, {
      track: ".zoho-carousel-track",
      slide: ".zoho-slide",
      dot: ".zoho-carousel-dot",
      live: ".zoho-carousel-live",
      layoutName: "zoho",
      autoplayMs: 7000
    });
  });
})();