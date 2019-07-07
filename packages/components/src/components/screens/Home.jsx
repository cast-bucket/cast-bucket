import React from "react";
import styled from "@emotion/native";
import RF from "react-native-responsive-fontsize";
import titleCase from "title-case";
import { View } from "react-native";
import { Text, Title } from "../common/Typography";
import Podcasts from "../containers/Podcasts";
import { isMobile } from "../utils/platforms";
import * as constants from "../utils/constants";

const Container = styled.ScrollView`
  flex: 1;
`;

const PageHeading = styled(Title)`
  font-weight: 700;
  margin-left: ${constants.spacing.containerMargin.dim};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const Section = styled.View`
  margin-top: 20px;
`;

const SectionTitle = styled(Title)`
  font-weight: 700;
  padding-left: ${constants.spacing.containerMargin.dim};
`;

const UserAvatar = styled.Image`
  align-self: flex-start;
  background: lightblue;
  border-radius: 100px;
  margin-right: 20px;
  height: 50px;
  width: 50px;
`;

const rowButtonStyles = {
  alignSelf: "center",
  color: "#184277",
  fontSize: RF(2.5),
  marginRight: 15
};

if (!isMobile) {
  rowButtonStyles.cursor = "pointer";
}

// TODO: load more items, or link section to new page?
const handleRowButtonPress = rowId => {
  console.log(rowId);
};

const RowButton = () => <Text style={rowButtonStyles}>View All</Text>;

const renderHomePageSections = location => {
  const sections = ["new-releases", "subscriptions", "recommended", "recently-played"];
  return sections.map(sectionId => {
    return (
      <Section key={sectionId}>
        <Row>
          <SectionTitle>{titleCase(sectionId)}</SectionTitle>
          <RowButton onPress={() => handleRowButtonPress(sectionId)} />
        </Row>
        <Podcasts type={sectionId} location={location} />
      </Section>
    );
  });
};

export const Home = ({ location }) => (
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
      <PageHeading style={{ fontSize: RF(4) }}>Home</PageHeading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </View>
    {renderHomePageSections(location)}
  </Container>
);
