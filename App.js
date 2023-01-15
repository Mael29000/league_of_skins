import { StyleSheet, Image, View, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import Text from "./src/components/Text";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "./src/components/Button";
import Score from "./src/components/Score";

export default function App() {
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

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/backgrounds/menu.jpg")}
        style={{ height: "100%", width: "100%", position: "absolute" }}
      />
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
          <View style={{ marginTop: RFValue(35) }}>
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
            <Button
              text="RESUME"
              styleText={{ color: "white" }}
              styleButton={{
                backgroundColor: "rgba(0, 0, 0, 0.56);",
                marginBottom: RFValue(25),
              }}
            />
            <Button
              text="NEW GAME"
              styleText={{ color: "white" }}
              styleButton={{
                backgroundColor: "rgba(0, 0, 0, 0.56);",
                marginBottom: RFValue(20),
              }}
            />
            <Score />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: RFValue(64),
    color: "white",
    fontFamily: "Montserrat-Bold",
  },
  titleOf: {
    fontSize: RFValue(32),
    color: "white",
    fontFamily: "Montserrat-Bold",
    marginRight: RFValue(13),
  },
});
