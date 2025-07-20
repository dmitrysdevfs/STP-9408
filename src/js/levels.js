document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('[data-toggle-level]');
  const moreText = document.querySelector('[data-more-level]');

  toggleBtn.addEventListener('click', () => {
    const isHidden = moreText.hasAttribute('hidden');

    if (isHidden) {
      moreText.removeAttribute('hidden');
      toggleBtn.textContent = 'Hidden';
    } else {
      moreText.setAttribute('hidden', '');
      toggleBtn.textContent = 'Read more';
    }
  });
});
