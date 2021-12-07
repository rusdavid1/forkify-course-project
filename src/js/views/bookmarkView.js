import View from './View';
import preView from './preView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMsg = `No bookmarks yet. Add your favourite recipes!`;
  _message = '';

  addHandleRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(bookmark => preView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
