import React from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";

// A Simple Button Component
const Button = props => {
  return (
    <TouchableOpacity style={[props.style, styles.button]} onPress={props.onPress}>
      <Text style={[styles.titleStyle, props.titleStyle]}> {props.title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3cb371",
    textAlign: "center",
    padding: 50,
    textTransform: "uppercase",
    borderRadius: 3,
    ...Platform.select({
      web: {
        fontFamily: "CircularStd",
        padding: "20",
        minHeight: "50",
        minWidth: "200"
      },
      android: {
        padding: 6
      }
    })
  },
  titleStyle: {
    fontSize: 20,
    letterSpacing: 1,
    color: "#fff",
    ...Platform.select({
      web: {
        fontFamily: "CircularStd",
        padding: 20
      }
    })
  }
});

export default Button;
