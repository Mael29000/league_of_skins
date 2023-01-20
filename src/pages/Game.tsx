import React, { useEffect } from "react";
import { Pressable, SafeAreaView, View, Keyboard, Image } from "react-native";
import Skin from "../components/Skin";
import champions from "../../data/champions";
import GameHeader from "../components/GameHeader";
import Button from "../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import {
  Champion,
  ISkin,
  Result,
  Try,
  useGameContext,
} from "../context/GameContext";
import ChampionsSelect from "../components/ChampionsSelect";
import ChampionsAutocomplete from "../components/ChampionsAutocomplete";
import Text from "../components/Text";

export default function Game({ navigation }) {
  console.log("Game");

  const {
    isGameStarted,
    maxScore,
    score,
    lives,
    currentTry,
    initGame,
    addTry,
  } = useGameContext();

  useEffect(() => {
    if (!isGameStarted) initGame();
  }, []);

  useEffect(() => {
    if (!gameTry) setGameTry(currentTry);
  }, [currentTry]);

  const [toggleRefresh, setToggleRefresh] = React.useState(false);

  const [champion, setChampion] = React.useState(undefined);

  const [result, setResult] = React.useState<Result>(Result.IN_PROGRESS);

  const [gameTry, setGameTry] = React.useState<Try>(undefined);

  const correctChampion: Champion = champions.find(
    (c) => c.name === gameTry?.skin?.champion
  );

  const [stopTimer, setStopTimer] = React.useState(false);

  const handlePress = () => {
    console.log("handlePress", currentTry);
    if (result === Result.IN_PROGRESS) {
      Keyboard.dismiss();
      setDisplayList(false);
    } else {
      if (isGameStarted) {
        setResult(Result.IN_PROGRESS);
        setChampion(undefined);
        setText("");
        setGameTry(currentTry);
        setStopTimer(false);
        setToggleRefresh(!toggleRefresh);
      } else {
        navigation.navigate("Game Over");
      }
    }
  };

  const [text, setText] = React.useState("");

  const handleChangeText = (text: string) => {
    setText(text.toUpperCase().slice(0, 12));
    setDisplayList(true);
  };

  const [displayList, setDisplayList] = React.useState(false);

  const handleDisplayList = () => {
    setDisplayList(!displayList);
  };

  const handleConfirm = () => {
    Keyboard.dismiss();
    setDisplayList(false);
    setStopTimer(true);
    setResult(
      currentTry?.skin.champion === champion?.name ? Result.WIN : Result.LOSE
    );
  };

  useEffect(() => {
    if (result !== Result.IN_PROGRESS)
      addTry({
        ...currentTry,
        result,
      });
  }, [result]);

  const button = {
    [Result.WIN]: (
      <Button
        text="CORRECT !"
        styleText={{ color: "white" }}
        styleButton={{
          backgroundColor: "rgba(51, 255, 0, 0.61)",
          fontFamily: "Montserrat-Black",
          marginBottom: RFValue(20),
          marginTop: RFValue(20),
        }}
        onPress={handlePress}
      />
    ),
    [Result.LOSE]: (
      <View
        style={{
          borderWidth: RFValue(3),
          borderColor: "#33FF00",
          borderRadius: RFValue(10),
          overflow: "hidden",
          marginBottom: RFValue(20),
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
              // backgroundColor: "red",
            }}
          >
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
                source={correctChampion?.image}
                style={{ height: RFValue(95), width: RFValue(95) }}
              />
            </View>

            <Text
              style={{
                paddingLeft: RFValue(15),
                fontSize: RFValue(20),
                color: "#33FF00",
                // backgroundColor: "blue",
              }}
            >
              {correctChampion?.name?.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    ),
    [Result.IN_PROGRESS]: <View style={{ height: RFValue(52) }} />,
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={{ height: "100%", width: "100%" }}>
        <Skin skin={gameTry?.skin} result={result} />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              paddingLeft: RFValue(15),
              paddingRight: RFValue(15),
            }}
          >
            <GameHeader
              toggleRefresh={toggleRefresh}
              scoreMax={maxScore}
              score={score}
              lives={isGameStarted ? lives : 0}
              handleConfirm={handleConfirm}
              stopTimer={stopTimer}
            />

            <View style={{ display: "flex" }}>
              {!champion && result !== Result.IN_PROGRESS ? (
                <View>
                  <Button
                    text="TIME OUT !"
                    styleText={{
                      color: "white",
                      fontFamily: "Montserrat-Black",
                    }}
                    styleButton={{
                      backgroundColor: "rgba(255, 0, 0, 0.61)",
                      marginTop: RFValue(20),
                    }}
                    onPress={handlePress}
                  />
                </View>
              ) : (
                <ChampionsAutocomplete
                  champion={champion}
                  text={text}
                  handleChangeText={handleChangeText}
                  handleDisplayList={handleDisplayList}
                  displayList={displayList}
                  result={result}
                  setDisplayList={setDisplayList}
                  handleConfirm={handleConfirm}
                />
              )}

              {displayList ? (
                <ChampionsSelect
                  text={text}
                  setChampion={setChampion}
                  champions={champions}
                />
              ) : null}
              {button[result]}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Pressable>
  );
}
