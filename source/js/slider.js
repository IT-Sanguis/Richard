const swiperKitchen = new Swiper(".gallery__slider--kitchen", {
  speed: 400,
  spaceBetween: 10,
  // spaceBetween: 50,
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
  slidesPerView: 1,
  // slidesPerView: 2,
  // centeredSlides: true,
  // autoHeight: true,
  autoplay: {
    delay: 5000,
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
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    959: {
      slidesPerView: 2,
      spaceBetween: 50,
    }
  },


});

const swiperCabinets = new Swiper(".gallery__slider--cabinets", {
  speed: 400,
  spaceBetween: 10,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  grabCursor: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    959: {
      slidesPerView: 3,
      spaceBetween: 52,
    },
  },

});

const swiperHallways = new Swiper(".gallery__slider--hallways", {
  speed: 400,
  spaceBetween: 5,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  grabCursor: true,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    960: {
      slidesPerView: 3,
      spaceBetween: 52,
    }
  },
});
