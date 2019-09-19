import React, { Component } from "react";
import * as mocks from "../../mocks";
import EpisodesList from "../layout/EpisodesList";

const mockFeedId = "https://ryanripley.com/feed/";

class Episodes extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
  }


  render() {
    return <EpisodesList data={mocks.episodeItems[mockFeedId]} />;
  }
}

export default Episodes;
