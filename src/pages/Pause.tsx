import React from "react";
import { ImageBackground, View } from "react-native";

export default function Pause() {
    const pauseImage = require("../../assets/backgrounds/pause.jpg");
    return (
        <>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%",
                }}
            />
            <ImageBackground
                source={pauseImage}
                style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                }}
            />
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    width: "100%",
                    height: "100%",
                }}
            />
        </>
    );
}
