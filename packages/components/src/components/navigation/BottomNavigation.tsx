import { useTheme } from "emotion-theming";
import React, { useState } from "react";
import { BottomNavigation, Colors } from "react-native-paper";
import { withRouter } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";
import { Text } from "../common";

const Navigation = props => {
  const { history, routes, location } = props;
  const theme: any = useTheme();
  const [navigationIndex, setNavigationIndex] = useState(0);
  const [navigationRoutes] = useState(routes);

  const handleIndexChange = (index: number) => setNavigationIndex(index);

  const routesWithIcons = navigationRoutes.map(route => {
    return {
      ...route
    };
  });

  const navState = {
    index: navigationIndex,
    routes: routesWithIcons
  };

  // avoid re-render when tabPress on currentLocation
  const isCurrentLocation = route => {
    return `/${route}` === location.pathname;
  };

  return (
    <BottomNavigation
      navigationState={navState}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
      activeColor={theme.colors.accent}
      inactiveColor={Colors.grey100}
      renderIcon={({ route, color }: any) => (
        <Icon name={`${route.icon}`} size={20} color={color} />
      )}
      renderLabel={({ route, color }: any) => (
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            textAlign: "center",
            backgroundColor: "transparent",
            whiteSpace: "nowrap",
            color,
            textTransform: "capitalize",
            marginTop: 3
          }}
        >
          {route.key}
        </Text>
      )}
      barStyle={{ backgroundColor: theme.colors.stroke }}
      onTabPress={({ route }: any) =>
        !isCurrentLocation(route.key) && history.replace({ pathname: `/${route.key}` })
      }
    />
  );
};

export default withRouter(Navigation);
