import { StyleSheet } from "react-native";
import { InterRegular, InterBold, InterSemibold, InterMedium, SpaceMonoRegular } from "./fonts";
// import { styles as s } from "react-native-style-tachyons";

const defaultSansFont = InterRegular;
const defaultSansBoldFont = InterBold;
const defaultMonoFont = SpaceMonoRegular;

const styles = StyleSheet.create({
  defaultSansFont,
  defaultSansBoldFont,
  defaultMonoFont,
  title: {
    fontSize: 45,
    ...InterSemibold
  },
  headline: {
    fontSize: 56,
    ...InterBold
  },
  content: {
    ...InterRegular,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: "-0.011em"
  },
  subheading: {
    fontSize: 25,
    ...InterMedium
  },
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
