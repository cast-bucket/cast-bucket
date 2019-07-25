export const fetchCategories = () => ({
  type: "FETCH_CATEGORIES"
});

export const fetchPodcasts = () => ({
  type: "FETCH_PODCASTS"
});

export const playEpisode = episodeId => ({
  type: "PLAY_EPISODE",
  episodeId
});

export const pauseEpisode = episodeId => ({
  type: "PAUSE_EPISODE",
  episodeId
});
