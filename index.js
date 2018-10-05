/** Same as index.android but seems to be required for react-native-web */
import { AppRegistry, Platform } from "react-native";
import App from "./src/App";
import meta from "./src/meta/app.json";

const appName = Platform.select({
  "web": meta.name,
  "android": meta.android.name,
  "ios": meta.ios.name
})

// defaults to platform independent name.
if(!appName) 
  appName = meta.name;

AppRegistry.registerComponent(appName, () => App);

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("root")
  });
}
