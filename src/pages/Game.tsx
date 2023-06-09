import { useState, useEffect, useRef } from "react";
import { Pressable, SafeAreaView, View, Keyboard } from "react-native";
import Skin from "../components/Skin";
import { champions } from "../../data/champions";
import GameHeader from "../components/GameHeader";
import Button from "../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import {
    Champion,
    NUMBER_OF_LIVES,
    Result,
    Try,
    useGameContext,
} from "../context/GameContext";
import ChampionsSelect from "../components/ChampionsSelect";
import ChampionsAutocomplete from "../components/ChampionsAutocomplete";
import FeedBackButton from "../components/FeedBackButton";
import { useIsFocused } from "@react-navigation/native";
import Pause from "./Pause";
import PauseButtons from "../components/PauseButtons";
import YesNoSelect, { YesNoChoice } from "../components/YesNoSelect";

export default function Game({ navigation }) {
    console.log("Game");

    const isFocused = useIsFocused();

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
        // initialize the game when the component is mounted
        if (!isGameStarted) initGame();
    }, []);

    useEffect(() => {
        // add the current try to the game for the first render
        if (!gameTry) {
            setGameTry(currentTry);
            if (currentTry && currentTry?.skin?.mod?.id === 2) {
                const choices = currentTry?.skin?.mod?.choices;
                const championName =
                    choices[Math.floor(Math.random() * choices.length)];
                const selectedChampion = champions.find(
                    (c) => c.name === championName
                );
                setChampionYesNo(selectedChampion);
            }
        }
    }, [currentTry]);

    // toggle the refresh of the timer
    const [toggleRefresh, setToggleRefresh] = useState(false);

    // champion selected by the user
    const [champion, setChampion] = useState(undefined);

    // champion displayed in the yes/no select
    const [championYesNo, setChampionYesNo] = useState<Champion>(undefined);

    // result of the current try
    const [result, setResult] = useState<Result>(Result.IN_PROGRESS);

    // current try. It is used to display the skin can be different from the currentTry of the context
    // because the user can see the result of the try before the next try is displayed
    const [gameTry, setGameTry] = useState<Try>(undefined);

    // find the champion corresponding to the current try
    const correctChampion: Champion = champions.find(
        (c) => c.name === gameTry?.skin?.champion
    );

    // stop the timer
    const [stopTimer, setStopTimer] = useState<boolean>(false);

    // text of the champion search input
    const [text, setText] = useState<string>("");

    // display the list of champions
    const [displayList, setDisplayList] = useState<boolean>(false);

    // the number of lives of the game. Can be different from the lives of the context
    // because when the game is over the live of the context is reset to NUMBER_OF_LIVES
    // but we need to keep the number of lives of the game to determine if the user has lost
    // and if he can continue the game or not.
    // this number of lives is never displayed to the user
    const [gameLives, setGameLives] = useState<number>(NUMBER_OF_LIVES);

    const [pause, setPause] = useState<boolean>(false);

    const handlePress = () => {
        console.log("handlePress", currentTry);
        if (result === Result.IN_PROGRESS) {
            // hide the keyboard and the list of champions
            Keyboard.dismiss();
            setDisplayList(false);
        } else {
            // if the user has lost all his lives, the game is over
            // if the user has won the game, the game is over
            // so the isGameStarted is set to false
            if (!isGameStarted) {
                // if the user lose and he has only one life left, the game is over
                if (result === Result.LOSE && gameLives === 0)
                    navigation.navigate("Game Over");
                // else it mean that the user has won the game
                else navigation.navigate("Victory");
            }
            // otherwise the game is not over and the user can continue the game
            // so we reset the game datas
            else resetGameDatas();
        }
    };

    const handleChangeText = (newText: string) => {
        setText(newText.slice(0, 12));
        setDisplayList(true);
    };

    const handleDisplayList = () => {
        setDisplayList(!displayList);
    };

    const handleConfirm = () => {
        Keyboard.dismiss();
        setDisplayList(false);
        setStopTimer(true);
        const result: Result =
            currentTry?.skin.champion === champion?.name
                ? Result.WIN
                : Result.LOSE;
        setResult(result);
        if (result === Result.LOSE) setGameLives(gameLives - 1);
    };

    const handleConfirmYesNo = (choice: YesNoChoice) => {
        setStopTimer(true);

        const choiceMapper = {
            [YesNoChoice.YES]: () => {
                if (championYesNo.name === currentTry.skin.champion) {
                    setResult(Result.WIN);
                } else {
                    setResult(Result.LOSE);
                    setGameLives(gameLives - 1);
                }
            },
            [YesNoChoice.NO]: () => {
                if (championYesNo.name !== currentTry.skin.champion) {
                    setResult(Result.WIN);
                } else {
                    setResult(Result.LOSE);
                    setGameLives(gameLives - 1);
                }
            },
        };

        choiceMapper[choice]();
    };

    const resetGameDatas = () => {
        // reset the inputs and data to prepare the next try
        setChampion(undefined);
        setText("");
        setStopTimer(false);
        setToggleRefresh(!toggleRefresh);
        setResult(Result.IN_PROGRESS);
        setGameTry(currentTry);
        setGameLives(lives);
        if (currentTry && currentTry?.skin?.mod?.id === 2) {
            const choices = currentTry?.skin?.mod?.choices;
            const championName =
                choices[Math.floor(Math.random() * choices.length)];
            const selectedChampion = champions.find(
                (c) => c.name === championName
            );
            setChampionYesNo(selectedChampion);
        } else {
            setChampionYesNo(undefined);
        }
    };

    useEffect(() => {
        if (result !== Result.IN_PROGRESS)
            addTry({
                ...currentTry,
                result,
            });
    }, [result]);

    useEffect(() => {
        if (isFocused) {
            if (!isGameStarted) {
                resetGameDatas();
                initGame();
            } else {
                setGameLives(lives);
            }
        }
    }, [isFocused]);

    useEffect(() => {
        if (currentTry) {
            setStopTimer(pause || result !== Result.IN_PROGRESS);
        }
    }, [pause]);

    return (
        <Pressable onPress={handlePress}>
            <View style={{ height: "100%", width: "100%" }}>
                {pause ? (
                    <Pause />
                ) : (
                    <Skin skin={gameTry?.skin} result={result} />
                )}

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
                            lives={gameLives}
                            handleConfirm={handleConfirm}
                            stopTimer={stopTimer}
                            pause={pause}
                            setPause={setPause}
                        />
                        {!pause ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "flex-end",
                                }}
                            >
                                {!champion &&
                                !championYesNo &&
                                result !== Result.IN_PROGRESS ? (
                                    <View>
                                        <Button
                                            text="TIME OUT !"
                                            styleText={{
                                                color: "white",
                                                fontFamily: "Montserrat-Black",
                                            }}
                                            styleButton={{
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.61)",
                                                marginTop: RFValue(20),
                                            }}
                                            onPress={handlePress}
                                        />
                                    </View>
                                ) : gameTry?.skin.mod.id === 2 ? (
                                    <YesNoSelect
                                        handleConfirm={handleConfirmYesNo}
                                        result={result}
                                        champion={championYesNo}
                                        correctChampion={correctChampion}
                                    />
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

                                {displayList && (
                                    <ChampionsSelect
                                        text={text}
                                        setChampion={setChampion}
                                        champions={champions}
                                    />
                                )}

                                <FeedBackButton
                                    result={result}
                                    handlePress={handlePress}
                                    displayList={displayList}
                                    correctChampion={correctChampion}
                                />
                            </View>
                        ) : (
                            <PauseButtons
                                pause={pause}
                                setPause={setPause}
                                navigation={navigation}
                            />
                        )}
                    </View>
                </SafeAreaView>
            </View>
        </Pressable>
    );
}
