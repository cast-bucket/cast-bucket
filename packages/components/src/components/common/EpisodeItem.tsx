import styled from "@emotion/native";
import React, { FunctionComponent } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
import { Text } from "./Typography";

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

interface EpisodeItemProps {
  item: any;
  togglePlaying: Function;
  isPlaying: boolean;
}

// @ts-ignore
const EpisodeItem: FunctionComponent<EpisodeItemProps> = React.memo((props: EpisodeItemProps) => {
  const { item, togglePlaying, isPlaying } = props;
  if (!item.url) return;
  const { title, isoDate } = item;

  return (
    <View style={styles.episodeContainer}>
      <Row>
        <View style={{ flexDirection: "column", maxWidth: 0.75 * width }}>
          <EpisodeTitle>{title}</EpisodeTitle>
          <EpisodeDate>{new Date(isoDate).toDateString()}</EpisodeDate>
        </View>
        <PlayButtonContainer
          onPress={() => {
            togglePlaying(item);
          }}
          underlayColor="#000"
          activeOpacity={0.65}
        >
          <PlayButtonIcon
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={30}
            color="#5e5fb8"
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
