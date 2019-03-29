import { REQUEST_PODCASTS, RECEIVE_PODCASTS } from "../types";
import { memoCheck, memoSet } from "../../util/memoize";
import { Api } from "node-gpodder";


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

export const errorDuringFetch = (category, error) => ({
  type: "ERROR_DURING_PODCASTS_FETCH",
  category,
  error
});

export const fetchTopPodcastsOfCategory = category => dispatch => {
  dispatch(requestPodcasts(category));
  const options = category.toLowerCase();
  let apiPromise =
    options === "all" ? Api.Public.getTopList() : Api.Public.getPodcastsOfATag(options);

  return apiPromise
    .then(response => {
      const topPodcasts = [];
      response.forEach(podcast => {
        topPodcasts.push({ type: "TOPLIST_ITEM", values: podcast });
      });
      memoSet(category, { timestamp: Date.now(), data: topPodcasts });
      dispatch(receivePodcasts(category, topPodcasts));
    })
    .catch(e => {
      dispatch(errorDuringFetch(category, { message: e.message, detailed: e.stack }));
    });
};

const shouldFetchPodcasts = (state, category) => {
  let shouldFetch = false;
  const podcasts = state.podcastsByCategory[category];
  if (!podcasts) shouldFetch = true;
  return shouldFetch;
};

export const fetchPodcastsIfNeeded = category => (dispatch, getState) => {
  if (shouldFetchPodcasts(getState(), category)) {
    memoCheck(category)
      .then(values => {
        return dispatch(receivePodcasts(category, values.data));
      })
      .catch(error => {
        console.log(error.message);
        return dispatch(fetchTopPodcastsOfCategory(category));
      });
  }
};
