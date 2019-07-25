import React, { Component } from "react";
import * as mocks from "../../mocks";
import EpisodesList from "../layout/EpisodesList";
import Player from "../../libs/audio-player";

const mockFeedId = "https://ryanripley.com/feed/";

const AudioPlayer = new Player();

class Episodes extends Component {
  constructor(props) {
    super(props);
    this.category = this.props.category;

    if (mocks.episodeItems[mockFeedId]) {
      mocks.episodeItems[mockFeedId].items.forEach(item => {
        if (item && item.enclosure && item.enclosure.url) {
          AudioPlayer.add({ link: item.enclosure.url });
        }
      });
    }
  }


  render() {
    // TODO: Replace mockEpisodes with sagas
    // const { feed } = this.props;
    AudioPlayer.clear();
    return <EpisodesList data={mocks.episodeItems[mockFeedId]} />;
  }
}

export default Episodes;
