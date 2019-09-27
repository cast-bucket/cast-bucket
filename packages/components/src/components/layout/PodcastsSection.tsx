import React, { FunctionComponent } from "react";

import Podcasts from "../containers/Podcasts";
import styled from "@emotion/native";
import { isMobile } from "../../utils/platforms";
import * as constants from "../../utils/constants";
import { Title, Text } from "../common/Typography";
import { Link, withRouter } from "../../libs/router";
import titleCase from "title-case";

const Section = styled.View`
  margin-top: 20px;
`;

const SectionTitle = styled(Title)`
  font-weight: 700;
  font-size: 22px;
  padding-left: ${constants.spacing.containerMargin.dim};
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const rowButtonStyles: any = {
  alignSelf: "center",
  color: "#184277",
  fontSize: 20,
  marginRight: 15,
  textDecoration: "none"
};

if (!isMobile) {
  rowButtonStyles.cursor = "pointer";
}

// TODO: load more items, or link section to new page?
const handleRowButtonPress = rowId => {
  console.log("Row Row Row the boat at" + rowId);
};

type PodcastsSectionProps = {
  sectionType: string;
};

const PodcastsSection: FunctionComponent<PodcastsSectionProps> = React.memo(props => {
  const { sectionType } = props;
  return (
    <Section key={sectionType}>
      <Row>
        <SectionTitle>{titleCase(sectionType)}</SectionTitle>
        <Link style={{ ...rowButtonStyles }} onPress={() => handleRowButtonPress(sectionType)}>
          <Text>View All</Text>
        </Link>
      </Row>
      <Podcasts type={sectionType} />
    </Section>
  );
});

export default withRouter(PodcastsSection);
