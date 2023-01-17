import React from "react";
import { ImageBackground, View } from "react-native";
import akali from "../../assets/skins/Akali_cyber.jpg";
import skins from "../../data/skins";

export default function Skin({ skin }) {
  console.log(skin);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <ImageBackground
        source={skin.image}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.24)",
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
