import icons from 'url:../../img/icons.svg';
import View from './View';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMsg = `We couldn't find the recipe. Try again!`;
  _message = '';
  _hamburgerBtn = document.querySelector('.hamburger');
  _searchIconMobile = document.querySelector('.mobile_search');

  addHandleRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  addHandleUpdateServings(handler) {
    this._parentElement.addEventListener('click', e => {
      const click = e.target.closest('.btn--tiny');
      if (!click) return;
      const updateTo = +click.dataset.updateTo;
      if (updateTo > 0) handler(updateTo);
    });
  }

  addHandleAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const click = e.target.closest('.btn--bookmark');
      if (!click) return;
      handler();
    });
  }

  _addHandleNavButton() {
    this._hamburgerBtn.addEventListener('click', function () {
      document.querySelector('.nav__list').classList.toggle('hidden');
    });
  }

  _mobileSearch() {
    document.querySelector('.search').style.display = 'flex';
    this._searchIconMobile.style.display = 'none';
    document.querySelector('.search__btn-text').style.display = 'none';
  }

  _addHandleSearchMobile() {
    this._searchIconMobile.addEventListener(
      'click',
      this._mobileSearch.bind(this)
    );
  }

  _generateIngredients(ingredient) {
    return ` <li class="recipe__ingredient">
                      <svg class="recipe__icon">
                        <use href="${icons}#icon-check"></use>
                      </svg>
                      <div class="recipe__quantity">${
                        ingredient.quantity ? ingredient.quantity : ''
                      }</div>
                      <div class="recipe__description">
                        <span class="recipe__unit">${ingredient.unit}</span>
                        ${ingredient.description}
                      </div>
                    </li>`;
  }

  // prettier-ignore

  _generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}" >
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#${this._data.bookmarked ? 'icon-bookmark-fill' : 'icon-bookmark'}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(this._generateIngredients).join('')}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
}

export default new RecipeView();
