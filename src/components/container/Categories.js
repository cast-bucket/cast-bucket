import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { fetchCategoriesIfNeeded } from "../../actions/category/categoryActions";
import { LayoutProvider } from "recyclerlistview";
import RecyclerView from "../presentation/RecyclerView";
import CategoryItem from "../presentation/CategoryItem";
import global from "../../config/globals";
let { width } = Dimensions.get("window");

// call to redux store
class Categories extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategoriesIfNeeded());
  }

  _setlayoutProvider() {
    return new LayoutProvider(
      index => {
        return "CATEGORY_ITEM";
      },
      (type, dim) => {
        switch (type) {
          case "CATEGORY_ITEM":
            dim.width = width;
            dim.height = 140;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );
  }

  _renderListItem(type, data) {
    console.log(">>>-SHRIRAM->>> data", data);
    switch (type) {
      case "CATEGORY_ITEM":
        return <CategoryItem title={data} />;
      default:
        return null;
    }
  }

  renderCategories(items) {
    const recyclerViewProps = {
      forceNonDeterministicRendering: true,
      canChangeSize: true
    };
    const containerStyle = styles.listContainer;
    return (
      <View>
        <Text> Categories </Text>
        <RecyclerView
          data={items}
          renderListItem={this._renderListItem}
          customLayoutProvider={this._setlayoutProvider()}
          containerStyle={containerStyle}
          recyclerViewProps={recyclerViewProps}
        />
      </View>
    );
  }

  render() {
    const { items, isFetching } = this.props;
    return items.length > 0 && this.renderCategories(items);
  }
}

const mapStateToProps = state => {
  const { categories } = state;
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items } = categories || defaultState;
  return { isFetching, items };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    minHeight: 1,
    minWidth: 1,
    width: "100%",
    justifyContent: "space-around",
    alignSelf: "center",
    paddingHorizontal: 100
  },
  listHeading: {
    margin: 20,
    fontSize: 25,
    color: "#fff",
    textTransform: "capitalize",
    ...Platform.select({
      android: {
        fontSize: 22,
        marginBottom: 0,
        fontFamily: "CircularStd-Bold"
      }
    })
  }
});

export default connect(mapStateToProps)(Categories);
