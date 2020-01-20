import styled from "@emotion/native";
import { withTheme } from "emotion-theming";
import React from "react";
import {
  Headline,
  Paragraph as RPParagraph,
  Text as RPText,
  Title as RPTitle
} from "react-native-paper";
import * as constants from "../../utils/constants";
import { useFont } from "../../utils/font-maker";
import { isSmallScreen } from "../../utils/platforms";

const commonStyles = useFont();

export const Heading = withTheme((props: any) => {
  const themeStyles = props.theme ? { color: props.theme.colors.text } : {};
  return <Headline {...props} style={[commonStyles, themeStyles, props.style]} />;
});

export const Paragraph = withTheme((props: any) => {
  const themeStyles = props.theme ? { color: props.theme.colors.secondary } : {};
  return <RPParagraph {...props} style={[commonStyles, themeStyles, props.style]} />;
});

export const Text = withTheme((props: any) => {
  const themeStyles = props.theme ? { color: props.theme.colors.text } : {};
  return <RPText {...props} style={[commonStyles, themeStyles, props.style]} />;
});

export const Title = withTheme((props: any) => {
  const themeStyles = props.theme ? { color: props.theme.colors.text } : {};
  return <RPTitle {...props} style={[commonStyles, themeStyles, props.style]} />;
});

export const SectionTitle = styled(Title)`
  font-weight: 700;
  font-size: ${isSmallScreen ? "26px" : "28px"};
  padding-left: ${constants.ui.containers.margin.px};
`;

export const PageHeading = styled(Title)`
  font-weight: 700;
  font-size: ${isSmallScreen ? "32px" : "34px"};
  margin-left: ${constants.ui.containers.margin.px};
  margin-bottom: ${constants.ui.containers.margin.px};
`;
