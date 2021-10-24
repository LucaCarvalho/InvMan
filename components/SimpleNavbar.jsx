//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";
import { StyleSheet, Platform, StatusBar, View } from "react-native";

export default function SimpleNavbar(props) {
    return <View style={[styles.navbar, props.style]}>{props.children}</View>;
}

const styles = StyleSheet.create({
    navbar: {
        flex: 0.125,
        flexDirection: "row",
        backgroundColor: "#ffb400",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    },
});
