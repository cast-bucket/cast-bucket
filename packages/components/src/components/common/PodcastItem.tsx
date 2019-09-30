import { IPodcastItem } from "@cast-bucket/core";
import styled from "@emotion/native";
import dashify from "dashify";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { withRouter } from "../../libs/router";
import getPlaceHolderImage from "../../utils/getPlaceHolderImage";
import { isMobile } from "../../utils/platforms";
import { Text } from "./Typography";


interface PodcastItemProps extends IPodcastItem {
  categoryId: string;
  logo: any;
  size: string;
  style: any;
  history: any;
}

const PodcastTitle = styled(Text)`
  font-size: 18px;
  margin-top: 10px;
  max-width: ${(props: PodcastItemProps) => props.size};
  text-align: center;
  line-height: 25px;
`;

const PodcastImage = styled.Image`
  width: ${(props: PodcastItemProps) => props.size};
  height: ${(props: PodcastItemProps) => props.size};
  background-color: #7cffc3;
  border-radius: ${isMobile ? "10px" : "20px"};
`;

const PodcastImageContainer = styled.TouchableHighlight`
  width: ${(props: PodcastItemProps) => props.size};
  height: ${(props: PodcastItemProps) => props.size};
  border-radius: ${isMobile ? "10px" : "20px"};
`;

const getPodcastImage = (logo: any, title: string) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const PodcastItem: FunctionComponent<PodcastItemProps> = React.memo(props => {
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
        onPress={() =>
          props.history.push({
            pathname: `/episodes/${dashify(props.title)}`,
            state: { options: podcastOptions }
          })
        }
      >
        <PodcastImage source={imageSource} size={props.size} />
      </PodcastImageContainer>
      <PodcastTitle size={props.size}>{props.title}</PodcastTitle>
    </View>
  );
});

export default withRouter(PodcastItem);
