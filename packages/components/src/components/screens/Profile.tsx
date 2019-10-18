import React from "react";
import { View } from "react-native";
import { Colors, TouchableRipple } from "react-native-paper";
import { withRouter } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";
import { Page } from "../common/Page";
import { SettingsItem } from "../common/SettingsItem";
import { PageHeading, Text } from "../common/Typography";

const SettingsIcon = ({ history }) => (
  <TouchableRipple
    onPress={() => history.push("/settings")}
    style={{ marginRight: 22, borderRadius: 50, padding: 10 }}
  >
    <Icon size={24} color={Colors.grey700} name="settings" />
  </TouchableRipple>
);

export const Profile = withRouter(({ history }) => {
  const redirectTo = (path: string) =>
    history.push({
      pathname: `/${path}`
    });

  return (
    <Page>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 64
        }}
      >
        <PageHeading style={{ marginBottom: 0 }}>Profile</PageHeading>
        <SettingsIcon history={history} />
      </View>
      <SettingsItem onPress={() => redirectTo("account")}>
        <Icon name="user-check" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Account</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("downloads")}>
        <Icon name="download" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Downloads</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("history")}>
        <Icon name="rotate-ccw" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>History</Text>
      </SettingsItem>
      <SettingsItem style={{ borderBottomWidth: 0 }}>
        <Icon name="lock" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Terms & privacy policy</Text>
      </SettingsItem>
    </Page>
  );
});
