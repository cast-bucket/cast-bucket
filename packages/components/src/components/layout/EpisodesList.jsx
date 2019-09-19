import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { pauseEpisode, playEpisode } from "../../redux/actions";
import { isMobile } from "../../utils/platforms";
import EpisodeItem from "../common/EpisodeItem";

// TODO: Move local component state `episodes` to redux
class EpisodesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: {}
    };
  }

  componentDidMount() {
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }

    this.setState({
      episodes: this.addEpisodes()
    });
  }

  componentWillUnmount() {
    if (!isMobile) {
      window.removeEventListener("resize", this.resize);
    }
    this.setState({
      episodes: {}
    });
  }

  addEpisodes = () => {
    const { episodes } = this.state;
    const { data } = this.props;
    data.items.forEach(item => {
      if (item.enclosure && item.enclosure.url) {
        episodes[item.enclosure.url] = {
          ...item,
          url: item.enclosure.url,
          isPlaying: false
        };
      }
    });
    return episodes;
  };

  isPlaying = url => {
    const episode = this.state.episodes[url];
    return episode ? episode.isPlaying : false;
  };

  pauseOtherEpisodes = episodeUrl => {
    let { episodes } = this.state;
    const { pause } = this.props;
    const otherPlayingEpisodes = Object.values(episodes).filter(
      e => e.isPlaying === true && e.url !== episodeUrl
    );
    otherPlayingEpisodes.forEach(ep => {
      episodes[ep.url].isPlaying = false;
      pause(ep);
    });
    this.setState({
      episodes
    });
  };

  resize = () => this.forceUpdate();

  setEpisode = episode => {
    const episodeUrl = episode.url;
    this.pauseOtherEpisodes(episodeUrl);
    this.togglePlaying(episodeUrl);
    const action = this.isPlaying(episodeUrl) ? 'pause' : 'play';
    return this.props[action](episode);
  };

  togglePlaying = url => {
    const episode = this.state.episodes[url];
    this.setState({
      episodes: {
        ...this.state.episodes,
        [url]: {
          ...episode,
          isPlaying: !episode.isPlaying
        }
      }
    });
  };

  render() {
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
    const { episodes } = this.state;

    const renderListItem = ({ item, index }) => {
      return (
        <EpisodeItem
          item={item}
          isPlaying={this.isPlaying(item.url)}
          setEpisode={this.setEpisode}
        />
      );
    };
    const containerStyle = styles.listContainer;
    // TODO: Lazy Load Episode Items onEndReached
    return (
      <FlatList
        contentContainerStyle={containerStyle}
        data={Object.values(episodes)}
        renderItem={renderListItem}
        keyExtractor={(item, index) => `${item.link}${index.toString()}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "stretch"
  }
});

const mapDispatchToProps = {
  play: ({ url: episodeId, ...meta }) => playEpisode(episodeId, meta),
  pause: ({ url: episodeId, ...meta }) => pauseEpisode(episodeId, meta)
};

export default connect(
  null,
  mapDispatchToProps
)(EpisodesList);
