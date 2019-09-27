import React from "react";
import styled from "@emotion/native";
import { View } from "react-native";
import { Title } from "../common/Typography";
import * as constants from "../../utils/constants";
import PodcastsSection from "../layout/PodcastsSection";

const Container = styled.ScrollView`
  flex: 1;
`;

const PageHeading = styled(Title)`
  font-weight: 700;
  margin-left: ${constants.spacing.containerMargin.dim};
`;

const UserAvatar = styled.Image`
  align-self: flex-start;
  background: lightblue;
  border-radius: 100px;
  margin-right: 20px;
  height: 50px;
  width: 50px;
`;

const renderHomePageSections = () => {
  const sections = ["new-releases", "subscriptions", "recently-played"];
  // @ts-ignore
  return sections.map((sectionId, index) => (
    <PodcastsSection sectionType={sectionId} key={index} />
  ));
};

export const Home = ({}) => (
  <Container contentContainerStyle={{ alignItems: "stretch" }}>
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        paddingTop: 40
      }}
    >
      <PageHeading style={{ fontSize: 32 }}>Home</PageHeading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </View>
    {renderHomePageSections()}
  </Container>
);
