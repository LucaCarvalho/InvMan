import React from "react";
import { StyleSheet, Platform, StatusBar, View, Text } from "react-native";

import { sharedStyles } from "./SharedStyles";
import { expo } from "../app.json";

export default function About() {
    return (
        <View style={sharedStyles.container}>
            <Text style={styles.content}>
                InvMan - Personal Inventory Manager
            </Text>
            <Text style={styles.content}>Version {expo.version}</Text>
            <Text style={styles.content}>© Luca Carvalho, 2021{"\n"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        textAlign: "center",
        padding: 20,
    },
});
