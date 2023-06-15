import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import stt from "../modules/stt.js";
import tts from "../modules/tts.js";

const tempGPTResponse = "이게 지금 뭐 하자는 거지?";

function ChatBot({navigation}) {
    const [recording, setRecording] = useState();
    const [chatInfo, setChatInfo] = useState([]);
    const [sound, setSound] = useState();
    const chatInfoContainerFilePath = FileSystem.documentDirectory + "chat_info.json";

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recordOption = Audio.RecordingOptionsPresets.HIGH_QUALITY;
            recordOption.android.extension = ".wav";
            const { recording } = await Audio.Recording.createAsync(recordOption);
            setRecording(recording);
        } catch (err) {
            // TODO: Error handling
            console.error("Failed to start recording", err);
        }
    };

    /**
     * Query to GPT given a query statement.
     * The query statement should be the STT response.
     * This is an async function.
     * @param {string} query to send to GPT. It would be the STT response
     * @returns response of GPT
     */
    const queryToGPT = async (query) => {
        // Insert the function to send request to GPT server here later
        // const response = await gpt(query);
        const response = tempGPTResponse;
        return response;
    }

    const stopRecording = async () => {
        const status = await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setRecording(undefined);

        // Do STT job
        const sttResponse = await stt(uri);
        const sttText = sttResponse.text;

        const chatbotResponse = await queryToGPT(sttText);

        // Do TTS job
        const ttsResponse = await tts(chatbotResponse);

        // Add the chat info to chatInfo state
        const newChatInfo = [...chatInfo];
        const id = chatInfo.length + 1
        newChatInfo.push({
            title: `chat-${id}`,
            chatbot: false,
            order: id,
            uri: uri,
            duration: status.durationMillis,
            text: sttText
        });
        newChatInfo.push({
            title: `chat-${id + 1}`,
            chatbot: true,
            order: id + 1,
            uri: ttsResponse,
            duration: 0,
            text: chatbotResponse
        });
        console.log(newChatInfo);
        setChatInfo(newChatInfo);

        // Write metadata
        const jsonStr = JSON.stringify(newChatInfo, null, 4);
        await FileSystem.writeAsStringAsync(chatInfoContainerFilePath, jsonStr);

        // Play the sound of the response of TTS provided by chatbot response
        playSound(ttsResponse);
    };

    const playSound = async (soundUri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
            setSound(sound);
            await sound.playAsync();
        } catch (err) {
            // TODO: Error handling
            console.error(err);
        }
    };

    useEffect(() => {
        // Read metadata file for chat info
        const readChatInfo = async () => {
            const fileInfo = await FileSystem.getInfoAsync(chatInfoContainerFilePath);
            if (fileInfo.exists) {
                const content = await FileSystem.readAsStringAsync(chatInfoContainerFilePath);
                setChatInfo(JSON.parse(content));
            } else {
                await FileSystem.writeAsStringAsync(chatInfoContainerFilePath, "[]");
            }
        }
        readChatInfo();
        
        // Unload sound
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.userChatBox}>
                <Text onPress={() => playSound(chatInfo[chatInfo.length - 2].uri)}>{chatInfo[chatInfo.length - 2].text}</Text>
            </View>
            <View style={styles.chatboxChatBox}>
                <Text onPress={() => playSound(chatInfo[chatInfo.length - 1].uri)}>{chatInfo[chatInfo.length - 1].text}</Text>
            </View>
            <View style={ styles.bottomSpace }>
                <TouchableOpacity style={ styles.btnInput }>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        flex: 1
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
        
    }
});

export default ChatBot;