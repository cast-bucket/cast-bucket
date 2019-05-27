import React from "react";
import styled from "@emotion/native";
import { Dimensions, View } from "react-native";
import { Provider } from "react-redux";
import { Route, Switch, withRouter } from "../libs/router";
import configureStore from "../redux/store";
import BottomNavigation from "./navigation/BottomNavigation";
import { Episodes, Home } from "./screens";
import { Text } from "./common/Typography";

const initialState = {};
const store = configureStore(initialState);

const { width, height } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  width: ${width},
  height: ${height},
`;

const Browse = () => <Text> Browse </Text>;
const Library = () => <Text> Library </Text>;
const Account = () => <Text> Account </Text>;

const navigationRoutes = [
  { key: "home", title: "Home", icon: "queue-music" },
  { key: "browse", title: "Browse", icon: "queue-music" },
  { key: "library", title: "Library", icon: "queue-music" },
  { key: "account", title: "Account", icon: "queue-music" }
];

const AppView = props => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Container>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/episodes" component={Episodes} />
            <Route exact path="/choose-categories" component={Episodes} />
          </Switch>
        </Container>
        <BottomNavigation routes={navigationRoutes} />
      </View>
    </Provider>
  );
};

export const App = withRouter(AppView);
