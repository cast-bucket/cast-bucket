import { Reducer } from "../types";

export interface State {
  duration: number;
  currentEpisode: any | null;
  isPlaying: boolean;
  episodeId?: string | null;
}

const initialState: State = {
  currentEpisode: null,
  duration: 0,
  isPlaying: false
};

const playerReducer: Reducer<State> = (state = initialState, action?: any) => {
  switch (action.type) {
    case "PLAYED_EPISODE":
      return {
        ...state,
        ...action.episode,
        episodeId: action.episode.url,
        isPlaying: true
      };

    case "PAUSED_EPISODE":
      return {
        ...state,
        ...action.episode,
        episodeId: action.episode.url,
        isPlaying: false
      };

    default:
      return state;
  }
};

export default playerReducer;
