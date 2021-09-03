$(document).ready(function () {
  const mainCarousel = $("#mainCarousel");
  const subCarousel = $("#subCarousel");
  const mainCarouselItems = $(".main-carousel-item");
  const indicators = $(".carousel-indicators > li");
  const mobileIndicators = $(".carousel-section .dropdown-item");

  let currentPageIndex;

  //set current page index
  mainCarouselItems.each((index, item) => {
    if ($(item).hasClass("active")) currentPageIndex = index;
  });

  //initialise carousels
  subCarousel.slick({
    autoplay: currentPageIndex === 0 ? true : false,
    // autoplay: false,
    autoplaySpeed: 2000,
    draggable: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });

  mainCarousel.slick({
    autoplay: currentPageIndex === 0 ? false : true,
    autoplaySpeed: 5000,
    prevArrow:
      '<button type="button" class="slick-prev carousel-control-prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>"',
    nextArrow:
      '<button type="button" class="slick-next carousel-control-next"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>',
    initialSlide: currentPageIndex,
    draggable: false,
  });

  mainCarousel.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    if ($(event.target).is("#mainCarousel")) {
      highlightIndicator(nextSlide);
      if (nextSlide === 0) {
        mainCarousel.slick("slickPause");
        subCarousel.slick("slickPlay");
      } else {
        mainCarousel.slick("slickPlay");
        subCarousel.slick("slickPause");
      }
    }
  });

  indicators.on("click", (e) => {
    const targetSlide = $(e.target).data("slideTo");
    mainCarousel.slick("slickGoTo", targetSlide);
  });

  mobileIndicators.on("click", (e) => {
    const targetSlide = $(e.target).data("slideTo");
    // const text = $(e.target).text();
    // $(".carousel-slide-title").text(text);
    mainCarousel.slick("slickGoTo", targetSlide);
  });

  const highlightIndicator = (current) => {
    indicators.each((index, item) => {
      const $item = $(item);
      if ($item.hasClass("active") && index !== current) {
        $item.removeClass("active");
      } else if (index === current && !$item.hasClass("active")) {
        $item.addClass("active");
        $(".carousel-slide-title").text($item.text());
      }
    });
  };
});
