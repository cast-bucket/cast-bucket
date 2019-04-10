import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styled from "@emotion/native";

const StyledTouchableOpacity = styled.TouchableOpacity`
  padding: ${props => props.padding || "10px"};
  background-color: ${props => props.background || "#00ddff"};
  border-radius: 3px;
`;

const StyledText = styled.Text`
  font-size: ${props => props.fontSize || 18};
  letter-spacing: ${props => props.letterSpacing || "0px"};
  color: ${props => props.color || "#fff"};
  font-family: ${props => (props.fontFamily ? props.fontFamily : "Inter")};
`;

export const StyledButton = props => {
  return (
    <StyledTouchableOpacity onPress={props.onPress} activeOpacity={0.6} underlayColor="#000">
      <StyledText> {props.title} </StyledText>
    </StyledTouchableOpacity>
  );
};
