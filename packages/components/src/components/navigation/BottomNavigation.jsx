import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { withRouter } from "../../libs/router";

const Navigation = props => {
  const { history, routes, location } = props;
  const [navigationIndex, setNavigationIndex] = useState(0);
  const [navigationRoutes] = useState(routes);

  const handleIndexChange = index => setNavigationIndex(index);

  const navState = {
    index: navigationIndex,
    routes: navigationRoutes
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
      renderScene={() => {}}
      barStyle={{ backgroundColor: "#f3f3f3" }}
      labeled={false}
      onTabPress={({ route }) =>
        !isCurrentLocation(route.key) && history.replace({ pathname: `/${route.key}` })
      }
    />
  );
};

export default withRouter(Navigation);
