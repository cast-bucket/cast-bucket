import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { connect } from "react-redux";
import TopPodcasts from "../components/container/TopPodcasts";
import globals from "../config/globals";
import { withRouter } from "../routes/routes";
class Home extends Component {
  render() {
    return (
      <View>
        <Text style={[globals.styles.defaultMonoFont, globals.styles.fontLarge]}> Discover </Text>
        <TopPodcasts category="All" />
        <TopPodcasts category="Technology" />
        <TopPodcasts category="Arts" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 1,
    height: 150,
    minWidth: 1
  },
  podcastHeading: {
    margin: 20,
    marginBottom: 5,
    fontSize: 25,
    ...Platform.select({
      web: {
        textTransform: "capitalize",
        fontFamily: "CircularStd"
      },
      android: {
        fontFamily: "CircularStd-Bold"
      }
    })
  }
});

export default connect()(Home);
