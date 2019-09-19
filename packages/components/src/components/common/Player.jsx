import styled from "@emotion/native";
import React from "react";
import { connect } from "react-redux";
import { Dimensions, View } from "react-native";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { isSmallScreen } from "../../utils/platforms";
import { Text } from "./Typography";
import { isMobile } from "../../utils/platforms";
import { playEpisode, pauseEpisode } from "../../redux/actions";

const MediaIcon = styled(Icon)`
  margin-left: 16px;
`;

const PodcastImage = styled.Image`
  border-radius: 100px;
  background-color: lightblue;
  margin-horizontal: 10px;
`;

const { width, height } = Dimensions.get("window");

const PlayerContainer = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
`;

const EpisodeInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const EpisodeTitle = styled(Text)`
  line-height: 30;
  font-size: 18;
  margin-horizontal: 12px;
`;

class Player extends React.Component {
  resize = () => this.forceUpdate();

  render() {
    const { isPlaying, currentEpisode, title, play, pause } = this.props;
    if (!currentEpisode) return null;

    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
    return (
      <PlayerContainer
        style={{
          maxHeight: isSmallScreen ? 0.175 * height : 0.125 * height,
          shadowColor: "#2d2d2d40",
          shadowRadius: 10
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <EpisodeInfoContainer
            style={{
              userSelect: "none"
            }}
          >
            <PodcastImage source={{ uri: "" }} style={{ width: 52, height: 52 }} />
            <EpisodeTitle style={{ maxWidth: 0.4 * width }}>{title}</EpisodeTitle>
          </EpisodeInfoContainer>
          <View
            style={{
              userSelect: "none"
            }}
          />
          {!isSmallScreen && <MediaIcon name="replay-10" size={28} color="#5e5fb8" />}
          <MediaIcon
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={42}
            color="#5e5fb8"
            onPress={() => {
              // !FIXME: Connect EpisodesList.episodes with redux and use that here
              // return isPlaying ? pause(currentEpisode) : play(currentEpisode);
            }}
          />
          {!isSmallScreen && <MediaIcon name="forward-10" size={28} color="#5e5fb8" />}
        </View>
        <View />
      </PlayerContainer>
    );
  }
}

const mapStateToProps = state => {
  const { audioPlayer } = state;
  const { isPlaying, currentEpisode } = audioPlayer;
  return {
    isPlaying,
    currentEpisode,
    title: currentEpisode ? currentEpisode.meta.title : null
  };
};

const mapDispatchToProps = {
  play: ({ url: episodeId, ...meta }) => playEpisode(episodeId, meta),
  pause: ({ url: episodeId, ...meta }) => pauseEpisode(episodeId, meta)
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
