import React, { Component } from "react";
import styled from "@emotion/native";
import { Provider } from "react-redux";
import { Router, Route } from "../router";
import configureStore from "../redux/store";

import { Home } from "./screens";
import Categories from "./layout/CategoryGrid";

const initialState = {};
const store = configureStore(initialState);

// const action = type => store.dispatch({ type });

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px;
`;

const Texter = styled.Text`
  font-family: Inter;
`;

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path="/choose-categories" component={Categories} />
            <Route exact path="/" component={Home} />
          </Container>
        </Router>
      </Provider>
    );
  }
}
