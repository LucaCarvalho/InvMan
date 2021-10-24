//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { sharedStyles } from "../SharedStyles";
import SimpleNavbar from "../SimpleNavbar";
import SimpleButton from "../SimpleButton";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("invman");

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inventories: {} };
        this.getInventories();
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getInventories();
        });
    }

    render() {
        return (
            <View style={[sharedStyles.container, styles.container]}>
                {this.generateList()}
                <SimpleNavbar style={[sharedStyles.optionsBar]}>
                    <SimpleButton
                        onPress={() =>
                            this.props.navigation.navigate("New Inventory")
                        }
                    >
                        +
                    </SimpleButton>
                </SimpleNavbar>
            </View>
        );
    }

    getInventories = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM inventories",
                [],
                (_, { rows: { _array } }) =>
                    this.setState({ inventories: _array.reverse() }),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };

    generateList = () => {
        if (Object.keys(this.state.inventories).length === 0) {
            return (
                <View style={[sharedStyles.content, styles.content]}>
                    <Text>Inventories will be displayed here</Text>
                </View>
            );
        } else {
            return (
                <View style={[sharedStyles.content]}>
                    <ScrollView contentContainerStyle={[styles.scrollView]}>
                        {this.state.inventories.map((inventory) => (
                            <TouchableOpacity
                                style={styles.inventoryCard}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        "Inventory",
                                        inventory
                                    )
                                }
                                key={inventory.inv_id}
                            >
                                <Text>{inventory.inv_name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            );
        }
    };
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
    inventoryCard: {
        height: 80,
        //flex: 0.4,
        width: "98%",
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#fffbe0",
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 2,
    },
});
