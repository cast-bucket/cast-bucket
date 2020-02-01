import { App } from "@cast-bucket/components/src/components/App";
import { BackButton, Router } from "@cast-bucket/components/src/libs/router";
import { Themes } from "@cast-bucket/core";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { AppRegistry } from "react-native";
import TrackPlayer from 'react-native-track-player';

const { amoledDark: selectedTheme } = Themes;

TrackPlayer.registerPlaybackService(() => require("./service"));

const AppView = () => (
  <ThemeProvider theme={selectedTheme}>
    <Router>
      <BackButton>
        <App />
      </BackButton>
    </Router>
  </ThemeProvider>
);

AppRegistry.registerComponent("castBucket", () => AppView);
