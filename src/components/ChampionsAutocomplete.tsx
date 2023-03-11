import React from "react";
import {
  View,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Champion, Result } from "../context/GameContext";
import Text from "./Text";
import { Ionicons } from "@expo/vector-icons";

interface ChampionsAutocompleteProps {
  handleDisplayList: () => void;
  handleChangeText: (text: string) => void;
  text: string;
  champion?: Champion;
  displayList: boolean;
  result: Result;
  setDisplayList: (displayList: boolean) => void;
  handleConfirm: () => void;
}

export default function ChampionsAutocomplete(
  props: ChampionsAutocompleteProps
) {
  const {
    handleDisplayList,
    handleChangeText,
    text,
    champion,
    displayList,
    result,
    setDisplayList,
    handleConfirm,
  } = props;

  console.log("ChampionsAutocomplete");

  const colors = {
    [Result.WIN]: "#33FF00",
    [Result.LOSE]: "red",
    [Result.IN_PROGRESS]: "white",
  };

  return (
    <View
      style={{
        borderWidth: RFValue(3),
        borderColor: colors[result],
        borderRadius: !displayList ? RFValue(10) : RFValue(0),
        overflow: "hidden",
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
          {champion !== undefined ? (
            <TouchableOpacity
              onPress={handleDisplayList}
              disabled={result !== Result.IN_PROGRESS}
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
                  source={champion.image}
                  style={{ height: RFValue(95), width: RFValue(95) }}
                />
              </View>
            </TouchableOpacity>
          ) : null}
          {result === Result.IN_PROGRESS ? (
            <TextInput
              placeholder={champion ? "SEARCH" : "SEARCH A CHAMPION"}
              style={{
                paddingLeft: displayList ? RFValue(15) : RFValue(0),
                fontSize: RFValue(20),
                color: colors[result],
                fontFamily: "Montserrat-Bold",
                height: RFValue(85),
                width: "100%",
                flex: 1,
                textAlign: displayList ? "left" : "center",
              }}
              placeholderTextColor={"rgba(255, 255, 255, 0.61)"}
              onChangeText={handleChangeText}
              value={text}
              onFocus={() => {
                setDisplayList(true);
              }}
            />
          ) : (
            <Text
              style={{
                paddingLeft: RFValue(15),
                fontSize: RFValue(20),
                color: colors[result],
                fontFamily: "Montserrat-Bold",
              }}
            >
              {champion ? champion.name.toUpperCase() : ""}
            </Text>
          )}
        </View>

        {result === Result.IN_PROGRESS && champion && (
          <TouchableOpacity onPress={handleConfirm}>
            <Ionicons
              name="ios-arrow-forward-circle"
              size={RFValue(40)}
              color={"#33FF00"}
              style={{
                marginRight: RFValue(15),
                marginLeft: RFValue(15),
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
