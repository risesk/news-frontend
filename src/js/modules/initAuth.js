import Popup from '../components/Popup';
import Form from '../components/Form';
import MainApi from '../api/MainApi';
import { newsApiData, MAIN_API_URL } from '../constants/variables';

const rootElement = document.querySelector('.page');

const mainApi = new MainApi(MAIN_API_URL, newsApiData.KEY);
const authPopup = new Form('#popup-auth', rootElement);
const regPopup = new Form('#popup-reg', rootElement);
const successPopup = new Popup('#popup-signup-success', rootElement);

const logoutCallback = (cb) => {
  mainApi.logout()
    .then(() => {
      cb();
    })
    .catch((e) => console.log(e));
};

authPopup.setFormLink(() => regPopup.open());
regPopup.setFormLink(() => authPopup.open());
successPopup.setPopupLink(() => authPopup.open());

regPopup.setSubmitCallback((info) => mainApi.signup(info), () => successPopup.open());

export {
  mainApi,
  authPopup,
  logoutCallback,
};
