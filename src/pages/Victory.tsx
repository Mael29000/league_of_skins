import React from "react";
import Container from "../components/Container";
import Background from "../components/Background";
import { SafeAreaView, View } from "react-native";
import Text from "../components/Text";
import { RFValue } from "react-native-responsive-fontsize";
import { NUMBER_OF_LIVES, useGameContext } from "../context/GameContext";
import Lives from "../components/Lives";
import Button from "../components/Button";
import Score from "../components/Score";

export default function Victory({ navigation }) {
  const { previousScore, maxScore } = useGameContext();

  console.log("previousScore", previousScore);

  const previousLives = NUMBER_OF_LIVES - (maxScore - previousScore);

  return (
    <Container>
      <Background source={require("../../assets/backgrounds/victory.jpg")} />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: RFValue(64),
              marginTop: RFValue(25),
              fontFamily: "Montserrat-Black",
            }}
          >
            VICTORY
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: RFValue(96),
                fontFamily: "Montserrat-Black",
                marginBottom: RFValue(5),
              }}
            >
              {previousScore}
            </Text>
            <Lives lives={previousLives} victory />
            <Button
              text={"MAIN MENU"}
              styleButton={{
                marginTop: RFValue(15),
                marginBottom: RFValue(10),
                backgroundColor: "rgba(0, 0, 0, 0.56)",
                width: RFValue(300),
              }}
              onPress={() => navigation.navigate("Home")}
            />
            <Score />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
}
