class BaseComponent {
  constructor({ selector, handlers = [] }) {
    this._listeners = handlers;
    this.element = document.querySelector(selector) || document.createElement('div');
    this._setHandlers(handlers);
  }

  _setHandlers(handlers) {
    handlers.forEach(({ selector, eventType, callback }) => {
      this.element.querySelectorAll(selector).forEach((element) => {
        this._addlistener({ element, eventType, callback });
      });
    });
  }

  _addlistener({ element, eventType, callback }) {
    element.addEventListener(eventType, callback);
    this._listeners.push({ element, eventType, callback });
  }

  _clearListeners() {
    this._listeners.forEach(({ element, eventType, callback }) => {
      element.removeEventListener(eventType, callback);
    });
  }
}

export default BaseComponent;
