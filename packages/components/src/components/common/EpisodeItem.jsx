import styled from "@emotion/native";
import React, { useState } from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "./Typography";
import { Feather as Icon } from "../../libs/vector-icons";
import AudioPlayer from "../../libs/audio-player";

const { width } = Dimensions.get("window");

const EpisodeTitle = styled(Text)`
  color: #111111;
  font-size: 18px;
  font-weight: 500;
  line-height: 30px;
  padding-right: 20px;
`;

const EpisodeDate = styled(Text)`
  color: #7a7a7a;
  margin-vertical: 5px;
`;

const PlayButtonIcon = styled(Icon)`
  align-self: flex-end;
  height: 30px;
  justify-content: center;
  margin-horizontal: 20px;
  margin-top: 10px;
  width: 30px;
`;

const Row = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
`;

const PlayButtonContainer = styled(TouchableOpacity)`
  width: 30px;
  height: 30px;
`;

const EpisodeItem = React.memo(({ item, _index }) => {
  const { title, isoDate } = item;
  const [isPlaying, setPlayingIndicator] = useState(false);

  if (!item.enclosure || !item.enclosure.url) return;

  return (
    <View style={styles.episodeContainer}>
      <Row>
        <View style={{ flexDirection: "column", maxWidth: 0.75 * width }}>
          <EpisodeTitle>{title}</EpisodeTitle>
          <EpisodeDate>{new Date(isoDate).toDateString()}</EpisodeDate>
        </View>
        <PlayButtonContainer
          onPress={() => {
            setPlayingIndicator(!isPlaying);
            isPlaying ? AudioPlayer.pause(_index) : AudioPlayer.play(_index);
            // play(item.enclosure.url);
          }}
          underlayColor="#000"
          activeOpacity={0.65}
        >
          <PlayButtonIcon
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={30}
            color="#3e70ff"
          />
        </PlayButtonContainer>
      </Row>
    </View>
  );
});

const styles = StyleSheet.create({
  episodeContainer: {
    paddingLeft: 20,
    paddingVertical: 30,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
    alignSelf: "stretch"
  }
});
export default EpisodeItem;
