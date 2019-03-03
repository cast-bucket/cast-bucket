import React from "react";
import { StyleSheet, Text, View } from "react-native";
import global from "../../config/globals";
import truncate from "truncate";
import { Dimensions } from "react-native";

const titleShortener = title => {
  return truncate(title, 50);
};

const screenWidth = Dimensions.get("window").width; //full width

const EpisodeItem = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignSelf: "center",
        padding: 20,
        width: screenWidth,
        borderBottomColor: "#eff2f9",
        backgroundColor: "#fff"
      }}
    >
      <Text
        style={[
          styles.podcastItem,
          styles.episodeTitle,
          global.styles.defaultSansFont,
          global.styles.fontMedium
        ]}
      >
        {titleShortener(props.title)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  episodeTitle: {
    textTransform: "capitalize"
  }
});

export default EpisodeItem;
