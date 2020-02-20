class BaseComponent {
  constructor({ selector, handlers = [] }) {
    this.element = document.querySelector(selector) || document.createElement('div');
    this._setHandlers(handlers);
  }

  _setHandlers(handlers) {
    handlers.forEach(({ selector, eventType, callback }) => {
      this.element.querySelectorAll(selector).forEach((item) => {
        item.addEventListener(eventType, (event) => {
          event.preventDefault();
          callback();
        });
      });
    });
  }
}

export default BaseComponent;
