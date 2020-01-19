import styled from "@emotion/native";
import { withTheme } from "emotion-theming";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { ScrollViewDefaultProps } from "recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView";
import { MaterialIcons as Icon } from "../../libs/vector-icons";
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
  _scrollViewRef = null;

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
    this.setState(() => ({
      xOffsetPosition,
      showLeftButton: xOffsetPosition > 0,
      showRightButton: !this.isCloseToRight(nativeEvent)
    }));
  };

  render() {
    const { theme }: any = this.props;
    const { showLeftButton, showRightButton } = this.state;
    const scrollButtonThemeStyles = {
      backgroundColor: theme.colors.navigation
    };
    const scrollViewProps: any = this.props;
    return (
      <View>
        {showLeftButton && (
          <ScrollLeftButton
            style={[styles.FAB, scrollButtonThemeStyles]}
            color={theme.colors.accent}
            icon={({ size, color }) => <Icon name="chevron-left" size={size} color={color} />}
            onPress={() =>
              this.scrollTo({ x: this.state.xOffsetPosition - SCROLL_BY, y: 0, animated: true })
            }
          />
        )}
        <ScrollView
          {...scrollViewProps}
          ref={scrollView => (this._scrollViewRef = scrollView)}
          onScroll={this.handleScroll}
          data-no-scrollbar
        >
          {this.props.children}
        </ScrollView>
        {showRightButton && (
          <ScrollRightButton
            style={[styles.FAB, scrollButtonThemeStyles]}
            color={theme.colors.accent}
            icon={({ size, color }) => <Icon name="chevron-right" size={size} color={color} />}
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

export default withTheme(CarouselScrollView);
