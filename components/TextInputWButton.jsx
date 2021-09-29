//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import SimpleButton from "./SimpleButton";

export default function TextInputWButton(props) {
    const [text, onChangeText] = useState("");

    //console.log(props.placeholder);

    return (
        <View style={styles.textInputView}>
            <TextInput
                placeholder={props.placeholder}
                style={styles.textInput}
                onChangeText={onChangeText}
            >
                {props.children}
            </TextInput>
            <SimpleButton onPress={() => props.onSubmit(text)}>✓</SimpleButton>
        </View>
    );
}

TextInputWButton.defaultProps = {
    placeholder: "",
    onSubmit: (text) => {},
};

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        padding: 5,
        flex: 0.8,
        marginRight: 5,
    },
    textInputView: {
        flexDirection: "row",
    },
});
