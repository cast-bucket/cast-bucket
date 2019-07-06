import { Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export const isWeb = Platform.OS === "web";

// TODO: Also use screenSizes to identify if mobile browser?
export const isMobile = Platform.OS === "android" || Platform.OS === "ios";
export const isSmallScreen = isMobile || width <= 600;
