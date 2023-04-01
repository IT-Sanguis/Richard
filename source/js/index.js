const anchors = document.querySelectorAll('a[href^="#"]');

const burger = document.querySelector(".page-header__burger");
const nav = document.querySelector(".main-nav");

anchors.forEach(element => {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.hash);
    if (target) {
      if ('scrollBehavior' in document.documentElement.style) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView(true);
      }
    }
  });
});

burger.addEventListener("click", function (e) {
  e.preventDefault();
  burger.classList.toggle("page-header__burger--open");
  nav.classList.toggle("main-nav--open");
});

