import { takeEvery, call, put } from "redux-saga/effects";
import * as Api from "./api";
import * as mocks from "../../mocks";
import Player from "../../libs/audio-player/";
const AudioPlayer = new Player();

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

export function* playEpisode(episodeId) {
  try {
    AudioPlayer.play(episodeId);
    yield put({ type: "PLAY_EPISODE_SUCCESS", episodeId });
  } catch (error) {
    yield put({ type: "PLAY_EPISODE_FAILED", episodeId, error });
  }
}

export function* pauseEpisode(episodeId) {
  try {
    AudioPlayer.pause(episodeId);
    yield put({ type: "PAUSE_EPISODE_SUCCESS", episodeId });
  } catch (error) {
    yield put({ type: "PAUSE_EPISODE_FAILED", error });
  }
}

export function* playEpisodeFailed({ error, episodeId }) {
  console.log(`Unable to play episode ${episodeId} due to ${error.message}`);
}

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_EPISODES", fetchEpisodes);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
  yield takeEvery("PLAY_EPISODE", playEpisode);
  yield takeEvery("PLAY_EPISODE_FAILED", playEpisodeFailed);
  yield takeEvery("PAUSE_EPISODE", pauseEpisode);
}
