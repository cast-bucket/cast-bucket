import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PodcastItem from "../common/PodcastItem";
import { RecyclerView } from "../common/RecyclerView";
import { isMobile } from "../utils/platforms";
import * as constants from "../utils/constants";

const { height } = Dimensions.get("window");

const ITEM_SIZE = isMobile ? 180 : 220;
const ITEM_SPACING = constants.spacing.containerMargin.val;

// FIXME: This is remounted everytime location changes
class PodcastsList extends Component {
  render() {
    const { data } = this.props;
    const recyclerViewProps = {
      isHorizontal: true,
      useWindowScroll: true,
      renderAheadOffset: 5,
      showsHorizontalScrollIndicator: false,
      renderFooter: () => <View style={{ paddingRight: ITEM_SPACING }} />
    };

    const getRecyclerViewLayout = () => {
      return (type, dim) => {
        dim.width = ITEM_SIZE;
        dim.height = height;
      };
    };

    const renderListItem = (type, data) => {
      const itemsStyles = { paddingLeft: ITEM_SPACING };
      const podcastItemDimensions = `${ITEM_SIZE - ITEM_SPACING}px`;
      return <PodcastItem {...data} style={itemsStyles} size={podcastItemDimensions} />;
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
    height: ITEM_SIZE + 30,
    marginVertical: 25
  }
});

export default PodcastsList;
