import BaseComponent from './BaseComponent';
import { getNewsCardDate } from '../utils/formatDate';

class NewsCard extends BaseComponent {
  constructor(props) {
    super(props);
    this.cardElement = props.cardTemplate.cloneNode(true);
    this._isLoggedin = props.loginStatus;
    this._isLiked = false;
    this._openCard = this._openCard.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this._like = this._like.bind(this);
    this.createCard(props.data, props.keyword);
    this._renderHint(this._isLoggedin);
    this._setEventListeners();
  }

  createCard(data, keyword) {
    this._setInfo(data, keyword);
    this._cardId = data._id;
    this.cardElement.querySelector('.card__date').textContent = getNewsCardDate(this._data.date);
    this.cardElement.querySelector('.card__title').textContent = this._data.title;
    this.cardElement.querySelector('.card__text').textContent = this._data.text;
    this.cardElement.querySelector('.card__source').textContent = this._data.source;
    this.cardElement.querySelector('.card__image').setAttribute('src', `${this._data.image}`);
    const cardKey = this.cardElement.querySelector('.card__key');
    if (cardKey) cardKey.textContent = this._data.keyword;
    return this.cardElement;
  }

  _renderIcon(isLoggedIn, liked) {
    const cardBookmark = this.cardElement.querySelector('.card__bookmark');
    if (isLoggedIn && liked) {
      cardBookmark.classList.add('card__bookmark_is-active');
    } else cardBookmark.classList.remove('card__bookmark_is-active');
  }

  _renderHint(isLoggedIn) {
    const cardHint = this.cardElement.querySelector('.card__hint');
    if (cardHint.classList.contains('card__hint_saved')) return;
    if (isLoggedIn) {
      cardHint.classList.add('visually-hidden');
    } else cardHint.classList.remove('visually-hidden');
  }


  _setEventListeners() {
    const bokmarkBtn = this.cardElement.querySelector('#deleteButton');
    const cardBookmark = this.cardElement.querySelector('.card__bookmark');
    this._addlistener({
      element: this.cardElement.querySelector('.card__image'),
      eventType: 'click',
      callback: this._openCard,
    });
    this._addlistener({
      element: this.cardElement.querySelector('.card__content'),
      eventType: 'click',
      callback: this._openCard,
    });
    if (bokmarkBtn) {
      this._addlistener({ element: bokmarkBtn, eventType: 'click', callback: this._deleteCard });
    } else if (this._isLoggedin) {
      this._addlistener({ element: cardBookmark, eventType: 'click', callback: this._like });
    }
  }

  _like(e) {
    if (!this._isLiked) {
      e.preventDefault();
      e.stopPropagation();
      this._dependecies.mainApi.createArticle(this._data)
        .then((card) => {
          this._isLiked = true;
          this._renderIcon(this._isLoggedin, this._isLiked);
          this._cardId = card._id;
        })
        .catch((err) => {
          console.log(err);
        });
    } else this._deleteLike(e);
  }

  _deleteLike(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dependecies.mainApi.removeArticle(this._cardId)
      .then(() => {
        this._isLiked = false;
        this._renderIcon(this._isLoggedin, this._isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  _setInfo(data, keyword) {
    this._data = {
      keyword: keyword || data.keyword,
      title: data.title,
      text: data.description || data.text,
      date: data.publishedAt || data.date,
      source: data.source.name || data.source,
      link: data.url || data.link,
      image: data.urlToImage || data.image,
    };
  }

  _getInfo() {
    return this._data;
  }

  setDependencies(dependecies) {
    this._dependecies = dependecies;
  }

  _openCard() {
    window.open(this._data.link);
  }

  _deleteCard(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dependecies.mainApi.removeArticle(this._cardId)
      .then(() => {
        this.cardElement.remove();
        this._clearListeners();
        if (this._dependecies.infoSection) this._dependecies.infoSection.render();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default NewsCard;
