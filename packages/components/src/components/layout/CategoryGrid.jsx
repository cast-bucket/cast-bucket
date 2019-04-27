import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { CategoryItem, Button } from "../common";
import { FlatGrid } from "react-native-super-grid";
import { fetchCategories } from "../../redux/actions/categories";
import { isSmallScreen } from "../utils/breakpoints";

const DEFAULT_ITEM_WIDTH = 150;

const { width } = Dimensions.get("window");
const itemSpacing = isSmallScreen(width) ? 20 : 60;

class CategoriesGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: []
    };
  }

  selectCategory = categoryId => {
    const categories = this.state.selectedCategories;
    this.setState({
      selectedCategories: categories.concat(categoryId)
    });
  };

  unselectCategory = categoryId => {
    const categories = this.state.selectedCategories;
    this.setState({
      selectedCategories: categories.filter(item => item !== categoryId)
    });
  };

  renderItem = ({ item, index }) => {
    const itemProps = {
      categoryId: item,
      dimensions: DEFAULT_ITEM_WIDTH,
      key: index,
      selectCategory: this.selectCategory,
      unselectCategory: this.unselectCategory,
      selected: this.state.selectedCategories
    };
    return <CategoryItem {...itemProps} />;
  };

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  }

  // TODO: Fix Button Width, Move Container View to Screens
  render() {
    const { selectedCategories } = this.state;
    const categories = this.props.categories || [];
    return (
      <View style={{ flex: 1, width: "100%", backgroundColor: "#0a0a0a" }}>
        <FlatGrid
          fixed={true}
          itemDimension={DEFAULT_ITEM_WIDTH}
          items={categories}
          spacing={itemSpacing}
          renderItem={this.renderItem}
        />
        {categories.length > 0 && (
          <Button
            disabled={selectedCategories.length <= 0}
            css={{
              margin: 20,
              alignSelf: "flex-end"
            }}
            onPress={() => localStorage.setItem("selectedCategories", selectedCategories.sort())}
          >
            Next
          </Button>
        )}
      </View>
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
