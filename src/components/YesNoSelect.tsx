import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "./Text";
import { Champion, Result } from "../context/GameContext";
import Button from "./Button";

export enum YesNoChoice {
    YES = "YES",
    NO = "NO",
}

interface YesNoSelectProps {
    champion?: Champion;
    result: Result;
    handleConfirm: (choice: YesNoChoice) => void;
    correctChampion?: Champion;
}

export default function YesNoSelect(props: YesNoSelectProps) {
    const { champion, result, handleConfirm, correctChampion } = props;

    console.log("champion", champion);

    const colors = {
        [Result.WIN]: "#33FF00",
        [Result.LOSE]: "red",
        [Result.IN_PROGRESS]: "white",
    };

    const goodResponse =
        champion?.name === correctChampion?.name
            ? YesNoChoice.YES
            : YesNoChoice.NO;

    return (
        <View>
            {result === Result.IN_PROGRESS ? (
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                    }}
                >
                    <Button
                        text="YES"
                        styleButton={{
                            backgroundColor: "#33FF00",
                            width: "100%",
                            height: RFValue(65),
                        }}
                        styleContainer={{ width: "47.5%", marginRight: "5%" }}
                        onPress={() => handleConfirm(YesNoChoice.YES)}
                    />
                    <Button
                        text="NO"
                        styleButton={{
                            backgroundColor: "red",
                            width: "100%",
                            height: RFValue(65),
                        }}
                        styleContainer={{ width: "47.5%" }}
                        onPress={() => handleConfirm(YesNoChoice.NO)}
                    />
                </View>
            ) : null}
            {result !== Result.LOSE || goodResponse !== YesNoChoice.YES ? (
                <View
                    style={{
                        borderWidth: RFValue(3),
                        borderColor: colors[result],
                        borderRadius: RFValue(10),
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
                            {champion !== undefined &&
                            correctChampion !== undefined ? (
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
                                        source={
                                            result === Result.IN_PROGRESS
                                                ? champion.image
                                                : result === Result.LOSE &&
                                                  goodResponse ===
                                                      YesNoChoice.NO
                                                ? champion.image
                                                : correctChampion.image
                                        }
                                        style={{
                                            height: RFValue(95),
                                            width: RFValue(95),
                                        }}
                                    />
                                </View>
                            ) : null}
                            {result === Result.IN_PROGRESS ? (
                                <Text
                                    style={{
                                        paddingLeft: RFValue(15),
                                        fontSize:
                                            champion.name.length > 8
                                                ? RFValue(18)
                                                : RFValue(20),
                                        color: colors[result],
                                        fontFamily: "Montserrat-Bold",
                                    }}
                                >
                                    {champion
                                        ? champion.name.toUpperCase()
                                        : ""}
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        paddingLeft: RFValue(15),
                                        fontSize: RFValue(20),
                                        color: colors[result],
                                        fontFamily: "Montserrat-Bold",
                                    }}
                                >
                                    {result === Result.WIN
                                        ? correctChampion.name.toUpperCase()
                                        : result === Result.LOSE
                                        ? champion.name.toUpperCase()
                                        : ""}
                                </Text>
                            )}
                        </View>

                        {result === Result.IN_PROGRESS && champion && (
                            <Text
                                style={{
                                    fontSize: RFValue(35),
                                    fontFamily: "Montserrat-Bold",
                                    marginRight: RFValue(15),
                                }}
                            >
                                ?
                            </Text>
                        )}
                    </View>
                </View>
            ) : (
                <Button
                    text="INCORRECT !"
                    styleText={{
                        color: "white",
                        fontFamily: "Montserrat-Black",
                    }}
                    styleButton={{
                        backgroundColor: "rgba(255, 0, 0, 0.61)",
                        marginTop: RFValue(20),
                    }}
                    onPress={() => {}}
                />
            )}
        </View>
    );
}
