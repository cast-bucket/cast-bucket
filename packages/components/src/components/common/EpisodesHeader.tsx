import styled from "@emotion/native";
import React from "react";
import getPlaceHolderImage from "../../utils/getPlaceHolderImage";

interface EpisodeHeaderProps {
  logo: any;
  size: string;
  title: string;
}

const PodcastImage = styled.Image`
  width: ${(props: EpisodeHeaderProps) => `${props.size}px`};
  height: ${(props: EpisodeHeaderProps) => `${props.size}px`};
  border-radius: 10px;
`;

const getPodcastImage = (logo: any, title: string) => {
  return logo && logo.image ? { uri: logo.image } : getPlaceHolderImage(title);
};

const HeaderContainer = styled.View`
  align-items: center;
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
