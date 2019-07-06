import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import EpisodeItem from "../common/EpisodeItem";
import { isMobile } from "../utils/platforms";
class EpisodesList extends Component {
  resize = () => this.forceUpdate();

  componentDidMount() {
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
  }

  componentWillUnmount() {
    if (!isMobile) {
      window.removeEventListener("resize", this.resize);
    }
  }

  render() {
    const { data } = this.props;
    const renderListItem = ({ item, index }) => {
      return <EpisodeItem item={item} _index={index} />;
    };
    const containerStyle = styles.listContainer;
    // TODO: Lazy Load Episode Items onEndReached
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
