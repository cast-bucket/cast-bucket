import React from "react";
// import { CachedImage } from "react-native-img-cache";
import { StyleSheet, Text, View, Image, Platform } from "react-native";
import global from "../../config/globals";
const fallBackImage = require("../../assets/logo/png/cast-bucket-icon-green-300.png");

const titleShortener = title => {
  const stripDashesFromTitle = title.split("-");
  return stripDashesFromTitle[0];
};

const TopPodcastItem = props => {
  return (
    <View>
      <Image
        key={props.id}
        style={[styles.podcastImage, styles.podcastItem]}
        defaultSource={require("../../assets/placeholders/cast-bucket-icon-green(1).png")}
        source={{ uri: props.logoUrl || props.scaledLogoUrl }}
      />
      <Text style={[styles.podcastItem, styles.podcastTitle, global.styles.defaultSansFont]}>
        {titleShortener(props.title)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  podcastImage: {
    width: 140,
    height: 140,
    ...Platform.select({
      web: {
        width: 140,
        height: 140
      }
    }),
    borderRadius: 5,
    backgroundColor: "#fafafa",
    borderWidth: 0.005,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
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
    maxWidth: 140,
    fontSize: 18,
    fontFamily: "CircularStd-Bold",
    textTransform: "capitalize"
  }
});

export default TopPodcastItem;
