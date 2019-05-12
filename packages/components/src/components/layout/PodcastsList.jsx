import React, { Component } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { RecyclerView } from "../common/RecyclerView";
import PodcastItem from "../common/PodcastItem";

const { height } = Dimensions.get("window");

const ITEM_SIZE = 220;

class PodcastsList extends Component {
  render() {
    const { data } = this.props;
    const recyclerViewProps = {
      isHorizontal: true,
      useWindowScroll: true
    };

    const getRecyclerViewLayout = () => {
      return (type, dim) => {
        dim.width = ITEM_SIZE;
        dim.height = height;
      };
    };

    const renderListItem = (type, data) => {
      return <PodcastItem {...data} />;
    };

    const containerStyle = styles.listContainer;
    return (
      <RecyclerView
        data={data}
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
    height: 275,
    marginTop: 20,
    marginBottom: 10
  }
});

export default PodcastsList;
