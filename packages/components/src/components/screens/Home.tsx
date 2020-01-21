import styled from "@emotion/native";
import React from "react";
import { TouchableHighlight } from "react-native";
import { useHistory } from "react-router-dom";
import * as constants from "../../utils/constants";
import { Page } from "../common/Page";
import PodcastsSection from "../layout/PodcastsSection";

const ScrollableContainer = styled.ScrollView`
  flex: 1;
`;

const UserAvatar = styled.Image`
  border-radius: 100px;
  height: 50px;
  margin-right: 20px;
  margin-top: -65px;
  width: 50px;
  display: flex;
  align-self: flex-end;
`;

const renderHomePageSections = () => {
  const sections = ["new-releases", "subscriptions", "recently-played"];
  return sections.map((sectionId, index) => (
    <PodcastsSection
      sectionType={sectionId}
      key={index}
      style={{ ...(index === 0 ? { marginTop: constants.ui.containers.margin.px } : {}) }}
    />
  ));
};

export const Home = () => {
  const history = useHistory();
  return (
    <ScrollableContainer contentContainerStyle={{ alignItems: "stretch" }}>
      <Page title="Home">
        <TouchableHighlight onPress={() => history.push("/account")}>
          <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
        </TouchableHighlight>
        {renderHomePageSections()}
      </Page>
    </ScrollableContainer>
  );
};
