import { StyleSheet, Platform } from "react-native";
import { fontMaker } from "../util/FontMaker";

let global = {};

const defaultSansFont = fontMaker({ weight: "400", family: "CircularStd" });
const defaultSansBoldFont =
  { fontFamily: "CircularStd-Bold" } || fontMaker({ weight: "700", family: "CircularStd" });

global.styles = StyleSheet.create({
  title: {
    fontSize: 50
  },
  defaultSansFont: defaultSansFont,
  defaultSansBoldFont: defaultSansBoldFont,
  primaryText: {
    color: "#4c4c4c"
  },
  secondaryText: {
    color: "#bdbdbd"
  },
  fontXLarge: {
    fontSize: 50
  },
  fontLarge: {
    fontSize: 35
  },
  fontMedium: {
    fontSize: 25
  },
  fontSmall: {
    fontSize: 16
  }
});

global.fonts = {};
global.fonts.default = fontMaker({ weight: "400", family: "CircularStd" });
global.fonts.defaultBold = fontMaker({ weight: "700", family: "CircularStd" });
// global.fonts.defaultMonoFont = fontMaker({weight: '400', family: 'Space Mono'})

export default global;
