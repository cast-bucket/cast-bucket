import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/presentation/Button";
import { globalStyles } from "../config/styles"
import "circular-std";
import "typeface-space-mono";


const logo = require("../assets/logo/png/cast-bucket-logo-green-300.png");
const background = require("../assets/images/music.png");

const instructions = Platform.select({
  ios: `Press Cmd+R to reload
          Cmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload 
    Shake or press menu button for dev menu`,
  web: `You are good to go.`
});

const greeting = `An open-source cross platform podcast listening experience `

export default class LandingPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
              accessibilityLabel="CastBucketLogo"
              source={logo}
              resizeMode="contain"
              style={styles.logo}
        />
        <Text style={[globalStyles.fontXLarge, globalStyles.title, globalStyles.primaryText, styles.welcome]}>{greeting}</Text>
        <Image accessibilityLabel="Background" style={styles.heroBackground} resizeMode="contain" source={background} />
        <Button title="Sign Up" style={styles.signupButton}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  heroBackground:{
    width: 900,
    height: 700,
    position: "absolute",
    left: 700,
    top: 50
  },
  welcome: {
    fontWeight: "500",
    alignSelf: "flex-start",
    position: "relative",
    width: 500,
    left: 100,
    top: 100,
  },
  logo: {
    width: 150,
    height: 75,
    alignSelf: "flex-start",
    left: 30,
    top: 20
  },
  signupButton: {
    alignSelf: "flex-start",
    position: "relative",
    left: 200,
    top: 200
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
