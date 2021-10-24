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
import "react-native-get-random-values";
import * as uuid from "uuid";
import NumberInput from "../NumberInput";
import DbHandler from "../../database/DbHandler";

const sqliteDb = SQLite.openDatabase("invman");

class InventoryItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: {} };
        this.getItems();
        this.db = new DbHandler();
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
        sqliteDb.transaction((tx) => {
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
                            <View style={styles.inventoryCard} key={uuid.v4()}>
                                <TouchableOpacity
                                    style={styles.inventoryTouchable}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            "Edit Item",
                                            item
                                        )
                                    }
                                >
                                    <Text>{item.item_name}</Text>
                                </TouchableOpacity>
                                <NumberInput
                                    onChangeNumber={(qty) =>
                                        this.db.updateItemQty(item.item_id, qty)
                                    }
                                >
                                    {item.item_qty}
                                </NumberInput>
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
        borderRadius: 5,
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
    numberInput: {
        borderWidth: 1,
        borderColor: "orange",
        paddingHorizontal: 10,
        textAlign: "center",
        width: 50,
    },
});
