import isTouchDevice from "is-touch-device";
import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview";
import * as constants from "../../utils/constants";
import { isMobile } from "../../utils/platforms";
import CarouselScrollView from "../common/CarouselScrollView";
import PodcastItem from "../common/PodcastItem";
import ContextHelper from '../../utils/context-helper';

const { height } = Dimensions.get("window");

const ITEM_SIZE = isMobile ? 180 : 220;
const ITEM_SPACING = constants.spacing.containerMargin.val;
const ViewTypes = {
  PODCAST_ITEM: 0
};

// FIXME: Remove parentContainer and move redux actions into here to avoid remount
class PodcastsList extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this._recycler = React.createRef();
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1.rss !== r2.rss; // rss values are unique, so use them in the comparator
      }).cloneWithRows(data),
      layoutProvider: new LayoutProvider(
        () => ViewTypes.PODCAST_ITEM,
        (_, dim) => {
          dim.height = height;
          dim.width = ITEM_SIZE;
        }
      ),
      contextProvider: new ContextHelper('PODCASTS_LIST')
    };
  }

  getRef = () => this._recycler;

  renderPodcastItem = (type, data) => {
    if (type === ViewTypes.PODCAST_ITEM) {
      const itemsStyles = { paddingLeft: ITEM_SPACING };
      const podcastItemDimensions = `${ITEM_SIZE - ITEM_SPACING}px`;
      return <PodcastItem {...data} style={itemsStyles} size={podcastItemDimensions} />;
    }
  };

  render() {
    return (
      <RecyclerListView
        isHorizontal={true}
        dataProvider={this.state.dataProvider}
        layoutProvider={this.state.layoutProvider}
        contextProvider={this.state.contextProvider}
        contentContainerStyle={{ height: ITEM_SIZE + 30, marginVertical: 25, flex: 1 }}
        showsHorizontalScrollIndicator={false}
        rowRenderer={this.renderPodcastItem}
        canChangeSize={true}
        ref={this._recycler}
        getRecyclerViewRef={this.getRef}
        useWindowScroll={true}
        {...(!isTouchDevice() ? { externalScrollView: CarouselScrollView } : {})} // enable carousel buttons only on non-touch devices
        renderFooter={() => <View style={{ paddingRight: 30 }} />}
      />
    );
  }
}

export default PodcastsList;
