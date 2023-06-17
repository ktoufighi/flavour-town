// entire MODEL
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};
export const loadRecipe = async function (id) {
  try {
    // imported helper function from getJSON
    const data = await getJSON(`${API_URL}${id}`);
    // OR this
    // const res = await fetch(`${API_URL}/${id}`); //long url replaced
    // const data = await res.json();

    // if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    // reformat the json data object into camelCase
    let recipe = data.data.recipe;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    // temp error handling -- will improve
    console.error(`Do tell..... ${err}`);
    throw err;
  }
};
// load data
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // console.log(state.search.results);
  } catch (err) {
    console.error(`Do tell..... ${err}`);
    throw err;
  }
};
// test with hard coded data
// loadSearchResults('pasta');
