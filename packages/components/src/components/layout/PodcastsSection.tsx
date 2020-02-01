import styled from "@emotion/native";
import React from "react";
import { View } from "react-native";
import titleCase from "title-case";
import { Link } from "../../libs/router";
import { isMobile } from "../../utils/platforms";
import { SectionTitle, Text } from "../common/Typography";
import Podcasts from "../containers/Podcasts";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const rowButtonStyles: any = {
  alignSelf: "center",
  marginRight: 15
};

if (!isMobile) {
  rowButtonStyles.textDecoration = "none";
  rowButtonStyles.cursor = "pointer";
}

interface PodcastsSectionProps {
  sectionType: string;
  style?: any;
}

class PodcastsSection extends React.PureComponent<PodcastsSectionProps> {
  render() {
    const { sectionType, style } = this.props;
    return (
      <View key={sectionType} style={style}>
        <Row>
          <SectionTitle>{titleCase(sectionType)}</SectionTitle>
          <Link
            style={{ ...rowButtonStyles }}
            to={{
              pathname: sectionType
            }}
          >
            <Text>View All</Text>
          </Link>
        </Row>
        <Podcasts type={sectionType} />
      </View>
    );
  }
}

export default PodcastsSection;
