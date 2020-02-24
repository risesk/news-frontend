import '../styles/about.css';
import 'swiper/js/swiper.min';
import initSwiper from '../js/utils/initSwiper';
import { githubData, MAIN_API_URL } from '../js/constants/variables';
import GithubApi from '../js/api/GithubApi';
import CommitCard from '../js/components/CommitCard';

import Popup from '../js/components/Popup';
import Form from '../js/components/Form';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';

const preloader = document.querySelector('#preloader');
const errorSection = document.querySelector('#error-section');
const container = document.querySelector('.swiper-wrapper');
const commitsSection = document.querySelector('.commits');

const githubApi = new GithubApi(githubData);

preloader.classList.remove('preloader_is-hidden');
githubApi.getCommits()
  .then((commits) => {
    preloader.classList.remove('visually-hidden');
    commits.forEach((commit) => container.appendChild(CommitCard.createCard(commit)));
    commitsSection.classList.remove('visually-hidden');
    initSwiper();
  })
  .catch(() => {
    errorSection.classList.remove('visually-hidden');
  })
  .finally(() => {
    preloader.classList.add('visually-hidden');
  });

let isLoggedIn = false;

const rootElement = document.querySelector('.page');
const overlay = document.querySelector('.overlay');

const header = new Header('.header', 'light', overlay);
const mainApi = new MainApi(MAIN_API_URL);
const authPopup = new Form('#popup-auth', rootElement);
const regPopup = new Form('#popup-reg', rootElement);
const successPopup = new Popup('#popup-signup-success', rootElement);

const checkCurrentAuthStatus = () => {
  mainApi.getUserData()
    .then((user) => {
      isLoggedIn = true;
      const userLogin = user.name;
      header.render(isLoggedIn, userLogin);
    })
    .catch(() => {
      isLoggedIn = false;
      header.render(false);
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

checkCurrentAuthStatus();
