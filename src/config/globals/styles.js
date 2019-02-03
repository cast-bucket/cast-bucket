import { StyleSheet } from "react-native";
import { fontMaker } from "../../util/FontMaker";

const defaultSansFont = fontMaker({ weight: "400", family: "CircularStd" });
const defaultSansBoldFont = fontMaker({ weight: "700", family: "CircularStd" });
const defaultMonoFont = fontMaker({ weight: "400", family: "Space Mono" });

const styles = StyleSheet.create({
  title: {
    fontSize: 50
  },
  defaultSansFont,
  defaultSansBoldFont,
  defaultMonoFont,
  primaryText: {
    color: "#4c4c4c"
  },
  secondaryText: {
    color: "#bdbdbd"
  },
  fontXLarge: {
    fontSize: 48
  },
  fontLarge: {
    fontSize: 32
  },
  fontMedium: {
    fontSize: 24
  },
  fontSmall: {
    fontSize: 20
  },
  fontXSmall: {
    fontSize: 16
  }
});

export default styles;
