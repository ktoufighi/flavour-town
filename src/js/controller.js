import * as model from './model.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultsView from '../views/resultsView.js';

// import icons file
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Polyfill everything for older browser support

// Parcel config
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    // how to get the hash in url
    const id = window.location.hash.slice(1); // slice method to not include the hash symbol

    // when there is no hash
    if (!id) return;
    // render spinner as we load the recipe, the argument would be the parentContainer where the spinner need to be inserted in
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
// controlRecipes();

const controlSearchResults = async function () {
  try {
    // loading the spinner
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    // render.resultsView()
    // resultsView.render(model.state.search.results); // how we got results initially
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
