import { Howl, Howler } from "howler";

export default class Player {
  constructor(url) {
    if (url) {
      this.audio = new Howl({ src: url });
    }
  }

  play(url = null) {
    if (!this.audio && url) {
      this.audio = new Howl({ src: url });
    }
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  seek(per) {
    const duration = this.audio.duration();
    this.audio.seek(duration * per);
  }

  volume(val) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val);
  }
}
