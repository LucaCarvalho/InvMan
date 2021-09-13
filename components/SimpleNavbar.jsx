import React from "react";
import { StyleSheet, Platform, StatusBar, View } from "react-native";

export default function SimpleNavbar(props) {
    return <View style={[styles.navbar, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
    navbar: {
        flex: 0.125,
        flexDirection: "row",
        backgroundColor: "gold",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    },
});
