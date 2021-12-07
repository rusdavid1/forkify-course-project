import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const click = e.target.closest('.btn--inline');
      if (!click) return;

      const goToPage = +click.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;

    if (curPage === 1 && numOfPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    if (curPage === numOfPages && numOfPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    if (curPage < numOfPages) {
      return `${this._generateMarkupButton(
        'prev',
        curPage
      )}${this._generateMarkupButton('next', curPage)}`;
    }

    return '';
  }

  _generateMarkupButton(whatPage, curPage) {
    return `<button data-goto="${
      whatPage === 'next' ? curPage + 1 : curPage - 1
    }" class="btn--inline pagination__btn--${whatPage}">
            <span>Page ${whatPage === 'next' ? curPage + 1 : curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      whatPage === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();
