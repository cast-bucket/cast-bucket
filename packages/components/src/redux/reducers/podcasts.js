const initialState = { isFetching: true, items: [], receivedAt: Date.now() };

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
