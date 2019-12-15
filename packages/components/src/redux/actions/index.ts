import { IEpisodeItem } from "@cast-bucket/core";

export const fetchCategories = () => ({
  type: "FETCH_CATEGORIES"
});

export const fetchPodcasts = () => ({
  type: "FETCH_PODCASTS"
});

export const fetchSubscriptions = (userId: string) => ({
  type: "FETCH_SUBSCRIPTIONS",
  userId
});

export const fetchRecentlyPlayedHistory = (userId: string) => ({
  type: "FETCH_RECENTLY_PLAYED",
  userId
});

export const fetchEpisodes = (podcastId: string) => ({
  type: "FETCH_EPISODES",
  podcastId
});

export const fetchDownloads = () => ({
  type: "FETCH_DOWNLOADS"
});

export const playEpisode = (episode: IEpisodeItem) => ({
  type: "PLAY_EPISODE",
  episode
});

export const pauseEpisode = (episode: IEpisodeItem) => ({
  type: "PAUSE_EPISODE",
  episode
});

export const togglePlaying = (episode: IEpisodeItem, externalState = null) => ({
  type: "TOGGLE_PLAYING_EPISODE",
  episode,
  externalState
});
