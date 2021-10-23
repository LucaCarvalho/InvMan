//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { sharedStyles } from "../SharedStyles";
import SimpleNavbar from "../SimpleNavbar";
import TextInputWButton from "../TextInputWButton";
import DbHandler from "../../database/DbHandler";

export default function NewItem({ navigation, route }) {
    let db = new DbHandler();
    return (
        <View style={[sharedStyles.container, styles.container]}>
            <View style={[sharedStyles.content, styles.content]}>
                <TextInputWButton
                    placeholder={"Item name"}
                    onSubmit={(itemName) => {
                        db.createItem(
                            itemName,
                            route.params.inv_id,
                            () => navigation.goBack(),
                            () =>
                                Alert.alert(
                                    "Item already exists",
                                    "Use a different name"
                                )
                        );
                    }}
                ></TextInputWButton>
            </View>
            <SimpleNavbar
                style={[sharedStyles.optionsBar, styles.optionsBar]}
            ></SimpleNavbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
    },
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
