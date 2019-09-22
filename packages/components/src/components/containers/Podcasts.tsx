import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { fetchPodcasts } from "../../redux/actions/";
import PodcastsList from "../layout/PodcastsList";
/**
 * Subscriptions
 * Recently Played
 * Recommended
 */

class Podcasts extends React.Component {
  public props: any;
  public type: any;
  public isFetching: any;
  public location: any;

  componentDidMount() {
    if (!this.props.items.length) this.props.dispatch(fetchPodcasts());
  }

  render() {
    const { items, type, isFetching } = this.props;
    return isFetching || items.length <= 0 ? (
      <ActivityIndicator animating={true} />
    ) : (
      // @ts-ignore
      <PodcastsList data={items} type={type} />
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
