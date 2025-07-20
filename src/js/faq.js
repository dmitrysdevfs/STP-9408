import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.js-faq-list', {
  duration: 400,
  showMultiple: false,
  elementClass: 'js-faq-el',
  triggerClass: 'js-faq-cont',
  panelClass: 'js-faq-content',
  activeClass: 'is-open',
});
