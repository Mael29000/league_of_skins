import React from "react";
import { SafeAreaView, View } from "react-native";
import Text from "../components/Text";
import Container from "../components/Container";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/Button";
import { useGameContext } from "../context/GameContext";
import { useRanks } from "../hooks/useRanks";
import Score from "../components/Score";

export default function GameOver({ navigation }) {
    const { previousScore } = useGameContext();

    const rank = useRanks({ score: previousScore, size: 100 });

    return (
        <Container>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        flex: 1,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize: RFValue(56),
                                textAlign: "center",
                                fontFamily: "Montserrat-Black",
                            }}
                        >
                            GAME
                        </Text>
                        <Text
                            style={{
                                fontSize: RFValue(56),
                                textAlign: "center",
                                fontFamily: "Montserrat-Black",
                            }}
                        >
                            OVER
                        </Text>
                    </View>
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {rank}
                    </View>
                    <Text
                        style={{
                            fontSize: RFValue(56),
                            fontFamily: "Montserrat-Black",
                            textAlign: "center",
                        }}
                    >
                        {previousScore}
                    </Text>

                    <View>
                        <Button
                            text={"NEW GAME"}
                            onPress={() => {
                                navigation.navigate("Game");
                            }}
                            styleButton={{
                                borderWidth: RFValue(1),
                                borderColor: "white",
                                marginBottom: RFValue(20),
                                height: RFValue(72),
                            }}
                            styleText={{
                                fontFamily: "Montserrat-Black",
                            }}
                        />
                        <Button
                            text={"MAIN MENU"}
                            onPress={() => {
                                navigation.navigate("Home");
                            }}
                            styleButton={{
                                backgroundColor: "white",
                                width: RFValue(300),
                                height: RFValue(72),
                            }}
                            styleText={{
                                color: "black",
                                fontFamily: "Montserrat-Black",
                            }}
                        />
                    </View>
                    <Score />
                </View>
            </SafeAreaView>
        </Container>
    );
}
