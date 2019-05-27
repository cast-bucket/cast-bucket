import React, { Component } from "react";
import { Dimensions, StyleSheet } from "react-native";
import EpisodeItem from "../common/EpisodeItem";
import { RecyclerView } from "../common/RecyclerView";

const { width } = Dimensions.get("window");

class EpisodesList extends Component {
  render() {
    const { data } = this.props;
    const recyclerViewProps = {
      showsHorizontalScrollIndicator: false,
      useWindowScroll: true,
      forceNonDeterministicRendering: true,
      canChangeSize: true
    };

    const getRecyclerViewLayout = () => {
      return (type, dim) => {
        if (type === "EPISODE_ITEM") {
          dim.width = width;
          dim.height = 250;
        }
      };
    };

    const renderListItem = (type, data) => {
      return <EpisodeItem {...data} />;
    };

    const containerStyle = styles.listContainer;
    const recyclerViewData = data.items.map(item => ({ ...item, type: "EPISODE_ITEM" }));
    return (
      <RecyclerView
        data={recyclerViewData}
        renderListItem={renderListItem}
        layoutType={getRecyclerViewLayout()}
        containerStyle={containerStyle}
        recyclerViewProps={recyclerViewProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 1,
    minWidth: 1,
    flex: 1,
    overflow: "hidden"
  }
});

export default EpisodesList;
