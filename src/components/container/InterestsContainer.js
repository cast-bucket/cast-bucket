import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { fetchInterests } from "../../actions/prefs/interestActions";
import { connect } from "react-redux";
import ImageCard from "../presentation/ImageCard";

// call to redux store
class InterestsContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchInterests();
  }


  render() {
    return <p> Hello </p>
    // return <View style={styles.container}>{this.renderInterests(this.props.interests)}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

// subscribe to redux store updates
const mapStateToProps = state => {
  // interests: state.interests.items;
};

export default connect(
  mapStateToProps,
  { fetchInterests }
)(InterestsContainer);
