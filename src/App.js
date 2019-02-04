import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Provider } from "react-redux";
import GlobalFont from "react-native-global-font";
import { Router, Route, Link } from "./routes/routes";
import { Home, LandingPage } from "./screens";
import Episodes from "./components/container/Episodes";
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
