import { call, put } from "redux-saga/effects";
import * as AudioPlayer from "../../libs/audio-player/";
import { isWeb } from "../../utils/platforms";

const initialState = {
  currentEpisode: null,
  progress: 0,
  currentTime: 0,
  audio: new AudioPlayer(),
  isPlaying: false
};

export default function playerReducer(state = initialState, action) {
  const { audio } = state;
  switch (action.type) {
    case "PLAY":
      audio.play();
      return {
        ...state,
        isPlaying: true
      };

    case "TOGGLE_PLAYING":
      const isPlaying = !state.isPlaying;
      isPlaying ? audio.play() : audio.pause();

      return {
        ...state,
        isPlaying
      };

    case "PAUSE":
      audio.pause();
      return {
        ...state,
        isPlaying: false
      };

    case 'SHOW_CURRENT_TIME':
      return {
        ...state,
        currentTime: state.audio.currentTime
      };

    default:
      return state;
  }

  // Why is this needed?
  const delayAnimation = () => {
    return new Promise(resolve => requestAnimationFrame(resolve));
  };

  export function* seekSaga() {
    if (isWeb) {
      yield call(delayAnimation);
    }

    const isPlaying = yield select(state => state.player.isPlaying);
    if (isPlaying) {
      yield put({ type: 'SHOW_CURRENT_TIME' });
      const currentTime = yield select(state => state.player.audio.currentTime);
      const duration = yield select(state => state.player.audio.duration);

      if (currentTime === duration) {
        yield put({ type: 'SEEKED' });
      }
    }
  }
}
