import React from "react";
import styled from "@emotion/native";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import { Route, Switch, withRouter } from "../libs/router";
import configureStore from "../redux/store";
import { Episodes, Home } from "./screens";

const initialState = {};
const store = configureStore(initialState);

const { width, height } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  width: ${width},
  height: ${height},
`;

const AppView = props => {
  return (
    <Provider store={store}>
      <Container>
        <Switch>
          <Route exact path="/episodes" component={Episodes} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
    </Provider>
  );
};

export const App = withRouter(AppView);
