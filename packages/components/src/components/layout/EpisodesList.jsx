import React, { Component } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import EpisodeItem from "../common/EpisodeItem";

const { width } = Dimensions.get("window");

class EpisodesList extends Component {
  render() {
    const { data } = this.props;
    const renderListItem = data => {
      return <EpisodeItem {...data} />;
    };
    const containerStyle = styles.listContainer;
    const recyclerViewData = data.items.map(item => ({ ...item, key: item.link }));
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
