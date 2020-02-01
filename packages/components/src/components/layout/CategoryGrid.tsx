import React, { Component } from "react";
import { View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { connect } from "react-redux";
import { memoSet } from "../../helpers/memoize";
import { fetchCategories } from "../../redux/actions/";
import { AppState } from "../../redux/store";
import { isSmallScreen } from "../../utils/platforms";
import { Button, CategoryItem } from "../common";

const DEFAULT_ITEM_WIDTH = 150;

const itemSpacing = isSmallScreen ? 15 : 50;

interface CategoriesGridProps {
  categories: string[];
  fetchCategories: () => void;
}

interface CategoriesGridState {
  selectedCategories: string[] | [];
}

class CategoriesGrid extends Component<CategoriesGridProps, CategoriesGridState> {
  constructor(props: CategoriesGridProps) {
    super(props);
    const selectedCategories: string[] = [];
    this.state = {
      selectedCategories
    };
  }

  selectCategory = (categoryId: string) => {
    const categories = this.state.selectedCategories;
    this.setState({
      selectedCategories: [...categories, categoryId]
    });
  };

  unselectCategory = (categoryId: string) => {
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

  // !FIXME: Remove this and store this in state
  handleNextClick = async () => {
    const { selectedCategories } = this.state;
    try {
      await memoSet("categories", { selected: selectedCategories.sort() });
    } catch (error) {
      // console.error("error");
    }
  };

  renderNextButton = () => {
    const categories = this.props.categories || [];
    const { selectedCategories }: any = this.state || [];
    return (
      categories.length > 0 && (
        <Button
          disabled={selectedCategories.length <= 0}
          css={{
            margin: 50,
            alignSelf: isSmallScreen ? "center" : "flex-end"
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
        <FlatGrid
          fixed
          itemDimension={DEFAULT_ITEM_WIDTH}
          items={categories}
          spacing={itemSpacing}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderNextButton}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  fetchCategories
};

const mapStateToProps = (state: AppState) => {
  const defaultState = { isFetching: true, items: [] };
  const { isFetching, items: categories } = state.categories || defaultState;
  return { isFetching, categories };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesGrid);
