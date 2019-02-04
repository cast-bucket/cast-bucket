import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import RecyclerView from "../presentation/RecyclerView";
import EpisodeItem from "../presentation/EpisodeItem";
import { fetchFeedIfNeeded } from "../../actions/feed/feedActions";
import global from "../../config/globals";
let { width } = Dimensions.get("window");

class Episodes extends Component {
  constructor(props) {
    super(props);
    this._setLayoutForType = this._setLayoutForType.bind(this);
    this._renderListItem = this._renderListItem.bind(this);
    this.showActivityIndicator = this.showActivityIndicator.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const feedUrl = this.props.location.state.feedUrl;
    dispatch(fetchFeedIfNeeded(feedUrl));
  }

  componentDidUpdate(prevProps) {
    const feedUrl = this.props.location.state.feedUrl;
    const { dispatch } = this.props;
    if (feedUrl !== prevProps.location.state.feedUrl) {
      dispatch(fetchFeedIfNeeded(feedUrl));
    }
  }

  _setLayoutForType() {
    return (type, dim) => {
      switch (type) {
        case "FEED_ITEM":
          dim.width = width;
          dim.height = 100;
          break;
        case "FEED_HEADER":
          dim.width = width;
          dim.height = 83;
          break;
        default:
          dim.width = width;
          dim.height = 0;
      }
    };
  }

  _renderListItem(type, data) {
    const { values } = data;
    switch (type) {
      case "FEED_ITEM":
        return <EpisodeItem {...values} />;
      case "HEADER":
        return <View data={data} />;
      default:
        return null;
    }
  }

  showActivityIndicator() {
    return <ActivityIndicator size="small" color="black" style={{ marginTop: 10 }} />;
  }

  renderEpisodes(episodes) {
    const recyclerViewProps = {
      forceNonDeterministicRendering: true,
      canChangeSize: true
    };
    const containerStyle = styles.listContainer;
    return (
      <RecyclerView
        data={episodes.items}
        renderListItem={this._renderListItem}
        layoutType={this._setLayoutForType()}
        containerStyle={containerStyle}
        recyclerViewProps={recyclerViewProps}
      />
    );
  }

  renderEpisodeHeader(meta) {
    return (
      <View
        style={{
          backgroundColor: "blue",
          padding: 10,
          height: 300,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={[styles.listHeading, global.styles.defaultSansBoldFont]}>{meta.title}</Text>
      </View>
    );
  }

  render() {
    const { episodes, isFetching } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {isFetching === true && this.showActivityIndicator()}
        {episodes.length > 0 && this.renderEpisodeHeader(episodes[0].meta)}
        {episodes.length > 0 && this.renderEpisodes(episodes[0])}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { feeds } = state;
  const feedUrl = ownProps.location.state.feedUrl || null;
  const defaultState = { isFetching: true, feedItems: [] };
  const { isFetching, feedItems: episodes } = feeds[feedUrl] || defaultState;
  return { isFetching, episodes };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    minHeight: 1,
    minWidth: 1,
    width: "100%",
    justifyContent: "space-around",
    alignSelf: "center",
    paddingHorizontal: 100
  },
  listHeading: {
    margin: 20,
    fontSize: 25,
    color: "#fff",
    textTransform: "capitalize",
    ...Platform.select({
      android: {
        fontSize: 22,
        marginBottom: 0,
        fontFamily: "CircularStd-Bold"
      }
    })
  }
});

export default connect(mapStateToProps)(Episodes);
