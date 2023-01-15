import React from "react";
import { Pressable, View } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";

export default function Button({ text, styleText, styleButton }) {
  return (
    <Pressable>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: RFValue(85),
          borderRadius: RFValue(10),
          ...styleButton,
        }}
      >
        <Text style={{ fontSize: RFValue(26), ...styleText }}>{text}</Text>
      </View>
    </Pressable>
  );
}
