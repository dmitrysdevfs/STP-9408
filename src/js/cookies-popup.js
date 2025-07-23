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

  createPopup() {
    fetch('./partials/cookies-popup.html')
      .then(response => response.text())
      .then(popupHTML => {
        document.body.insertAdjacentHTML('beforeend', popupHTML);
        this.popup = document.getElementById('cookiesPopup');
        this.addEventListeners();
        this.showPopup();
      })
      .catch(error => {
        console.error('Error loading cookies popup:', error);
      });
  }

  addEventListeners() {
    const acceptBtn = document.getElementById('acceptCookies');
    acceptBtn.addEventListener('click', () => this.handleAccept());

    const declineBtn = document.getElementById('declineCookies');
    declineBtn.addEventListener('click', () => this.handleDecline());

    this.popup.addEventListener('click', e => {
      if (e.target === this.popup) {
        this.handleDecline();
      }
    });

    const content = this.popup.querySelector('.cookies-popup__content');
    content.addEventListener('click', e => {
      e.stopPropagation();
    });
  }

  showPopup() {
    setTimeout(() => {
      this.popup.classList.add('active');
    }, 100);
  }

  hidePopup() {
    this.popup.classList.remove('active');
    setTimeout(() => {
      if (this.popup && this.popup.parentNode) {
        this.popup.parentNode.removeChild(this.popup);
      }
    }, 300);
  }

  handleAccept() {
    localStorage.setItem(this.storageKey, 'accepted');
    this.hidePopup();
    this.onCookiesAccepted();
  }

  handleDecline() {
    localStorage.setItem(this.storageKey, 'declined');
    this.hidePopup();
    this.onCookiesDeclined();
  }

  onCookiesAccepted() {
    console.log('Cookies accepted');
  }

  onCookiesDeclined() {
    console.log('Cookies declined');
  }
}

const cookiesPopup = new CookiesPopup();
export default cookiesPopup;
