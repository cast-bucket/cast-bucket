import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../config/styles";

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
          <Text style={[globalStyles.defaultSansFont, styles.titleStyle, this.props.titleStyle]}> {this.props.title} </Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    color: "mediumseagreen",
    padding: "10px",
    cursor: "pointer",
    border: "2px solid mediumseagreen",
    borderRadius: "100px",
    minHeight: "50px",
    minWidth: "200px",
    textAlign: "center",
    textTransform: "uppercase"
  },
  titleStyle: {
    fontSize: "18px",
    letterSpacing: ".2em"
  }
});
