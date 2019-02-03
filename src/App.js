import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import GlobalFont from "react-native-global-font";
import { Router, Route, Link } from "./routes/routes";
import { Home, LandingPage } from "./screens";
import configureStore from "./config/store";

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
          <View style={{ flex: 1 }}>
            {/* <Link to="/home">Home</Link> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/landing" component={LandingPage} />
          </View>
        </Router>
      </Provider>
    );
  }
}
