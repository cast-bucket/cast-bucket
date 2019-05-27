import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { fetchPodcasts } from "../../redux/actions/podcasts";
import PodcastsList from "../layout/PodcastsList";
/**
 * Subscriptions
 * Recently Played
 * Recommended
 */

class Podcasts extends React.Component {
  componentDidMount() {
    if (!this.props.items.length > 0) this.props.dispatch(fetchPodcasts());
  }

  render() {
    const { items, type, isFetching, location } = this.props;
    return isFetching ? (
      <ActivityIndicator animating />
    ) : (
      <PodcastsList data={items} type={type} location={location} />
    );
  }
}
const mapStateToProps = state => {
  const data = state.podcasts;
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items } = data || defaultState;
  return { isFetching, items };
};

export default connect(mapStateToProps)(Podcasts);
