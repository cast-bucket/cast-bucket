import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import isEmpty from "is-empty";
import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import AppProviders from "../context";
import { useAuthenticatedUser } from "../context/user";
import { Route, Switch } from "../libs/router";
import configureStore from "../redux/store";
import FullPageSpinner from "./common/FullPageSpinner";
import { Page } from "./common/Page";
import Player from "./common/Player";
import { PageHeading } from "./common/Typography";
import BottomNavigation from "./navigation/BottomNavigation";
import { Browse, Downloads, Episodes, Home, Settings } from "./screens";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";

const initialState = {};
const store = configureStore(initialState);

const Container = styled.View`
  flex: 1;
  align-items: stretch;
`;

const BottomNavigationContainer = styled.View``;

const navigationRoutes = [
  { key: "home", title: "Home", icon: "home" },
  { key: "browse", title: "Browse", icon: "radio" },
  { key: "profile", title: "Profile", icon: "user" }
];

// TODO: Show navigation based on Platform Type
const AuthenticatedApp = () => {
  // const user: any = useAuthenticatedUser();
  const theme: any = useTheme();
  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.background
        }}
      >
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
        <BottomNavigationContainer>
          <BottomNavigation routes={navigationRoutes} />
        </BottomNavigationContainer>
      </View>
    </Provider>
  );
};

const UnauthenticatedApp = () => <Login />;

// TODO: Use HOC for Lazy Import
// eslint-disable-next-line
function LazyComponentHOC(Component) {
  return props => (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Component {...props} />
    </React.Suspense>
  );
}

const AppWrapper = () => {
  const user = useAuthenticatedUser();
  return user && !isEmpty(user) ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export const App = () => (
  <AppProviders>
    <AppWrapper />
  </AppProviders>
);
