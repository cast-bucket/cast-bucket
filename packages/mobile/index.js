import React from "react";
import { AppRegistry } from "react-native";
import { App } from "@cast-bucket/components/src/components/App";
import { Router, BackButton } from "@cast-bucket/components/src/libs/router";
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => require("./service"));

const AppView = () => (
  <Router>
    <BackButton>
      <App />
    </BackButton>
  </Router>
);

AppRegistry.registerComponent("castBucket", () => AppView);
