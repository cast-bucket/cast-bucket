import React, { ReactNode } from "react";
import { View } from "react-native";
import { PageHeading } from "./Typography";

interface PageProps {
  style?: any;
  children?: ReactNode | ReactNode[];
  title?: string;
}

export const Page = ({ style, children, title }: PageProps) => (
  <View
    style={{
      flex: 1,
      alignItems: "stretch",
      marginTop: 40,
      marginBottom: 20,
      ...(style ? style : {})
    }}
  >
    {title && <PageHeading style={{ flex: 0 }}>{title}</PageHeading>}
    {children}
  </View>
);
