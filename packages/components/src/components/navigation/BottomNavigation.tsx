import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { withRouter } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";

const Navigation = props => {
  const { history, routes, location } = props;
  const [navigationIndex, setNavigationIndex] = useState(0);
  const [navigationRoutes] = useState(routes);

  const handleIndexChange = index => setNavigationIndex(index);

  const routesWithIcons = navigationRoutes.map(route => {
    return {
      ...route,
      icon: () => <Icon name={`${route.icon}`} size={24} color="#222" />
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
      style={{ flex: 1, maxHeight: 54 }}
      navigationState={navState}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
      barStyle={{ backgroundColor: "#e3e3e3" }}
      labeled={false}
      onTabPress={({ route }: any) =>
        !isCurrentLocation(route.key) && history.replace({ pathname: `/${route.key}` })
      }
    />
  );
};

export default withRouter(Navigation);
