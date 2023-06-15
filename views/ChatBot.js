import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Audio } from "expo-av";
import stt from "../modules/stt.js";
import tts from "../modules/tts.js";

const tempGPTResponse = `무슨 게임을 좋아해? 나는 자동차 게임을 좋아해! 같이 놀면 재미있을 거야!`;

function ChatBot({navigation}) {
    const [sttLoading, setSttLoading] = useState(false);
    const [ttsLoading, setTtsLoading] = useState(false);
    

    const [recording, setRecording] = useState();
    const [userChat, setUserChat] = useState({ text: "", audioUri: null });
    const [chatbotChat, setChatbotChat] = useState({ text: "", audioUri: null });
    const [sound, setSound] = useState();

    const startRecording = async () => {
        setSttLoading(true);
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
        setSttLoading(false);
        setTtsLoading(true);
        const status = await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const userVoiceUri = recording.getURI();
        setRecording(undefined);

        // Do STT job
        const sttResponse = await stt(userVoiceUri);
        const sttText = sttResponse.text;
        setUserChat({
            text: sttText,
            audioUri: userVoiceUri
        });

        const chatbotResponse = await queryToGPT(sttText);

        // Do TTS job
        const ttsResponse = await tts(chatbotResponse);

        setTtsLoading(false);
        setChatbotChat({
            text: chatbotResponse,
            audioUri: ttsResponse
        });

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
        // Unload sound
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.userChatBox}>
                <Image source={require('../assets/child_Icon.png')} style={styles.chatIcon}/>
                {
                    sttLoading === true 
                    ? <Text>말하는 중...</Text>
                    : <Text onPress={() => playSound(userChat.audioUri)}>{userChat.text}</Text>
                }
            </View>
            <View style={styles.chatboxChatBox}>
                <Image source={require('../assets/chatbot_Icon.png')} style={styles.chatIcon}/>
                {
                    ttsLoading === true 
                    ? <Text>대답을 생각하는중...</Text>
                    : <Text onPress={() => playSound(chatbotChat.audioUri)}>{chatbotChat.text}</Text>
                }
            </View>
            <View style={styles.bottomSpace}>
                <TouchableOpacity onPress={recording ? stopRecording : startRecording}
                onLongPress={() => navigation.navigate("Report")} delayLongPress={5000}>
                    <Image source={require('../assets/input_Icon.png')} style={{width: 125, height: 125}}/>
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

export default ChatBot;