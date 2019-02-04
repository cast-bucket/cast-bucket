import { combineReducers } from "redux";
import interestsReducer from "./prefs/interestsReducer";
import { podcastsReducer, podcastsByCategory, selectedCategory } from "./podcastsReducer";
import { feeds, feedsReducer } from "./feedReducer";

export default combineReducers({
  interestsReducer,
  podcastsReducer,
  podcastsByCategory,
  selectedCategory,
  feeds,
  feedsReducer
});
