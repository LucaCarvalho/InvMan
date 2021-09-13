//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TopNavbar from "./components/TopNavbar";
import Home from "./components/Home";
import About from "./components/About";

const Stack = createNativeStackNavigator();

export default function App() {
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
