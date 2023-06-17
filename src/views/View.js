// parent class of child views
import icons from 'url:../img/icons.svg'; // Parcel v2 and later
export default class View {
  _data;

  render(data) {
    // guard clause checking if there is no data, and if data is an array with length of 0 then return immediately and print the error in parentElement
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    // before inserting the markup we need to clear the innerHTML from any previous markup
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = function () {
    // generic function that can be attached to any parent element in the app
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
    // always a good idea before inserting an html to clear the parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  // Error handling in view
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Success handling in view
  renderMessage(message = this._successMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
