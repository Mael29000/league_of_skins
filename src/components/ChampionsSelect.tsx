import React from "react";
import { View, FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Champion from "./Champion";

interface ChampionsSelectProps {
  champions: any;
  text: string;
  setChampion: (champion: any) => void;
}

export default function ChampionsSelect(props: ChampionsSelectProps) {
  console.log("ChampionsSelect");

  const { champions, text, setChampion } = props;

  const renderChampionList = ({ item }) => {
    return <Champion champion={item} setChampion={setChampion} />;
  };

  return (
    <View
      style={{
        overflow: "hidden",
        borderWidth: RFValue(3),
        borderColor: "white",

        width: "100%",
        alignSelf: "center",
        marginTop: RFValue(-3),
        flex: 1,
      }}
    >
      <FlatList
        data={champions.filter((champion) => {
          if (text === "") return true;
          else return champion.name.toLowerCase().includes(text.toLowerCase());
        })}
        keyExtractor={(champion) => champion.name}
        renderItem={renderChampionList}
        style={{
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.56)",
        }}
        numColumns={5}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={"always"}
      />
    </View>
  );
}
