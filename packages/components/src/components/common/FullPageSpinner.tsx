import { useTheme } from "emotion-theming";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const FullPageSpinner = () => {
  const theme: any = useTheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.accent} />
    </View>
  );
};

export default FullPageSpinner;
