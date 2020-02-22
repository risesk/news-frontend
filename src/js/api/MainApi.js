export default class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  signup({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  signin({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => (res.ok ? res : Promise.reject(res)));
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => this._getResponseData(res));
  }

  removeArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }
}
