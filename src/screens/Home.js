import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import Categories from "../components/container/Categories";
import globals from "../config/globals";
class Home extends Component {
  render() {
    return (
      <View>
        <Text style={[globals.styles.defaultSansBoldFont, globals.styles.fontLarge]}> Discover </Text>
        {/* <TopPodcasts category="All" />
        <TopPodcasts category="Technology" />
        <TopPodcasts category="Arts" /> */}
        <Categories />
      </View>
    );
  }
}

export default connect()(Home);
