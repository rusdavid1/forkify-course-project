import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succesfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _modalOpenBtn = document.querySelector('.nav__btn--add-recipe');
  _modalCloseBtn = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandleShowWindow();
    this._addHandleCloseWindow();
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandleShowWindow() {
    this._modalOpenBtn.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandleCloseWindow() {
    this._modalCloseBtn.addEventListener('click', this.toggleModal.bind(this));
    this._overlay.addEventListener('click', this.toggleModal.bind(this));
  }

  addHandleSubmit(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
