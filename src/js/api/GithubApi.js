export default class GithubApi {
  constructor(props) {
    this.url = props.URL;
    this.username = props.USER_NAME;
    this.rep = props.REP;
    this.token = props.TOKEN;
  }

  static getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getCommits() {
    return fetch(`${this.url}/repos/${this.username}/${this.rep}/commits`, {
      headers: {
        authorization: `${this.token}`,
      },
    })
      .then((res) => GithubApi.getResponseData(res));
  }
}
