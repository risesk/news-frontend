import '../styles/saved.css';
import NewsCard from '../js/components/NewsCard';
import NewsCardList from '../js/components/NewsCardList';
import Header from '../js/components/Header';
import InfoSection from '../js/components/InfoSection';
import {
  mainApi,
  authPopup,
  logoutCallback,
} from '../js/modules/initAuth';

let isLoggedIn = false;
let cardsArray = [];
let userLogin = '';

const cardTemplate = document.querySelector('#news-card-template').content.querySelector('.card');
const overlay = document.querySelector('.overlay');

const infoSection = new InfoSection('.info');
const header = new Header('.header', 'dark', overlay);

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

authPopup.setSubmitCallback((info) => mainApi.signin(info), () => {}, checkCurrentAuthStatus);
header.setCallbacks(() => authPopup.open(), () => logoutCallback(checkCurrentAuthStatus));

function searchArticles() {
  newsCardList.renderLoader();
  mainApi.getArticles()
    .then((result) => {
      infoSection.render(result, userLogin);
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
