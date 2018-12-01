import { REQUEST_PODCASTS, RECEIVE_PODCASTS } from "../types";
const axios = require("axios");

const secureHeaders = {
  "X-Mashape-Key": "TuIPwqJJpdmshe9hoMmGXQmqNMzzp1Xz8aAjsnmQpqht1Li8UB",
  Accept: "application/json"
};

// event that denotes that podcasts are being requested
export const requestPodcasts = category => ({
  type: REQUEST_PODCASTS,
  category
});

export const receivePodcasts = (category, json) => ({
  type: RECEIVE_PODCASTS,
  category,
  podcasts: json,
  receivedAt: Date.now()
});

const fetchPodcasts = category => dispatch => {
  // dispatch a requesting event before starting to fetch
  dispatch(requestPodcasts(category));
  return axios
    .get(
      "https://listennotes.p.mashape.com/api/v1/typeahead?q=star&show_genres=1&show_podcasts=1",
      { headers: secureHeaders }
    )
    .then(response => {
      const json = response.data;
      dispatch(receivePodcasts(category, json));
    })
    .catch(err => console.log(err));
};

const shouldFetchPodcasts = (state, category) => {
  const podcasts = state.postsByCategory(category);
  if (!podcasts) return true;
  if (podcasts.isFetching) return false;
  return podcasts.didInvalidate;
};

export const fetchPodcastsIfNeeded = category => (disaptch, getState) => {
  if (shouldFetchPodcasts(getState(), category)) {
    return dispatch(fetchPodcasts(category));
  }
};
