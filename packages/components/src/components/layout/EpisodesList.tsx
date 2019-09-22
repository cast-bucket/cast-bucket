import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { fetchEpisodes, togglePlaying } from "../../redux/actions";
import { isMobile } from "../../utils/platforms";
import EpisodeItem from "../common/EpisodeItem";

type EpisodesListProps = {
  feed: string, 
  fetchEpisodes: Function,
  episodes: any,
  togglePlaying: Function
}

class EpisodesList extends Component<EpisodesListProps> {
  componentDidMount() {
    const { feed, fetchEpisodes } = this.props;
    fetchEpisodes(feed);
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
  }

  componentDidUpdate(prevProps: EpisodesListProps) {
    if (prevProps.feed !== this.props.feed) {
      fetchEpisodes(this.props.feed);
    }
  }

  componentWillUnmount() {
    if (!isMobile) {
      window.removeEventListener("resize", this.resize);
    }
  }

  isPlaying = (url: string) => {
    const episode = this.props.episodes[url];
    return episode ? episode.isPlaying : false;
  };

  resize = () => this.forceUpdate();

  render() {
    if (!isMobile) {
      window.addEventListener("resize", this.resize);
    }
    const { episodes } = this.props;
    const renderListItem = ({ item }) => {
      return (
        <EpisodeItem
          item={item}
          isPlaying={this.isPlaying(item.url)}
          togglePlaying={this.props.togglePlaying}
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
        keyExtractor={(item: any, index: number) => `${item.link}${index.toString()}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "stretch"
  }
});

const mapStateToProps = (state) => {
  const defaultState = { isFetching: true, items: {} };
  const { isFetching, items: episodes } = state.episodes || defaultState;
  const nowPlaying = Object.values(episodes).filter((p: any) => p.isPlaying === true);
  return { isFetching, episodes, nowPlaying };
};

const mapDispatchToProps = {
  togglePlaying,
  fetchEpisodes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesList);
