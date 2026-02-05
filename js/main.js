(function ($) {
  "use strict";

  /* ==============================
     Nav Menu (Superfish)
  ============================== */
  const $navMenu = $(".nav-menu");
  const $header = $(".header");
  const $body = $("body");

  if ($navMenu.length) {
    $navMenu.superfish({
      animation: { opacity: "show" },
      speed: 400,
    });
  }

  /* ==============================
     Typed.js
  ============================== */
  const $typedTarget = $(".top-header h2");
  const typedText = $(".top-header p").text();

  if ($typedTarget.length && typedText) {
    new Typed(".top-header h2", {
      strings: typedText.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  /* ==============================
     Mobile Navigation
  ============================== */
  const $navContainer = $("#nav-menu-container");

  if ($navContainer.length) {
    const $mobileNav = $navContainer.clone().prop("id", "mobile-nav");

    $mobileNav.find("> ul").removeAttr("class id");
    $body.append($mobileNav);
    $body.prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $body.append('<div id="mobile-body-overly"></div>');

    $("#mobile-nav .menu-has-children").prepend(
      '<i class="fa fa-chevron-down"></i>'
    );

    $(document).on("click", ".menu-has-children i", function () {
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
      $(this).siblings("ul").slideToggle();
      $(this).siblings("a").toggleClass("menu-item-active");
    });

    $("#mobile-nav-toggle").on("click", function () {
      $body.toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).on("click", function (e) {
      const $container = $("#mobile-nav, #mobile-nav-toggle");
      if (
        !$container.is(e.target) &&
        $container.has(e.target).length === 0 &&
        $body.hasClass("mobile-nav-active")
      ) {
        $body.removeClass("mobile-nav-active");
        $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
        $("#mobile-body-overly").fadeOut();
      }
    });
  }

  /* ==============================
     Smooth Scroll
  ============================== */
  $(".nav-menu a, #mobile-nav a").on("click", function (e) {
    if (!this.hash) return;

    e.preventDefault();

    $("html, body").animate(
      { scrollTop: $(this.hash).offset().top },
      1500,
      "easeInOutExpo"
    );

    $(".nav-menu .menu-active").removeClass("menu-active");
    $(this).closest("li").addClass("menu-active");
  });

  /* ==============================
     Sticky Header
  ============================== */
  if ($header.length) {
    $header.sticky({ topSpacing: 0, zIndex: 50 });
  }

  /* ==============================
     Back To Top
  ============================== */
  const $backToTop = $(".back-to-top");

  $(window).on("scroll", function () {
    $backToTop.toggle($(this).scrollTop() > 100);
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  /* ==============================
     Skills Progress
  ============================== */
  $(".skills").waypoint(
    function () {
      $(".progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  /* ==============================
     Counter
  ============================== */
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  /* ==============================
     Portfolio (Isotope)
  ============================== */
  const $portfolio = $(".portfolio-container");

  if ($portfolio.length) {
    const iso = $portfolio.isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");
      iso.isotope({ filter: $(this).data("filter") });
    });
  }

  /* ==============================
     Testimonials
  ============================== */
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });
})(jQuery);
