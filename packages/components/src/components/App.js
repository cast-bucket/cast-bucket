import React from "react";
import styled from "@emotion/native";
import { View } from "react-native";
import { Provider } from "react-redux";
import { Route, Switch, withRouter } from "../libs/router";
import configureStore from "../redux/store";
import Player from "./common/Player";
import { Text } from "./common/Typography";
import BottomNavigation from "./navigation/BottomNavigation";
import { Episodes, Home } from "./screens";

const initialState = {};
const store = configureStore(initialState);

const Container = styled.View`
  flex: 1;
  align-items: stretch;
`;

const Browse = () => <Text> Browse </Text>;
const Library = () => <Text> Library </Text>;
const Account = () => <Text> Account </Text>;

const navigationRoutes = [
  { key: "home", title: "Home", icon: "home" },
  { key: "browse", title: "Browse", icon: "radio" },
  { key: "library", title: "Library", icon: "bookmark" },
  { key: "account", title: "Account", icon: "user" }
];

// TODO: Show navigation based on Platform Type
const AppView = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Container>
          <Switch>
            <Route exact path={["/", "/home"]} render={() => <Home />} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/library" component={Library} />
            <Route exact path="/account" component={Account} />
            <Route
              path="/episodes/:podcastId"
              render={props => <Episodes key={props.match.params.podcastId} {...props} />}
            />
            <Route exact path="/choose-categories" component={Episodes} />
          </Switch>
        </Container>
        <Player />
        <BottomNavigation routes={navigationRoutes} />
      </View>
    </Provider>
  );
};

export const App = withRouter(AppView);
