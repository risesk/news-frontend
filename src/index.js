import './styles/index.css';
import { newsApiData } from './js/constants/variables';
import NewsApi from './js/api/NewsApi';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';
import SearchSection from './js/components/SearchSection';
import Header from './js/components/Header';
import {
  getCurrentDate,
  getWeekBeforeDate,
} from './js/utils/formatDate';
import {
  mainApi,
  authPopup,
  logoutCallback,
} from './js/modules/initAuth';

let isLoggedIn = false;
let cardsArray = [];

const cardTemplate = document.querySelector('#news-card-template').content.querySelector('.card');
const searchForm = document.querySelector('.search__form');
const searchInput = searchForm.querySelector('.search__input');
const searchButton = searchForm.querySelector('.button');
const searchErrorElement = searchForm.querySelector('.search__error');
const overlay = document.querySelector('.overlay');

const newsApi = new NewsApi(newsApiData.BASE_URL, newsApiData.KEY);
const header = new Header('.header', 'light', overlay);

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

authPopup.setSubmitCallback((info) => mainApi.signin(info), () => {}, checkCurrentAuthStatus);
header.setCallbacks(() => authPopup.open(), () => logoutCallback(checkCurrentAuthStatus));

const searchSection = new SearchSection({
  input: searchInput,
  btnSubmit: searchButton,
  error: searchErrorElement,
  selector: '.search',
});

function searchArticles(e) {
  e.preventDefault();
  const currentDate = getCurrentDate();
  const weekBeforeCurrentDate = getWeekBeforeDate();
  searchSection.render(true);
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
    .catch((err) => newsCardList.renderError(err))
    .finally(() => searchSection.render(false));
}

searchSection.setHandler(
  [
    {
      selector: '.search__button',
      eventType: 'click',
      callback: (e) => searchArticles(e),
    },
  ],
);

checkCurrentAuthStatus();
