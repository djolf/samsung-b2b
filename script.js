$(document).ready(function () {
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

  const subCarouselOptions = {
    // autoplay: currentPageIndex === 0 ? true : false,
    autoplay: true,
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

  productCarousel.slick(productCarouselOptions);

  $(window).on("resize", function () {
    subCarousel.slick("refresh");
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

  // if (currentPageIndex === 0) {
  //   myCarousel.carousel({
  //     interval: 5000,
  //   })
  // }
});
