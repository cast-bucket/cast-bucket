import { combineReducers } from "redux";
import playerReducer from './player';

const initialState = { isFetching: false, items: [], receivedAt: Date.now() };

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

export const episodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVED_EPISODES":
      return {
        ...state,
        items: action.episodes,
        isFetching: false
      };
    case "PLAY_EPISODE":
      return {
        ...state,
        episodeId: action.episodeId,
        isPlaying: true
      };
    case "PAUSE_EPISODE":
      return {
        ...state,
        episodeId: action.episodeId,
        isPlaying: false
      };
    default:
      return state;
  }
};

export default combineReducers({
  categories: categoriesReducer,
  podcasts: podcastsReducer,
  episodes: episodesReducer,
  player: playerReducer
});
