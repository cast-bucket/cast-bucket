import styled from "@emotion/native";
import React, { FunctionComponent } from "react";
import { Dimensions } from "react-native";
import { RouteComponentProps } from "react-router-dom";
import { Redirect } from "../../libs/router";
import { isSmallScreen } from "../../utils/platforms";
import Header from "../common/EpisodesHeader";
import { PageWrapper } from "../common/PageWrapper";
import { Paragraph, Text } from "../common/Typography";
import EpisodesList from "../layout/EpisodesList";

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

type EpisodeScreenParams = {
  podcastId: string;
  description: string;
  rss: string;
  location: any;
  logo: any;
};

type EpisodeScreenProps = RouteComponentProps<EpisodeScreenParams>;

export const Episodes: FunctionComponent<EpisodeScreenProps> = props => {
  const { podcastId, description, logo, rss } = getPodcastOptions(props);
  if (!podcastId) {
    return <Redirect to="/home" />;
  }
  return (
    <PageWrapper>
      <EpisoderHeaderContainer>
        <Header logo={logo} title={podcastId} size={ITEM_SIZE} />
      </EpisoderHeaderContainer>
      <PodcastTitle>{podcastId}</PodcastTitle>
      <PodcastDescription
        style={{ fontSize: 20, maxWidth: isSmallScreen ? width * 0.75 : width * 0.75 }}
      >
        {description}
      </PodcastDescription>
      <EpisodesContainer>
        <EpisodesList feed={rss} />
      </EpisodesContainer>
    </PageWrapper>
  );
};
