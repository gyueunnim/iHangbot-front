import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Audio } from "expo-av";
import chatBotStyles from "../styles/chatBotStyles.js";
import stt from "../modules/stt.js";
import tts from "../modules/tts.js";
import { useDispatch } from "react-redux";
import { setInitialLogin } from "../data/store.js";
import axios from "axios";

function ChatBot({navigation}) {   
    const url = "http://192.168.0.204:8079/api/chat"

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
            console.error("Failed to start recording", err);
        }
    };

    const queryToGPT = async (query) => {
        axios.post(url, {
            "string": query
        })
        .then(async (response) => {
            const ttsResponse = await tts(response.data.message);

            setTtsLoading(false);
            
            setChatbotChat({
                text: response.data.message,
                audioUri: ttsResponse
            });
            await playSound(ttsResponse);
        })
        .catch((error) => console.error(error))
    }

    const stopRecording = async () => {
        setSttLoading(false);

        const status = await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const userVoiceUri = recording.getURI();
        setRecording(undefined);

        setTtsLoading(true);

        const sttResponse = await stt(userVoiceUri);

        const sttText = sttResponse.text;
        
        setUserChat({
            text: sttText,
            audioUri: userVoiceUri
        });

        await queryToGPT(sttText);
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

    const dispatch = useDispatch();
    const navigateToReport = () => {
        dispatch(setInitialLogin(false));
        navigation.navigate("Login");
    }

    useEffect(() => {
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, []);

    return (
        <View style={chatBotStyles.container}>
            <View style={chatBotStyles.userChatBox}>
                <Image source={require('../assets/child_Icon.png')} style={chatBotStyles.chatIcon}/>
                {
                    sttLoading === true 
                    ? <Text>말하는 중...</Text>
                    : <Text onPress={() => playSound(userChat.audioUri)}>{userChat.text}</Text>
                }
            </View>
            <View style={chatBotStyles.chatboxChatBox}>
                <Image source={require('../assets/chatbot_Icon.png')} style={chatBotStyles.chatIcon}/>
                {
                    ttsLoading === true 
                    ? <Text>대답을 생각하는중...</Text>
                    : <Text onPress={() => playSound(chatbotChat.audioUri)}>{chatbotChat.text}</Text>
                }
            </View>
            <View style={chatBotStyles.bottomSpace}>
                <TouchableOpacity onPress={recording ? stopRecording : startRecording}
                        onLongPress={navigateToReport} delayLongPress={5000}>
                    <Image source={require('../assets/input_Icon.png')} style={{width: 125, height: 125}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ChatBot;