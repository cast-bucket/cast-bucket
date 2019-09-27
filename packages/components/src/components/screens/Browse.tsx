import React from "react";
import { ScrollView, View } from "react-native";
import { TextInput } from "react-native-paper";
import * as constants from "../../utils/constants";
import PodcastsSection from "../layout/PodcastsSection";

export class Browse extends React.PureComponent {
  state = {
    text: ""
  };

  // TODO: Avoid Remount on location change
  componentWillMount() {}

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "stretch" }}>
        <View style={{ margin: constants.spacing.containerMargin.val }}>
          <TextInput
            label="Search for Podcasts"
            mode="flat"
            style={{
              backgroundColor: "white"
            }}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <PodcastsSection sectionType="recommended" />
      </ScrollView>
    );
  }
}
