import { FETCH_INTERESTS } from "../../actions/types";
const initialState = { items: [] };
const interestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTERESTS:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
};

export default interestsReducer;
