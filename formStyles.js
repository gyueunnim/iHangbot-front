import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 33,
        gap: 12
    },
    inputContainer: {
        width: "100%",
        justifyContent: "flex-start",
        gap: 4
    },
    label: {

    },
    input: {
        padding: 15,
        borderWidth: 1,
    },
    btnContainer: {
        width: "100%",
        backgroundColor: "red",
        justifyContent: "flex-start",
        gap: 4
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