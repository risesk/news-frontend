import '../styles/about.css';
import 'swiper/js/swiper.min';
import initSwiper from '../js/utils/initSwiper';
import { githubData } from '../js/constants/variables';
import GithubApi from '../js/api/GithubApi';
import CommitCard from '../js/components/CommitCard';
import Header from '../js/components/Header';
import {
  mainApi,
  authPopup,
  logoutCallback,
} from '../js/modules/initAuth';

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

const overlay = document.querySelector('.overlay');

const header = new Header('.header', 'dark', overlay);

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

authPopup.setSubmitCallback((info) => mainApi.signin(info), () => {}, checkCurrentAuthStatus);
header.setCallbacks(() => authPopup.open(), () => logoutCallback(checkCurrentAuthStatus));

checkCurrentAuthStatus();
