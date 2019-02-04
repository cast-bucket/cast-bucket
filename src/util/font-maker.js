// we define available font weight and styles for each font here
import { Platform } from "react-native";

const font = {
  CircularStd: {
    weights: {
      Black: "800",
      Bold: "700",
      Medium: "400"
    },
    styles: {
      Italic: "italic"
    }
  },
  "Space Mono": {
    weights: {
      Black: "800",
      Bold: "700",
      Medium: "400"
    },
    styles: {
      Italic: "italic"
    }
  }
};

// generate styles for a font with given weight and style
export const fontMaker = (options = {}) => {
  let { weight, style, family } = Object.assign(
    {
      weight: null,
      style: null,
      family: "CircularStd"
    },
    options
  );
  const { weights, styles } = font[family];
  if (Platform.OS === "android" || Platform.OS === "ios") {
    weight = weights[weight] ? weight : "";
    style = styles[style] ? style : "";

    const suffix = weight + style;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : "")
    };
  } else {
    weight = weights[weight] || weights["Medium"];
    style = styles[style] || null;
    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style
    };
  }
};
