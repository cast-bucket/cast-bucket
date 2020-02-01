import { IEpisodeItem, ITheme } from "@cast-bucket/core";
import styled from "@emotion/native";
import { withTheme } from "emotion-theming";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Slider from "react-native-slider";
import { connect } from "react-redux";
import { togglePlaying } from "../../redux/actions";
import { AppState } from "../../redux/store";
import convertSeconds from "../../utils/convert-seconds";
import { isMobile, isSmallScreen } from "../../utils/platforms";
import { ThemedMaterialIcon } from "../common/ThemedIcon";
import { Text } from "./Typography";

const SLIDER_TRACK_HEIGHT = 5;
const SLIDER_THUMB_SIZE = 12;

const MediaIcon = styled(ThemedMaterialIcon)`
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
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: stretch;
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
  theme: ITheme;
  togglePlaying: (arg0: IEpisodeItem) => void;
  currentEpisode: any;
}

const SliderContainer = styled.View`
  overflow-x: hidden;
`;

class Player extends React.Component<PlayerProps> {
  state = {
    value: 0
  };

  resize = () => this.forceUpdate();

  render() {
    const { currentEpisode, theme } = this.props;
    if (!currentEpisode) return null;

    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }

    const { isPlaying, title, duration, convertedDuration } = currentEpisode;
    const { hours, minutes, seconds } = convertSeconds(this.state.value);
    const currentTimeStamp = hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    return (
      <PlayerContainer
        style={{
          backgroundColor: theme.colors.stroke
        }}
      >
        <View
          style={{
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: "auto",
            alignSelf: "center",
            alignItems: "center",
            flexDirection: "row",
            padding: 20
          }}
        >
          <EpisodeInfoContainer
            style={{
              userSelect: "none",
              maxWidth: isSmallScreen ? 0.75 * width : width
            }}
          >
            <PodcastImage style={{ width: 40, height: 40 }} />
            <EpisodeTitle numberOfLines={1} style={{ maxWidth: 0.5 * width }}>
              {title}
            </EpisodeTitle>
          </EpisodeInfoContainer>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              // @ts-ignore
              userSelect: "none"
            }}
          >
            {!isSmallScreen && <MediaIcon name="replay-10" size={28} />}
            <MediaIcon
              name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
              size={42}
              onPress={() => {
                this.props.togglePlaying(currentEpisode);
              }}
            />
            {!isSmallScreen && <MediaIcon name="forward-10" size={28} />}
          </View>
          {!isSmallScreen && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                // @ts-ignore
                userSelect: "none"
              }}
            >
              <Text
                style={{
                  paddingLeft: 20,
                  fontSize: 20,
                  color: theme.colors.secondary
                }}
              >
                {`${currentTimeStamp} / ${convertedDuration}`}
              </Text>
            </View>
          )}
        </View>
        <SliderContainer style={{ position: "absolute", left: 0, right: 0, bottom: 72 }}>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            step={1}
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
            trackStyle={sliderStyles.track}
            thumbStyle={sliderStyles.thumb}
            minimumTrackTintColor={theme.colors.accent}
            maximumTrackTintColor={theme.colors.strokeLighter}
            thumbTintColor={theme.colors.text}
          />
        </SliderContainer>
      </PlayerContainer>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { audioPlayer, episodes } = state;
  const { episodeId } = audioPlayer;
  let currentEpisode = null;
  if (episodeId) {
    const episodeDuration = convertSeconds(audioPlayer.duration);
    const { hours, minutes, seconds } = episodeDuration;
    const convertedDuration =
      hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    currentEpisode = {
      ...episodes.items[episodeId],
      duration: audioPlayer.duration,
      convertedDuration
    };
  }

  return {
    currentEpisode
  };
};

const mapDispatchToProps = {
  togglePlaying
};

const sliderStyles = StyleSheet.create({
  track: {
    height: SLIDER_TRACK_HEIGHT
  },
  thumb: {
    width: SLIDER_THUMB_SIZE,
    height: SLIDER_THUMB_SIZE,
    borderRadius: 100
  }
});

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Player));
