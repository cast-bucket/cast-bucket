import { Howl, Howler } from "howler";

/**
 * Singleton Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */

export default class Player {
  static instance;
  static playlist = [];

  constructor() {
    if (Player.instance) {
      return instance;
    }
    this.instance = this;
    this.playlist = Player.playlist;
    this.lastPlayed = 0;
  }

  add(playListItem) {
    this.playlist.push(playListItem);
  }
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play(episodeId, index = null) {
    let sound, data;
    try {
      index = typeof index === "number" ? index : 0;

      if (episodeId) {
        index = this.playlist.findAt(episode => episode.link === episodeId);
      }

      data = this.playlist[index];
      // If we already loaded this track, use the current one.
      // Otherwise, setup and load a new Howl.
      if (data.howl) {
        sound = data.howl;
      } else {
        sound = data.howl = new Howl({
          src: [data.link],
          html5: true,
          onplay: function() {
            // Display the duration.
            // duration.innerHTML = this.formatTime(Math.round(sound.duration()));
            // Start upating the progress of the track.
            // requestAnimationFrame(this.step.bind(this));
            // // Start the wave animation if we have already loaded
            // wave.container.style.display = "block";
            // bar.style.display = "none";
            // pauseBtn.style.display = "block";
          },
          onload: function() {
            // Start the wave animation.
          },
          onend: function() {
            // Stop the wave animation.
          },
          onpause: function() {},
          onstop: function() {},
          onseek: function() {
            // Start upating the progress of the track.
            // requestAnimationFrame(this.step.bind(this));
          }
        });
      }

      this.lastPlayed = index;

      // Begin playing the sound.
      sound.play();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Pause the currently playing track.
   */
  pause(index) {
    // Get the Howl we want to manipulate.
    index = typeof index === "number" ? index : this.playlist.findIndex(item => item.howl);
    const currentPlaying = this.playlist[index];

    if (currentPlaying && currentPlaying.howl) {
      this.lastPlayed = index;
      currentPlaying.howl.pause();
    }
  }

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip(direction) {
    // Get the next track based on the direction of the track.
    var index = 0;
    if (direction === "prev") {
      index = this.index - 1;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
    } else {
      index = this.index + 1;
      if (index >= this.playlist.length) {
        index = 0;
      }
    }

    this.skipTo(index);
  }

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo(index) {
    const currentPlaying = this.playlist.filter(item => item.howl);

    // Stop the current track.
    if (currentPlaying && currentPlaying.howl) {
      currentPlaying.howl.stop();
    }

    // Reset progress.
    // progress.style.width = "0%";

    // Play the new track.
    this.play(index);
  }

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume(val) {
    // Update the global volume (affecting all Howls).
    Howler.volume(val);
  }

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek(per) {
    // Get the Howl we want to manipulate.
    var sound = this.playlist.filter(item => item.howl);
    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  }

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step() {
    // Get the Howl we want to manipulate.
    const sound = this.playlist.find(item => item.howl).howl;

    // Determine our current seek position.
    var seek = sound ? sound.seek() : 0;
    // // timer.innerHTML = this.formatTime(Math.round(seek));
    // progress.style.width = ((seek / sound.duration()) * 100 || 0) + "%";

    // If the sound is still playing, continue stepping.
    if (sound && sound.playing()) {
      requestAnimationFrame(this.step.bind(this));
    }
  }

  /**
   * Toggle the playlist display on/off.
   */
  togglePlaylist() {
    var display = playlist.style.display === "block" ? "none" : "block";

    setTimeout(
      function() {
        playlist.style.display = display;
      },
      display === "block" ? 0 : 500
    );
    playlist.className = display === "block" ? "fadein" : "fadeout";
  }

  /**
   * Toggle the volume display on/off.
   */
  toggleVolume() {
    var display = volume.style.display === "block" ? "none" : "block";

    setTimeout(
      function() {
        volume.style.display = display;
      },
      display === "block" ? 0 : 500
    );
    volume.className = display === "block" ? "fadein" : "fadeout";
  }

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = secs - minutes * 60 || 0;

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  clear() {
    this.playlist = [];
  }
}

// const PlayerInstance = new Player();
// Object.freeze(PlayerInstance);

// export default PlayerInstance;

// var Player = function(playlist) {
//   this.playlist = playlist;
//   this.index = 0;

//   // Display the title of the first track.
//   track.innerHTML = "1. " + playlist[0].title;

//   // Setup the playlist display.
//   playlist.forEach(function(song) {
//     var div = document.createElement("div");
//     div.className = "list-song";
//     div.innerHTML = song.title;
//     div.onclick = function() {
//       player.skipTo(playlist.indexOf(song));
//     };
//     list.appendChild(div);
//   });
// };

// // Bind our player controls.
// playBtn.addEventListener("click", function() {
//   player.play();
// });
// pauseBtn.addEventListener("click", function() {
//   player.pause();
// });
// prevBtn.addEventListener("click", function() {
//   player.skip("prev");
// });
// nextBtn.addEventListener("click", function() {
//   player.skip("next");
// });
// waveform.addEventListener("click", function(event) {
//   player.seek(event.clientX / window.innerWidth);
// });
// playlistBtn.addEventListener("click", function() {
//   player.togglePlaylist();
// });
// playlist.addEventListener("click", function() {
//   player.togglePlaylist();
// });
// volumeBtn.addEventListener("click", function() {
//   player.toggleVolume();
// });
// volume.addEventListener("click", function() {
//   player.toggleVolume();
// });

// // Setup the event listeners to enable dragging of volume slider.
// barEmpty.addEventListener("click", function(event) {
//   var per = event.layerX / parseFloat(barEmpty.scrollWidth);
//   player.volume(per);
// });
// sliderBtn.addEventListener("mousedown", function() {
//   window.sliderDown = true;
// });
// sliderBtn.addEventListener("touchstart", function() {
//   window.sliderDown = true;
// });
// volume.addEventListener("mouseup", function() {
//   window.sliderDown = false;
// });
// volume.addEventListener("touchend", function() {
//   window.sliderDown = false;
// });

// volume.addEventListener("mousemove", move);
// volume.addEventListener("touchmove", move);
