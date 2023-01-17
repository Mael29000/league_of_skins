import React from "react";
import Text from "../components/Text";
import { Pressable, SafeAreaView, View } from "react-native";
import Container from "../components/Container";
import Skin from "../components/Skin";
import skins from "../../data/skins";
import GameHeader from "../components/GameHeader";
import { Flex } from "@react-native-material/core";
import Button from "../components/Button";
import { RFValue } from "react-native-responsive-fontsize";

export default function Game() {
  const [skin, setSkin] = React.useState(
    // skins[Math.floor(Math.random() * skins.length)]
    // skins.find((skin) => skin.name === "Vi_coeur")
    skins[0]
  );

  const handlePress = () => {
    // get a random skin
    setSkin(skins[Math.floor(Math.random() * skins.length)]);
    // get by order
    // const index = skins.indexOf(skin);
    // if (index === skins.length - 1) {
    //   setSkin(skins[0]);
    // } else {
    //   setSkin(skins[index + 1]);
    // }

    setTime(20);
  };

  const [time, setTime] = React.useState(20);

  return (
    <Pressable onPress={handlePress}>
      <View style={{ height: "100%", width: "100%" }}>
        <Skin skin={skin} />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              paddingLeft: RFValue(15),
              paddingRight: RFValue(15),
            }}
          >
            <GameHeader time={time} setTime={setTime} />

            <View
            // style={{ paddingLeft: RFValue(25), paddingRight: RFValue(25) }}
            >
              <View
                style={{
                  marginBottom: RFValue(20),
                  height: RFValue(85),
                  backgroundColor: "rgba(0, 0, 0, 0.56)",
                  borderRadius: RFValue(10),
                  borderWidth: RFValue(3),
                  borderColor: "white",
                }}
              >
                {/* <Image></Image> */}
              </View>
              <Button
                text="CONFIRM"
                styleText={{ color: "white" }}
                styleButton={{ backgroundColor: "rgba(51, 255, 0, 0.61)" }}
                onPress={() => {}}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Pressable>
  );
}
