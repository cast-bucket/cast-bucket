import React from "react";
import { withRouter } from "../../libs/router/index.web";
import { Feather as Icon } from "../../libs/vector-icons";
import { PageWrapper } from "../common/PageWrapper";
import { SettingsItem } from "../common/SettingsItem";
import { Text } from "../common/Typography";

export const Settings = withRouter(({ history }) => {
  const redirectTo = (path: string) =>
    history.push({
      pathname: `/${path}`
    });

  return (
    <PageWrapper title="Settings">
      <SettingsItem onPress={() => redirectTo("appearance")}>
        <Icon name="sun" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Appearance</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("notifications")}>
        <Icon name="bell" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Notifications</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("help")}>
        <Icon name="help-circle" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>Help & Feedback</Text>
      </SettingsItem>
      <SettingsItem onPress={() => redirectTo("about")}>
        <Icon name="info" size={18} style={{ marginRight: 20 }} />
        <Text style={{ fontSize: 18 }}>About</Text>
      </SettingsItem>
    </PageWrapper>
  );
});
