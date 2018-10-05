import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import global from "../../config/styles";

const defaultColor = "mediumseagreen";
const defaultFontColor = "white";

// A Simple Button Component
export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <TouchableOpacity
          style={[this.props.style, styles.button]}
          onPress={this.props.onPress}
        >
          <Text style={[styles.titleStyle, this.props.titleStyle]}> {this.props.title} </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3cb371",
    textAlign: "center",
    textTransform: "uppercase",
    ...Platform.select({
      web: {
      padding: "10",
      minHeight: "50",
      minWidth: "200",
      }, 
      android: {
        padding: 6
      }
    })
  },
  titleStyle: {
    fontSize: 20,
    letterSpacing: 1,
    color: "#fff"
  }
});
