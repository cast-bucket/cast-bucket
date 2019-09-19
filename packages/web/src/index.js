import "./index.css";
import React from "react";
import { App } from "@cast-bucket/components/src/components/App";
import { AppRegistry } from "react-native-web";
import { Router } from "@cast-bucket/components/src/libs/router";

const AppView = () => (
  <Router>
    <App />
  </Router>
);

const render = AppComponent => {
  AppRegistry.registerComponent("cast-bucket", () => AppComponent);
  AppRegistry.runApplication("cast-bucket", {
    rootTag: document.getElementById("root")
  });
};

render(AppView);
