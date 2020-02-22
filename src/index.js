import './styles/index.css';
import { newsApiData, MAIN_API_URL } from './js/constants/variables';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import SearchSection from './js/components/SearchSection';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import {
  getCurrentDate,
  getWeekBeforeDate,
} from './js/utils/formatDate';

let isLoggedIn = false;
let cardsArray = [];

const cardTemplate = document.querySelector('#news-card-template').content.querySelector('.card');
const rootElement = document.querySelector('.page');
const searchForm = document.forms.searchNews;
const searchInput = searchForm.elements['search-input'];
const searchButton = searchForm.elements['search-button'];
const searchErrorElement = searchForm.querySelector('.search__error');
const overlay = document.querySelector('.overlay');

const newsApi = new NewsApi(newsApiData.BASE_URL, newsApiData.KEY);
const mainApi = new MainApi(MAIN_API_URL, newsApiData.KEY);
const header = new Header('.header', 'light', overlay);
const authPopup = new Form('#popup-auth', rootElement);
const regPopup = new Form('#popup-reg', rootElement);
const successPopup = new Popup('#popup-signup-success', rootElement);
const createNewsCard = (data, loginStatus, keyword) => {
  const newsCard = new NewsCard({
    cardTemplate,
    data,
    loginStatus,
    keyword,
  });
  newsCard.setDependencies({ mainApi });
  return newsCard.cardElement;
};
const newsCardList = new NewsCardList({
  selector: '#search-result-template',
  calback: createNewsCard,
});

const checkCurrentAuthStatus = () => {
  mainApi.getUserData()
    .then((user) => {
      isLoggedIn = true;
      const userLogin = user.name;
      header.render(isLoggedIn, userLogin);
      if (cardsArray.length > 0) newsCardList.reloadMarkup();
    })
    .catch(() => {
      isLoggedIn = false;
      header.render(false);
      if (cardsArray.length > 0) newsCardList.reloadMarkup();
    });
};
const logoutCallback = () => {
  mainApi.logout()
    .then(() => {
      checkCurrentAuthStatus();
    })
    .catch((e) => console.log(e));
};

authPopup.setFormLink(() => regPopup.open());
regPopup.setFormLink(() => authPopup.open());
successPopup.setPopupLink(() => authPopup.open());

regPopup.setSubmitCallback((info) => mainApi.signup(info), () => successPopup.open());
authPopup.setSubmitCallback((info) => mainApi.signin(info), () => {}, checkCurrentAuthStatus);
header.setCallbacks(() => authPopup.open(), logoutCallback);

function searchArticles() {
  const currentDate = getCurrentDate();
  const weekBeforeCurrentDate = getWeekBeforeDate();
  newsCardList.renderLoader();
  newsApi.getNews(searchInput.value,
    currentDate,
    weekBeforeCurrentDate,
    newsApiData.NUMBER_OF_ARTICLES)
    .then((result) => {
      if (result.articles.length === 0) {
        return newsCardList.renderError();
      }
      cardsArray = result.articles;
      newsCardList.setNewsCards(cardsArray, isLoggedIn, searchInput.value);
      return result;
    })
    .catch((err) => newsCardList.renderError(err));
}

// eslint-disable-next-line no-unused-vars
const searchSection = new SearchSection({
  input: searchInput,
  btnSubmit: searchButton,
  error: searchErrorElement,
  selector: '.search',
  handlers: [
    {
      selector: '.search__button',
      eventType: 'click',
      callback: () => searchArticles(),
    },
  ],
});

checkCurrentAuthStatus();
