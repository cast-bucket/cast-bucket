import styled from "@emotion/native";
import React from "react";
import { Headline, Text as RPText, Title as RPTitle } from "react-native-paper";
import RF from "react-native-responsive-fontsize";

const commonStyles = {
  fontFamily: "Inter"
};

export const Text = styled(RPText)`
  font-family: Inter;
`;

const titleStyle = {
  fontSize: RF(4)
};

const headingStyle = {
  fontSize: RF(4.75)
};

export const Title = props => (
  <RPTitle {...props} style={[commonStyles, titleStyle, props.style]} />
);
export const Heading = props => (
  <Headline {...props} style={[commonStyles, headingStyle, props.style]} />
);
