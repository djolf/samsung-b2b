$(document).ready(function () {
  const mainCarousel = $("#mainCarousel");
  const subCarousel = $("#subCarousel");
  const mainCarouselItems = $(".carousel-item");
  const indicators = $(".carousel-indicators > li");
  const mobileIndicators = $(".carousel-section .dropdown-item");
  const productCarousel = $("#productCarousel");
  const myCarousel = $("#myCarousel")

  let userInteracted = false;

  let currentPageIndex;

  //set current page index
  mainCarouselItems.each((index, item) => {
    if ($(item).hasClass("active")) currentPageIndex = index;
  });

  mainCarousel.on("init", (event, slick) => {
    if ($(event.target).is("#mainCarousel")) {
      const height = $(mainCarousel).height();
      $(subCarousel)
        .find(".slick-list, .slick-track, .slick-slide")
        .height(height);
    }
  });

  const mainCarouselOptions = {
    autoplay: currentPageIndex === 0 ? false : true,
    autoplaySpeed: 5000,
    prevArrow:
      '<button type="button" class="slick-prev carousel-control-prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>"',
    nextArrow:
      '<button type="button" class="slick-next carousel-control-next"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>',
    initialSlide: currentPageIndex,
    draggable: false,
  };

  const subCarouselOptions = {
    autoplay: currentPageIndex === 0 ? true : false,
    // autoplay: false,
    autoplaySpeed: 2000,
    draggable: false,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    touchMove: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const productCarouselOptions = {
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
    ],
  };

  //initialise carousels
  subCarousel.slick(subCarouselOptions);

  mainCarousel.slick(mainCarouselOptions);

  productCarousel.slick(productCarouselOptions);

  $(window).on("resize", function () {
    subCarousel.slick("refresh");
  });
  indicators.on("click", (e) => {
    userInteracted = true;
    const targetSlide = $(e.target).data("slideTo");
    mainCarousel.slick("slickGoTo", targetSlide);
  });

  mobileIndicators.on("click", (e) => {
    userInteracted = true;
    const targetSlide = $(e.target).data("slideTo");
    mainCarousel.slick("slickGoTo", targetSlide);
  });

  $(".slick-next, .slick-prev").on("click", (e) => {
    userInteracted = true;
  });

  mainCarousel.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    if ($(event.target).is("#mainCarousel")) {
      highlightIndicator(nextSlide);
      if (nextSlide === 0) {
        const height = $(mainCarousel).height();
        $(subCarousel)
          .find(".slick-list, .slick-track, .slick-slide")
          .height(height);
        mainCarousel.slick("slickPause");
        subCarousel.slick("slickPlay");
      } else {
        if (userInteracted) {
          mainCarousel.slick("slickPause");
        } else {
          mainCarousel.slick("slickPlay");
          subCarousel.slick("slickPause");
        }
      }
    }
  });

  const highlightIndicator = (current) => {
    indicators.each((index, item) => {
      const $item = $(item);
      if ($item.hasClass("active") && index !== current) {
        $item.removeClass("active");
      } else if (index === current) {
        if (!$item.hasClass("active")) $item.addClass("active");
        $(".carousel-slide-title").text($item.text());
      }
    });
  };

  highlightIndicator(currentPageIndex);

  myCarousel.on("slid.bs.carousel", (event) => {
    highlightIndicator(event.to);
    if (event.to === 0) {
      subCarousel.slick("refresh");
      myCarousel.carousel('pause');
    } else {
      myCarousel.carousel('pause');
      // myCarousel.carousel('cycle');
    }
  })

  myCarousel.carousel({
    interval: 5000,
  })
});
