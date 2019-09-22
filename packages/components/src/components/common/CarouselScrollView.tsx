import * as React from "react";
import { ScrollView, View, ScrollViewProps } from "react-native";
import { ScrollViewDefaultProps } from "recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView";
import { FAB } from "react-native-paper";
import styled from "@emotion/native";

const SCROLL_BY = 400;

const ScrollLeftButton = styled(FAB)`
  position: absolute;
  left: 10;
  top: 100;
  z-index: 9999;
  background: white;
`;

const ScrollRightButton = styled(FAB)`
  position: absolute;
  right: 10;
  top: 100;
  z-index: 9999;
  background: white;
`;

type ScrollViewState = {
  xOffsetPosition: number;
  showLeftButton: boolean;
  showRightButton: boolean;
};

class CarouselScrollView extends React.Component<ScrollViewDefaultProps, ScrollViewState> {
  public _scrollViewRef: any;

  constructor(props: ScrollViewDefaultProps) {
    super(props);
    const state: ScrollViewState = {
      xOffsetPosition: 0,
      showLeftButton: false,
      showRightButton: true
    };
    this.state = state;
  }

  scrollTo(...args: any) {
    if (this._scrollViewRef) {
      this._scrollViewRef.scrollTo(...args);
    }
  }

  isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToRight = 30;
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
  };

  handleScroll = ({ nativeEvent }) => {
    const xOffsetPosition = nativeEvent.contentOffset.x;
    this.setState({
      xOffsetPosition,
      showLeftButton: xOffsetPosition > 0,
      showRightButton: !this.isCloseToRight(nativeEvent)
    });
  };

  render() {
    const { showLeftButton, showRightButton } = this.state;
    const scrollViewProps: ScrollViewProps = this.props;
    return (
      <View>
        {showLeftButton && (
          <ScrollLeftButton
            small
            icon="chevron-left"
            onPress={() =>
              this.scrollTo({ x: this.state.xOffsetPosition - SCROLL_BY, y: 0, animated: true })
            }
          />
        )}
        <ScrollView
          {...scrollViewProps}
          ref={scrollView => (this._scrollViewRef = scrollView)}
          onScroll={this.handleScroll}
        >
          {this.props.children}
        </ScrollView>
        {showRightButton && (
          <ScrollRightButton
            small
            icon="chevron-right"
            onPress={() =>
              this.scrollTo({ x: this.state.xOffsetPosition + SCROLL_BY, y: 0, animated: true })
            }
          />
        )}
      </View>
    );
  }
}

export default CarouselScrollView;
