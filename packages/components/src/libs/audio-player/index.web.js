import { Howl, Howler } from "howler";

export default class Player {
  constructor() {
    this.meta = {};
    this.player = {};
  }

  getPlayer(url) {
    return this.player[url];
  }


  play(url) {
    // set new audio source only if it's not already been played
    if (!this.audio || this.audio._src !== url) {
      this.setAudioSource(url);
    }
    this.getPlayer(url)?.play();
    this.lastPlayedEpisode = url;
  }

  pause(url) {
    this.lastPlayedEpisode = url;
    return this.getPlayer(url)?.pause();
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
    if (url && !this.player[url]) this.player[url] = new Howl({ src: url, html5: true });
  }

  setMetadata(data, url) {
    this.meta[url] = data;
  }

  getMetadata(url) {
    return this.meta[url]
  }

}
