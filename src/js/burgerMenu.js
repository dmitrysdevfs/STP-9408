// Burger menu functionality
const burgerBtn = document.querySelector('[data-burger-menu]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const header = document.querySelector('.header');

if (burgerBtn && mobileMenu && header) {
  // Перемикаємо меню
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');

    if (isOpen) {
      // Закриваємо меню
      mobileMenu.classList.remove('is-open');
      header.classList.remove('is-menu-open');
    } else {
      // Відкриваємо меню
      mobileMenu.classList.add('is-open');
      header.classList.add('is-menu-open');
    }
  });

  // Закриваємо меню при кліку на посилання
  const mobileLinks = mobileMenu.querySelectorAll('[data-nav-link]');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      header.classList.remove('is-menu-open');
    });
  });
}
