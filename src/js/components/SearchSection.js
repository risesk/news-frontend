import BaseComponent from './BaseComponent';

class SearchSection extends BaseComponent {
  constructor({
    input,
    btnSubmit,
    error,
    ...props
  }) {
    super(props);
    this._input = input;
    this._btnSubmit = btnSubmit;
    this._error = error;
    this._input.addEventListener('input', this._validInput.bind(this));
  }

  _activateBtnSubmit() {
    this._btnSubmit.removeAttribute('disabled');
    this._btnSubmit.classList.remove('button_inactive');
  }

  _deactivateBtnSubmit() {
    this._btnSubmit.setAttribute('disabled', true);
    this._btnSubmit.classList.add('button_inactive');
  }

  _validInput() {
    if (!this._input.value) {
      this._deactivateBtnSubmit();
      this._error.textContent = 'Введите ключевое слово';
    } else {
      this._activateBtnSubmit();
      this._error.textContent = '';
    }
  }
}

export default SearchSection;
