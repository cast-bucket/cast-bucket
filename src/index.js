/** Same as index.android but seems to be required for react-native-web */
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./meta/app.json";
import "circular-std";

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("root")
  });
}
