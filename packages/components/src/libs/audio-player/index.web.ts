import { Howl, Howler } from "howler";

interface AudioSource {
  url: string;
  howl: any | null;
}

export default class Player {
  private audio: AudioSource[]

  constructor() {
    this.audio = [];
  }

  getAudio(url: string) {
    const source: AudioSource | undefined = this.audio.find((a: AudioSource) => a.url === url);
    return source ? source.howl : null;
  }

  play(url: string) {
    // set new audio source only if it's not already been played
    if (!this.getAudio(url)) {
      this.setAudioSource(url);
    }
    const player = this.getAudio(url);
    return player.play();
  }

  pause(url) {
    const player = this.getAudio(url);
    player.pause();
  }

  // seek(per) {
  //   const duration = this.audio.duration();
  //   this.audio.seek(duration * per);
  // }

  volume(val: number) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val);
  }

  setAudioSource(url: string) {
    if (url)
      this.audio.push({
        url,
        howl: new Howl({ src: url, html5: true })
      });
  }
}
