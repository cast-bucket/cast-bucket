import { combineReducers } from "redux";
// import { podcastsReducer, podcastsByCategory, selectedCategory } from "./podcastsReducer";
// import { feeds, feedsReducer } from "./feedReducer";
import { categoriesReducer } from "./categories";

export default combineReducers({
  categories: categoriesReducer
});
