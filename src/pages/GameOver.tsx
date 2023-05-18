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
            <SafeAreaView>
                <Text
                    style={{
                        fontSize: RFValue(64),
                        marginTop: RFValue(25),
                        textAlign: "center",
                        fontFamily: "Montserrat-Black",
                    }}
                >
                    GAME
                </Text>
                <Text
                    style={{
                        fontSize: RFValue(64),
                        textAlign: "center",
                        fontFamily: "Montserrat-Black",
                    }}
                >
                    OVER
                </Text>
                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: RFValue(15),
                    }}
                >
                    {rank}
                </View>
                <Text
                    style={{
                        fontSize: RFValue(65),
                        fontFamily: "Montserrat-Black",
                        textAlign: "center",
                        marginBottom: RFValue(20),
                    }}
                >
                    {previousScore}
                </Text>

                <Button
                    text={"NEW GAME"}
                    onPress={() => {
                        navigation.navigate("Game");
                    }}
                    styleButton={{
                        borderWidth: RFValue(1),
                        borderColor: "white",
                        marginBottom: RFValue(20),
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
                        marginBottom: RFValue(20),
                        width: RFValue(300),
                    }}
                    styleText={{
                        color: "black",
                        fontFamily: "Montserrat-Black",
                    }}
                />
                <Score />
            </SafeAreaView>
        </Container>
    );
}
