import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";

// TODO: Also use screenSizes to identify if mobile browser?
export const isMobile = Platform.OS === "android" || Platform.OS === "ios";
