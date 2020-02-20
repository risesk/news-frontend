import '../styles/saved.css';
import { newsApiData, MAIN_API_URL } from '../js/constants/variables';
import NewsCard from '../js/components/NewsCard';
import NewsCardList from '../js/components/NewsCardList';
import Popup from '../js/components/Popup';
import Form from '../js/components/Form';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import InfoSection from '../js/components/InfoSection';

let isLoggedIn = false;
let cardsArray = [];
let userLogin = null;

const cardTemplate = document.getElementById('news-card-template').content.querySelector('.card');
const rootElement = document.querySelector('.page');
const overlay = document.querySelector('.overlay');

const infoSection = new InfoSection('.info');
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
  newsCard.setDependencies({ mainApi, infoSection });
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
      userLogin = user.name;
      header.render(isLoggedIn, userLogin);
      if (cardsArray.length > 0) newsCardList.reloadMarkup();
    })
    .catch(() => {
      window.location.href = '/';
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
  newsCardList.renderLoader();
  mainApi.getArticles()
    .then((result) => {
      infoSection.render({ articles: result, username: userLogin });
      if (result.length > 0) {
        cardsArray = result;
        return newsCardList.setNewsCards(cardsArray, isLoggedIn);
      }
      return newsCardList.resetMarkup();
    })
    .catch(() => infoSection.render());
}

checkCurrentAuthStatus();
searchArticles();
