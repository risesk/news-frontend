import '../styles/index.css';
import { buttonHandler } from './modules/validation';

const authorizationButton = document.getElementById('authorization');

const popupAuth = document.querySelector('#popup-auth');
const popupReg = document.querySelector('#popup-reg');
const mobileBtn = document.querySelector('.button__mobile');
const headerMenu = document.querySelector('.header__menu');
const header = document.querySelector('.header');

function openRegPopup(event) {
  event.preventDefault();
  const formReg = document.forms.reg;
  const closeBtn = popupReg.querySelector('.popup__close');
  popupAuth.classList.remove('popup_is-opened');
  popupReg.classList.add('popup_is-opened');

  closeBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__close')) {
      popupReg.classList.remove('popup_is-opened');
    }
  });
  formReg.addEventListener('input', buttonHandler);
}

authorizationButton.addEventListener('click', () => {
  const formAuth = document.forms.auth;
  const closeBtn = popupAuth.querySelector('.popup__close');

  popupAuth.classList.add('popup_is-opened');

  formAuth.addEventListener('input', buttonHandler);
  closeBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup__close')) {
      popupAuth.classList.remove('popup_is-opened');
    }
  });
  popupAuth.querySelector('.popup__link').addEventListener('click', openRegPopup);
  headerMenu.classList.remove('header__menu_is-open');
  header.classList.remove('header_background-color_dark');
  mobileBtn.classList.remove('button__mobile_close');
  mobileBtn.style.display = 'none';
});

mobileBtn.addEventListener('click', () => {
  headerMenu.classList.toggle('header__menu_is-open');
  header.classList.toggle('header_background-color_dark');
  mobileBtn.classList.toggle('button__mobile_close');
});
