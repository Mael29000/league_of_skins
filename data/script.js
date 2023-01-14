// read skins.json
// sort skins by champion occurrence (most to least)
// console.log the result

const fs = require("fs");
const skins = JSON.parse(fs.readFileSync("skins.json", "utf8"));

const skinsByChampion = skins.reduce((acc, skin) => {
  const champion = skin.champion;
  if (!acc[champion]) {
    acc[champion] = 0;
  }
  acc[champion]++;
  return acc;
}, {});

const sortedSkins = Object.keys(skinsByChampion).sort((a, b) => {
  return skinsByChampion[b] - skinsByChampion[a];
});

// display the result with occurences
sortedSkins.forEach((champion) => {
  console.log(`${champion}: ${skinsByChampion[champion]}`);
});

// from lower to higher list the number of champions with the same number of skins
const skinsByOccurence = Object.values(skinsByChampion).reduce((acc, count) => {
  if (!acc[count]) {
    acc[count] = 0;
  }
  acc[count]++;
  return acc;
}, {});

const sortedOccurences = Object.keys(skinsByOccurence).sort((a, b) => {
  return b - a;
});

sortedOccurences.forEach((occurence) => {
  console.log(`${occurence}: ${skinsByOccurence[occurence]}`);
});

console.log("number of different champions:", sortedSkins.length);

// read the champions.json and find those champions that have no skins
const champions = JSON.parse(fs.readFileSync("champions.json", "utf8"));

const championsArray = Object.keys(champions);

const championsWithoutSkins = championsArray.filter((champion) => {
  return !sortedSkins.includes(champion);
});

console.log("champions without skins:", championsWithoutSkins);
console.log("number of champions without skins:", championsWithoutSkins.length);
