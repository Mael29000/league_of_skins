import { IRank } from "../src/hooks/useRanks";

export const ranks: IRank[] = [
  { name: "Iron", image: require("../assets/ranks/Emblem_Iron.png") },
  { name: "Bronze", image: require("../assets/ranks/Emblem_Bronze.png") },
  { name: "Silver", image: require("../assets/ranks/Emblem_Silver.png") },

  { name: "Gold", image: require("../assets/ranks/Emblem_Gold.png") },
  { name: "Platinum", image: require("../assets/ranks/Emblem_Platinum.png") },
  { name: "Diamond", image: require("../assets/ranks/Emblem_Diamond.png") },
  { name: "Master", image: require("../assets/ranks/Emblem_Master.png") },
  {
    name: "Grandmaster",
    image: require("../assets/ranks/Emblem_Grandmaster.png"),
  },
  {
    name: "Challenger",
    image: require("../assets/ranks/Emblem_Challenger.png"),
  },
];
