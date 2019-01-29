import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./config/store";
import { Home, LandingPage } from "./screens";
import { Text, View } from "react-native";
import GlobalFont from "react-native-global-font";
import { Router, Route, Link } from "./routes/routes";

const initialState = {};
const store = configureStore(initialState);

export default class App extends Component {
  componentDidMount() {
    let fontName = "CircularStd";
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <View>
            <Link to="/home"> Home </Link>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={LandingPage} />
          </View>
        </Router>
      </Provider>
    );
  }
}
