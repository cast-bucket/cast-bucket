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
