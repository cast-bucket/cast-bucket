import "./index.css";

import { App } from "@cast-bucket/components/src/components/App";
import { AppRegistry } from "react-native-web";

const render = AppComponent => {
  AppRegistry.registerComponent("cast-bucket", () => AppComponent);
  AppRegistry.runApplication("cast-bucket", {
    rootTag: document.getElementById("root")
  });
};

render(App);
