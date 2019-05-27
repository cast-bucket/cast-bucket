import { combineReducers } from "redux";
// import { podcastsReducer, podcastsByCategory, selectedCategory } from "./podcastsReducer";
import { podcastsReducer } from "./podcasts";
import { categoriesReducer } from "./categories";

export default combineReducers({
  categories: categoriesReducer,
  podcasts: podcastsReducer
});
