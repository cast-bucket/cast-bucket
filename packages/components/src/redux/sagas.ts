import axios from "axios";
import { eventChannel } from "redux-saga";
import { all, apply, call, cancelled, put, select, take, takeEvery } from "redux-saga/effects";
import AudioPlayer from "../libs/audio-player/";
import * as mocks from "../mocks";

const base = process.env.REACT_APP_API_URL || "https://cast-bucket-api.now.sh";
const mountpoint = process.env.REACT_APP_API_VERSION || "v1";

const api = `${base}/${mountpoint}`;
const Player = new AudioPlayer();

export function* fetch(url: string) {
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
export function* fetchPodcasts() {
  try {
    // const podcasts = yield call(fetch, "/podcasts");
    const podcasts = mocks.podcastListItems.map(item => ({ ...item, type: "PODCAST_ITEM" }));
    yield put({ type: "RECEIVED_PODCASTS", podcasts });
  } catch (error) {
    yield put({ type: "FETCH_PODCASTS_FAILED", error });
  }
}

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createAudioChannel(audio) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {
    const onLoadHandler = event => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(audio.duration() || audio._duration);
    };

    // setup the subscription
    audio.on("load", onLoadHandler);
    // audio.on("error", errorHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      audio.off("load", onLoadHandler);
    };

    return unsubscribe;
  });
}

export function* playEpisode({ episode }: any) {
  const { url: episodeId, ...meta } = episode;
  const audio = yield apply(Player, Player.play, [episodeId, meta]);
  const audioChannel = yield call(createAudioChannel, audio);
  try {
    while (true) {
      const duration = yield take(audioChannel);
      yield put({
        type: "PLAYED_EPISODE",
        episode: { ...episode, duration }
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (yield cancelled()) {
      audioChannel.close();
    }
  }
}

export function* pauseEpisode({ episode }: any) {
  const { url: episodeId } = episode;
  const audio = yield apply(Player, Player.pause, [episodeId]);
  yield put({
    type: "PAUSED_EPISODE",
    episode: { ...episode, duration: audio.duration() }
  });
}

export function* togglePlayingEpisode(episodeState: any) {
  const { episode, externalState }: any = episodeState;
  try {
    const episodeId = episode.url;
    if (!episodeId) throw new Error("Unable to find episodeId / url");
    const { items: episodeItems } = yield select(state => state.episodes);

    // find any other episodes that are playing and pause them
    const otherPlayingEpisodes = Object.values(episodeItems).filter(
      (e: any) => e.isPlaying === true && e.url !== episodeId
    );

    yield all(
      otherPlayingEpisodes.map((ep: any) => {
        episodeItems[ep.url].isPlaying = false;
        return put({ type: "PAUSE_EPISODE", episode: ep });
      })
    );

    // toggle Playing State
    const currentEpisode = {
      ...episode,
      isPlaying: externalState ? !externalState.isPlaying : !episode.isPlaying
    };

    // Play / Pause
    if (externalState ? externalState.isPlaying : episode.isPlaying) {
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

export function* fetchEpisodes({ podcastId }: any) {
  try {
    const mockEpisodeItems: any[] = mocks.episodeItems[podcastId]
      ? mocks.episodeItems[podcastId].items
      : [];
    const episodeItems: any[] = mockEpisodeItems
      .filter((item: any) => item.enclosure && item.enclosure.url)
      .map((item: any) => ({
        ...item,
        url: item.enclosure.url,
        isPlaying: false
      }));
    const episodes: any = episodeItems.reduce((o: any, ep: any) => ({ ...o, [ep.url]: ep }), {});
    yield put({ type: "RECEIVED_EPISODES", episodes });
  } catch (error) {
    yield put({ type: "FETCH_EPISODES_FAILED", error });
  }
}

export function* fetchSubscriptions({ userId }: any) {
  try {
    const subscriptions = yield call(fetch, `/user/${userId}`);
    yield put({ type: "RECEIVED_SUBSCRIPTIONS", subscriptions });
  } catch (error) {
    yield put({ type: "RECEIVED_SUBSCRIPTIONS_FAILED", error });
  }
}

export function* fetchDownloads() {
  try {
    const mockDownloadItems = mocks.downloadItems;
    yield put({ type: "RECEIVED_DOWNLOADS", downloads: mockDownloadItems });
  } catch (error) {
    yield put({ type: "FETCH_DOWNLOADS_FAILED", error });
  }
}

export default function* rootSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_EPISODES", fetchEpisodes);
  yield takeEvery("FETCH_PODCASTS", fetchPodcasts);
  yield takeEvery("FETCH_DOWNLOADS", fetchDownloads);
  yield takeEvery("FETCH_SUBSCRIPTIONS", fetchSubscriptions);
  yield takeEvery("TOGGLE_PLAYING_EPISODE", togglePlayingEpisode);
  yield takeEvery("PLAY_EPISODE", playEpisode);
  yield takeEvery("PAUSE_EPISODE", pauseEpisode);
}
