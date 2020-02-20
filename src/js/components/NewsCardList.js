import BaseComponent from './BaseComponent';
import { STEP_SHOW_MORE } from '../constants/variables';

class NewsCardList extends BaseComponent {
  constructor(...props) {
    super(...props);
    this._element = this.element;
    this._cardLoaderElement = this._element.querySelector('#search-loader-template').content.querySelector('.search-result__content').cloneNode(true);
    this._cardErrorElement = this._element.querySelector('#search-error-template').content.querySelector('.search-result__content').cloneNode(true);
    this._cardListElement = this._element.querySelector('#search-cardList-template').content.querySelector('.card-list').cloneNode(true);
    this._cardContainerElement = this._cardListElement.querySelector('.card-list__container');
    this._showMoreBtn = this._cardListElement.querySelector('#show-more-button');
    this.createCardCalback = props[0].calback;
    this._onButtonClick = this._onButtonClick.bind(this);
    this._setButtonHandler();
  }

  _renderMarkup(markup) {
    this._element.appendChild(markup);
  }

  _addCard(card) {
    this._cardContainerElement.appendChild(card);
  }

  _setButtonHandler() {
    this._showMoreBtn.addEventListener('click', this._onButtonClick);
  }

  _removeButtonHandler() {
    this._showMoreBtn.removeEventListener('click', this._onButtonClick);
  }

  _onButtonClick(e) {
    e.stopPropagation();
    this._showMore();
  }

  _hideBtnMoreNews() {
    this._showMoreBtn.classList.add('visually-hidden');
  }

  _showMore() {
    const data = this._newsCards.splice(0, STEP_SHOW_MORE);
    if (this._newsCards.length === 0) {
      this._hideBtnMoreNews();
      this._removeButtonHandler();
    }
    this.renderResults(data);
  }

  resetMarkup() {
    this._element.removeChild(this._element.lastChild);
  }

  reloadMarkup() {
    const renderedCards = this._cardContainerElement.querySelectorAll('.card');
    this._element.removeChild(this._element.lastChild);
    renderedCards.forEach(() => {
      this._cardContainerElement.removeChild(this._cardContainerElement.lastChild);
    });
  }

  setNewsCards(cards, isLoggedIn, keyword) {
    this._newsCards = cards;
    this._isLoggedIn = isLoggedIn;
    this._keyword = keyword;
    this._showMore();
  }

  renderResults(cards) {
    this.resetMarkup();
    this._renderMarkup(this._cardListElement);
    cards.forEach((element) => {
      this._addCard(this.createCardCalback(element, this._isLoggedIn, this._keyword));
    });
  }

  renderLoader() {
    this.resetMarkup();
    this._renderMarkup(this._cardLoaderElement);
  }

  renderError(error) {
    this.resetMarkup();
    if (error) {
      this._cardErrorElement.querySelector('.search-result__image').remove();
      this._cardErrorElement.querySelector('.search-result__text')
        .textContent = `Запрос выполнился с ошибкой: ${error.message}`;
    }
    this._renderMarkup(this._cardErrorElement);
  }
}

export default NewsCardList;
