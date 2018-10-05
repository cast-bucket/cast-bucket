/** @format */
import { AppRegistry } from "react-native";
import App from "./src/App";
import meta from "./src/meta/app.json";

const appName = meta.ios.name;
AppRegistry.registerComponent(appName, () => App);
