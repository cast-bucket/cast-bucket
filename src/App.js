import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./config/store";
import LandingPage from "./screens/LandingPage";
import InterestsContainer from "./components/container/InterestsContainer";

const initialState = {};
const store = configureStore(initialState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LandingPage />
      </Provider>
    );
  }
}
