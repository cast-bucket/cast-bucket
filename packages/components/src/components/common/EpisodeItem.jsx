import styled from "@emotion/native";
import React from "react";
import { Dimensions, View } from "react-native";
import { withRouter } from "../../libs/router";
import { Text } from "./Typography";

const PlayImage = require("../../assets/images/play-button.png");

const { width } = Dimensions.get("window");

const EpisodeTitle = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 20px;
  max-width: 300px;
  color: #111111;
`;

const PlayButtonIcon = styled.Image`
  width: 30px;
  height: 30px;
  align-self: flex-start;
  justify-content: center;
  margin-right: 30px;
  margin-top: 10px;
  margin-left: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const EpisodeItem = React.memo(props => {
  // TODO: Use link, enclosure, contentSnippet
  const { title, isoDate } = props;

  return (
    <View
      style={{
        paddingLeft: 20,
        paddingVertical: 30,
        borderTopColor: "#d3d3d3",
        borderTopWidth: 1,
        width
      }}
    >
      <Row>
        <EpisodeTitle>{title}</EpisodeTitle>
        <PlayButtonIcon width={20} height={20} source={PlayImage} />
      </Row>
      <Text>{new Date(isoDate).toDateString()}</Text>
    </View>
  );
});

export default withRouter(EpisodeItem);
