// in order to display static content i need to require the images
// i need an array of images with the require(path) function

// I already have skins in skins.json
// I want to add the image property to each skin like this:
// "image": require("../assets/skins/1.jpg")

// then copy the result to skins.js

// I need to do this because I want to display the skins dynamically
// and I need to require the images in order to display them

const fs = require("fs");
const skins = require("./skins.json");

let jsonString = "[";

for (let i = 0; i < skins.length; i++) {
  const skin = skins[i];
  jsonString += `{
    "id": ${skin.id},
    "name": "${skin.name}",
    "champion": "${skin.champion}",
    "image": require("../assets/skins/${skin.name}.jpg"),
    "mode": "${skin.mode}",
  },`;
}

jsonString += "]";

fs.writeFileSync("./skins.js", `export const skins = ${jsonString}`);
