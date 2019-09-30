import { Dimensions, Platform } from "react-native";
import { breakpoints } from "./breakpoints";

const { width } = Dimensions.get("screen");

export const isWeb = Platform.OS === "web";

export const isMobile = Platform.OS === "android" || Platform.OS === "ios";
export const isSmallScreen = isMobile || width <= breakpoints.MEDIUM_WIDTH;
