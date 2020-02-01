// we define available font weight and styles for each font here
import { Platform } from "react-native";

const font = {
  Inter: {
    weights: {
      Regular: "400",
      Medium: "500",
      Semibold: "600",
      Bold: "700",
      Black: "900"
    }
  }
};

const defaultFontOptions = {
  family: "Inter",
  weight: "Regular",
  style: null
};

// generate styles for a font with given weight and style
export const useFont = (options = defaultFontOptions) => {
  const { family } = options;
  let { weight } = options;

  const { weights } = font[family];
  if (Platform.OS === "android" || Platform.OS === "ios") {
    weight = weights[weight] ? weight : "";

    const suffix = weight;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : "")
    };
  } else {
    weight = weights[weight] || weights.Medium;
    return {
      fontFamily: family,
      fontWeight: weight
    };
  }
};
