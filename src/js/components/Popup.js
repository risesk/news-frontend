import { ESCAPE_CODE } from '../constants/variables';

class Popup {
  constructor(selector, container) {
    this._container = container;
    this._element = document.querySelector(selector).content.querySelector('.popup').cloneNode(true);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
    this._setEventListeners();
  }

  open() {
    this._element.classList.add('popup_is-opened');
    this._container.appendChild(this._element);
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('mousedown', this.close);
  }

  close() {
    this._element.classList.remove('popup_is-opened');
    this._element.remove();
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('mousedown', this.close);
  }

  setPopupLink(cb) {
    this._element.querySelector('.popup__link').addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
      cb();
    });
  }

  _setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(e) {
    if (e.keyCode === ESCAPE_CODE) {
      this.close();
    }
  }
}

export default Popup;
