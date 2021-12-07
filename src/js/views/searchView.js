class SearchView {
  #parentEl = document.querySelector('.search');
  #searchField = document.querySelector('.search__field');
  getQuery() {
    return this.#searchField.value;
  }

  clearInput() {
    this.#searchField.value = '';
  }

  addHandlerSearch(handler) {
    document.querySelector('.search__btn').addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
