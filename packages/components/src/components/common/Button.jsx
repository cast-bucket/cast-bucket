import React from "react";
import styled, { css } from "@emotion/native";

const StyledTouchableOpacity = styled.TouchableOpacity`
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: ${props => {
    if (props.disabled) return "#d3d3d3";
    else return props.background;
  }};
  width: ${props => props.width};
  border-radius: 3px;
  align-self: ${props => props.alignSelf};
`;

const StyledText = styled.Text`
  font-size: ${props => props.fontSize};
  letter-spacing: ${props => props.letterSpacing};
  color: ${props => props.color};
  font-family: ${props => props.fontFamily};
  font-weight: 500;
  text-align: center;
`;

export const Button = props => {
  return (
    <StyledTouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      activeOpacity={0.9}
      underlayColor="#000"
      style={{ ...props.css }}
    >
      <StyledText>{props.children}</StyledText>
    </StyledTouchableOpacity>
  );
};

StyledTouchableOpacity.defaultProps = {
  padding: "20px",
  background: "rgb(21, 91, 255)",
  width: "150px"
};

StyledText.defaultProps = {
  fontSize: 18,
  letterSpacing: "0px",
  color: "#fff"
};
