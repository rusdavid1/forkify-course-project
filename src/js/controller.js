import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/searchResultsView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import searchResultsView from './views/searchResultsView';
import { MODAL_EXIT_SEC } from './config';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    bookmarkView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    resultsView.update(model.getSearchResultsPage());

    // displaying recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError(`${err}`);
  }
};

const controlSearchBar = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    searchView.clearInput();

    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`💥💥${err}`);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddNewBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
  console.log(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage(); // mesaj de reusita

    bookmarkView.render(model.state.bookmarks); // adaugarea la bookmarks

    window.history.pushState(null, '', `#${model.state.recipe.id}`); // actualizarea #-ului

    setTimeout(function () {
      addRecipeView.toggleModal();
    }, MODAL_EXIT_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('hello there');
};

const init = function () {
  // recipeView._addHandleNavButton(); // mobile navigation

  bookmarkView.addHandleRender(controlBookmarks);

  recipeView.addHandleRender(controlRecipe);
  recipeView.addHandleUpdateServings(controlServings);

  searchView.addHandlerSearch(controlSearchBar);
  paginationView.addHandlerClick(controlPagination);

  recipeView.addHandleAddBookmark(controlAddNewBookmark);
  addRecipeView.addHandleSubmit(controlAddRecipe);
  newFeature();
};

init();
