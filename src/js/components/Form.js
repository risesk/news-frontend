import Popup from './Popup';
import { ERROR_MESSAGES } from '../constants/variables';

class Form extends Popup {
  constructor(selector, container) {
    super(selector, container);
    this._submitCallback = () => {};
    this._successSubmitCallback = () => {};
    this._renderHeaderCallback = () => {};
  }

  _setEventListeners() {
    super._setEventListeners();
    this._inputs = Array.from(this._element.querySelectorAll('.popup__input'));
    this._errorMessageElements = Array.from(this._element.querySelectorAll('.error-message'));
    this._submitErrorElement = this._element.querySelector('#server-error');
    this._submitButton = this._element.querySelector('.popup__button');

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateInputElement(inputElement);
        this._checkButton();
      });
    });
    this._submitButton.addEventListener('click', (e) => this._onSubmitButtonHandler(e));
  }

  _onSubmitButtonHandler(e) {
    e.preventDefault();
    this._resetError(this._submitErrorElement);
    const formInfo = this._getInfo();
    this.render(true);
    return this._submitCallback(formInfo)
      .then(() => {
        this.close();
        this._successSubmitCallback();
        this._renderHeaderCallback();
      })
      .catch((err) => {
        if (err.message) {
          this._activateError(this._submitErrorElement);
          this._submitErrorElement.textContent = ERROR_MESSAGES.NO_CONNECTION;
          return;
        }
        err.json()
          .then((res) => {
            this._activateError(this._submitErrorElement);
            this._submitErrorElement.textContent = `${res.message}`;
          })
          .catch((error) => console.log(error));
      })
      .finally(() => this.render(false));
  }

  _validateInputElement(inputElement) {
    const errorMessageElement = this._errorMessageElements
      .find((element) => element.getAttribute('for') === inputElement.name);
    this._resetError(errorMessageElement);
    if (inputElement.type === 'email') {
      this._checkEmailInput(inputElement, errorMessageElement);
    } if (inputElement.type === 'password') {
      this._checkPasswordInput(inputElement, errorMessageElement);
    } if (inputElement.type === 'text') {
      this._checkTextInput(inputElement, errorMessageElement);
    }
  }

  _checkTextInput(inputElement, errorMessageElement) {
    const errorElement = errorMessageElement;
    if (inputElement.value.length === 0) {
      errorElement.textContent = ERROR_MESSAGES.REQUIRED_FIELD;
      this._activateError(errorElement);
    } else if (inputElement.value.length === 1 || inputElement.value.length > 20) {
      errorElement.textContent = ERROR_MESSAGES.NOT_CONSISTENT_TEXT_FIELD;
      this._activateError(errorElement);
    }
  }

  _checkEmailInput(inputElement, errorMessageElement) {
    const errorElement = errorMessageElement;
    if (!inputElement.checkValidity()) {
      errorElement.textContent = ERROR_MESSAGES.NOT_CONSISTENT_EMAIL_FIELD;
      this._activateError(errorElement);
    }
  }

  _checkPasswordInput(inputElement, errorMessageElement) {
    const errorElement = errorMessageElement;
    if (!inputElement.checkValidity()) {
      errorElement.textContent = ERROR_MESSAGES.NOT_CONSISTENT_PASSWORD_FIELD;
      this._activateError(errorElement);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _activateError(errorElement) {
    errorElement.classList.add('error-message_visible');
  }

  // eslint-disable-next-line class-methods-use-this
  _resetError(errorElement) {
    const element = errorElement;
    element.classList.remove('error-message_visible');
    element.textContent = '';
  }

  _checkButton() {
    let isValidForm = true;
    this._inputs.forEach((elem) => {
      if (!elem.checkValidity()) isValidForm = false;
    });
    if (!isValidForm) {
      this._activateButton();
    } else {
      this._deactivateButton();
    }
  }

  _activateButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add('popup__button');
  }

  _deactivateButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove('popup__button');
  }

  _clear() {
    this._inputs.forEach((inputElement) => {
      const input = inputElement;
      input.value = '';
      const errorMessageElement = this._errorMessageElements.find((element) => element.getAttribute('for') === inputElement.name);
      errorMessageElement.classList.remove('error-message_visible');
    });
  }

  _getInfo() {
    return this._inputs.reduce((acc, input) => {
      const info = acc;
      info[input.name] = input.value;
      return info;
    }, {});
  }

  render(isLoading) {
    if (!isLoading) this._deactivateButton();
    else this._activateButton();
  }

  close() {
    super.close();
    this._clear();
    this._activateButton();
  }

  setFormLink(cb) {
    this._element.querySelector('.popup__link').addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
      cb();
    });
  }

  setSubmitCallback(submitCb, successSubmitCb, renderHeaderCallback) {
    this._submitCallback = submitCb;
    this._successSubmitCallback = successSubmitCb;
    this._renderHeaderCallback = renderHeaderCallback;
  }
}

export default Form;
