import { REQUEST_PODCASTS, RECEIVE_PODCASTS } from "../actions/types";
const initialState = { isFetching: false, items: [] };

export const selectedCategory = (state = "Technology", action) => {
  switch (action.type) {
    case "SELECTED_CATEGORY":
      return action.category;
    default:
      return state;
  }
};

export const podcastsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PODCASTS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_PODCASTS:
      return {
        ...state,
        isFetching: false,
        items: action.podcasts
      };
    default:
      return state;
  }
};

export const podcastsByCategory = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PODCASTS:
    case REQUEST_PODCASTS:
      return {
        ...state,
        [action.category]: podcastsReducer(state[action.category], action)
      };
    default:
      return state;
  }
};
