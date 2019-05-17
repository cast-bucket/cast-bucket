import React from "react";
import styled from "@emotion/native";
import { Dimensions } from "react-native";
import RF from "react-native-responsive-fontsize";
import titleCase from "title-case";
import Podcasts from "../containers/Podcasts";
import { Heading, Text, Title } from "../common/Typography";
import { isMobile } from "../utils/platforms";

const { width } = Dimensions.get("window");
const Container = styled.ScrollView``;

const PageHeading = styled(Heading)`
  font-weight: 700;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 40px;
  width: ${width};
`;

const Section = styled.View`
  margin-top: 36px;
`;

const SectionTitle = styled(Title)`
  font-weight: 700;
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

const sections = ["new-releases", "subscriptions", "recommended", "recently-played"];
const renderSections = sectionId => (
  <Section key={sectionId}>
    <Row>
      <SectionTitle>{titleCase(sectionId)}</SectionTitle>
      <RowButton onPress={() => handleRowButtonPress(sectionId)} />
    </Row>
    <Podcasts type={sectionId} />
  </Section>
);

export const Home = () => (
  <Container>
    <Row
      style={{
        paddingTop: 50,
        paddingBottom: 20
      }}
    >
      <PageHeading>Home</PageHeading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </Row>
    {sections.map(renderSections)}
  </Container>
);
