class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    // need to select and get the value the search__field in DOM
    const query = this._parentElement.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
