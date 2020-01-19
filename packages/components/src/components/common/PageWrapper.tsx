import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
import { Appbar, Colors } from "react-native-paper";
import { useHistory } from "../../libs/router/";
import { isSmallScreen } from "../../utils/platforms";
import { PageHeading } from "./Typography";

type PageWrapperProps = {
  children: ReactNode[] | ReactNode;
  title?: string;
  titleStyle?: any;
};

export const PageWrapper: React.FC<PageWrapperProps> = props => {
  const history = useHistory();
  const { children, title, titleStyle } = props;
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
};
