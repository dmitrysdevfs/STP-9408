import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('[data-swiper]', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: false,
  navigation: {
    nextEl: '[data-button-next]',
    prevEl: '[data-button-prev]',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  pagination: {
    el: '[data-swiper-pagination]',
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
