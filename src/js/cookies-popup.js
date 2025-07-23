// Cookies Popup
document.addEventListener('DOMContentLoaded', function () {
  const storageKey = 'cookiesConsent';

  // Перевіряємо, чи користувач вже дав згоду
  if (localStorage.getItem(storageKey) !== null) {
    return;
  }

  // Створюємо popup
  const popupHTML = `
    <div class="cookies-popup" id="cookiesPopup">
      <div class="cookies-popup__content">
        <h2 class="cookies-popup__title">Cookies Policy</h2>
        <p class="cookies-popup__text">
          We use cookies to improve your experience on our website.<br class="desktop-only">
          By browsing this website, you agree to our use of cookies.
        </p>
        <div class="cookies-popup__buttons">
          <button class="cookies-popup__button cookies-popup__button--accept" id="acceptCookies">
            Accept Cookies
          </button>
          <button class="cookies-popup__button cookies-popup__button--decline" id="declineCookies">
            Decline Cookies
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', popupHTML);

  // Чекаємо трохи, щоб DOM оновився
  setTimeout(() => {
    const popup = document.getElementById('cookiesPopup');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    // Перевіряємо, чи елементи існують
    if (!popup || !acceptBtn || !declineBtn) {
      console.error('Cookies popup elements not found');
      return;
    }

    // Показуємо popup
    popup.classList.add('active');

    // Обробники подій
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(storageKey, 'accepted');
      hidePopup();
      console.log('Cookies accepted');
    });

    declineBtn.addEventListener('click', function () {
      localStorage.setItem(storageKey, 'declined');
      hidePopup();
      console.log('Cookies declined');
    });

    // Закриття по кліку на overlay
    popup.addEventListener('click', function (e) {
      if (e.target === popup) {
        localStorage.setItem(storageKey, 'declined');
        hidePopup();
        console.log('Cookies declined');
      }
    });

    // Запобігання закриття при кліку на контент
    const content = popup.querySelector('.cookies-popup__content');
    if (content) {
      content.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }

    function hidePopup() {
      popup.classList.remove('active');
      setTimeout(() => {
        if (popup && popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 300);
    }
  }, 50);
});
