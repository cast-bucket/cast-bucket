import React from "react";
import styled, { Styled } from "@emotion/native";
import RF from "react-native-responsive-fontsize";
import titleCase from "title-case";
import { View } from "react-native";
import { Title, Text } from "../common/Typography";
import Podcasts from "../containers/Podcasts";
import { isMobile } from "../../utils/platforms";
import * as constants from "../../utils/constants";
import { Link } from "../../libs/router";

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

const rowButtonStyles: any = {
  alignSelf: "center",
  color: "#184277",
  fontSize: RF(2.5),
  marginRight: 15,
  textDecoration: 'none' 
};

if (!isMobile) {
  rowButtonStyles.cursor = "pointer";
}

// TODO: load more items, or link section to new page?
const handleRowButtonPress = rowId => {
  console.log("Row Row Row the boat at" + rowId);
};

const renderHomePageSections = () => {
  const sections = ["new-releases", "subscriptions", "recommended", "recently-played"];
  return sections.map(sectionId => {
    return (
      <Section key={sectionId}>
        <Row>
          <SectionTitle>{titleCase(sectionId)}</SectionTitle>
          <Link style={{ ...rowButtonStyles }} onPress={() => handleRowButtonPress(sectionId)}>
            <Text>View All</Text>
          </Link>
        </Row>
        {
          // @ts-ignore
          <Podcasts type={sectionId} />
        }
      </Section>
    );
  });
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
      <PageHeading style={{ fontSize: RF(4) }}>Home</PageHeading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </View>
    {renderHomePageSections()}
  </Container>
);
