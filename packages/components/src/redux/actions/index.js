export const fetchCategories = () => ({
  type: "FETCH_CATEGORIES"
});

export const fetchPodcasts = () => ({
  type: "FETCH_PODCASTS"
});


export const fetchEpisodes = (podcastId) => ({
  type: "FETCH_EPISODES",
  podcastId
});


export const playEpisode = (episode) => ({
  type: "PLAY_EPISODE",
  episode
});

export const pauseEpisode = (episode) => ({
  type: "PAUSE_EPISODE",
  episode
});

export const togglePlaying = (episode) => ({
  type: "TOGGLE_PLAYING_EPISODE",
  episode
});
