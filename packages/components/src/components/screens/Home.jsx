import React from "react";
import styled, { css } from "@emotion/native";
import { Dimensions } from "react-native";
import Podcasts from "../containers/Podcasts";
import { Heading, Text, Title } from "../common";
const { width } = Dimensions.get("window");

const Container = styled.View`
  margin: 30px;
`;

const Section = styled.View`
  padding: 10px;
  margin-bottom: 50px;
`;

const RowButton = styled(Text)`
  align-self: center;
  color: #1f1f1f;
  font-size: 18px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${width};
`;

const SectionTitle = styled(Title)`
  width: 300px;
`;

const UserAvatar = styled.Image`
  background: lightblue;
  border-radius: 100px;
  width: 50px;
  height: 50px;
  align-self: center;
`;

const RowButtonText = "View All";

// TODO: load more items, or link section to new page?
const handleRowButtonPress = rowId => {
  console.log(rowId);
};

export const Home = props => (
  <Container>
    <Row>
      <Heading
        style={css`
          padding: 40px 10px;
        `}
      >
        Home
      </Heading>
      <UserAvatar source={{ uri: "https://i.pravatar.cc/120" }} />
    </Row>

    <Section>
      <Row>
        <SectionTitle>New Releases</SectionTitle>
        <RowButton onPress={() => handleRowButtonPress("new-releases")}>{RowButtonText}</RowButton>
      </Row>
      <Podcasts type="new-releases" />
    </Section>
    <Section>
      <Row>
        <Title>Subscriptions</Title>
        <RowButton onPress={() => handleRowButtonPress("subscriptions")}>{RowButtonText}</RowButton>
      </Row>
      <Podcasts type="subscriptions" />
    </Section>
    <Section>
      <Row>
        <Title>Recommended</Title>
        <RowButton onPress={() => handleRowButtonPress("recommended")}>{RowButtonText}</RowButton>
      </Row>
      <Podcasts type="recommended" />
    </Section>
    <Section>
      <Row>
        <Title>Recently Played</Title>
        <RowButton onPress={() => handleRowButtonPress("recently-played")}>
          {RowButtonText}
        </RowButton>
      </Row>
      <Podcasts type="recently-played" />
    </Section>
  </Container>
);
