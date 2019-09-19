import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as mocks from "../mocks";


const base = process.env.REACT_APP_API_URL || "https://cast-bucket-api.now.sh";
const mountpoint = process.env.REACT_APP_API_VERSION || "v1";

const api = `${base}/${mountpoint}`;

export function* fetch(url) {
  try {
    const { data } = yield call(axios.get, `${api}${url}`);
    yield put({ type: "FETCH_SUCCEEDED", data });
    return data;
  } catch (error) {
    yield put({ type: "FETCH_FAILED", error });
  }
}


export function* fetchCategories() {
  try {
    const categories = yield call(fetch, "/categories");
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
    // const podcasts = yield call(fetch, "/podcasts");
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

export function* playEpisode({ episodeId, meta }) {
  try {
    const episodeIndex = meta && meta.index ? meta.index : null;
    // AudioPlayer.play(episodeId, episodeIndex);

    yield put({ type: "PLAY_EPISODE_SUCCESS", episodeId });
  } catch (error) {
    yield put({ type: "PLAY_EPISODE_FAILED", episodeId, error });
  }
}

export function* pauseEpisode({ episodeId, meta }) {
  try {
    const episodeIndex = meta && meta.index ? meta.index : null;
    // AudioPlayer.pause(episodeId, episodeIndex);
    yield put({ type: "PAUSE_EPISODE_SUCCESS", episodeId });
  } catch (error) {
    yield put({ type: "PAUSE_EPISODE_FAILED", error });
  }
}

export function* playEpisodeFailed({ error, episodeId }) {
  console.error(`Unable to play episode ${episodeId} due to ${error.message}`);
}

export function* getLastPlayedEpisode() {
  try {
    const lastPlayedEpisode = AudioPlayer.getLastPlayedEpisode();
    console.log('>>>-SHRIRAM->>> lastPlayedEpisode', lastPlayedEpisode);
  } catch (error) {
    
  }
}

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_EPISODES", fetchEpisodes);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
  yield takeEvery("PLAY_EPISODE", playEpisode);
  yield takeEvery("PLAY_EPISODE_FAILED", playEpisodeFailed);
  yield takeEvery("PAUSE_EPISODE", pauseEpisode);
}
