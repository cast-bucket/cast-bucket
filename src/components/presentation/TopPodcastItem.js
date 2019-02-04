import React from "react";
import FastImage from "../presentation/FastImage/FastImage";
import { StyleSheet, Text, View, Image, Platform, TouchableHighlight } from "react-native";
import { Redirect } from "../../routes/routes";
import global from "../../config/globals";
import { withRouter, Switch } from "../../routes/routes";

const fallBackImage = require("../../assets/placeholders/cast-bucket-icon-green(1).png");

const titleShortener = title => {
  const stripDashesFromTitle = title.split("-");
  const stripBracketsFromTitle = stripDashesFromTitle[0].replace(/ *\([^)]*\) */g, "");
  return stripBracketsFromTitle;
};

const TopPodcastItem = props => {
  return (
    <TouchableHighlight
      onPress={() =>
        props.history.push({
          pathname: "/episodes",
          state: { feedUrl: props.url }
        })
      }
    >
      <View>
        <FastImage
          style={[styles.podcastImage, styles.podcastItem]}
          defaultSource={fallBackImage}
          source={{ uri: props.logoUrl || props.scaledLogoUrl }}
        />
        <Text
          style={[
            styles.podcastItem,
            styles.podcastTitle,
            global.styles.defaultSansFont,
            global.styles.fontXSmall
          ]}
        >
          {titleShortener(props.title)}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  podcastImage: {
    width: 130,
    height: 130,
    borderRadius: 5,
    backgroundColor: "#fafafa",
    borderWidth: 0.005,
    marginTop: 30
  },
  podcastItem: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20
  },
  podcastTitle: {
    textAlignVertical: "center",
    textAlign: "center",
    maxWidth: 130
  }
});

export default withRouter(TopPodcastItem);
