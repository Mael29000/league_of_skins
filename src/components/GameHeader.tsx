import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Text from "./Text";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Lives from "./Lives";

interface GameHeaderProps {
  toggleRefresh: boolean;
  scoreMax: number;
  score: number;
  lives: number;
  handleConfirm: () => void;
  stopTimer: boolean;
  pause: boolean;
  setPause: (pause: boolean) => void;
}

export default function GameHeader(props: GameHeaderProps) {
  const {
    toggleRefresh,
    scoreMax,
    score,
    lives,
    handleConfirm,
    stopTimer,
    pause,
    setPause,
  } = props;

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

  return (
    <View style={{ zIndex: 10 }}>
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
            height: RFValue(30),
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(20),
              color: timeColor,
              width: RFValue(62),
            }}
          >
            {time}
          </Text>
          {pause ? (
            <TouchableOpacity onPress={() => setPause(!pause)}>
              <FontAwesome5 name="play" size={RFValue(19)} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setPause(!pause)}>
              <MaterialIcons name="pause" size={RFValue(30)} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ fontSize: RFValue(20) }}>
          {score}/{scoreMax}
        </Text>
      </View>
      <Lives lives={lives} />
    </View>
  );
}
