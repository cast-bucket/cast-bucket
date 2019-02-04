import { REQUEST_FEED, RECEIVE_FEED } from "../actions/types";
const initialState = { isFetching: false, feedItems: [] };

export const feedsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FEED:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_FEED:
      return {
        ...state,
        isFetching: false,
        feedItems: [action.feed]
      };
    default:
      return state;
  }
};

export const feeds = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FEED:
    case REQUEST_FEED:
      return {
        ...state,
        [action.feedUrl]: feedsReducer(state[action.feedUrl], action)
      };
    default:
      return state;
  }
};
