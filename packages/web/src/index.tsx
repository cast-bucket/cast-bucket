import { App } from "@cast-bucket/components/src/components/App";
import { Router } from "@cast-bucket/components/src/libs/router";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { AppRegistry } from "react-native-web";
import "./index.css";

const theme = {
  colors: {
    primary: "#2cb67d",
    stroke: "#1b1e20",
    secondary: "#72757e",
    text: "#fffffe",
    accent: "#9678f0",
    background: "#101213"
  }
};

const AppView = () => (
  <ThemeProvider theme={theme}>
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
