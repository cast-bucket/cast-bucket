import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { fetchInterests } from "../../actions/prefs/interestActions";
import { connect } from "react-redux";

// call to redux store
class InterestsContainer extends Component {
  componentWillMount() {
    this.props.fetchInterests();
  }

  render() {
    return <Text> Hello </Text>;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-between"
//   }
// });

// subscribe to redux store updates
const mapStateToProps = state => {
  // interests: state.interests.items;
};

export default connect(
  mapStateToProps,
  { fetchInterests }
)(InterestsContainer);
