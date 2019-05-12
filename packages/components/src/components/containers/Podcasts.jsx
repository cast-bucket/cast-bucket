import React, { Component } from "react";
// import { connect } from "react-redux";
import PodcastsList from "../layout/PodcastsList";

import * as mocks from "../../mocks";

/**
 * Subscriptions
 * Recently Played
 * Recommended
 */

class Podcasts extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
  }

  render() {
    const items = mocks.podcastListItems.map(item => ({
      ...item,
      type: "PODCAST_ITEM"
    }));

    const podcastContainerType = this.props.type;
    return <PodcastsList data={items} type={podcastContainerType} />;
  }
}

export default Podcasts;
// const mapStateToProps = (state, ownProps) => {
//   return { selectedCategory, isFetching, podcasts };
// };

// export default connect(mapStateToProps)(Podcasts);
