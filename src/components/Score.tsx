import React from "react";
import { View, Image } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";

export default function Score() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: RFValue(10),
      }}
    >
      <Text style={{ fontSize: RFValue(26) }}>Best Score</Text>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={require("../../assets/rank/Emblem_Gold.png")}
          style={{
            width: RFValue(50),
            height: RFValue(50),
            marginRight: RFValue(10),
          }}
        />
        <Text style={{ fontSize: RFValue(36) }}>58</Text>
      </View>
    </View>
  );
}
