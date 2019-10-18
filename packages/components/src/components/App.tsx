import styled from "@emotion/native";
import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { Route, Switch } from "../libs/router";
import configureStore from "../redux/store";
import { Page } from "./common/Page";
import Player from "./common/Player";
import { PageHeading } from "./common/Typography";
import BottomNavigation from "./navigation/BottomNavigation";
import { Browse, Downloads, Episodes, Home, Settings } from "./screens";
import { Profile } from "./screens/Profile";

const initialState = {};
const store = configureStore(initialState);

const Container = styled.View`
  flex: 1;
  align-items: stretch;
`;

const navigationRoutes = [
  { key: "home", title: "Home", icon: "home" },
  { key: "browse", title: "Browse", icon: "radio" },
  { key: "profile", title: "Profile", icon: "user" }
];

// TODO: Show navigation based on Platform Type
const AppView = () => {
  return (
    <Provider store={store as any}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Container>
          <Switch>
            <Route exact path={["/", "/home"]} render={() => <Home />} />
            <Route exact path="/browse" render={() => <Browse />} />
            <Route exact path="/downloads" render={() => <Downloads />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route
              exact
              path="/account"
              render={() => (
                <Page>
                  <PageHeading>Account</PageHeading>
                </Page>
              )}
            />
            <Route
              exact
              path="/history"
              render={() => (
                <Page>
                  <PageHeading>History</PageHeading>
                </Page>
              )}
            />
            <Route exact path="/settings" render={() => <Settings />} />

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

export const App = AppView;
