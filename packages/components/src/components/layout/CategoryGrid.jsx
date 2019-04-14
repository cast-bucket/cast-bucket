import React, { Component } from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import CategoryItem from "../common/CategoryItem";
import { FlatGrid } from "react-native-super-grid";

import { fetchCategories } from "../../redux/actions/categories";
import { isSmallScreen, getAdjustedFontSize } from "../utils/breakpoints";

const DEFAULT_ITEM_WIDTH = 150;

const { width } = Dimensions.get("window");
const itemSpacing = isSmallScreen(width) ? 20 : 60;

class CategoriesGrid extends Component {
  renderItem({ item, index }) {
    const labelSize = getAdjustedFontSize(16, width);
    const itemProps = {
      dimensions: DEFAULT_ITEM_WIDTH,
      key: index,
      title: item
    };
    return <CategoryItem {...itemProps} />;
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const categories = this.props.categories || [];
    return (
      <FlatGrid
        style={{ marginTop: 20, flex: 1 }}
        fixed={true}
        itemDimension={DEFAULT_ITEM_WIDTH}
        items={categories}
        spacing={itemSpacing}
        renderItem={this.renderItem}
      />
    );
  }
}

const mapStateToProps = state => {
  const data = state.categories;
  const defaultState = { isFetching: true, categories: [] };
  const { isFetching, categories } = data || defaultState;
  return { isFetching, categories };
};

export default connect(mapStateToProps)(CategoriesGrid);
