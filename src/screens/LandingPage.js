import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/presentation/Button";
import { globalStyles } from "../config/styles"


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
        <Button title="Sign Up" style={styles.signupButton}/>
        <Image accessibilityLabel="Background" style={styles.heroBackground} resizeMode="contain" source={background} />
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
  ...Platform.select({
    web: {
      width: 900,
      height: 700,
      position: "absolute",
      left: 700,
      top: 50
    },
    android: {
      alignItems: "center",
      width: 700,
      height: 500,
      bottom: 240,
      left: 120,
      zIndex: -1,
      opacity: 0.15
    }, 
    ios: {
      alignItems: "center",
      width: 700,
      height: 500,
      bottom: 240,
      left: 120,
      zIndex: -1,
      opacity: 0.15
    }
    })
  },
  welcome: {
    ...Platform.select({
      web: {
        fontWeight: "500",
        alignSelf: "flex-start",
        position: "relative",
        width: 500,
        left: 100,
        top: 100,
    }, 
    android: {
      textAlign: "center",
      top: 20,
      padding: 5,
      fontSize: 40,
      fontFamily: "CircularStd-Bold",
      lineHeight: 60
    }, 
    ios: {
      fontWeight: "500",
      alignSelf: "center",
      left: 35,
      top: 20,
      width: 400,
      fontSize: 45
    }
    })

  },
  logo: {
    ...Platform.select({
      web: {
        width: 150,
        height: 75,
        alignSelf: "flex-start",
        left: 30,
        top: 20
      },
      android: {
        width: 250,
        height: 125,
        alignSelf: "center"
      },
      ios: {
        width: 250,
        height: 125,
        alignSelf: "center"
      }
    })

  },
  signupButton: {
    alignSelf: "center",
    ...Platform.select({
      web: {
        position: "relative",
        left: 200,
        top: 200,
      },
      android: {
        top: 100,
        borderRadius: 4
      }
    })

  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
