import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { FlatGrid } from "react-native-super-grid";
import { CategoryItem, Button } from "../common";
import { fetchCategories } from "../../redux/actions/";
import { isSmallScreen } from "../../utils/breakpoints";

import { memoSet } from "../../utils/memoize";

const DEFAULT_ITEM_WIDTH = 150;

const { width } = Dimensions.get("window");
const itemSpacing = isSmallScreen(width) ? 15 : 50;

type CategoriesGridProps = {
  categories: Array<string>,
  fetchCategories: Function,
}

type CategoriesGridState = {
  selectedCategories: string[],
}

class CategoriesGrid extends Component<CategoriesGridProps, CategoriesGridState> {

  constructor(props: CategoriesGridProps) {
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
    this.props.fetchCategories();
  }

  handleNextClick = async () => {
    const { selectedCategories }: string[] = this.state || [];
    try {
      await memoSet("categories", { selected: selectedCategories.sort() });
    } catch (error) {}
  };

  renderNextButton = () => {
    const categories = this.props.categories || [];
    const { selectedCategories } = this.state || [];
    return (
      categories.length > 0 && (
        <Button
          disabled={selectedCategories.length <= 0}
          css={{
            margin: 50,
            alignSelf: isSmallScreen(width) ? "center" : "flex-end"
          }}
          onPress={this.handleNextClick}
        >
          NEXT
        </Button>
      )
    );
  };

  // TODO: Fix Button Width, Move Container View to Screens
  render() {
    const categories = this.props.categories || [];
    return (
      <View>
        {
          // @ts-ignore
          <FlatGrid
            fixed
            itemDimension={DEFAULT_ITEM_WIDTH}
            items={categories}
            spacing={itemSpacing}
            renderItem={this.renderItem}
            ListFooterComponent={this.renderNextButton}
          />
        }
      </View>
    );
  }
}

const mapDispatchToProps = {
  fetchCategories,
}

const mapStateToProps = state => {
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items: categories } = state.categories || defaultState;
  return { isFetching, categories };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesGrid);
