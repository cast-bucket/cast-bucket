import axios from "axios";
import { call, put, take, takeEvery, select, all } from "redux-saga/effects";
import * as mocks from "../mocks";

const base = process.env.REACT_APP_API_URL || "https://cast-bucket-api.now.sh";
const mountpoint = process.env.REACT_APP_API_VERSION || "v1";

const api = `${base}/${mountpoint}`;
const mockFeedId = "https://ryanripley.com/feed/";

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
  try {
    // const podcasts = yield call(fetch, "/podcasts");
    const podcasts = mocks.podcastListItems.map(item => ({ ...item, type: "PODCAST_ITEM" }));
    yield put({ type: "RECEIVED_PODCASTS", podcasts });
  } catch (error) {
    yield put({ type: "FETCH_PODCASTS_FAILED", error });
  }
}

export function* fetchEpisodes({ podcastId }) {
  try {
    const mockEpisodeItems = mocks.episodeItems[podcastId]?.items || [];
    const episodeItems = mockEpisodeItems
      .filter(item => item.enclosure && item.enclosure.url)
      .map(item => ({
        ...item,
        url: item.enclosure.url,
        isPlaying: false
      }));
    const episodes = episodeItems.reduce((o, episode) => ({ ...o, [episode.url]: episode }), {});
    yield put({ type: "RECEIVED_EPISODES", episodes });
  } catch (error) {
    yield put({ type: "FETCH_EPISODES_FAILED", error });
  }
}

export function* togglePlayingEpisode({ episode }) {
  try {
    const episodeId = episode.url;
    const { items: episodeItems } = yield select(state => state.episodes);

    // find any other episodes that are playing and pause them
    const otherPlayingEpisodes = Object.values(episodeItems).filter(
      e => e.isPlaying === true && e.url !== episodeId
    );

    yield all(
      otherPlayingEpisodes.map(ep => {
        episodeItems[ep.url].isPlaying = false;
        return put({ type: "PAUSE_EPISODE", episode: ep });
      })
    );

    // toggle Playing State
    const currentEpisode = {
      ...episode,
      isPlaying: !episode.isPlaying
    };

    // Play / Pause
    if (episode.isPlaying) {
      yield put({ type: "PAUSE_EPISODE", episode });
    } else {
      yield put({ type: "PLAY_EPISODE", episode });
    }
    episodeItems[episodeId] = currentEpisode;
    yield put({ type: "UPDATED_EPISODES", episodes: episodeItems });
  } catch (error) {
    console.error("error", error);
    yield put({ type: "UPDATED_EPISODES_FAILED", error });
  }
}

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_EPISODES", fetchEpisodes);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
  yield takeEvery("TOGGLE_PLAYING_EPISODE", togglePlayingEpisode);
  yield take("PLAY_EPISODE");
  yield take("PAUSE_EPISODE");
}
