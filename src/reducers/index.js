import { combineReducers } from "redux";
import { podcastsReducer, podcastsByCategory, selectedCategory } from "./podcastsReducer";
import { feeds, feedsReducer } from "./feedReducer";
import { categories } from "./categoriesReducer";

export default combineReducers({
  podcastsReducer,
  podcastsByCategory,
  selectedCategory,
  feeds,
  feedsReducer,
  categories
});
