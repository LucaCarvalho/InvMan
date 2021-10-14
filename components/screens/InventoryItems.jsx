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

class InventoryItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: {} };
        this.getItems();
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.getItems();
        });
    }

    render() {
        return (
            <View style={[sharedStyles.container, styles.container]}>
                {this.generateList()}
                <SimpleNavbar style={[sharedStyles.optionsBar]}>
                    <SimpleButton
                        onPress={() =>
                            this.props.navigation.navigate("New Item", {
                                inv_id: this.props.route.params.inv_id,
                            })
                        }
                    >
                        +
                    </SimpleButton>
                    <SimpleButton
                        onPress={() =>
                            this.props.navigation.navigate("Edit Inventory", {
                                inv_id: this.props.route.params.inv_id,
                                inv_name: this.props.route.params.inv_name,
                            })
                        }
                    >
                        ✏️
                    </SimpleButton>
                </SimpleNavbar>
            </View>
        );
    }

    getItems = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM items WHERE inv_id=?",
                [this.props.route.params.inv_id],
                (_, { rows: { _array } }) =>
                    this.setState({ items: _array.reverse() }),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };

    generateList = () => {
        if (Object.keys(this.state.items).length === 0) {
            return (
                <View style={[sharedStyles.content, styles.content]}>
                    <Text>Items will be displayed here</Text>
                </View>
            );
        } else {
            return (
                <View style={[sharedStyles.content]}>
                    <ScrollView contentContainerStyle={[styles.scrollView]}>
                        {this.state.items.map((item) => (
                            <View style={styles.inventoryCard}>
                                <TouchableOpacity
                                    style={styles.inventoryTouchable}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "Edit Item",
                                            item
                                        )
                                    }
                                    key={item.item_id + "_" + item.inv_id}
                                >
                                    <Text>{item.item_name}</Text>
                                </TouchableOpacity>
                                <Text key={item.item_id * -1}>
                                    {item.item_qty}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            );
        }
    };
}

export default InventoryItems;

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
        flexDirection: "row",
        height: 50,
        //flex: 0.4,
        width: "98%",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    inventoryTouchable: {
        flex: 0.8,
    },
});
