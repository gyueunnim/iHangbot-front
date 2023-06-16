import { StyleSheet } from "react-native";

const chatBotStyles = StyleSheet.create({
    container: {
        backgroundColor: "#f1f3f5",
        width: "100%",
        height: "100%",
        paddingTop: 20,
        flexDirection: "column"
    },
    userChatBox: {
        backgroundColor: "#74c0fc",
        flex: 1
    },
    chatboxChatBox: {
        backgroundColor: "#a5d8ff",
        flex: 1,
        flexDirection: 'row'
    },
    bottomSpace: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btnInput: {
        width: 100,
        height: 100,
        backgroundColor: "black",
    },
    txtChat: {
        
    },
    chatIcon: {
        width: 25,
        height: 25,
        margin: 10
    }
});

export default chatBotStyles;