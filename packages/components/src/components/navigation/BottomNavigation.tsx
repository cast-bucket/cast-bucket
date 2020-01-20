import { useTheme } from "emotion-theming";
import React, { useState } from "react";
import { Route } from "react-native";
import { BottomNavigation, Colors } from "react-native-paper";
import { useHistory, useLocation } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";
import { Text } from "../common";

const Navigation = ({ routes }) => {
  const history = useHistory();
  const location = useLocation();
  const theme: any = useTheme();
  const [navigationIndex, setNavigationIndex] = useState(0);

  const handleIndexChange = (index: number) => setNavigationIndex(index);

  const navState = {
    index: navigationIndex,
    routes
  };

  // avoid re-render when tabPress on currentLocation
  const isCurrentLocation = (route: Route) => {
    return `/${route}` === location.pathname;
  };

  const bottomBarStyle: any = {
    backgroundColor: theme.colors.navigation,
    paddingTop: 5,
    paddingBottom: 5
  };

  return (
    <BottomNavigation
      sceneAnimationEnabled={true}
      style={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto", minHeight: 60 }}
      navigationState={navState}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
      activeColor={theme.colors.accent}
      inactiveColor={Colors.grey600}
      keyboardHidesNavigationBar={true}
      renderIcon={({ route, color }: any) => (
        <Icon name={`${route.icon}`} size={20} color={color} />
      )}
      renderLabel={({ route, color }: any) => (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            textAlign: "center",
            color,
            textTransform: "capitalize",
            marginTop: 3
          }}
        >
          {route.key}
        </Text>
      )}
      barStyle={bottomBarStyle}
      onTabPress={({ route }: Route) =>
        !isCurrentLocation(route.key) && history.replace({ pathname: `/${route.key}` })
      }
    />
  );
};

export default Navigation;
