import { App } from "@cast-bucket/components/src/components/App";
import { Router } from "@cast-bucket/components/src/libs/router";
import { Themes } from "@cast-bucket/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { AppRegistry } from "react-native-web";
import "./index.css";

const { amoledDark: selectedTheme } = Themes;

const AppView = () => (
  <ThemeProvider theme={selectedTheme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);

const render = (AppComponent: React.FC) => {
  AppRegistry.registerComponent("cast-bucket", () => AppComponent);
  AppRegistry.runApplication("cast-bucket", {
    rootTag: document.getElementById("root")
  });
};

render(AppView);
