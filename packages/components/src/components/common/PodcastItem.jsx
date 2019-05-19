import React from "react";
import styled from "@emotion/native";
import { View } from "react-native";
import { withRouter } from "../../libs/router";
import getPlaceHolderImage from "../utils/getPlaceHolderImage";
import { Text } from "./Typography";

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

const PodcastImageContainer = styled.TouchableHighlight`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 10px;
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
    <View style={[props.style]}>
      <PodcastImageContainer
        size={props.size}
        underlayColor="black"
        activeOpacity={0.9}
        onPress={() => {
          props.history.push({
            pathname: "/episodes",
            state: { options: podcastOptions }
          });
        }}
      >
        <PodcastImage source={imageSource} size={props.size} />
      </PodcastImageContainer>
      <PodcastTitle size={props.size}>{props.title}</PodcastTitle>
    </View>
  );
});

export default withRouter(PodcastItem);
