import React from "react";
import { Pressable, View, Image, TouchableOpacity } from "react-native";

interface ChampionProps {
  champion: any;
  setChampion: (champion: any) => void;
}

interface ChampionProps {
  champion: any;
  setChampion: (champion: any) => void;
}

export default function Champion(props: ChampionProps) {
  const { champion, setChampion } = props;

  console.log("Champion");

  return (
    <TouchableOpacity
      onPress={() => setChampion(champion)}
      style={{
        width: " 20%",
        aspectRatio: 1,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={champion.image}
          style={{ width: "115%", height: "115%" }}
        />
      </View>
    </TouchableOpacity>
  );
}
