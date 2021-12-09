import View from './View';
import preView from './preView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMsg = `No results found`;
  _message = '';

  // behavior smooth nu merge pe safari, actualizeaza codul

  addHandleSmoothScroll() {
    document.querySelector('.results').addEventListener('click', function (e) {
      const click = e.target.closest('.preview__link');
      console.log(click);
      if (!click) return;
      if (click)
        document
          .querySelector('.recipe')
          .scrollIntoView({ behavior: 'smooth' });
    });
  }

  _generateMarkup() {
    return this._data.map(result => preView.render(result, false)).join('');
  }
}

export default new ResultsView();
