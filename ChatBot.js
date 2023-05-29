import { Button, Text, View } from "react-native";

function ChatBot({navigation}) {
    return (
        <View style={ { alignItems: "center", justifyContent: "center" } }>
            <Text>ChatBot</Text>
            <Button title="Temp: To Report" onPress={() => navigation.navigate("Report")} />
        </View>
    );
}

export default ChatBot;