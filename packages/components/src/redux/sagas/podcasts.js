import { call, put } from "redux-saga/effects";
import * as Api from "./api";

// TODO: Remove mocks
import * as mocks from "../../mocks";

/**
 * @param {string} podcastType - one of ["new-releases", "subscriptions", "recommended", "recently-played"];
 * @returns podcasts of the specified type
 */
export function* fetchPodcasts(podcastType) {
  console.log("fetching podcasts");
  try {
    // const podcasts = yield call(Api.fetch, "/podcasts");
    const podcasts = mocks.podcastListItems.map(item => ({ ...item, type: "PODCAST_ITEM" }));
    yield put({ type: "RECEIVED_PODCASTS", podcasts });
  } catch (error) {
    yield put({ type: "FETCH_PODCASTS_FAILED", error });
  }
}
