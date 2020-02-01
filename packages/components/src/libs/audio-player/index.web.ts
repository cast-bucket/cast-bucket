import { Howl, Howler } from "howler";

interface AudioSource {
  url: string;
  howl: any | null;
}

export default class Player {
  audio: AudioSource[];
  isNative: boolean;

  constructor() {
    this.isNative = false;
    this.audio = [];
  }

  getAudio(url: string) {
    const source: AudioSource | undefined = this.audio.find((a: AudioSource) => a.url === url);
    return source;
  }

  async play(url: string, metadata: any) {
    // set new audio source only if it's not already been played
    if (!this.getAudio(url)) {
      this.setAudioSource(url);
    }
    const { howl } = this.getAudio(url);
    await howl.play();
    return howl;
  }

  getDuration(playerInstance: any) {
    const duration = playerInstance.duration() || playerInstance?._duration;
    return duration;
  }

  async pause(url: string) {
    const { howl } = this.getAudio(url);
    await howl.pause();
    return howl;
  }

  async seek(url: string, per: number) {
    const { howl } = this.getAudio(url);
    const duration = await howl.duration();
    return howl.seek(duration * per);
  }

  async volume(val: number) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val);
  }

  setAudioSource(url: string) {
    if (url) {
      const howlInstance: any = new Howl({ src: url, html5: true, preload: true });
      howlInstance.isNative = this.isNative;
      this.audio.push({
        url,
        howl: howlInstance
      });
    }
  }
}
