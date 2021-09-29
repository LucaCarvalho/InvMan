//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SQLite from "expo-sqlite";

import TopNavbar from "./components/TopNavbar";
import Home from "./components/screens/Home";
import About from "./components/screens/About";
import NewInventory from "./components/screens/NewInventory";
import EditInventoryProperties from "./components/screens/EditInventoryProperties";

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase("invman");

export default function App() {
    React.useEffect(() => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS inventories (inv_id INTEGER PRIMARY KEY NOT NULL, inv_name TEXT NOT NULL);"
                );
            },
            [],
            (t, res) => {
                //console.log(res);
            },
            (t, err) => console.log(err)
        );
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                    }}
                />
                <Stack.Screen
                    name="About"
                    component={About}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen
                    name="New Inventory"
                    component={NewInventory}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen
                    name="Edit Inventory"
                    component={EditInventoryProperties}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                        animation: "slide_from_right",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
