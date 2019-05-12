import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";
export const isMobile = Platform.OS === "android" || Platform.OS === "ios";
