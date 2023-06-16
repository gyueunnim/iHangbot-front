import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "100%",
        justifyContent: "flex-start",
    },
    label: {

    },
    input: {
    },
    btnContainer: {
        width: "100%",
        justifyContent: "flex-start",
    },
    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
    },
    btnDisabled: {
        padding: 10,
        color: 'white',
        backgroundColor: "#8eb4d7"
    },
    btnActive: {
        padding: 10,
        color: 'white',
        backgroundColor: "#003d99"
    }
});

export default formStyles;