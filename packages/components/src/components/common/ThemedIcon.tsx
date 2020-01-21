import { ITheme } from "@cast-bucket/core/src";
import { useTheme } from "emotion-theming";
import React from "react";
import { Feather as FeatherIcon, MaterialIcons } from "../../libs/vector-icons";

export const ThemedFeatherIcon = props => {
  const theme: ITheme = useTheme();
  return <FeatherIcon {...props} color={theme.colors.accent} />;
};

export const ThemedMaterialIcon = props => {
  const theme: ITheme = useTheme();
  return <MaterialIcons {...props} color={theme.colors.accent} />;
};
