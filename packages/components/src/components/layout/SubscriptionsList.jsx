import React, { Component } from "react";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { RecyclerView } from "../common/RecyclerView";
import PodcastItem from "../common/PodcastItem";

const { width } = Dimensions.get("window");
class SubscriptionsList extends Component {
  render() {
    const { subscriptions } = this.props;
    const recyclerViewProps = {
      forceNonDeterministicRendering: true,
      isHorizontal: true,
      showsHorizontalScrollIndicator: false
    };

    const getRecyclerViewLayout = () => {
      return (type, dim) => {
        dim.width = width;
        dim.height = 100;
      };
    };

    const renderListItem = (type, data) => {
      return <PodcastItem {...data} />;
    };

    const containerStyle = styles.listContainer;
    return (
      <RecyclerView
        data={subscriptions}
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
    height: 220,
    ...Platform.select({
      web: {
        height: 270,
        marginTop: 30,
        marginBottom: 10
      }
    })
  }
});

export default SubscriptionsList;
