import styled from "@emotion/native";
import * as React from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { Colors, IconButton } from "react-native-paper";
import { ScrollViewDefaultProps } from "recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView";
import { isMobile } from "../../utils/platforms";

const SCROLL_BY = 400;

const ScrollLeftButton = styled(IconButton)`
  left: 10;
  top: 109;
`;

const ScrollRightButton = styled(IconButton)`
  right: 10;
  top: 109;
`;

interface ScrollViewState {
  xOffsetPosition: number;
  showLeftButton: boolean;
  showRightButton: boolean;
}

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
    const scrollViewProps: any = this.props;
    return (
      <View>
        {showLeftButton && (
          <ScrollLeftButton
            style={styles.FAB}
            color={Colors.grey700}
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
            style={styles.FAB}
            color={Colors.grey700}
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

const styles = StyleSheet.create({
  FAB: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    width: 32,
    height: 32,
    backgroundColor: "#fafafa",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    borderRadius: 100,
    shadowOpacity: 0.24,
    shadowRadius: 6,
    opacity: 1,
    elevation: 6,
    ...(!isMobile && { userSelect: "none" })
  }
});

export default CarouselScrollView;
