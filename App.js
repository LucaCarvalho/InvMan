//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopNavbar from "./components/TopNavbar";
import Home from "./components/screens/Home";
import About from "./components/screens/About";
import NewInventory from "./components/screens/NewInventory";
import EditInventoryProperties from "./components/screens/EditInventoryProperties";
import InventoryItems from "./components/screens/InventoryItems";
import NewItem from "./components/screens/NewItem";
import EditItemProperties from "./components/screens/EditItemProperties";
import DbHandler from "./database/DbHandler";

const Stack = createNativeStackNavigator();

export default function App() {
    let db = new DbHandler(true);
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
                <Stack.Screen
                    name="Inventory"
                    component={InventoryItems}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen
                    name="New Item"
                    component={NewItem}
                    options={{
                        headerShown: true,
                        header: TopNavbar,
                        statusBarHidden: false,
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen
                    name="Edit Item"
                    component={EditItemProperties}
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
