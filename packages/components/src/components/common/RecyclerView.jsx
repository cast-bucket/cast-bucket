import React, { Component } from "react";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

export class RecyclerView extends Component {
  constructor(args) {
    super(args);
    const { data, renderListItem, customLayoutProvider } = this.props;
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2;
      }).cloneWithRows(data)
    };
    if (customLayoutProvider) {
      this._layoutProvider = customLayoutProvider;
    } else {
      const { layoutType } = this.props;
      const currentType = index => this.state.dataProvider.getDataForIndex(index).type;
      this._layoutProvider = new LayoutProvider(currentType, layoutType);
    }
    this._renderRow = renderListItem;
  }

  render() {
    const { containerStyle, recyclerViewProps } = this.props;
    return (
      <RecyclerListView
        style={{ flex: 1 }}
        contentContainerStyle={containerStyle}
        rowRenderer={this._renderRow}
        dataProvider={this.state.dataProvider}
        layoutProvider={this._layoutProvider}
        {...recyclerViewProps}
      />
    );
  }
}
