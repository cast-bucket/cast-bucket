import TrackPlayer, { TrackMetadata } from "react-native-track-player";

interface CustomTrackPlayerMetadata extends TrackMetadata {
  pausedAt?: number;
}

export default class Player {
  async play(url: string, metadata: any) {
    const audio: TrackPlayer.Track = await TrackPlayer.getTrack(url);
    if (audio) {
      const { pausedAt } = audio;
      return pausedAt ? this.skipAndSeek(audio, pausedAt, metadata) : await TrackPlayer.skip(url);
    } else {
      return await this.initialize(url, metadata);
    }
  }

  async skipAndSeek(track: TrackPlayer.Track, seconds: number, meta: TrackMetadata) {
    await TrackPlayer.skip(track.url);
    await TrackPlayer.seekTo(seconds);
    await TrackPlayer.play();
  }

  async pause(url: string) {
    const track = await TrackPlayer.getTrack(url);
    if (track) {
      const currentPosition = await TrackPlayer.getPosition();
      const meta: CustomTrackPlayerMetadata = { ...track, pausedAt: currentPosition };
      await TrackPlayer.updateMetadataForTrack(url, meta);
    }
    await TrackPlayer.pause();
  }

  async volume(val: number) {
    // Update the global volume (affecting all players).
    await TrackPlayer.setVolume(val);
  }

  async initialize(url: string, metadata: any) {
    if (url) {
      TrackPlayer.setupPlayer().then(async () => {
        TrackPlayer.add({
          title: metadata.title,
          artist: metadata.creator,
          id: url,
          url
        }).then(async () => {
          await TrackPlayer.play();
        });
      });
    }
  }
}
