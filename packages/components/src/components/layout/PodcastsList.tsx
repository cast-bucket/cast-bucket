import isTouchDevice from "is-touch-device";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
  BaseDataProvider,
  BaseLayoutProvider
} from "recyclerlistview";
import * as constants from "../../utils/constants";
import { isMobile } from "../../utils/platforms";
import CarouselScrollView from "../common/CarouselScrollView";
import PodcastItem from "../common/PodcastItem";

const { height } = Dimensions.get("window");

const ITEM_SIZE = isMobile ? 180 : 250;
const ITEM_SPACING = constants.ui.containers.margin.value;
const ViewTypes = {
  PODCAST_ITEM: 0
};

type PodcastsListProps = {
  data: any,
  type: string
}

type PodcastsListState = {
  dataProvider: BaseDataProvider,
  layoutProvider: BaseLayoutProvider,
}

class PodcastsList extends Component<PodcastsListProps, PodcastsListState> {
  constructor(props: PodcastsListProps) {
    super(props);
    const { data } = this.props;
    const state: PodcastsListState = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1.rss !== r2.rss; // rss values are unique, so use them in the comparator
      }).cloneWithRows(data),
      layoutProvider: new LayoutProvider(
        () => ViewTypes.PODCAST_ITEM,
        (_, dim) => {
          dim.height = height;
          dim.width = ITEM_SIZE;
        }
      )
    };
    this.state = state;
  }

  renderPodcastItem = (type: string, data: any) => {
    const itemsStyles = { paddingLeft: ITEM_SPACING };
    const podcastItemDimensions = `${ITEM_SIZE - ITEM_SPACING}px`;
    return <PodcastItem {...data} style={itemsStyles} size={podcastItemDimensions} />;
  };

  render() {
    return (
      <RecyclerListView
        isHorizontal={true}
        dataProvider={this.state.dataProvider}
        layoutProvider={this.state.layoutProvider}
        contentContainerStyle={{ height: ITEM_SIZE , marginTop: 25, marginBottom: 50 }}
        showsHorizontalScrollIndicator={false}
        rowRenderer={this.renderPodcastItem}
        canChangeSize={true}
        useWindowScroll={true}
        {...(!isTouchDevice() && !isMobile ? { externalScrollView: CarouselScrollView } : {})} // enable carousel buttons only on non-touch devices
        renderFooter={() => <View style={{ paddingRight: 30 }} />}
      />
    );
  }
}

export default PodcastsList;
