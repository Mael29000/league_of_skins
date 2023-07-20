import { useFonts } from "expo-font";
import MainMenu from "./src/pages/MainMenu";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Game from "./src/pages/Game";
import { GameProvider } from "./src/context/GameContext";
import GameOver from "./src/pages/GameOver";
import Victory from "./src/pages/Victory";
import Disclaimer from "./src/pages/Disclaimer";
import { View, Dimensions, StatusBar } from "react-native";

export default function App() {
    const Stack = createNativeStackNavigator();

    // load the font before rendering the app
    const [loaded] = useFonts({
        "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
        "Montserrat-BlackItalic": require("./assets/fonts/Montserrat-BlackItalic.ttf"),
        "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        "Montserrat-BoldItalic": require("./assets/fonts/Montserrat-BoldItalic.ttf"),
        "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        "Montserrat-ExtraBoldItalic": require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
        "Montserrat-ExtraLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
        "Montserrat-ExtraLightItalic": require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
        "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic.ttf"),
        "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
        "Montserrat-LightItalic": require("./assets/fonts/Montserrat-LightItalic.ttf"),
        "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-MediumItalic": require("./assets/fonts/Montserrat-MediumItalic.ttf"),
        "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-SemiBoldItalic": require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
        "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
        "Montserrat-ThinItalic": require("./assets/fonts/Montserrat-ThinItalic.ttf"),
    });

    if (!loaded) {
        return null;
    }

    const screenOptions = {
        headerShown: false,
        unmountOnBlur: true,
    };

    return (
        <GameProvider>
            <StatusBar barStyle="light-content" />
            <View
                style={{
                    height: Dimensions.get("window").height,
                    backgroundColor: "black",
                }}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={screenOptions}
                        initialRouteName="Disclaimer"
                    >
                        <Stack.Screen
                            name="Disclaimer"
                            component={Disclaimer}
                        />
                        <Stack.Screen name="Home" component={MainMenu} />
                        <Stack.Screen name="Game" component={Game} />
                        <Stack.Screen name="Game Over" component={GameOver} />
                        <Stack.Screen name="Victory" component={Victory} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </GameProvider>
    );
}
