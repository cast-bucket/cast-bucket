import { RECEIVE_CATEGORIES } from "../actions/types";
const initialState = { isFetching: false, items: [], receivedAt: Date.now() };

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        items: action.categories
      };
    default:
      return state;
  }
};
