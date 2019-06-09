import styled from "@emotion/native";
import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Text } from "./Typography";

const { width } = Dimensions.get("window");
const PlayImage = require("../../assets/images/play-button.png");

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

const PlayButtonIcon = styled.Image`
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

const PlayButtonContainer = styled.View`
  flex: 1;
`;

const EpisodeItem = React.memo(({ item }) => {
  const { title, isoDate } = item;

  return (
    <View style={styles.episodeContainer}>
      <Row>
        <View style={{ flexDirection: "column", maxWidth: width * 0.75 }}>
          <EpisodeTitle>{title}</EpisodeTitle>
          <EpisodeDate>{new Date(isoDate).toDateString()}</EpisodeDate>
        </View>
        <PlayButtonContainer>
          <PlayButtonIcon source={PlayImage} />
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
