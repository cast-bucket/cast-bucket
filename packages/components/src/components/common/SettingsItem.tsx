import { useTheme } from "emotion-theming";
import React from "react";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import * as constants from "../../utils/constants";

export const SettingsItem = ({ children, style, onPress }: any) => {
  const theme: any = useTheme();
  return (
    <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 25,
          borderBottomColor: theme.colors.stroke,
          borderBottomWidth: 1,
          flexDirection: "row",
          paddingLeft: constants.ui.containers.margin.value,
          ...(style ? style : {})
        }}
      >
        {children}
      </View>
    </TouchableRipple>
  );
};
