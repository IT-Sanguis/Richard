const swiperKitchen = new Swiper(".gallery__slider--kitchen", {
  speed: 400,
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    // clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   // draggable: true,
  // },
  grabCursor: true,
  // slidesOffsetBefore: 150,
  // slidesOffsetAfter: 150,
  slidesPerView: 2,
  // centeredSlides: true,
  // autoHeight: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  // hashNavigation:true,
  // zoom: {
  //   maxRatio: 5,
  // },
  // slideToClickedSlide: true,


});

const swiperCabinets = new Swiper(".gallery__slider--cabinets", {
  speed: 400,
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    // clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   // draggable: true,
  // },
  grabCursor: true,
  // slidesOffsetBefore: 150,
  // slidesOffsetAfter: 150,
  slidesPerView: 3,
  centeredSlides: true,
  // autoHeight: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  // slideToClickedSlide: true,
  // hashNavigation:true,
  // zoom: {
  //   maxRatio: 5,
  // },

});

const swiperHallways = new Swiper(".gallery__slider--hallways", {
  speed: 400,
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    // clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   // draggable: true,
  // },
  grabCursor: true,
  // slidesOffsetBefore: 150,
  // slidesOffsetAfter: 150,
  slidesPerView: 2,
  // watchOverflow: true,
  // centerInsufficientSlides: true,
  // centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  // slideToClickedSlide: true,
  // breakpoints: {
  //   // when window width is >= 320px
  //   320: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //   },
  //   // when window width is >= 480px
  //   480: {
  //     slidesPerView: 3,
  //     spaceBetween: 30,
  //   },
  //   // when window width is >= 640px
  //   640: {
  //     slidesPerView: 4,
  //     spaceBetween: 40,
  //   }
  // },
  // hashNavigation:true,
  // zoom: {
  //   maxRatio: 5,
  // },

});
