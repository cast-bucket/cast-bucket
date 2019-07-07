import styled from "@emotion/native";
import isElectron from "is-electron";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Feather as Icon } from "../../../libs/vector-icons";
import { isSmallScreen } from "../../utils/platforms";
import { Text } from "../Typography";

const MediaIcon = styled(Icon)`
  margin-left: 16px;
`;

const PodcastImage = styled.Image`
  border-radius: 100px;
  background-color: lightblue;
  margin-horizontal: 10px;
`;

const { width, height } = Dimensions.get("window");

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodeListenAnalyticsEventSent: false,
      playbackSpeed: 1,
      progress: 0,
      volume: 0.5,
      episodes: {},
      episodesOrder: [],
      isPlaying: false
    };

    this.playbackSpeedOptions = [1, 1.25, 1.5, 1.75, 2];
    this.lastSent = 0;
    this.togglePlaying = this.togglePlaying.bind(this);
  }

  componentDidMount() {
    if (isElectron()) window.ipcRenderer.on("media-controls", this.incomingMediaControls);
  }

  componentWillUnmount() {
    if (isElectron())
      window.ipcRenderer.removeAllListeners("media-controls", this.incomingMediaControls);
  }

  componentDidUpdate(prevProps) {
    const player = this.props.player;

    if (!player) return;
    if (player.contextID !== prevProps.player.contextID) {
      // this.getEpisodes(player.contextID, player.episodeID);
      this.setState({ episodeListenAnalyticsEventSent: false });

      // window.streamAnalyticsClient.trackEngagement({
      //   label: "episode_listen_start",
      //   content: { foreign_id: `episodes:${player.episodeID}` }
      // });
    } else if (player.episodeID !== prevProps.player.episodeID) {
      if (!this.state.episodes[player.episodeID])
        return this.getEpisodes(player.podcastID, player.episodeID);

      this.setState({ episodeListenAnalyticsEventSent: false });
      this.resetPlaybackSpeed();

      // fetch("GET", "/listens", null, {
      //   episode: player.episodeID
      // }).then(res => {
      //   if (res.data.length !== 0)
      //     this.setInitialPlaybackTime(res.data[0].duration).then(() => {
      //       this.audioPlayerElement.audioEl.play();
      //     });
      //   else this.audioPlayerElement.audioEl.play();
      // });

      // window.streamAnalyticsClient.trackEngagement({
      //   label: "episode_listen_start",
      //   content: { foreign_id: `episodes:${player.episodeID}` }
      // });
    } else if (!prevProps.player.playing && player.playing) {
      this.audioPlayerElement.audioEl.play();
      this.pushNotification(this.state.episodes[player.episodeID]);
      this.mediaControl(true, this.state.episodes[player.episodeID]);
    } else if (prevProps.player.playing && !player.playing) {
      this.audioPlayerElement.audioEl.pause();
      this.mediaControl(false, this.state.episodes[player.episodeID]);
    }
  }

  togglePlaying(el) {
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  // nextTrack = () => {
  //   const currentIndex = this.state.episodesOrder.findIndex(
  //     item => this.props.player.episodeID === item
  //   );

  //   if (currentIndex + 1 !== this.state.episodesOrder.length) {
  //     this.props.playEpisode(
  //       this.props.player.contextID,
  //       this.state.episodesOrder[currentIndex + 1]
  //     );
  //   } else {
  //     this.setState({ episode: {}, episodesOrder: [] });
  //     this.props.clearPlayer();
  //   }
  // };

  // pushNotification = episode => {
  //   if (!episode) return;
  //   if ("Notification" in window) {
  //     if (Notification.permission !== "denied" || Notification.permission === "default")
  //       Notification.requestPermission();

  //     if (Notification.permission === "granted") {
  //       new Notification(episode.podcast.title, {
  //         body: episode.title,
  //         icon: episode.podcast.image,
  //         silent: true
  //       });
  //     }
  //   }
  // };

  // mediaControl = (isPlaying, episode) => {
  //   if (isElectron()) {
  //     if (isPlaying) {
  //       window.ipcRenderer.send("media-controls", {
  //         type: "play",
  //         title: `${episode.title} - ${episode.podcast.title}`
  //       });
  //     } else window.ipcRenderer.send("media-controls", { type: "pause" });
  //   }
  // };

  // togglePlayPause = () => {
  //   this.props.player.playing ? this.props.pause() : this.props.play();
  // };

  // skipAhead = () => {
  //   let currentPlaybackPosition = this.audioPlayerElement.audioEl.currentTime;
  //   this.audioPlayerElement.audioEl.currentTime = currentPlaybackPosition + 30;
  //   this.updateProgress(this.audioPlayerElement.audioEl.currentTime);
  // };

  // skipBack = () => {
  //   let currentPlaybackPosition = this.audioPlayerElement.audioEl.currentTime;
  //   this.audioPlayerElement.audioEl.currentTime = currentPlaybackPosition - 30;
  //   this.updateProgress(this.audioPlayerElement.audioEl.currentTime);
  // };

  // cyclePlaybackSpeed = () => {
  //   const nextSpeed = this.playbackSpeedOptions[
  //     (this.playbackSpeedOptions.indexOf(this.state.playbackSpeed) + 1) %
  //       this.playbackSpeedOptions.length
  //   ];
  //   this.setState({ playbackSpeed: nextSpeed });
  //   this.audioPlayerElement.audioEl.playbackRate = nextSpeed;
  // };

  // resetPlaybackSpeed = () => {
  //   const resetSpeed = this.playbackSpeedOptions[0];
  //   this.setState({ playbackSpeed: resetSpeed });
  //   this.audioPlayerElement.audioEl.playbackRate = resetSpeed;
  // };

  // seekTo = progress => {
  //   this.audioPlayerElement.audioEl.currentTime =
  //     progress * this.audioPlayerElement.audioEl.duration;
  //   this.updateProgress(this.audioPlayerElement.audioEl.currentTime);
  // };

  // updateProgress = seconds => {
  //   let progress = (seconds / this.audioPlayerElement.audioEl.duration) * 100;
  //   this.setState({
  //     currentTime: seconds,
  //     duration: this.audioPlayerElement.audioEl.duration,
  //     progress
  //   });
  // };

  // setInitialPlaybackTime = currentTime => {
  //   return new Promise(resolve => {
  //     this.audioPlayerElement.audioEl.currentTime = currentTime;
  //     this.setState({ currentTime }, () => resolve());
  //   });
  // };

  // incomingMediaControls = (event, args) => {
  //   if (args === "togglePlayPause") this.togglePlayPause();
  //   else if (args === "next") this.skipAhead();
  //   else if (args === "previous") this.skipBack();
  // };

  render() {
    const player = this.props.player;
    const { isPlaying } = this.state;
    // if (!player.episodeID || !this.state.episodesOrder.length) return null;

    const episode = this.state.episodes[player.episodeID];

    const poster =
      episode &&
      (episode.podcast.images.banner ||
        episode.podcast.images.feature ||
        episode.podcast.images.og ||
        episode.images.banner ||
        episode.images.feature ||
        episode.images.og);

    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          maxHeight: 0.15 * height,
          shadowColor: "#2d2d2d40",
          shadowRadius: 10,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              userSelect: "none"
            }}
          >
            <PodcastImage source={{ uri: poster }} style={{ width: 52, height: 52 }} />
            <Text
              style={{
                maxWidth: 0.4 * width,
                lineHeight: 30,
                fontSize: 18,
                marginHorizontal: 12
              }}
            >
              Lorem Ipsum Podcast Title
            </Text>
          </View>
          <View
            style={{
              userSelect: "none"
            }}
          />
          {!isSmallScreen && <MediaIcon name="skip-back" size={28} color="black" />}
          <MediaIcon
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={48}
            color="black"
            onPress={() => {
              this.setState({
                isPlaying: !this.state.isPlaying
              });
            }}
          />
          {!isSmallScreen && <MediaIcon name="skip-forward" size={28} color="black" />}
        </View>
        <View />
        {/* {AudioPlayer.play(episode)} */}
        {/* <ReactAudioPlayer
          listenInterval={500}
          onEnded={() => this.nextTrack()}
          onListen={seconds => {
            if (!episode) return;
            this.updateProgress(seconds);

            if (
              !this.state.episodeListenAnalyticsEventSent *
              (seconds / this.audioPlayerElement.audioEl.duration > 0.8)
            ) {
              window.streamAnalyticsClient.trackEngagement({
                label: "episode_listen_complete",
                content: { foreign_id: `episodes:${episode._id}` }
              });

              this.setState({ episodeListenAnalyticsEventSent: true });
            }

            const currentTime = new Date().valueOf();
            if (currentTime - this.lastSent >= 15000) {
              this.lastSent = currentTime;
              // fetch("POST", "/listens", {
              //   duration: this.audioPlayerElement.audioEl.currentTime,
              //   episode: episode._id
              // });
            }
          }}
          ref={element => {
            this.audioPlayerElement = element;
          }}
          src={episode ? episode.enclosure : null}
          volume={this.state.volume}
        /> */}
      </View>
    );
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    contextID: PropTypes.string,
    episodeID: PropTypes.string,
    playing: PropTypes.bool
  }),
  pause: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  playEpisode: PropTypes.func.isRequired,
  clearPlayer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ player: state.player || {} });

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch({ type: "PAUSE_EPISODE" }),
  play: () => dispatch({ type: "RESUME_EPISODE" }),
  clearPlayer: () => dispatch({ type: "CLEAR_PLAYER" }),
  playEpisode: (podcastID, episodeID) => {
    dispatch({
      contextID: podcastID,
      episodeID: episodeID,
      playing: true,
      type: "PLAY_EPISODE"
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
