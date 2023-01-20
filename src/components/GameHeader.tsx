import React from "react";
import { View } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

interface GameHeaderProps {
  toggleRefresh: boolean;
  scoreMax: number;
  score: number;
  lives: number;
  handleConfirm: () => void;
  stopTimer: boolean;
}

export default function GameHeader(props: GameHeaderProps) {
  const { toggleRefresh, scoreMax, score, lives, handleConfirm, stopTimer } =
    props;

  React.useEffect(() => {
    setTime(20);
  }, [toggleRefresh]);

  const [time, setTime] = React.useState<number>(20);

  React.useEffect(() => {
    if (stopTimer) return;
    const interval = setInterval(() => {
      const newTime = time - 0.01;

      if (newTime <= 0) {
        setTime(0);
        handleConfirm();
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
  }, [time, stopTimer]);

  const [timeColor, setTimeColor] = React.useState("white");

  const nbOfBrokenHearts = lives < 0 ? 3 : 3 - lives;
  const nbOfFullHearts = lives < 0 ? 0 : lives;

  return (
    <View>
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
        <Text style={{ fontSize: RFValue(20) }}>
          {score}/{scoreMax}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: RFValue(85),
        }}
      >
        {[...Array(nbOfBrokenHearts)].map((e, i) => (
          <FontAwesome5
            key={i}
            name="heart-broken"
            size={RFValue(24)}
            color="white"
          />
        ))}
        {[...Array(nbOfFullHearts)].map((e, i) => (
          <FontAwesome key={i} name="heart" size={RFValue(24)} color="red" />
        ))}
      </View>
    </View>
  );
}
