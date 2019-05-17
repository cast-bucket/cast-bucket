import React from "react";
import styled from "@emotion/native";
import { ScrollView } from "react-native";
import Header from "../common/EpisodesHeader";
import { Paragraph, Text } from "../common/Typography";

const ITEM_SIZE = 250;

const getPodcastOptions = ({ location }) => (location.state && location.state.options) || {};

const PodcastDescription = styled(Paragraph)`
  align-self: center;
  text-align: center;
  line-height: 35;
  max-width: 400px;
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

export const Episodes = props => {
  const { podcastId, description, logo } = getPodcastOptions(props);
  return (
    <ScrollView>
      <EpisoderHeaderContainer>
        <Header logo={logo} title={podcastId} size={ITEM_SIZE} style={{ flex: 1 }} />
      </EpisoderHeaderContainer>
      <PodcastTitle>{podcastId}</PodcastTitle>
      <PodcastDescription style={{ fontSize: 22 }}>{description}</PodcastDescription>
    </ScrollView>
  );
};
