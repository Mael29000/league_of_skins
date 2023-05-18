import AsyncStorage from "@react-native-async-storage/async-storage";
import { Game } from "../context/GameContext";

export const useStorage = () => {
    const saveGame = async (game: any) => {
        try {
            const jsonValue = JSON.stringify(game);
            await AsyncStorage.setItem("@game", jsonValue);
        } catch (e) {
            console.error(e);
        }
    };

    const loadGame = async (): Promise<Game> => {
        try {
            const jsonValue = await AsyncStorage.getItem("@game");
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(e);
        }
    };

    const clearGame = async () => {
        try {
            await AsyncStorage.removeItem("@game");
        } catch (e) {
            console.error(e);
        }
    };

    const saveBestScore = async (bestScore: number) => {
        try {
            await AsyncStorage.setItem("@bestScore", bestScore.toString());
        } catch (e) {
            console.error(e);
        }
    };

    const loadBestScore = async (): Promise<number> => {
        try {
            const bestScore = await AsyncStorage.getItem("@bestScore");
            return bestScore != null ? parseInt(bestScore) : 0;
        } catch (e) {
            console.error(e);
        }
    };

    return {
        saveGame,
        loadGame,
        clearGame,
        saveBestScore,
        loadBestScore,
    };
};
