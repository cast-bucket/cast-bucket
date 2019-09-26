import AudioPlayer from "../../libs/audio-player/";
import { Reducer } from '../types';

export interface State {
  audio: any;
  currentEpisode: any | null,
  isPlaying: boolean;
}

const initialState: State = {
  audio: new AudioPlayer(),
  currentEpisode: null,
  isPlaying: false
};

const playerReducer: Reducer<State> = (state = initialState, action?: any) => {
  const { audio } = state;

  switch (action.type) {
    case "PLAY_EPISODE":
      const { url: episodeId, ...meta } = action.episode;
      audio.play(episodeId, meta);
      return {
        ...state,
        episodeId,
        isPlaying: true
      };

    case "PAUSE_EPISODE":
      audio.pause(action.episode.url);
      return {
        ...state,
        isPlaying: false
      };

    default:
      return state;
  }
};

export default playerReducer;
