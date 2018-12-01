import { REQUEST_PODCASTS, RECEIVE_PODCASTS, FETCH_PODCASTS } from "../../actions/types";
const initialState = { isFetching: false, items: [] };
const podcastsReducer = (state = initialState, action) => {
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
    case FETCH_PODCASTS:
      return {
        ...state,
        podcasts: action.payload
      };
    default:
      return state;
  }
};

const podcastsByCategory = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PODCASTS:
    case REQUEST_PODCASTS:
      return {
        ...state,
        [action.category]: podcasts(state[action.category], action)
      };

    default:
      break;
  }
};

export default podcastsReducer;
