import { ITheme } from "@cast-bucket/core/src";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import isEmpty from "is-empty";
import React from "react";
import AppProviders from "../context";
import { useAuthenticatedUser } from "../context/user";
import { Route, Router, Switch } from "../libs/router";
import { isSmallScreen } from "../utils/platforms";
import FullPageSpinner from "./common/FullPageSpinner";
import { Page } from "./common/Page";
import Player from "./common/Player";
import BottomNavigation from "./navigation/BottomNavigation";
import { SidebarNavigation } from "./navigation/SideBarNavigation";
import { Browse, Downloads, Episodes, Home, Settings } from "./screens";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";

const AppContainer = styled.View`
  flex: 1;
  align-items: stretch;
  flex-direction: column;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  flex-direction: row;
  align-items: stretch;
`;

const navigationRoutes = [
  { key: "home", title: "Home", icon: "home", Component: Home },
  { key: "browse", title: "Browse", icon: "radio", Component: Browse },
  { key: "profile", title: "Profile", icon: "user", Component: Profile }
];

// TODO: Show navigation based on Platform Type
const AuthenticatedApp = () => {
  // const user: any = useAuthenticatedUser();
  const theme: ITheme = useTheme();
  return (
    <Router>
      <AppContainer
        style={{
          backgroundColor: theme.colors.background
        }}
      >
        <Container>
          {!isSmallScreen && <SidebarNavigation routes={navigationRoutes} />}
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/downloads" component={Downloads} />
            <Route exact path="/account" render={() => <Page title="Account" />} />
            <Route exact path="/history" render={() => <Page title="History" />} />
            <Route exact path="/settings" render={() => <Settings />} />
            <Route
              path="/episodes/:podcastId"
              render={props => <Episodes key={props.match.params.podcastId} {...props} />}
            />
            <Route exact path="/choose-categories" component={Episodes} />
          </Switch>
        </Container>
        <Player />
        {isSmallScreen && <BottomNavigation routes={navigationRoutes} />}
      </AppContainer>
    </Router>
  );
};

const UnauthenticatedApp = () => <Login />;

// TODO: Use HOC for Lazy Import
// eslint-disable-next-line
function LazyComponentHOC(Component) {
  return (props: any) => (
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
