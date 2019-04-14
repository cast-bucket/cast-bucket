import React from "react";
import styled from "@emotion/native";

const StyledTouchableOpacity = styled.TouchableOpacity`
  padding: ${props => props.padding || "10px"};
  background-color: ${props => props.background || "#00ddff"};
  border-radius: 3px;
`;

const StyledText = styled.Text`
  font-size: ${props => props.fontSize};
  letter-spacing: ${props => props.letterSpacing};
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
`;

export const Button = props => {
  return (
    <StyledTouchableOpacity onPress={props.onPress} activeOpacity={0.6} underlayColor="#000">
      <StyledText>{props.title}</StyledText>
    </StyledTouchableOpacity>
  );
};

StyledText.defaultProps = {
  fontSize: 18,
  letterSpacing: "0px",
  color: "#fff",
  fontFamily: "Inter"
};
