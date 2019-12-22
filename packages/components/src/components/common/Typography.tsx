import styled from "@emotion/native";
import React from "react";
import {
  Headline,
  Paragraph as RPParagraph,
  Text as RPText,
  Title as RPTitle
} from "react-native-paper";
import * as constants from "../../utils/constants";

const commonStyles = {
  fontFamily: "Inter"
};

export const Heading = (props: any) => <Headline {...props} style={[commonStyles, props.style]} />;

export const Paragraph = (props: any) => (
  <RPParagraph {...props} style={[commonStyles, props.style]} />
);

export const Text = (props: any) => <RPText {...props} style={[commonStyles, props.style]} />;

export const Title = (props: any) => <RPTitle {...props} style={[commonStyles, props.style]} />;

export const SectionTitle = styled(Title)`
  font-weight: 700;
  font-size: 26px;
  padding-left: ${constants.ui.containers.margin.px};
`;

export const PageHeading = styled(Title)`
  font-weight: 700;
  font-size: 32px;
  margin-left: ${constants.ui.containers.margin.px};
  margin-bottom: ${constants.ui.containers.margin.px};
`;
