// Cookies Popup
class CookiesPopup {
  constructor() {
    this.popup = null;
    this.storageKey = 'cookiesConsent';
    this.init();
  }

  init() {
    if (this.hasUserConsent()) {
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createPopup());
    } else {
      this.createPopup();
    }
  }

  hasUserConsent() {
    return localStorage.getItem(this.storageKey) !== null;
  }

  async createPopup() {
    try {
      const response = await fetch('./partials/cookies-popup.html');
      if (!response.ok) {
        throw new Error('Failed to load cookies popup template');
      }

      const popupHTML = await response.text();
      document.body.insertAdjacentHTML('beforeend', popupHTML);

      setTimeout(() => {
        this.popup = document.querySelector('[data-cookies-popup]');
        if (!this.popup) {
          console.error('Cookies popup element not found');
          return;
        }

        this.addEventListeners();
        this.showPopup();
      }, 50);
    } catch (error) {
      console.error('Error loading cookies popup:', error);

      this.createFallbackPopup();
    }
  }

  createFallbackPopup() {
    const popupHTML = `
      <div class="cookies-popup" id="cookiesPopup" data-cookies-popup>
        <div class="cookies-popup__content" data-cookies-content>
          <h2 class="cookies-popup__title">Cookies Policy</h2>
          <p class="cookies-popup__text">
            We use cookies to improve your experience on our website.<br class="desktop-only">
            By browsing this website, you agree to our use of cookies.
          </p>
          <div class="cookies-popup__buttons">
            <button class="cookies-popup__button cookies-popup__button--accept" id="acceptCookies" data-cookies-accept>
              Accept Cookies
            </button>
            <button class="cookies-popup__button cookies-popup__button--decline" id="declineCookies" data-cookies-decline>
              Decline Cookies
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', popupHTML);

    setTimeout(() => {
      this.popup = document.querySelector('[data-cookies-popup]');
      if (this.popup) {
        this.addEventListeners();
        this.showPopup();
      }
    }, 50);
  }

  addEventListeners() {
    const acceptBtn = document.querySelector('[data-cookies-accept]');
    const declineBtn = document.querySelector('[data-cookies-decline]');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => this.handleAccept());
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => this.handleDecline());
    }

    if (this.popup) {
      this.popup.addEventListener('click', e => {
        if (e.target === this.popup) {
          this.handleDecline();
        }
      });

      const content = this.popup.querySelector('[data-cookies-content]');
      if (content) {
        content.addEventListener('click', e => {
          e.stopPropagation();
        });
      }
    }
  }

  showPopup() {
    if (this.popup) {
      this.popup.classList.add('active');
    }
  }

  hidePopup() {
    if (this.popup) {
      this.popup.classList.remove('active');
      setTimeout(() => {
        if (this.popup && this.popup.parentNode) {
          this.popup.parentNode.removeChild(this.popup);
        }
      }, 300);
    }
  }

  handleAccept() {
    localStorage.setItem(this.storageKey, 'accepted');
    this.hidePopup();
    console.log('Cookies accepted');
  }

  handleDecline() {
    localStorage.setItem(this.storageKey, 'declined');
    this.hidePopup();
    console.log('Cookies declined');
  }
}

const cookiesPopup = new CookiesPopup();
