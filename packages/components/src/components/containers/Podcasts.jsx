import React, { Component } from "react";
// import { connect } from "react-redux";
import SubscriptionsList from "../layout/SubscriptionsList";
import * as mocks from "../../mocks";

class Podcasts extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
  }

  render() {
    const userSubscriptions = mocks.subscriptions.map(subscription => ({
      ...subscription,
      type: "PODCAST_ITEM"
    }));

    const podcastContainerType = this.props.type;
    switch (podcastContainerType) {
      // podcasts user has subscribed to
      case "subscriptions":
        return <SubscriptionsList subscriptions={userSubscriptions} />;

      // podcasts based on categories selected
      case "recommended":
        break;

      case "recently-played":
        break;

      case "new":
        break;

      default:
        break;
    }
  }
}

export default Podcasts;
// const mapStateToProps = (state, ownProps) => {
//   return { selectedCategory, isFetching, podcasts };
// };

// export default connect(mapStateToProps)(Podcasts);
