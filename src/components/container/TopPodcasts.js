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
import TopPodcastItem from "../presentation/TopPodcastItem";
import { fetchPodcastsIfNeeded } from "../../actions/podcast/podcastActions";

let { width } = Dimensions.get("window");

class TopPodcasts extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
    this._setLayoutForType = this._setLayoutForType.bind(this);
    this._renderListItem = this._renderListItem.bind(this);
    this.showActivityIndicator = this.showActivityIndicator.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props;
    dispatch(fetchPodcastsIfNeeded(selectedCategory));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, selectedCategory } = this.props;
    if (selectedCategory !== prevProps.selectedCategory) {
      dispatch(fetchPodcastsIfNeeded(selectedCategory));
    }
  }

  _setLayoutForType() {
    return (type, dim) => {
      switch (type) {
        case "TOPLIST_ITEM":
          dim.width = width;
          dim.height = 100;
          break;
        case "PODCAST_ITEM":
          dim.width = width;
          dim.height = 83;
          break;
        case "HEADER":
          dim.width = width;
          dim.height = 300;
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
      case "TOPLIST_ITEM":
        return <TopPodcastItem {...values} />;
      case "PODCAST_LIST_ITEM":
        return <View />;
      case "HEADER":
        return <View data={data} />;
      default:
        return null;
    }
  }

  showActivityIndicator() {
    return <ActivityIndicator size="small" color="black" />;
  }

  renderPodcastItems(podcasts) {
    const recyclerViewProps = {
      forceNonDeterministicRendering: true,
      isHorizontal: true,
      showsHorizontalScrollIndicator: false
    };
    const containerStyle = styles.listContainer;
    return (
      <RecyclerView
        data={podcasts}
        renderListItem={this._renderListItem}
        layoutType={this._setLayoutForType()}
        containerStyle={containerStyle}
        recyclerViewProps={recyclerViewProps}
      />
    );
  }

  render() {
    const { podcasts, isFetching, selectedCategory } = this.props;

    const heading =
      selectedCategory === "All" ? `Featured Podcasts` : `Top Podcasts in ${selectedCategory}`;
    return (
      <View style={{ flex: 1 }}>
        {/* {isFetching === true && this.showActivityIndicator()} */}
        <Text style={[styles.listHeading]}>{heading}</Text>
        {podcasts.length > 0 && this.renderPodcastItems(podcasts)}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { podcastsByCategory } = state;
  const selectedCategory = ownProps.category; // get from parent
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items: podcasts } = podcastsByCategory[selectedCategory] || defaultState;
  return { selectedCategory, isFetching, podcasts };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  listContainer: {
    minHeight: 1,
    minWidth: 1,
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30
  },
  listHeading: {
    margin: 20,
    marginBottom: 5,
    fontSize: 25,
    ...Platform.select({
      web: {
        textTransform: "capitalize",
        fontFamily: "CircularStd"
      },
      android: {
        fontSize: 20,
        marginBottom: 0,
        fontFamily: "CircularStd-Bold"
      }
    })
  }
});

export default connect(mapStateToProps)(TopPodcasts);
