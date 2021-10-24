//          Copyright Luca R. L. de Carvalho 2021.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import SimpleButton from "./SimpleButton";

class NumberInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNumber: this.sanitizeNumber(props.children),
            initialNumber: this.sanitizeNumber(props.children),
        };
    }

    render() {
        return (
            <View style={styles.numberInputView}>
                <SimpleButton
                    height={styles.incDecButton.height}
                    width={styles.incDecButton.width}
                    backgroundColor={styles.incDecButton.backgroundColor}
                    onPress={() => this.decrement()}
                >
                    ᐁ
                </SimpleButton>
                <TextInput
                    style={styles.numberInput}
                    keyboardType="number-pad"
                    onChangeText={(text) => {
                        let number = this.sanitizeNumber(text);

                        if (!isNaN(number))
                            this.setState(
                                { currentNumber: number },
                                this.onChangeNumberCallback
                            );
                        else
                            this.setState(
                                {
                                    currentNumber: this.state.initialNumber,
                                },
                                this.onChangeNumberCallback
                            );
                    }}
                    value={String(this.state.currentNumber)}
                />
                <SimpleButton
                    height={styles.incDecButton.height}
                    width={styles.incDecButton.width}
                    backgroundColor={styles.incDecButton.backgroundColor}
                    onPress={() => this.increment()}
                >
                    ᐃ
                </SimpleButton>
            </View>
        );
    }

    increment = () => {
        this.setState(
            { currentNumber: this.state.currentNumber + 1 },
            this.onChangeNumberCallback
        );
    };

    decrement = () => {
        let n = this.state.currentNumber;
        this.setState(
            { currentNumber: n > 0 ? n - 1 : n },
            this.onChangeNumberCallback
        );
    };

    sanitizeNumber = (text) => {
        if (!isNaN(text)) return Math.abs(parseInt(text));
        return NaN;
    };

    onChangeNumberCallback = () => {
        if (this.props.onChangeNumber)
            this.props.onChangeNumber(this.state.currentNumber);
    };
}

export default NumberInput;

const styles = StyleSheet.create({
    numberInput: {
        borderWidth: 1,
        borderColor: "orange",
        paddingHorizontal: 10,
        textAlign: "center",
        width: 50,
        marginHorizontal: 5,
    },
    numberInputView: {
        flexDirection: "row",
        alignItems: "center",
    },
    incDecButton: {
        height: 20,
        width: 20,
        backgroundColor: "white",
    },
});
