let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

if (mobile.matches) {
  //  block of code to be executed if the condition is true
  swiper.on("transitionEnd", function () {
    document.querySelector(".swiper-slide-active").click();
  });
} else {
  //  block of code to be executed if the condition is false
  console.log("Desktop Mode");
}
