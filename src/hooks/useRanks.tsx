import { Image } from "react-native";
import { skins } from "../../data/skins";
import { ranks } from "../../data/ranks";
import { RFValue } from "react-native-responsive-fontsize";
import { NUMBER_OF_LIVES } from "../context/GameContext";

interface UseRanksProps {
  score: number;
  size: number;
}

export interface IRank {
  name: string;
  image: any;
}

export const useRanks = (props: UseRanksProps) => {
  const { score, size } = props;

  const challengerScore = skins.length - (NUMBER_OF_LIVES - 1);

  const rankInterval = challengerScore / 8;

  const rankMapper = {
    0: "Iron",
    1: "Bronze",
    2: "Silver",
    3: "Gold",
    4: "Platinum",
    5: "Diamond",
    6: "Master",
    7: "Grandmaster",
    8: "Challenger",
  };

  const getRank = (score: number) => {
    const index = Math.floor(score / rankInterval);
    return index >= 8 ? "Challenger" : rankMapper[index];
  };

  const source = ranks.find((rank) => rank.name === getRank(score)).image;

  return (
    <Image
      source={source}
      style={{ height: RFValue(size), width: RFValue(size) }}
    />
  );
};
