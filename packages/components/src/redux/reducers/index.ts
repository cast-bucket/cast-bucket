import { combineReducers } from "redux";
import playerReducer from "./player";

const initialState = { isFetching: false, items: [] };

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_CATEGORIES":
      return {
        ...state,
        items: action.categories
      };
    default:
      return state;
  }
};

export const podcastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_PODCASTS":
      return {
        ...state,
        items: action.podcasts,
        isFetching: false
      };
    default:
      return state;
  }
};

export const episodesReducer = (state = { isFetching: false, items: {} }, action) => {
  switch (action.type) {
    case "RECEIVED_EPISODES":
      return {
        ...state,
        items: action.episodes,
        isFetching: false
      };

    case "UPDATED_EPISODES":
      return {
        ...state,
        items: action.episodes,
        isFetching: false
      };

    default:
      return state;
  }
};

export const downloadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_DOWNLOADS":
      return {
        ...state,
        items: action.downloads
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories: categoriesReducer,
  podcasts: podcastsReducer,
  episodes: episodesReducer,
  downloads: downloadsReducer,
  audioPlayer: playerReducer
});
