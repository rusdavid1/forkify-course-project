import View from './View';
import preView from './preView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = `No results found`;
  _message = '';
  _generateMarkup() {
    return this._data.map(result => preView.render(result, false)).join('');
  }
}

export default new ResultsView();
