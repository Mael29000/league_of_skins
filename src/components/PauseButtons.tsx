import React from "react";
import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/Button";

interface Props {
  navigation: any;
  pause: boolean;
  setPause: (pause: boolean) => void;
}

export default function PauseButtons(props: Props) {
  const { navigation, pause, setPause } = props;

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          flex: 1,
          width: RFValue(245),
          marginTop: RFValue(-80),
        }}
      >
        <Button
          text="RESUME"
          styleText={{ color: "white" }}
          styleButton={{
            backgroundColor:
              // imageIndex === 4
              //   ? "rgba(1, 14, 4, 0.73)"
              //   :
              "rgba(34, 21, 3, 0.73)",
            marginBottom: RFValue(50),
            height: RFValue(68),
          }}
          onPress={() => setPause(!pause)}
        />
        <Button
          text="EXIT"
          styleText={{ color: "white" }}
          styleButton={{
            backgroundColor:
              // imageIndex === 4
              //   ? "rgba(1, 14, 4, 0.73)"
              //   :
              "rgba(34, 21, 3, 0.73)",
            height: RFValue(68),
          }}
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
}
