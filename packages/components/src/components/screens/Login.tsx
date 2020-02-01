import React from "react";
import { View } from "react-native";
import { useAuth } from "../../context/authentication";
import { Button } from "../common/";

export const Login = () => {
  const auth: any = useAuth();
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}
    >
      <Button onPress={auth.login}>LOGIN</Button>
    </View>
  );
};
