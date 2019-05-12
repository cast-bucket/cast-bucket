import React from "react";
import styled, { css } from "@emotion/native";
import { Dimensions } from "react-native";
import Podcasts from "../containers/Podcasts";
import { Heading, Text, Title } from "../common";
import { isMobile } from "../utils/platforms";

const { width } = Dimensions.get("window");

const Container = styled.ScrollView`
  padding: ${isMobile ? "20px" : "30px"};
`;

const Section = styled.View`
  padding: 10px;
  margin-bottom: ${isMobile ? "0px" : "50px"};
`;

const RowButton = styled(Text)`
  color: #1f1f1f;
  font-size: 18px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${width};
`;

const SectionTitle = styled(Title)`
  width: ${width / 4}px;
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
        <SectionTitle>Subscriptions</SectionTitle>
        <RowButton onPress={() => handleRowButtonPress("subscriptions")}>{RowButtonText}</RowButton>
      </Row>
      <Podcasts type="subscriptions" />
    </Section>
    <Section>
      <Row>
        <SectionTitle>Recommended</SectionTitle>
        <RowButton onPress={() => handleRowButtonPress("recommended")}>{RowButtonText}</RowButton>
      </Row>
      <Podcasts type="recommended" />
    </Section>
    <Section>
      <Row>
        <SectionTitle>Recently Played</SectionTitle>
        <RowButton onPress={() => handleRowButtonPress("recently-played")}>
          {RowButtonText}
        </RowButton>
      </Row>
      <Podcasts type="recently-played" />
    </Section>
  </Container>
);
