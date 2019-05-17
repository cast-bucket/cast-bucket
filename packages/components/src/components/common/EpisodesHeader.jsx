import React from "react";
import styled from "@emotion/native";
import getPlaceHolderImage from "../utils/getPlaceHolderImage";

const PodcastImage = styled.Image`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 10px;
`;

const getPodcastImage = (logo, title) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const HeaderContainer = styled.View`
  align-items: center;
  background-color: #d5d7ff;
`;

const PodcastInfo = styled.View``;

const EpisodeHeader = ({ logo, size, title }) => {
  const imageSource = getPodcastImage(logo, title);
  const podcastImageSize = `${size}px`;
  const podcastInfoPosition = `${size / 2}px`;

  return (
    <HeaderContainer style={{ height: podcastImageSize }}>
      <PodcastInfo style={{ top: podcastInfoPosition }}>
        <PodcastImage source={imageSource} size={podcastImageSize} />
      </PodcastInfo>
    </HeaderContainer>
  );
};

export default EpisodeHeader;
