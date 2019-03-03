import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import Categories from "../components/container/Categories";
import globals from "../config/globals";
import { styles as s } from "react-native-style-tachyons";
class Home extends Component {
  render() {
    return (
      <View>
        <Text style={[globals.styles.title, s.f2]}> Discover </Text>
        {/* <TopPodcasts category="All" />
        <TopPodcasts category="Technology" />
        <TopPodcasts category="Arts" /> */}
        <Categories />
      </View>
    );
  }
}

export default connect()(Home);
