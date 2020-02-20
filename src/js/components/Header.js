import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(selector, color, overlay) {
    super({ selector });
    this._overlay = overlay;
    this._headerMenu = this.element.querySelector('.header__menu');
    this._mobileBtn = this.element.querySelector('.header__mobile-button');
    this._authButton = this.element.querySelector('#authorization');
    this._logOutButton = this.element.querySelector('#logout');
    this._savedArticlesLink = this.element.querySelector('#savedArticlesLink');
    this._colorSelector = color === 'light' ? 'header_color_white' : '';
    this._setListeners();
  }

  _renderAuthHeader(userName) {
    this._savedArticlesLink.classList.remove('visually-hidden');
    this._logOutButton.classList.remove('visually-hidden');
    this._logOutButton.querySelector('.button__text').textContent = userName;
    this._authButton.classList.add('visually-hidden');
    this._setHandlers([
      {
        selector: '#logout',
        eventType: 'click',
        callback: () => this._logOutButtonCb(),
      },
    ]);
  }

  _renderNotAuthHeader() {
    this._savedArticlesLink.classList.add('visually-hidden');
    this._logOutButton.classList.add('visually-hidden');
    this._logOutButton.querySelector('.button__text').textContent = '';
    this._authButton.classList.remove('visually-hidden');
    this._setHandlers([
      {
        selector: '#authorization',
        eventType: 'click',
        callback: () => {
          this._closeMobileNavbar();
          this._authButtonCb();
        },
      },
    ]);
  }

  _closeMobileNavbar() {
    this._headerMenu.classList.remove('header__menu_is-open');
    this.element.classList.remove('header_background-color_dark');
    this._overlay.classList.remove('overlay_is_opened');
    this._mobileBtn.classList.remove('header__mobile-button_close');

    this._mobileBtn.removeEventListener('click', this._closeMobileNavbar);
    this._mobileBtn.addEventListener('click', this._openMobileNavbar.bind(this));
  }

  _openMobileNavbar() {
    this._headerMenu.classList.add('header__menu_is-open');
    this.element.classList.add('header_background-color_dark');
    this._overlay.classList.add('overlay_is_opened');
    this._mobileBtn.classList.add('header__mobile-button_close');

    this._mobileBtn.removeEventListener('click', this._openMobileNavbar);
    this._mobileBtn.addEventListener('click', this._closeMobileNavbar.bind(this));
  }

  _setListeners() {
    this._setHandlers([
      {
        selector: '.header__mobile-button',
        eventType: 'click',
        callback: () => this._openMobileNavbar(),
      },
    ]);
  }

  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this._renderAuthHeader(userName);
    } else this._renderNotAuthHeader();
  }

  setCallbacks(authCb, logOutCb) {
    this._authButtonCb = authCb;
    this._logOutButtonCb = logOutCb;
  }
}
