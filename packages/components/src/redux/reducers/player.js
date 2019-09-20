import AudioPlayer from "../../libs/audio-player/";

const initialState = {
  audio: new AudioPlayer(),
  currentEpisode: null,
  isPlaying: false,
  playerId: null
};

export default function playerReducer(state = initialState, action) {
  const { audio } = state;

  console.log('>>>-SHRIRAM->>> action.episode', action.episode);
  switch (action.type) {
    case "PLAY_EPISODE":
      const { url: episodeId } = action.episode;
      const newPlayerId = audio.play(episodeId);
      return {
        ...state,
        episodeId,
        playerId: newPlayerId,
        isPlaying: true
      };

    case "PAUSE_EPISODE":
      audio.pause(action?.episode.url);
      return {
        ...state,
        isPlaying: false,
      };

    case "SHOW_CURRENT_TIME":
      return {
        ...state,
        currentTime: state.audio.currentTime
      };

    default:
      return state;
  }
}
