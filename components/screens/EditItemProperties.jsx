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
import DbHandler from "../../database/DbHandler";

export default function EditItemProperties({ navigation, route }) {
    let db = new DbHandler();
    return (
        <View style={[sharedStyles.container, styles.container]}>
            <View style={[sharedStyles.content, styles.content]}>
                <TextInputWButton
                    onSubmit={(newItemName) =>
                        db.updateItemName(
                            route.params.item_id,
                            newItemName,
                            navigation.goBack
                        )
                    }
                >
                    {route.params.item_name}
                </TextInputWButton>
            </View>
            <SimpleNavbar style={[sharedStyles.optionsBar, styles.optionsBar]}>
                <SimpleButton
                    backgroundColor="tomato"
                    onPress={() =>
                        db.deleteItem(route.params.item_id, navigation.goBack)
                    }
                >
                    🗑️
                </SimpleButton>
            </SimpleNavbar>
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
