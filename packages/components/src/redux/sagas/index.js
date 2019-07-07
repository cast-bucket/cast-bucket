import { takeEvery, call, put } from "redux-saga/effects";
import * as Api from "./api";
import * as mocks from "../../mocks";

export function* fetchCategories() {
  try {
    const categories = yield call(Api.fetch, "/categories");
    yield put({ type: "RECEIVED_CATEGORIES", categories });
  } catch (error) {
    yield put({ type: "FETCH_CATEGORIES_FAILED", error });
  }
}

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

export function* fetchEpisodes(podcastId) {
  try {
    const episodes = mocks.episodeItems[podcastId].map(item => ({ ...item, type: "EPISODE_ITEM" }));
    yield put({ type: "RECEIVED_EPISODES", episodes });
  } catch (error) {
    yield put({ type: "FETCH_EPISODES_FAILED", error });
  }
}

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_EPISODES", fetchEpisodes);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
}
