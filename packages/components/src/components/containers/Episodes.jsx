import React, { Component } from "react";
import * as mocks from "../../mocks";
import EpisodesList from "../layout/EpisodesList";

class Episodes extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;
  }

  render() {
    // TODO: Replace mockEpisodes with sagas
    const { feed } = this.props;
    return <EpisodesList data={mocks.episodeItems[feed]} />;
  }
}

export default Episodes;
