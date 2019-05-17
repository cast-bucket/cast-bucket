import React from "react";
import styled, { css } from "@emotion/native";
import { Dimensions } from "react-native";
import RF from "react-native-responsive-fontsize";
import Podcasts from "../containers/Podcasts";
import { Heading, Text, Title } from "../common/Typography";

const { width } = Dimensions.get("window");

const Container = styled.ScrollView``;

const Section = styled.View`
  margin-top: 30px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${width};
  padding-left: 40px;
`;

const SectionTitle = styled(Title)`
  font-weight: 700;
`;

const UserAvatar = styled.Image`
  align-self: center;
  background: lightblue;
  border-radius: 100px;
  width: 40px;
  height: 40px;
  margin-right: 20px;
`;

// TODO: load more items, or link section to new page?
const handleRowButtonPress = rowId => {
  console.log(rowId);
};

const RowButton = () => (
  <Text style={{ fontSize: RF(2.5), marginRight: 15, alignSelf: "center" }}>View All</Text>
);

export const Home = props => (
  <Container>
    <Row
      style={{
        paddingTop: 50,
        paddingBottom: 20
      }}
    >
      <Heading
        style={css`
          font-weight: 700;
        `}
      >
        Home
      </Heading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </Row>
    <Section>
      <Row>
        <SectionTitle>New Releases</SectionTitle>
        <RowButton onPress={() => handleRowButtonPress("new-releases")} />
      </Row>
      <Podcasts type="new-releases" />
    </Section>
    <Section>
      <Row>
        <SectionTitle>Subscriptions</SectionTitle>
      </Row>
      <Podcasts type="subscriptions" />
    </Section>
    <Section>
      <Row>
        <SectionTitle>Recommended</SectionTitle>
      </Row>
      <Podcasts type="recommended" />
    </Section>
    <Section>
      <Row>
        <SectionTitle>Recently Played</SectionTitle>
      </Row>
      <Podcasts type="recently-played" />
    </Section>
  </Container>
);
