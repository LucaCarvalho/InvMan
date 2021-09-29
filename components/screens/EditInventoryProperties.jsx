//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { sharedStyles } from "../SharedStyles";
import SimpleButton from "../SimpleButton";
import SimpleNavbar from "../SimpleNavbar";
import TextInputWButton from "../TextInputWButton";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("invman");

export default function EditInventoryProperties({ navigation, route }) {
    console.log(route.params);
    return (
        <View style={[sharedStyles.container, styles.container]}>
            <View style={[sharedStyles.content, styles.content]}>
                <TextInputWButton
                    onSubmit={(newInvName) =>
                        updateInventory(
                            route.params.inv_id,
                            newInvName,
                            navigation.goBack
                        )
                    }
                >
                    {route.params.inv_name}
                </TextInputWButton>
            </View>
            <SimpleNavbar style={[sharedStyles.optionsBar, styles.optionsBar]}>
                <SimpleButton
                    backgroundColor="tomato"
                    onPress={() =>
                        deleteInventory(route.params.inv_id, navigation.goBack)
                    }
                >
                    🗑️
                </SimpleButton>
            </SimpleNavbar>
        </View>
    );
}

function updateInventory(inv_id, inv_name, goBackFunction) {
    db.transaction((tx) => {
        tx.executeSql(
            "UPDATE inventories SET inv_name=? WHERE inv_id=?",
            [inv_name, inv_id],
            (_, { rows: { _array } }) => goBackFunction(),
            (t, err) => console.log("ERROR: ", err)
        );
    });
}

function deleteInventory(inv_id, goBackFunction) {
    db.transaction((tx) => {
        tx.executeSql(
            "DELETE FROM inventories WHERE inv_id=?",
            [inv_id],
            (_, { rows: { _array } }) => goBackFunction(),
            (t, err) => console.log("ERROR: ", err)
        );
    });
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
