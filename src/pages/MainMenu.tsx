import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Text from "../components/Text";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/Button";
import Score from "../components/Score";
import Container from "../components/Container";
import Background from "../components/Background";
import { useGameContext } from "../context/GameContext";

export default function MainMenu({ navigation }) {
  const { isGameStarted } = useGameContext();

  return (
    <Container>
      <Background source={require("../../assets/backgrounds/menu.jpg")} />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.24)",
          width: "100%",
          height: "100%",
        }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <View
            style={{
              marginTop: RFValue(35),
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>LEAGUE</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: RFValue(-5),
              }}
            >
              <Text style={styles.titleOf}>OF</Text>
              <Text style={styles.title}>SKINS</Text>
            </View>
          </View>
          <View>
            {isGameStarted && (
              <Button
                text="RESUME"
                styleText={{ color: "white" }}
                styleButton={{
                  backgroundColor: "rgba(0, 0, 0, 0.56);",
                  marginBottom: RFValue(25),
                }}
                onPress={() => navigation.navigate("Game")}
              />
            )}

            <Button
              text="NEW GAME"
              styleText={{ color: "white" }}
              styleButton={{
                backgroundColor: "rgba(0, 0, 0, 0.56);",
                marginBottom: RFValue(20),
              }}
              onPress={() => navigation.navigate("Game")}
            />
            <Score />
          </View>
        </View>
      </SafeAreaView>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(64),
  },
  titleOf: {
    fontSize: RFValue(32),
    marginRight: RFValue(13),
  },
});
