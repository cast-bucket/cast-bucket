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
  border-radius: 10px;
  background-color: #7cffc3;
`;

const getPodcastImage = (logo, title) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const PodcastItem = React.memo(props => {
  const { categoryId, description, hosts, logo, rss, runtime, title } = props;
  const imageSource = getPodcastImage(logo, title);

  const podcastOptions = {
    categoryId,
    description,
    hosts,
    logo,
    podcastId: title,
    rss,
    runtime
  };

  return (
    <TouchableHighlight
      style={props.style}
      onPress={() => {
        props.history.push({
          pathname: "/episodes",
          state: { options: podcastOptions }
        });
      }}
    >
      <View>
        <PodcastImage source={imageSource} size={props.size} />
        <PodcastTitle size={props.size}>{titleShortener(props.title)}</PodcastTitle>
      </View>
    </TouchableHighlight>
  );
});

export default withRouter(PodcastItem);
