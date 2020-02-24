export default class InfoSection {
  constructor(selector, userName) {
    this._element = document.querySelector(selector);
    this._subtitle = this._element.querySelector('.info__subtitle');
    this._keys = this._element.querySelector('.info__keys');
    this._keysItem = this._element.querySelector('.info__keys-item');
    this._userName = userName;
    this._articles = [];
  }

  _renderSubtitle(numOfArticles) {
    this._subtitle.textContent = `${this._userName}, у вас ${numOfArticles} сохраненных статей`;
  }

  _renderSeparator(text) {
    const separator = document.createElement('span');
    separator.textContent = text;
    this._keys.appendChild(separator);
  }

  _renderKeysItem(template) {
    const keysItem = this._keysItem.cloneNode(true);
    keysItem.textContent = template;
    this._keys.appendChild(keysItem);
  }

  _getKeywords(articles) {
    const keywords = articles.reduce((acc, { keyword }) => {
      if (acc[keyword]) {
        acc[keyword] += 1;
      } else {
        acc[keyword] = 1;
      }
      return acc;
    }, {});
    this._keywords = Object.keys(keywords);
  }

  _resetKeysMarkup() {
    while (this._keys.children.length > 1) {
      this._keys.removeChild(this._keys.lastChild);
    }
  }

  render(articles = this._articles, username = this._userName) {
    this._userName = username;
    this._articles = articles;
    this._getKeywords(articles);
    const [firstKeyWord, secondKeyWord, thirdKeyWord] = this._keywords;
    this._renderSubtitle(articles.length);
    this._resetKeysMarkup();

    if (articles.length === 0) this._keys.remove();
    else if (this._keywords.length === 1) {
      this._renderKeysItem(firstKeyWord);
    } else if (this._keywords.length === 2) {
      this._renderKeysItem(firstKeyWord);
      this._renderSeparator(' и ');
      this._renderKeysItem(secondKeyWord);
    } else if (this._keywords.length === 3) {
      this._renderKeysItem(firstKeyWord);
      this._renderSeparator(', ');
      this._renderKeysItem(secondKeyWord);
      this._renderSeparator(' и ');
      this._renderKeysItem(thirdKeyWord);
    } else if (this._keywords.length > 3) {
      this._renderKeysItem(firstKeyWord);
      this._renderSeparator(', ');
      this._renderKeysItem(secondKeyWord);
      this._renderSeparator(' и ');
      this._renderKeysItem(`${this._keywords.length - 2} другим`);
    }
  }
}
