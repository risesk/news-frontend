export default class NewsApi {
  constructor(url, key) {
    this._url = url;
    this._key = key;
  }

  getNews(keyword, from, to, size) {
    return fetch(`${this._url}/everything?q=${keyword}&from=${from}&to=${to}&language=ru&pageSize=${size}`,
      {
        headers: {
          Authorization: this._key,
        },
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }
}
