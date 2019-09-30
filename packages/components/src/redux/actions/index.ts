import { IEpisodeItem } from "@cast-bucket/core";

export const fetchCategories = () => ({
  type: "FETCH_CATEGORIES"
});

export const fetchPodcasts = () => ({
  type: "FETCH_PODCASTS"
});


export const fetchEpisodes = (podcastId: string) => ({
  type: "FETCH_EPISODES",
  podcastId
});

export const playEpisode = (episode: IEpisodeItem) => ({
  type: "PLAY_EPISODE",
  episode
});

export const pauseEpisode = (episode: IEpisodeItem) => ({
  type: "PAUSE_EPISODE",
  episode
});

export const togglePlaying = (episode: IEpisodeItem) => ({
  type: "TOGGLE_PLAYING_EPISODE",
  episode
});
