import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
const logo = require("./assets/logo/png/cast-bucket-logo-green-300.png");

const instructions = Platform.select({
  ios: `Press Cmd+R to reload
          Cmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload 
    Shake or press menu button for dev menu`,
  web: `You are good to go.`
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image accessibilityLabel="CastBucketLogo" source={logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.welcome}>Welcome to Cast Bucket</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#fff"
  },
  logo: {
    width: 300,
    height: 150
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
