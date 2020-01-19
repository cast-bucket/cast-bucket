import styled from "@emotion/native";
import React from "react";
import { View } from "react-native";
import { Page } from "../common/Page";
import { PageHeading } from "../common/Typography";
import PodcastsSection from "../layout/PodcastsSection";

const ScrollableContainer = styled.ScrollView`
  flex: 1;
`;

const UserAvatar = styled.Image`
  align-self: flex-start;
  background: lightblue;
  border-radius: 100px;
  margin-right: 20px;
  margin-top: -5px;
  height: 50px;
  width: 50px;
`;

const renderHomePageSections = () => {
  const sections = ["new-releases", "subscriptions", "recently-played"];
  return sections.map((sectionId, index) => (
    <PodcastsSection sectionType={sectionId} key={index} />
  ));
};

export const Home = () => (
  <ScrollableContainer contentContainerStyle={{ alignItems: "stretch" }}>
    <Page>
      <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
        <PageHeading>Home</PageHeading>
        <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
      </View>
    </Page>

    {renderHomePageSections()}
  </ScrollableContainer>
);
