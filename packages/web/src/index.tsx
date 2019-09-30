import { App } from "@cast-bucket/components/src/components/App";
import { Router } from "@cast-bucket/components/src/libs/router";
import React from "react";
import { AppRegistry } from "react-native-web";
import "./index.css";

const AppView = () => (
  <Router>
    <App />
  </Router>
);

const render = (AppComponent: React.FC) => {
  AppRegistry.registerComponent("cast-bucket", () => AppComponent);
  AppRegistry.runApplication("cast-bucket", {
    rootTag: document.getElementById("root")
  });
};

render(AppView);
