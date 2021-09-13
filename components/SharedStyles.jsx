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
    },
});

export { sharedStyles };
