import React from "react";
import { ImageBackground, View } from "react-native";

export default function Pause() {
  const pauseImages = [
    require("../../assets/backgrounds/pause_1.jpg"),
    require("../../assets/backgrounds/pause_2.jpg"),
    require("../../assets/backgrounds/pause_3.jpg"),
    require("../../assets/backgrounds/pause_4.jpg"),
    require("../../assets/backgrounds/pause_5.jpg"),
  ];

  const imageIndex = 2;

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          width: "100%",
          height: "100%",
        }}
      />
      <ImageBackground
        source={pauseImages[imageIndex]}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
}
