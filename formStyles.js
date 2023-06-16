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
        color: "#868e96"
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: "#868e96",
        color: "#212529"
    },
    btnContainer: {
        width: "100%",
        justifyContent: "flex-start",
        gap: 4
    },
    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        padding: 10,
        color: 'white'
    },
    btnDisabled: {
        backgroundColor: "#8eb4d7"
    },
    btnActive: {
        backgroundColor: "#003d99"
    },
    btnToSignUpText: {
        color: "#228be6"
    }
});

export default formStyles;