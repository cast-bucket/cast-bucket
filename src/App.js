import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { Router, Route } from "./routes/routes";
import { Home, LandingPage } from "./screens";
import Episodes from "./components/container/Episodes";
import configureStore from "./config/store";
import NativeTachyons from "react-native-style-tachyons";

const initialState = {};
const store = configureStore(initialState);

NativeTachyons.build(
  {
    colors: {
      palette: {
        green: "#00FF00"
      }
    },
    /* REM parameter is optional, default is 16 */
    rem: window.width > 340 ? 18 : 16,
    /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
    fontRem: 20
  },
  StyleSheet
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <View style={{ flex: 1, overflowY: "auto" }}>
            {/* <Link to="/home">Home</Link> */}
            <Route exact path="/" component={Home} />
            <Route path="/episodes" component={Episodes} />
            <Route exact path="/landing" component={LandingPage} />
          </View>
        </Router>
      </Provider>
    );
  }
}
