import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: false,
  navigation: {
    nextEl: '.gallery-button-next',
    prevEl: '.gallery-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  mousewheel: {
    enabled: true,
    sensitivity: 1,
    releaseOnEdges: true,
  },
  preventInteractionOnTransition: false,
  simulateTouch: true,
  grabCursor: true,

  breakpoints: {
    1200: {
      slidesPerView: 4,
      slidesPerGroup: 2,
      spaceBetween: 24,
    },
  },
});
