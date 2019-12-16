import React from "react";
import { ScrollView } from "react-native";
import { Appbar, Colors } from "react-native-paper";
import { withRouter } from "../../libs/router/";
import { isSmallScreen } from "../../utils/platforms";
import { PageHeading } from "./Typography";

export const PageWrapper = withRouter(({ children, title, history, titleStyle }) => {
  const AppNavigationBar = () => (
    <Appbar.Header style={{ backgroundColor: Colors.black }}>
      <Appbar.BackAction onPress={() => history.goBack()} />
      <Appbar.Content title={title} titleStyle={titleStyle} />
    </Appbar.Header>
  );

  return (
    <ScrollView>
      {isSmallScreen ? (
        <AppNavigationBar />
      ) : (
        <PageHeading style={{ marginTop: 40, marginBottom: 0, ...titleStyle }}>{title}</PageHeading>
      )}
      {children}
    </ScrollView>
  );
});
