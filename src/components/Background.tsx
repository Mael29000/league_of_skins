import React from "react";
import { ImageBackground } from "react-native";

export default function Background({ source }) {
  return (
    <ImageBackground
      source={source}
      style={{ height: "100%", width: "100%", position: "absolute" }}
    />
  );
}
