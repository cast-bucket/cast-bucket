import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { connect } from "react-redux";
import { fetchCategoriesIfNeeded } from "../../actions/category/categoryActions";
import { LayoutProvider } from "recyclerlistview";
import RecyclerView from "../presentation/RecyclerView";
import CategoryItem from "../presentation/CategoryItem";
import globals from "../../config/globals";
import { styles as s } from "react-native-style-tachyons";
class Categories extends Component {
  static getWindowWidth() {
    // To deal with precision issues on android
    return Math.round(Dimensions.get("window").width * 1000) / 1000 - 6; //Adjustment for margin given to RLV;
  }

  componentDidMount() {
    this.props.dispatch(fetchCategoriesIfNeeded());
  }

  setLayoutProvider() {
    return new LayoutProvider(
      () => "CATEGORY_ITEM",
      (type, dim) => {
        const columnWidth = Categories.getWindowWidth();
        switch (type) {
          case "CATEGORY_ITEM":
            dim.width = 300;
            dim.height = 300;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
        }
      }
    );
  }

  renderCategories(categories) {
    const recyclerViewProps = {
      canChangeSize: true,
    };
    const rowRenderer = (type, data) => <CategoryItem title={data} />;
    return (
      <View style={styles.container}>
        <Text style={[globals.styles.subheading, s.f4, s.ma3]}>Categories</Text>
        <RecyclerView
          data={categories}
          renderListItem={rowRenderer}
          customLayoutProvider={this.setLayoutProvider()}
          containerStyle={{ margin: 3, minHeight: 1, alignItems: "center" }}
          recyclerViewProps={recyclerViewProps}
        />
      </View>
    );
  }

  render() {
    const { categories } = this.props;
    return categories.length > 0 && this.renderCategories(categories);
  }
}

const mapStateToProps = state => {
  const data = state.categories;
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items: categories } = data || defaultState;
  return { isFetching, categories };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  }
});

export default connect(mapStateToProps)(Categories);
