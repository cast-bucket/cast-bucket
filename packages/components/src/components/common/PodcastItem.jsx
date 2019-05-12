import React from "react";
import { View, TouchableHighlight } from "react-native";
import styled, { css } from "@emotion/native";
import { withRouter } from "../../libs/router";
import { Text } from "../common";

import getPlaceHolderImage from "../utils/getPlaceHolderImage";

const titleShortener = title => {
  const stripDashesFromTitle = title.split("-");
  const stripBracketsFromTitle = stripDashesFromTitle[0].replace(/ *\([^)]*\) */g, "");
  return stripBracketsFromTitle;
};

const ITEM_SIZE = "200px";

const PodcastTitle = styled(Text)`
  font-size: 18px;
  margin-top: 10px;
  max-width: ${ITEM_SIZE};
  text-align: center;
  line-height: 25px;
`;

const PodcastImage = styled.Image`
  width: ${ITEM_SIZE};
  height: ${ITEM_SIZE};
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
    <TouchableHighlight
      style={css`
        margin-right: 25px;
      `}
      // onPress={() => console.log(title)}
    >
      <View>
        <PodcastImage source={imageSource} />
        <PodcastTitle>{titleShortener(title)}</PodcastTitle>
      </View>
    </TouchableHighlight>
  );
});

export default withRouter(PodcastItem);
