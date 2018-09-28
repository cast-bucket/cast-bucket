import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

// A Card component which has an image that
export default class ImageCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure than actual design.
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2
  }
});
