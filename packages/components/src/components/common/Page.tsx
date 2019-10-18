import React from "react";
import { View } from "react-native";

export const Page = props => (
  <View
    style={{
      flex: 1,
      alignItems: "stretch",
      marginTop: 40,
      marginBottom: 20,
      ...(props.style ? props.style : {})
    }}
  >
    {props.children}
  </View>
);
