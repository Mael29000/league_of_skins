import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  text: string;
  styleText?: any;
  styleButton?: any;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const { text, styleText, styleButton, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
}
