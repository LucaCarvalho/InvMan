import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SimpleButton(props) {
    const styles = StyleSheet.create({
        button: {
            height: props.height,
            width: props.width,
            backgroundColor: props.backgroundColor,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText: {
            fontSize: 20,
            fontWeight: "bold",
            color: props.textColor,
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </TouchableOpacity>
    );
}

SimpleButton.defaultProps = {
    height: 50,
    width: 50,
    backgroundColor: "dodgerblue",
    textColor: "black",
};
