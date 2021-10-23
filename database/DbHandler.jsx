import React from "react";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("invman");

export default class DbHandler {
    constructor(setup = false) {
        this.db = SQLite.openDatabase("invman");
        if (setup) this.createTables();
    }

    createTables = () => {
        React.useEffect(() => {
            db.exec(
                [{ sql: "PRAGMA foreign_keys = ON;", args: [] }],
                false,
                () => console.log("Foreign keys turned on")
            );
        }, []);

        React.useEffect(() => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "CREATE TABLE IF NOT EXISTS inventories (inv_id INTEGER PRIMARY KEY NOT NULL, inv_name TEXT NOT NULL UNIQUE);"
                    );
                },
                [],
                (t, res) => {
                    //console.log(res);
                },
                (t, err) => console.log(err)
            );
        }, []);
        React.useEffect(() => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        `
                        CREATE TABLE IF NOT EXISTS items (
                            item_id INTEGER PRIMARY KEY NOT NULL,
                            item_name TEXT NOT NULL,
                            item_qty INTEGER DEFAULT 1,
                            inv_id INTEGER,
                            CONSTRAINT fk_inventories
                                FOREIGN KEY (inv_id)
                                REFERENCES inventories(inv_id)
                                ON DELETE CASCADE
                        );
                        `
                    );
                },
                [],
                (t, res) => {
                    //console.log(res);
                },
                (t, err) => console.log(err)
            );
        }, []);
        React.useEffect(() => {
            db.transaction(
                (tx) => {
                    tx.executeSql("PRAGMA foreign_keys = ON;");
                },
                [],
                (t, res) => {
                    //console.log(res);
                },
                (t, err) => console.log(err)
            );
        }, []);
    };

    createItem = (itemName, invId, onSuccess, onItemExists) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM items WHERE item_name=? AND inv_id=?;",
                [itemName, invId],
                (_, { rows: { _array } }) => {
                    if (!_array.length) {
                        // If there isn't another item in this
                        // inventory with the same name
                        db.transaction((tx) => {
                            tx.executeSql(
                                "INSERT INTO items (item_name, inv_id) VALUES (?, ?);",
                                [itemName, invId],
                                () => onSuccess(),
                                (t, err) => console.log(err)
                            );
                        });
                    } else {
                        onItemExists();
                    }
                },
                (t, err) => console.log(err)
            );
        });
    };

    // getItems = (inv_id, successCallback) => {
    //     db.transaction((tx) => {
    //         tx.executeSql(
    //             "SELECT * FROM items WHERE inv_id=?",
    //             [inv_id],
    //             (_, { rows: { _array } }) => successCallback(_array.reverse()),
    //             (t, err) => console.log("ERROR: ", err)
    //         );
    //     });
    // };

    updateItem = (item_id, item_name, navigateFunction) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE items SET item_name=? WHERE item_id=?",
                [item_name, item_id],
                (_, { rows: { _array } }) => navigateFunction(),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };

    deleteItem = (item_id, navigateFunction) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM items WHERE item_id=?",
                [item_id],
                (_, { rows: { _array } }) => navigateFunction(),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };

    createInventory = (inventoryName, onSuccess, onInventoryExists) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO inventories (inv_name) VALUES (?);",
                [inventoryName],
                () => onSuccess(),
                (t, err) => {
                    if (err.message.includes("UNIQUE")) onInventoryExists();
                }
            );
        });
    };

    updateInventory = (inv_id, inv_name, navigateFunction) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE inventories SET inv_name=? WHERE inv_id=?",
                [inv_name, inv_id],
                (_, { rows: { _array } }) => navigateFunction(),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };

    deleteInventory = (inv_id, navigateFunction) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM inventories WHERE inv_id=?",
                [inv_id],
                (_, { rows: { _array } }) => navigateFunction(),
                (t, err) => console.log("ERROR: ", err)
            );
        });
    };
}
