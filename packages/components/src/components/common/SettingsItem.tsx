import React from "react";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import * as constants from "../../utils/constants";

export const SettingsItem = ({ children, style, onPress }: any) => (
  <TouchableRipple onPress={onPress} rippleColor="rgba(0, 0, 0, .32)">
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderBottomColor: "#d3d3d3",
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
