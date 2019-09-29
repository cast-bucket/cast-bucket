import React, { FunctionComponent } from "react";
import styled from "@emotion/native";
import { ScrollView, Dimensions } from "react-native";
import Header from "../common/EpisodesHeader";
import { Paragraph, Text } from "../common/Typography";
import { Redirect } from "../../libs/router";
import EpisodesList from "../layout/EpisodesList";
import { isSmallScreen } from "../../utils/platforms";

const ITEM_SIZE = 250;

const { width } = Dimensions.get("window");

const getPodcastOptions = ({ location }) => (location.state && location.state.options) || {};

const PodcastDescription = styled(Paragraph)`
  align-self: center;
  text-align: center;
  line-height: 35;
  padding-horizontal: 30px;
`;

const PodcastTitle = styled(Text)`
  font-size: 26px;
  font-weight: 600;
  margin-vertical: 25px;
  padding-horizontal: 20px;
  text-align: center;
`;

const EpisoderHeaderContainer = styled.View`
  height: 400px;
`;

const EpisodesContainer = styled.View`
  justifyContent: space-around,
  alignSelf: center,
  margin-top: 100px;
`;

type EpisodesScreenProps = {
  podcastId: string,
  description: string,
  rss: string,
  location: any,
  logo: any
};

export const Episodes: FunctionComponent<EpisodesScreenProps> = (props) => {
  const { podcastId, description, logo, rss } = getPodcastOptions(props);
  if (!podcastId) {
    return <Redirect path="/home" />;
  }
  return (
    <ScrollView>
      <EpisoderHeaderContainer>
        <Header logo={logo} title={podcastId} size={ITEM_SIZE} />
      </EpisoderHeaderContainer>
      <PodcastTitle>{podcastId}</PodcastTitle>
      <PodcastDescription
        style={{ fontSize: 22, maxWidth: isSmallScreen ? width * 0.9 : width * 0.75 }}
      >
        {description}
      </PodcastDescription>
      <EpisodesContainer>
        <EpisodesList feed={rss} />
      </EpisodesContainer>
    </ScrollView>
  );
};
