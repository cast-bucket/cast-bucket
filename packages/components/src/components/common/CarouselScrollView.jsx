import * as React from "react";
import { ScrollView, View } from "react-native";
import { BaseScrollView } from "recyclerlistview";
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

class CarouselScrollView extends BaseScrollView {
  constructor(props) {
    super(props);
    this.state = {
      xOffsetPosition: 0,
      showLeftButton: false,
      showRightButton: true,
    };
  }

  scrollTo(...args) {
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
          {...this.props}
          ref={scrollView => (this._scrollViewRef = scrollView)}
          onScroll={this.handleScroll}
        >
          {this.props.children}
        </ScrollView>
        {showRightButton && <ScrollRightButton
          small
          icon="chevron-right"
          onPress={() =>
            this.scrollTo({ x: this.state.xOffsetPosition + SCROLL_BY, y: 0, animated: true })
          }
        />}
      </View>
    );
  }
}

export default CarouselScrollView;
