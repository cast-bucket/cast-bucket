import AudioPlayer from "../../libs/audio-player/";

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
    case "PLAY_EPISODE":
      const { episodeId, ...meta} = action.episode;
      audio.play(episodeId);
      // audio.setMetadata(meta, episodeId);
      return {
        ...state,
        currentEpisode: action.episode,
        isPlaying: true
      };
    
    case "TOGGLE_PLAYING":
      const isPlaying = !state.isPlaying;
      isPlaying ? audio.play() : audio.pause();

      return {
        ...state,
        isPlaying
      };

    case "PAUSE_EPISODE":
      audio.pause(action?.episode?.episodeId);
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
}
