import React, { Component } from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { connect } from "react-redux";
import CategoryItem from "../presentation/CategoryItem";
import constants from "../../util/constants";
import globals from "../../config/globals";
import { styles as s } from "react-native-style-tachyons";

import { fetchCategoriesIfNeeded } from "../../actions/category/categoryActions";

const { width } = Dimensions.get("window");

const calcNumColumns = screenWidth => {
  const { breakpoints } = constants;
  if (screenWidth >= breakpoints.MEDIUM_WIDTH && screenWidth <= breakpoints.LARGE_WIDTH) return 4;
  else if (screenWidth > breakpoints.LARGE_WIDTH) return 7;
  else return 2;
};

class Categories extends Component {
  renderItem({ item }) {
    return <CategoryItem title={item.title} id={item.categoryId} />;
  }

  componentDidMount() {
    this.props.dispatch(fetchCategoriesIfNeeded());
  }

  render() {
    const { categories } = this.props;
    console.log('>>>-SHRIRAM->>> categories', categories);
    const numberOfColumns = calcNumColumns(width);
    return (
      <View>
        <Text style={[globals.styles.subheading, s.f4, s.ma3]}>Categories</Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            numColumns={numberOfColumns}
            contentContainerStyle={styles.list}
            data={categories}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const data = state.categories;
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items: categories } = data || defaultState;
  return { isFetching, categories };
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly"
  }
});

export default connect(mapStateToProps)(Categories);
