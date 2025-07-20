import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

// Оновлює висоту відкритих FAQ елементів при зміні розміру вікна
function updateOpenElementsHeight() {
  const openElements = document.querySelectorAll('.js-faq-el.is-open');
  openElements.forEach(element => {
    const content = element.querySelector('.js-faq-content');
    if (content) {
      // Тимчасово знімаємо max-height для отримання реальної висоти
      const currentMaxHeight = content.style.maxHeight;
      content.style.maxHeight = 'none';
      const realHeight = content.scrollHeight;
      content.style.maxHeight = currentMaxHeight;

      // Встановлюємо нову висоту
      content.style.maxHeight = realHeight + 'px';
    }
  });
}

// Ініціалізація accordion
const accordion = new Accordion('.js-faq-list', {
  duration: 500,
  showMultiple: true, // Дозволяємо кілька відкритих елементів
  elementClass: 'js-faq-el',
  triggerClass: 'js-faq-cont',
  panelClass: 'js-faq-content',
  activeClass: 'is-open',
  onOpen: function (currentElement) {
    // Додаткове покращення для плавності
    currentElement.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  },
});

// Оновлення висоти при зміні розміру вікна
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    updateOpenElementsHeight();
  }, 100); // Затримка для стабілізації розміру
});

// Оновлення висоти при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateOpenElementsHeight, 100);
});
