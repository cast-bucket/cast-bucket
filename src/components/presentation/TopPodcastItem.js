import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import global from "../../config/styles";
const fallBackImage = require("../../assets/logo/png/cast-bucket-icon-green-300.png");

const TopPodcastItem = props => {
  return (
    <View>
      <Image
        style={[styles.podcastImage, styles.podcastItem]}
        source={{ uri: props.logoUrl || props.scaledLogoUrl }}
        loadingIndicatorSource={{ uri: fallBackImage }}
        defaultSource={{ uri: fallBackImage }}
      />
      <Text style={[styles.podcastItem, styles.podcastTitle, global.styles.defaultSansFont]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  podcastImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    borderWidth: 0.005,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  podcastItem: {
    marginLeft: 20,
    marginRight: 30,
    marginBottom: 20
  },
  podcastTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    flex: 1,
    flexWrap: "wrap",
    maxWidth: 140
  }
});

export default TopPodcastItem;
