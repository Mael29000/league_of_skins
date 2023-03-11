import React from "react";
import { NUMBER_OF_LIVES } from "../context/GameContext";
import { View } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface LivesProps {
  lives: number;
  victory?: boolean;
}

export default function Lives(props: LivesProps) {
  const { lives, victory } = props;

  const nbOfBrokenHearts =
    lives < 0 ? NUMBER_OF_LIVES : NUMBER_OF_LIVES - lives;
  const nbOfFullHearts = lives < 0 ? 0 : lives;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: victory ? RFValue(200) : RFValue(85),
        flexWrap: "wrap",
      }}
    >
      {[...Array(nbOfBrokenHearts)].map((e, i) => (
        <FontAwesome5
          key={i}
          name="heart-broken"
          size={RFValue(24)}
          color="white"
        />
      ))}
      {[...Array(nbOfFullHearts)].map((e, i) => (
        <View
          style={{
            marginRight: victory ? RFValue(3) : 0,
            // marginTop: i !== 0 ? RFValue(5) : 0,
          }}
          key={i}
        >
          <FontAwesome name="heart" size={RFValue(24)} color="red" />
        </View>
      ))}
    </View>
  );
}
