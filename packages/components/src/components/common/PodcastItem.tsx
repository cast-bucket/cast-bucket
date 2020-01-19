import { IPodcastItem } from "@cast-bucket/core";
import styled from "@emotion/native";
import dashify from "dashify";
import React, { FunctionComponent } from "react";
import { View } from "react-native";
import { useHistory } from "../../libs/router";
import getPlaceHolderImage from "../../utils/getPlaceHolderImage";
import { isMobile } from "../../utils/platforms";
import { Text } from "./Typography";

interface PodcastItemProps extends IPodcastItem {
  size?: string;
  style?: any;
  fallbackColor?: string;
}

const PodcastTitle = styled(Text)(
  ({ size }) => `
  font-size: 18px;
  margin-top: 10px;
  max-width: ${size};
  text-align: center;
  line-height: 25px;
`
);

const PodcastImage = styled.Image(
  ({ size }) => `
  width: ${size};
  height: ${size};
  background-color: #7cffc3;
  border-radius: ${isMobile ? "10px" : "15px"};
`
);

const PodcastImageContainer = styled.TouchableHighlight(
  ({ size }) => `
  width: ${size};
  height: ${size};
  border-radius: ${isMobile ? "10px" : "15px"};
`
);

const getPodcastImage = (logo: any, title: string) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const PodcastItem: FunctionComponent<PodcastItemProps> = React.memo(props => {
  const { categoryId, description, hosts, logo, rss, runtime, title } = props;
  const imageSource = getPodcastImage(logo, title);
  // const theme: any = useTheme();
  const history = useHistory();
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
          history.push({
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

export default PodcastItem;
