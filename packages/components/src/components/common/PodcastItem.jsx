import React from "react";
import { View, TouchableHighlight } from "react-native";
import styled from "@emotion/native";
import { withRouter } from "../../libs/router";
import { Text } from "./Typography";
import getPlaceHolderImage from "../utils/getPlaceHolderImage";

const titleShortener = title => {
  const stripDashesFromTitle = title.split("-");
  const stripBracketsFromTitle = stripDashesFromTitle[0].replace(/ *\([^)]*\) */g, "");
  return stripBracketsFromTitle;
};

const PodcastTitle = styled(Text)`
  font-size: 18px;
  margin-top: 10px;
  max-width: ${props => props.size};
  text-align: center;
  line-height: 25px;
`;

const PodcastImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 15px;
  background-color: #7cffc3;
`;

const getPodcastImage = ({ logo, title }) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const PodcastItem = React.memo(props => {
  const imageSource = getPodcastImage(props);
  const { title } = props;
  return (
    <TouchableHighlight style={props.style}>
      <View>
        <PodcastImage source={imageSource} size={props.size} />
        <PodcastTitle size={props.size}>{titleShortener(title)}</PodcastTitle>
      </View>
    </TouchableHighlight>
  );
});

export default withRouter(PodcastItem);
