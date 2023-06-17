import { StyleSheet } from "react-native";

const formStyles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 33,
        gap: 12, 
        backgroundColor: '#FFFFFF'
    },
    inputContainer: {
        width: "100%",
        justifyContent: "flex-start",
        gap: 4
    },
    labelContainer: {
        flexDirection: "row",
        gap: 4
    },
    label: {
        color: "#868e96"
    },
    requiredInput: {
        color: "#f03e3e"
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: "#adb5bd",
        borderRadius: 5,
        color: "#212529"
    },
    btnContainer: {
        width: "100%",
        justifyContent: "flex-start",
        marginTop: 12,
        gap: 4
    },
    btnLogin: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    btnText: {
        padding: 12,
        fontSize: 14,
        color: 'white'
    },
    btnDisabled: {
        backgroundColor: "#8eb4d7"
    },
    btnActive: {
        backgroundColor: "#003d99"
    },
    btnToSignUpText: {
        color: "#228be6",
        textDecorationLine: "underline"
    },
    radioContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 16
    },
    radioUnit: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default formStyles;