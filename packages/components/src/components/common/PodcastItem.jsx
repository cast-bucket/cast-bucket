import React from "react";
import { View, TouchableHighlight } from "react-native";
import styled, { css } from "@emotion/native";
import { withRouter } from "../../libs/router";

const titleShortener = title => {
  const stripDashesFromTitle = title.split("-");
  const stripBracketsFromTitle = stripDashesFromTitle[0].replace(/ *\([^)]*\) */g, "");
  return stripBracketsFromTitle;
};

const PodcastTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  max-width: 150px;
  text-align: center;
  line-height: 25px;
`;

const PodcastImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background-color: #7cffc3;
`;

// TODO: Add fallbackImage when image cannot be loaded
const PodcastItem = props => {
  return (
    <TouchableHighlight
      style={css`
        margin-right: 20px;
      `}
    >
      <View>
        <PodcastImage
          // defaultSource={fallBackImage}
          source={{ uri: props.logo.thumbnail || props.logo.url }}
        />
        <PodcastTitle>{titleShortener(props.title)}</PodcastTitle>
      </View>
    </TouchableHighlight>
  );
};

export default withRouter(PodcastItem);
