import React from "react";
import { ActivityIndicator, View } from "react-native";

const FullPageSpinner = () => {
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default FullPageSpinner;
