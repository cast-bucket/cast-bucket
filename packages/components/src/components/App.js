import React, { Component } from "react";
import { Text, Platform } from "react-native";
import styled from "@emotion/native";

import { Button } from "@cast-bucket/components/src/components/common";

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const Texter = styled.Text`
  font-family: Inter;
`;

export class App extends Component {
  render() {
    return (
      <Container>
        {/* <Animated.Image source={logo} style={[styles.logo, { transform: [{ rotate: spin }] }]} /> */}
        <Texter> Cast Bucket</Texter>
        <Button color="#d3d3d3" title="Click!" />
      </Container>
    );
  }
}
