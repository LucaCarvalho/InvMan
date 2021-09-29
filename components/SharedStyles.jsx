//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import { StyleSheet } from "react-native";

const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        //paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 0.95,
    },
    optionsBar: {
        flex: 0.05,
        padding: 20,
        backgroundColor: "orange",
        justifyContent: "space-evenly",
    },
});

export { sharedStyles };
