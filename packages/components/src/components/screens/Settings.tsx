import React from "react";
import { withRouter } from "../../libs/router/index.web";
import { PageWrapper } from "../common/PageWrapper";
import { SettingsItem } from "../common/SettingsItem";
import { ThemedFeatherIcon } from "../common/ThemedIcon";
import { Text } from "../common/Typography";

export const Settings = withRouter(({ history }) => {
  const redirectTo = (path: string) =>
    history.push({
      pathname: `/${path}`
    });

  return (
    <PageWrapper title="Settings" titleStyle={{ marginBottom: 64 }}>
      <SettingsItem onPress={() => redirectTo("appearance")}>
        <ThemedFeatherIcon name="sun" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Appearance</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("notifications")}>
        <ThemedFeatherIcon name="bell" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Notifications</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("help")}>
        <ThemedFeatherIcon name="help-circle" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Help & Feedback</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("about")}>
        <ThemedFeatherIcon name="info" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>About</Text>
      </SettingsItem>
    </PageWrapper>
  );
});
