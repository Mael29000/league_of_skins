import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function GameHeader({ time, setTime }) {
  // create a timer that will update the time every centisecond
  // the goes from 20,00 to 0
  // create a state for the time

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newTime = time - 0.01;

      if (newTime <= 0) {
        setTime(0);
        clearInterval(interval);
        return;
      }

      //trim the number to 2 decimals
      setTime(Math.round(newTime * 100) / 100);

      // change the color of the time

      if (newTime <= 5) {
        setTimeColor("red");
      } else {
        setTimeColor("white");
      }
    }, 10);
    return () => clearInterval(interval);
  }, [time]);

  // style the time.
  // gradient from white to red
  // white when time is 20
  // red when time is 0

  const [timeColor, setTimeColor] = React.useState("white");

  // number of skins found / total number of skins
  // create a state for the score

  return (
    <View
      style={
        {
          // marginLeft: RFValue(14),
          // marginRight: RFValue(14),
        }
      }
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: RFValue(6),
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: RFValue(85),
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              color: timeColor,
            }}
          >
            {time}
          </Text>
          <MaterialIcons name="pause" size={RFValue(26)} color="white" />
        </View>
        <Text style={{ fontSize: RFValue(20) }}>1/251</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: RFValue(85),
        }}
      >
        <FontAwesome5 name="heart-broken" size={24} color="white" />
        <FontAwesome5 name="heart-broken" size={24} color="white" />
        <FontAwesome name="heart" size={24} color="red" />
      </View>
    </View>
  );
}
