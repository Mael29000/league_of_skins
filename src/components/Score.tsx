import React from "react";
import { View, Image } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";
import { useRanks } from "../hooks/useRanks";
import { useGameContext } from "../context/GameContext";

export default function Score() {
  const { bestScore } = useGameContext();
  const rank = useRanks({ score: bestScore, size: 50 });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: RFValue(10),
        width: RFValue(300),
      }}
    >
      <Text style={{ fontSize: RFValue(26) }}>Best Score</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {rank}
        <Text style={{ fontSize: RFValue(36), marginLeft: RFValue(10) }}>
          {bestScore}
        </Text>
      </View>
    </View>
  );
}
