import React from "react";
import { StyleSheet, Text } from "react-native";
import SimpleButton from "./SimpleButton";
import SimpleNavbar from "./SimpleNavbar";

export default function TopNavbar({ navigation, route, options, back }) {
    return (
        <SimpleNavbar>
            <Text style={styles.title}> InvMan - {route.name}</Text>
            <SimpleButton
                onPress={
                    route.name == "Home"
                        ? () => navigation.navigate("About")
                        : navigation.goBack
                }
            >
                {route.name == "Home" ? "?" : "<<"}
            </SimpleButton>
        </SimpleNavbar>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
