import { ITheme } from "@cast-bucket/core/src";
import { useTheme } from "emotion-theming";
import React, { useState } from "react";
import { Route } from "react-native";
import { BottomNavigation, Colors } from "react-native-paper";
import { useHistory, useLocation } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";
import { Text } from "../common";

const isCurrentLocation = (route: Route, location: any) => {
  return `/${route}` === location.pathname;
};

const Navigation = ({ routes }) => {
  const history = useHistory();
  const location = useLocation();
  const theme: ITheme = useTheme();
  const routeIndexByPath = routes.findIndex((r: Route) => `/${r.key}` === location.pathname);
  const currentIndex = routeIndexByPath !== -1 ? routeIndexByPath : 0;
  const [navigationIndex, setNavigationIndex] = useState(currentIndex);

  const handleIndexChange = (index: number) => setNavigationIndex(index);

  const navState = {
    index: navigationIndex,
    routes
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
      // renderScene={({ route, jumpTo }) => {
      //   const Route = routes.find(r => r.key === route.key);
      //   return <Route.Component jumpTo={jumpTo} />;
      // }}
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
        !isCurrentLocation(route.key, location) && history.push({ pathname: `/${route.key}` })
      }
    />
  );
};

export default Navigation;
