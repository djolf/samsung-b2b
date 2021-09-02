$(document).ready(function () {
  const mainCarousel = $("#mainCarousel");
  const mainCarouselItems = $(".main-carousel-item");
  let currentPageIndex;
  mainCarouselItems.each((index, item) => {
    if ($(item).hasClass("active")) currentPageIndex = index;
  });
  console.log("currentPageIndex", currentPageIndex);

  mainCarousel.slick({
    autoplay: currentPageIndex === 0 ? false : true,
    autoplaySpeed: 5000,
    prevArrow:
      '<button type="button" class="slick-prev carousel-control-prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span></button>"',
    nextArrow:
      '<button type="button" class="slick-next carousel-control-next"><span class="carousel-control-next-icon" aria-hidden="true"></span></button>',
    initialSlide: currentPageIndex,
  });

  mainCarousel.on("afterChange", (event, slick, currentSlide) => {
    console.log(currentSlide);
    if (currentSlide === 0) mainCarousel.slick("slickPause");
    else if (currentSlide === 1) mainCarousel.slick("slickPlay");
  });
});
