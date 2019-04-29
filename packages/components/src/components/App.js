import React, { Component } from "react";
import styled from "@emotion/native";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "../libs/router";
import configureStore from "../redux/store";

import { Home, Player } from "./screens";
import Categories from "./layout/CategoryGrid";
import { Dimensions } from "react-native";

const initialState = {};
const store = configureStore(initialState);

// const action = type => store.dispatch({ type });
const { width, height } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  width: ${width},
  height: ${height},
`;

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Switch>
              <Route exact path="/" component={Categories} />
              <Route exact path="/home" component={Home} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    );
  }
}
