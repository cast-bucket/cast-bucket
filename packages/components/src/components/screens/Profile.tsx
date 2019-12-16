import { useTheme } from "emotion-theming";
import React from "react";
import { View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { withRouter } from "../../libs/router";
import { Feather as Icon } from "../../libs/vector-icons";
import { Page } from "../common/Page";
import { SettingsItem } from "../common/SettingsItem";
import { ThemedFeatherIcon } from "../common/ThemedIcon";
import { PageHeading, Text } from "../common/Typography";

const SettingsIcon = ({ history }) => {
  const theme: any = useTheme();
  return (
    <TouchableRipple
      onPress={() => history.push("/settings")}
      style={{ marginRight: 22, borderRadius: 50, padding: 10 }}
    >
      <Icon size={24} color={theme.colors.accent} name="settings" />
    </TouchableRipple>
  );
};

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
        <ThemedFeatherIcon name="user-check" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Account</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("downloads")}>
        <ThemedFeatherIcon name="download" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Downloads</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("history")}>
        <ThemedFeatherIcon name="rotate-ccw" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>History</Text>
      </SettingsItem>
      <SettingsItem style={{ borderBottomWidth: 0 }}>
        <ThemedFeatherIcon name="lock" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Terms & privacy policy</Text>
      </SettingsItem>
    </Page>
  );
});
