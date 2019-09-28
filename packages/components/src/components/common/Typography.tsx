import React from "react";
import {
  Headline,
  Paragraph as RPParagraph,
  Text as RPText,
  Title as RPTitle
} from "react-native-paper";
import styled from "@emotion/native";
import * as constants from "../../utils/constants";

const commonStyles = {
  fontFamily: "Inter"
};

export const Title = props => <RPTitle {...props} style={[commonStyles, props.style]} />;

export const Heading = props => <Headline {...props} style={[commonStyles, props.style]} />;

export const SectionTitle = styled(Title)`
  font-weight: 700;
  font-size: 26px;
  padding-left: ${constants.ui.containers.margin.px};
`;

export const Paragraph = props => <RPParagraph {...props} style={[commonStyles, props.style]} />;
export const Text = props => <RPText {...props} style={[commonStyles, props.style]} />;
export const PageHeading = styled(Title)`
  font-weight: 700;
  font-size: 32px;
  margin-left: ${constants.ui.containers.margin.px};
  margin-bottom: ${constants.ui.containers.margin.px};
`;
