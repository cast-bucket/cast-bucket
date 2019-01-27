import { combineReducers } from "redux";
import interestsReducer from "./prefs/interestsReducer";
import { podcastsReducer, podcastsByCategory, selectedCategory } from "./podcastsReducer";

export default combineReducers({
  interestsReducer,
  podcastsReducer,
  podcastsByCategory,
  selectedCategory
});
