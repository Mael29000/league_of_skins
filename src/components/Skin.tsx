import React from "react";
import { ImageBackground, View } from "react-native";
import { ISkin, Result } from "../context/GameContext";

interface SkinProps {
  skin?: ISkin;
  result: Result;
}

export default function Skin(props: SkinProps) {
  const { skin, result } = props;

  console.log("result", result);

  const colors = {
    [Result.WIN]: "rgba(51, 255, 0, 0.16)",
    [Result.LOSE]: "rgba(255, 0, 0, 0.16)",
    [Result.IN_PROGRESS]: "rgba(0, 0, 0, 0.16)",
  };

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
      {skin?.image && (
        <ImageBackground
          source={skin.image}
          style={{ height: "100%", width: "100%", position: "absolute" }}
        />
      )}

      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors[result],
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
