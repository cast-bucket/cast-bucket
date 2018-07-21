/** @format */
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./meta/app.json";

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("root")
  });
}
