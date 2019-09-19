export const fetchCategories = () => ({
  type: "FETCH_CATEGORIES"
});

export const fetchPodcasts = () => ({
  type: "FETCH_PODCASTS"
});

export const playEpisode = (episodeId, meta = null) => ({
  type: "PLAY_EPISODE",
  episodeId,
  meta
});

export const pauseEpisode = (episodeId, meta = null) => ({
  type: "PAUSE_EPISODE",
  episodeId,
  meta
});
