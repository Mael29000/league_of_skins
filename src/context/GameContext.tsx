// context of the game
import React, { createContext, useState } from "react";
import { skins } from "../../data/skins";

interface LeagueOfSkins {
  game?: Game;
  bestScore: number;
  previousScore: number;
}

interface Game {
  tries: Try[];
  currentTry?: Try;
}

export interface Try {
  id: number;
  skin: ISkin;
  result: Result;
  time: number;
}

export interface ISkin {
  id: number;
  name: string;
  champion: string;
  mod: Mod;
  image: any;
}

export interface Champion {
  name: string;
  image: any;
}

export interface Mod {
  id: number;
  choices: string[];
}

export enum Result {
  WIN = "WIN",
  LOSE = "LOSE",
  IN_PROGRESS = "IN_PROGRESS",
}

export const NUMBER_OF_LIVES = 6;

interface GameContextData {
  isGameStarted: boolean;
  maxScore: number;
  bestScore: number;
  score: number;
  lives: number;
  currentTry: Try;
  initGame: () => void;
  addTry: (t: Try) => void;
  previousScore: number;
}

const defaultGameContextData: GameContextData = {
  isGameStarted: false,
  maxScore: 0,
  bestScore: 0,
  score: 0,
  lives: 0,
  currentTry: undefined,
  initGame: () => {},
  addTry: (t: Try) => {},
  previousScore: 0,
};

export const GameContext = createContext<GameContextData>(
  defaultGameContextData
);

export const GameProvider = ({ children }) => {
  const [LeagueOfSkins, setLeagueOfSkins] = useState<LeagueOfSkins>({
    game: undefined,
    bestScore: 0,
    previousScore: 0,
  });

  const game = LeagueOfSkins.game;

  const maxScore = skins.length;

  const bestScore = LeagueOfSkins.bestScore;

  const score = game ? LeagueOfSkins.game.tries.length : 0;

  const lives =
    NUMBER_OF_LIVES -
    (game
      ? LeagueOfSkins.game.tries.filter((t) => t.result === Result.LOSE).length
      : 0);

  console.log("---------------------------\nlives: ", lives);

  const currentTry = game ? LeagueOfSkins.game.currentTry : undefined;

  const previousScore = LeagueOfSkins.previousScore;

  const addTry = (t: Try) => {
    const realScore =
      score - (NUMBER_OF_LIVES - lives) + (t.result === Result.LOSE ? 0 : 1);
    if (t.result === Result.LOSE && lives <= 1) {
      console.log("####### Game Over #######");
      if (realScore > bestScore)
        setLeagueOfSkins({
          game: undefined,
          bestScore: realScore,
          previousScore: realScore,
        });
      else
        setLeagueOfSkins({
          game: undefined,
          bestScore,
          previousScore: realScore,
        });
      return;
    }

    const tries = [...LeagueOfSkins.game.tries, t];

    const skinsLeft = skins.filter(
      (s) => !tries.map((t) => t.skin).includes(s)
    );

    if (skinsLeft.length === 0) {
      console.log("####### You Win #######");
      if (realScore > bestScore)
        setLeagueOfSkins({
          game: undefined,
          bestScore: realScore,
          previousScore: realScore,
        });
      else
        setLeagueOfSkins({
          game: undefined,
          bestScore,
          previousScore: realScore,
        });
      return;
    }

    const randomSkin = skinsLeft[Math.floor(Math.random() * skinsLeft.length)];

    const newTry: Try = {
      id: tries.length + 1,
      skin: randomSkin,
      result: Result.IN_PROGRESS,
      time: 0,
    };

    setLeagueOfSkins({
      ...LeagueOfSkins,
      game: { tries, currentTry: newTry },
    });
  };

  const initGame = () => {
    const firstSkin: ISkin = skins[
      Math.floor(Math.random() * skins.length)
    ] as ISkin;

    const t: Try = {
      id: 1,
      skin: firstSkin,
      result: Result.IN_PROGRESS,
      time: 20,
    };

    const newGame = { tries: [], currentTry: t };

    setLeagueOfSkins({
      ...LeagueOfSkins,
      game: newGame,
    });
  };

  return (
    <GameContext.Provider
      value={{
        isGameStarted: game !== undefined,
        maxScore,
        bestScore,
        score,
        lives,
        currentTry,
        initGame,
        addTry,
        previousScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => React.useContext(GameContext);
