import { IPodcastItem } from "@cast-bucket/core";
import isTouchDevice from "is-touch-device";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import {
  BaseDataProvider,
  BaseLayoutProvider,
  DataProvider,
  LayoutProvider,
  RecyclerListView
} from "recyclerlistview";
import * as constants from "../../utils/constants";
import { isMobile } from "../../utils/platforms";
import CarouselScrollView from "../common/CarouselScrollView";
import PodcastItem from "../common/PodcastItem";

const { height } = Dimensions.get("window");

const { RECYCLER_ITEM_SIZE: ITEM_SIZE, RECYCLER_CONTAINER_SIZE: RECYCLER_HEIGHT } = constants;
const ITEM_SPACING = constants.ui.containers.margin.value;

const ViewTypes = {
  PODCAST_ITEM: 0
};

interface PodcastsListProps {
  data: IPodcastItem[];
  podcastSectionType?: string;
}

interface PodcastsListState {
  dataProvider: BaseDataProvider;
  layoutProvider: BaseLayoutProvider;
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
    const itemsStyles = { paddingLeft: ITEM_SPACING, flex: 1 };
    const podcastItemDimensions = `${ITEM_SIZE - ITEM_SPACING}px`;
    return <PodcastItem {...data} style={itemsStyles} size={podcastItemDimensions} />;
  };

  render() {
    return (
      <RecyclerListView
        isHorizontal={true}
        dataProvider={this.state.dataProvider}
        layoutProvider={this.state.layoutProvider}
        contentContainerStyle={{
          height: RECYCLER_HEIGHT,
          marginTop: 25,
          marginBottom: 50
        }}
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
