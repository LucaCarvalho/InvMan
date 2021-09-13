//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";
import { StyleSheet, Platform, StatusBar, View, Text } from "react-native";
import { sharedStyles } from "./SharedStyles";
import SimpleNavbar from "./SimpleNavbar";

export default function Home({ navigation }) {
    return (
        <View style={[sharedStyles.container, styles.container]}>
            <View style={[sharedStyles.content, styles.content]}>
                <Text
                    style={{
                        paddingVertical: 20,
                    }}
                >
                    Inventories will be displayed here
                </Text>
            </View>
            <SimpleNavbar style={sharedStyles.optionsBar}></SimpleNavbar>
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
    },
});
