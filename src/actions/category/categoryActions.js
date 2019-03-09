import { RECEIVE_CATEGORIES } from "../types";
import titleCase from "title-case";
import axios from "axios";
import { errorWhileFetching } from "../commonActions";

const BASE_URL = process.env.REACT_APP_API_URL;
const categories_url = `${BASE_URL}/v1/categories`;

const ignoreTransformations = {
  iOS: "iOS",
  bsd: "BSD",
  "data-science-and-machine-learning": "Data Science and Machine Learning",
  "programming-languages-and-frameworks": "Programming Languages and Frameworks"
};

export const receivedCategories = response => ({
  type: RECEIVE_CATEGORIES,
  categories: response,
  receivedAt: Date.now()
});

export function fetchCategories() {
  return async dispatch => {
    try {
      const categories = await axios.get(categories_url).then(res => res.data);
      const response = categories.map(
        category => {
          return ignoreTransformations[category] || titleCase(category)
        }
      );
      dispatch(receivedCategories(response));
    } catch (error) {
      dispatch(errorWhileFetching(error, categories_url));
    }
  };
}

function shouldFetchCategories(state) {
  let shouldFetch = true;
  if (Array.isArray(state.categories)) shouldFetch = state.categories.items.length > 0;
  return shouldFetch;
}

export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchCategories(getState())) return dispatch(fetchCategories());
  else return Promise.resolve();
};
