import React from "react";
import styled from "@emotion/native";
import getPlaceHolderImage from "../../utils/getPlaceHolderImage";

const PodcastImage = styled.Image`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 10px;
`;

const getPodcastImage = (logo, title) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const HeaderContainer = styled.View`
  align-items: center;
  background-color: #f9f9f9;
`;

const PodcastInfo = styled.View``;

const EpisodeHeader = ({ logo, size, title }) => {
  const imageSource = getPodcastImage(logo, title);
  return (
    <HeaderContainer style={{ height: size }}>
      <PodcastInfo style={{ marginTop: size / 2 }}>
        <PodcastImage source={imageSource} size={size} />
      </PodcastInfo>
    </HeaderContainer>
  );
};

export default EpisodeHeader;
