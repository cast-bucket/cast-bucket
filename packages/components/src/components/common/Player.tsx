import { IEpisodeItem } from '@cast-bucket/core';
import styled from "@emotion/native";
import React from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { togglePlaying } from "../../redux/actions";
import { AppState } from '../../redux/store';
import { isMobile, isSmallScreen } from "../../utils/platforms";
import { Text } from "./Typography";

const MediaIcon = styled(Icon)`
  margin-left: 16px;
  user-select: none;
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
  ${() => {
    if (!isMobile) {
      return `
        text-overflow: ellipsis;
        word-break: break-word;
        white-space: nowrap;
      `;
    }
  }}
`;

interface PlayerProps {
  togglePlaying: (arg0: IEpisodeItem) => void;
  currentEpisode: any;
};

class Player extends React.Component<PlayerProps> {
  resize = () => this.forceUpdate();

  render() {
    const { currentEpisode } = this.props;
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
            <PodcastImage style={{ width: 52, height: 52 }} />
            <EpisodeTitle numberOfLines={1} style={{ maxWidth: 0.5 * width }}>
              {title}
            </EpisodeTitle>
          </EpisodeInfoContainer>
          <View
            style={{
              // @ts-ignore
              userSelect: "none"
            }}
          />
          {!isSmallScreen && <MediaIcon name="replay-10" size={28} color="#5e5fb8" />}
          <MediaIcon
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={42}
            color="#5e5fb8"
            onPress={() => {
              this.props.togglePlaying(currentEpisode);
            }}
          />
          {!isSmallScreen && <MediaIcon name="forward-10" size={28} color="#5e5fb8" />}
        </View>
        <View />
      </PlayerContainer>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { audioPlayer, episodes } = state;
  const { episodeId } = audioPlayer;
  let currentEpisode = null;
  if (episodeId) currentEpisode = episodes.items[episodeId];

  return {
    currentEpisode
  };
};

const mapDispatchToProps = {
  togglePlaying
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
