import styled from "@emotion/native";
import React from "react";
import { connect } from "react-redux";
import { Dimensions, View } from "react-native";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { isSmallScreen } from "../../utils/platforms";
import { Text } from "./Typography";
import { isMobile } from "../../utils/platforms";
import { playEpisode, pauseEpisode, togglePlaying } from "../../redux/actions";

const MediaIcon = styled(Icon)`
  margin-left: 16px;
`;

const PodcastImage = styled.Image`
  border-radius: 100px;
  background-color: lightblue;
  margin-horizontal: 10px;
`;

const { width } = Dimensions.get("window");

const PlayerContainer = styled.View`
  align-items: center;
  background-color: white;
  flex: 1;
`;

const EpisodeInfoContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

// TODO: Add marquee to episodeTitle
const EpisodeTitle = styled(Text)`
  font-size: 18;
  line-height: 30;
  margin-horizontal: 10px;
  margin-vertical: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: nowrap;
`;

class Player extends React.Component {
  resize = () => this.forceUpdate();
  
  render() {
    const { currentEpisode, togglePlaying } = this.props;
    if (!currentEpisode) return null;

    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }

    const { isPlaying, title } = currentEpisode;
    
    return (
      <PlayerContainer
        style={{
          maxHeight: 75,
          shadowColor: "#2d2d2d40",
          shadowRadius: 10
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            padding: 10
          }}
        >
          <EpisodeInfoContainer
            style={{
              userSelect: "none",
              maxWidth: isSmallScreen ? 0.75 * width : width
            }}
          >
            <PodcastImage source={{ uri: "" }} style={{ width: 52, height: 52 }} />
            <EpisodeTitle>{title}</EpisodeTitle>
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
              togglePlaying(currentEpisode);
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
  const { audioPlayer, episodes } = state;
  const { episodeId } = audioPlayer;
  let currentEpisode = null;
  if (episodeId) currentEpisode = episodes.items[episodeId];

  return {
    currentEpisode
  };
};

const mapDispatchToProps = {
  togglePlaying,
  play: ({ url: episodeId, ...meta }) => playEpisode(episodeId, meta),
  pause: ({ url: episodeId, ...meta }) => pauseEpisode(episodeId, meta)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
