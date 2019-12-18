import '../styles/index.css';
import { buttonHandler } from './modules/validation';

const authorizationButton = document.getElementById('authorization');
const exitButton = document.getElementById('exit');
const headerContent = document.querySelector('.header__content');
const popUpEnter = document.getElementById('popup-enter');

// const formNew = document.forms.new;
const formEdit = document.forms.edit;

headerContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('button_color_transparent')) {
    authorizationButton.classList.toggle('button_invisible');
    exitButton.classList.toggle('button_invisible');
  }
});


// formNew.addEventListener('input',  buttonHandler);
formEdit.addEventListener('input', buttonHandler);
