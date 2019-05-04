import React from "react";
import styled from "@emotion/native";
import Podcasts from "../containers/Podcasts";

const Container = styled.View`
  margin: 30px;
`;

const Section = styled.View`
  padding: 10px;
`;

const SectionTitle = styled.Text`
  font-weight: 700;
  font-size: 32px;
  line-heigth: 30px;
`;
export const Home = props => (
  <Container>
    <Section>
      <SectionTitle>Subscriptions</SectionTitle>
      <Podcasts type="subscriptions" />
    </Section>
  </Container>
);
