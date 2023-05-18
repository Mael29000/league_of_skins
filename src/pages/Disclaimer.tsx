import { useEffect } from "react";
import Container from "../components/Container";
import { Pressable, SafeAreaView, View } from "react-native";
import Text from "../components/Text";
import { RFValue } from "react-native-responsive-fontsize";
import { useGameContext } from "../context/GameContext";

export default function Disclaimer({ navigation }) {
    const { loadGameContext } = useGameContext();

    useEffect(() => {
        loadGameContext();

        // display the disclaimer during 3 seconds
        setTimeout(() => {
            navigation.navigate("Home");
        }, 3000);
    }, []);

    return (
        <Container>
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFValue(32),
                                fontFamily: "Montserrat-Black",
                            }}
                        >
                            Disclaimer
                        </Text>
                        <Text
                            style={{
                                fontSize: RFValue(20),
                                lineHeight: RFValue(28),
                                textAlign: "center",
                                marginTop: RFValue(23),
                            }}
                        >
                            League of Skins isn't endorsed by Riot Games and
                            doesn't reflect the views or opinions of Riot Games
                            or anyone officially involved in producing or
                            managing Riot Games properties. Riot Games, and all
                            associated properties are trademarks or registered
                            trademarks of Riot Games, Inc.
                        </Text>
                    </View>
                </Pressable>
            </SafeAreaView>
        </Container>
    );
}
