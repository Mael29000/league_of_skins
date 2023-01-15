import React from "react";
import { Text as TextReact } from "react-native";

export default function Text({ children, style = {} }) {
  return (
    <TextReact
      style={{
        fontFamily: "Montserrat-Bold",
        color: "white",
        ...style,
      }}
    >
      {children}
    </TextReact>
  );
}
