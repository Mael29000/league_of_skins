import React from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: any;
}

export default function Container(props: Props) {
  const { children, style } = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
      ...style,
    },
  });

  return <View style={styles.container}>{children}</View>;
}
