import React from "react";
import Button from "./Button";
import { RFValue } from "react-native-responsive-fontsize";
import { Champion, Result } from "../context/GameContext";
import { View, Image } from "react-native";
import Text from "./Text";

interface FeedBackButtonProps {
  result: Result;
  handlePress: () => void;
  displayList: boolean;
  correctChampion: Champion;
}

export default function FeedBackButton(props: FeedBackButtonProps) {
  const { result, handlePress, displayList, correctChampion } = props;

  const button = {
    [Result.WIN]: (
      <Button
        text="CORRECT !"
        styleText={{ color: "white" }}
        styleButton={{
          backgroundColor: "rgba(51, 255, 0, 0.61)",
          fontFamily: "Montserrat-Black",
          marginBottom: RFValue(20),
          marginTop: RFValue(20),
        }}
        onPress={handlePress}
      />
    ),
    [Result.LOSE]: (
      <View
        style={{
          borderWidth: RFValue(3),
          borderColor: "#33FF00",
          borderRadius: RFValue(10),
          overflow: "hidden",
          marginBottom: RFValue(20),
          marginTop: RFValue(20),
        }}
      >
        <View
          style={{
            height: RFValue(85),
            backgroundColor: "rgba(0, 0, 0, 0.56)",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                height: RFValue(87),
                width: RFValue(87),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Image
                source={correctChampion?.image}
                style={{ height: RFValue(95), width: RFValue(95) }}
              />
            </View>

            <Text
              style={{
                paddingLeft: RFValue(15),
                fontSize: RFValue(20),
                color: "#33FF00",
              }}
            >
              {correctChampion?.name?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    ),
    [Result.IN_PROGRESS]: (
      <View style={{ height: displayList ? RFValue(20) : RFValue(52) }} />
    ),
  };

  return <>{button[result]}</>;
}
