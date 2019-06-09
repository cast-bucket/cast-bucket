import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import EpisodeItem from "../common/EpisodeItem";

class EpisodesList extends Component {
  render() {
    const { data } = this.props;
    const renderListItem = data => {
      return <EpisodeItem {...data} />;
    };
    const containerStyle = styles.listContainer;
    return (
      <FlatList
        contentContainerStyle={containerStyle}
        data={data.items}
        renderItem={renderListItem}
        keyExtractor={(item, index) => `${item.link}${index.toString()}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "stretch"
  }
});

export default EpisodesList;
