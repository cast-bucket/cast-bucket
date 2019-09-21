import { Howl, Howler } from "howler";

export default class Player {
  constructor() {
    this.audio = [];
  }

  getAudio(url) {
    const source = this.audio.find(a => a.url === url);
    return source?.howl || null;
  }

  play(url) {
    // set new audio source only if it's not already been played
    if (!this.getAudio(url)) {
      this.setAudioSource(url);
    }
    const player = this.getAudio(url);
    return player?.play();
  }

  pause(url) {
    console.log('>>>-SHRIRAM->>> url', url);
    const player = this.getAudio(url);
    console.log('>>>-SHRIRAM->>> player', player);
    player?.pause();
  }

  // seek(per) {
  //   const duration = this.audio.duration();
  //   this.audio.seek(duration * per);
  // }

  volume(val) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val);
  }

  setAudioSource(url) {
    if (url) this.audio.push({ url, howl: new Howl({ src: url, html5: true }) });
  }
}
