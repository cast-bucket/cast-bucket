import React from "react";
import {
  Headline,
  Paragraph as RPParagraph,
  Text as RPText,
  Title as RPTitle
} from "react-native-paper";
import RF from "react-native-responsive-fontsize";

const commonStyles = {
  fontFamily: "Inter"
};

const titleStyle = {
  fontSize: RF(3.5)
};

const headingStyle = {
  fontSize: RF(4.5)
};

export const Title = props => (
  <RPTitle {...props} style={[commonStyles, titleStyle, props.style]} />
);

export const Heading = props => (
  <Headline {...props} style={[commonStyles, headingStyle, props.style]} />
);

export const Paragraph = props => <RPParagraph {...props} style={[commonStyles, props.style]} />;
export const Text = props => <RPText {...props} style={[commonStyles, props.style]} />;
