import { ITheme } from "@cast-bucket/core";
import styled from "@emotion/native";
import { useTheme } from "emotion-theming";
import React from "react";
import { FlatList, ScrollView, TouchableHighlight, View } from "react-native";
import { Colors } from "react-native-paper";
import { useHistory, useLocation } from "react-router-dom";
import { Feather as Icon } from "../../libs/vector-icons";
import * as constants from "../../utils/constants";
import { Text } from "../common/Typography";

interface SidebarProps {
  routes: any | any[];
}

interface SidebarItemProps {
  icon: string;
  title: string;
}
const SIDEBAR_TOP_PADDING = `${constants.ui.containers.margin.value + 5}px`;
const SIDEBAR_WIDTH = "225px";

const SidebarContainer = styled(ScrollView)`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  min-width: ${SIDEBAR_WIDTH};
  max-width: 250px;
  padding-top: ${SIDEBAR_TOP_PADDING};
`;

const SidebarItem = (props: SidebarItemProps) => {
  const location = useLocation();
  const theme: ITheme = useTheme();
  const history = useHistory();
  const backgroundColor = theme.colors.accentDarker;
  const activeColor = theme.isDark ? theme.colors.text : Colors.white;
  const inactiveColor = theme.isDark ? Colors.grey500 : Colors.grey600;
  const { icon, title } = props;

  const isCurrentLocation = location.pathname === `/${title.toLowerCase()}`;
  const itemColor = isCurrentLocation ? activeColor : inactiveColor;
  return (
    <TouchableHighlight
      underlayColor={theme.isDark ? theme.colors.stroke : theme.colors.accentLighter}
      activeOpacity={0.8}
      onPress={() => history.replace({ pathname: `/${title.toLowerCase()}` })}
      style={{
        height: 50,
        padding: 10,
        paddingLeft: 50,
        ...(isCurrentLocation ? { backgroundColor } : {})
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={icon} size={17} color={itemColor} />
        <Text
          style={{
            paddingLeft: 12,
            fontSize: 17,
            marginTop: 3,
            color: itemColor,
            textTransform: "capitalize"
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const SidebarNavigation = (props: SidebarProps) => {
  const theme: ITheme = useTheme();
  return (
    <SidebarContainer
      style={{
        backgroundColor: theme.colors.sidebar,
        borderRightColor: theme.colors.stroke,
        borderRightWidth: 1
      }}
      contentContainerStyle={{ alignItems: "flex-start" }}
    >
      <FlatList
        style={{ flex: 1, alignSelf: "stretch" }}
        data={props.routes}
        renderItem={({ item }: any) => <SidebarItem icon={item.icon} title={item.title} />}
      />
    </SidebarContainer>
  );
};
