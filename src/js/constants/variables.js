const STEP_SHOW_MORE = 3;
const TIME_IN_MS = 1000 * 60 * 60 * 24 * 7;
const ESCAPE_CODE = 27;
const EMPTY_FIELD = 0;
const MIN_TEXT_LENGTH = 2;
const MAX_TEXT_LENGTH = 20;

const MAIN_API_URL = 'https://api.mestoapp.site';
// const MAIN_API_URL = 'http://localhost:3000';

const newsApiData = {
  KEY: 'fe4c1bfa9524495bb3034d002fbb03cb',
  BASE_URL: 'https://newsapi.org/v2',
  SEARCH_TIME_INTERVAL: 7,
  NUMBER_OF_ARTICLES: 100,
};

const githubData = {
  URL: 'https://api.github.com',
  USER_NAME: 'risesk',
  REP: 'news-frontend',
  TOKEN: '51e16e5782ae34b91d7d22b72d4ae9da064a04a2',
};

const DATE_BY_MONTHS = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
];

const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Это обязательное поле',
  NOT_CONSISTENT_TEXT_FIELD: 'Должно быть от 2 до 20 символов',
  NOT_CONSISTENT_PASSWORD_FIELD: 'Должно быть от 6 до 20 символов',
  NOT_CONSISTENT_EMAIL_FIELD: 'Неправильный формат email',
};

export {
  STEP_SHOW_MORE,
  TIME_IN_MS,
  ESCAPE_CODE,
  EMPTY_FIELD,
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
  MAIN_API_URL,
  newsApiData,
  githubData,
  DATE_BY_MONTHS,
  ERROR_MESSAGES,
};
