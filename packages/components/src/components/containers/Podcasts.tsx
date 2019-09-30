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

interface PodcastsContainerProps {
  items: any[];
  fetchPodcasts: (() => void);
  type: string;
  isFetching: boolean;
}

class PodcastsContainer extends React.Component<PodcastsContainerProps> {
  componentDidMount() {
    if (!this.props.items.length) this.props.fetchPodcasts();
  }

  render() {
    const { items, type, isFetching } = this.props;
    return isFetching || items.length <= 0 ? (
      <ActivityIndicator animating={true} />
    ) : (
      <PodcastsList data={items} podcastSectionType={type} />
    );
  }
}
const mapStateToProps = state => {
  const data = state.podcasts;
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items } = data || defaultState;
  return { isFetching, items };
};

const mapDispatchToProps = {
  fetchPodcasts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastsContainer);
