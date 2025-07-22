// Navigation active section tracking
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let currentSection = '';
    let minDistance = Infinity;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const sectionCenter = sectionTop + sectionHeight / 2;

      const distance = Math.abs(scrollPosition - sectionCenter);

      if (distance < minDistance) {
        minDistance = distance;
        currentSection = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    if (currentSection) {
      const activeLinks = document.querySelectorAll(
        `[href="#${currentSection}"]`
      );
      activeLinks.forEach(link => {
        link.classList.add('active');
      });
    }
  }

  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);

  updateActiveNavLink();
});
