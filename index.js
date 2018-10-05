/** Same as index.android but seems to be required for react-native-web */
import { AppRegistry } from "react-native";
import App from "./src/App";
import { name as appName } from "./src/meta/app.json";

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("root")
  });
}
