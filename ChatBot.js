import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import stt from "./stt.js";
import tts from "./tts.js";

function ChatBot({navigation}) {
    const [recording, setRecording] = useState();
    const [recordFileInfo, setRecordFileInfo] = useState([]);
    const [sound, setSound] = useState();
    const recordFileInfoContainerFilePath = FileSystem.documentDirectory + "records.json";

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
        const tempResponse = "안녕! 나는 ChatGPT라고 해! 너를 도와줄 수 있는데, 어떤 일을 도와줄까? 무엇이 궁금한 거야?";
        return tempResponse;
    }

    const stopRecording = async () => {
        const status = await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
        });
        const uri = recording.getURI();
        setRecording(undefined);

        // Do STT job
        const sttResult = await stt(uri);

        // Add the record info to recordFileInfo
        const newRecordFileInfo = [...recordFileInfo];
        newRecordFileInfo.push({
            title: `child-${recordFileInfo.length + 1}`,
            uri: uri,
            duration: status.durationMillis,
            text: sttResult.text
        });
        console.log(newRecordFileInfo);
        setRecordFileInfo(newRecordFileInfo);

        // Write metadata
        const jsonStr = JSON.stringify(newRecordFileInfo, null, 4);
        await FileSystem.writeAsStringAsync(recordFileInfoContainerFilePath, jsonStr);
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
        // Read metadata file for records
        const readRecordFileInfo = async () => {
            const fileInfo = await FileSystem.getInfoAsync(recordFileInfoContainerFilePath);
            if (fileInfo.exists) {
                const content = await FileSystem.readAsStringAsync(recordFileInfoContainerFilePath);
                setRecordFileInfo(JSON.parse(content));
            } else {
                await FileSystem.writeAsStringAsync(recordFileInfoContainerFilePath, "[]");
            }
        }
        readRecordFileInfo();
        
        // Unload sound
        return sound ? () => {
            sound.unloadAsync();
        } : undefined;
    }, []);

    return (
        <View style={ { alignItems: "center", justifyContent: "center" } }>
            <Text onPress={() => tts().then((result) => playSound(result))}>Test</Text>
            <Button title="Temp: To Report" onPress={() => navigation.navigate("Report")} />
            <Button title={recording ? "Temp: stopRecording" : "Temp: startRecording"}
                    onPress={recording ? stopRecording : startRecording} />
            {
                recordFileInfo.map((elem, idx) => {
                    return (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }} key={idx}>
                            <View>
                                <Text>{elem.title}</Text>
                                <Text>{elem.duration}</Text>
                                <Text>{elem.text}</Text>
                            </View>
                            <Button title="Play" onPress={() => playSound(elem.uri)} />
                        </View>
                    );
                })
            }
        </View>
    );
}

export default ChatBot;