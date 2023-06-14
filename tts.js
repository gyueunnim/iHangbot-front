import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import qs from 'qs';
import { Audio } from 'expo-av';

const clientId = '9xqwkzpxel';
const clientSecret = 'zrYEtuW4TC3KM7PPopOuZVQo6gE3pY9Uuor6eN4G';
const url = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

export default async function tts(chatResponse) {
    try {
        // temp -> chatResponse
        let chatTemp = "안녕! 나는 ChatGPT라고 해! 너를 도와줄 수 있는데, 어떤 일을 도와줄까? 무엇이 궁금한 거야?";
        const formData = { 
            speaker: 'nara',
            volume: '0', 
            speed: '0', 
            pitch: '0', 
            text: chatTemp, 
            format: 'mp3' 
          };
            
        try {
            const response = await axios
                    .post(url, qs.stringify(formData), {
                        headers: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          'X-NCP-APIGW-API-KEY-ID': clientId,
                          'X-NCP-APIGW-API-KEY': clientSecret,
                        },
                        responseType: 'arraybuffer',
                      });
            const data = response.request._response;
            

            const fileUri = FileSystem.documentDirectory + 'test.mp3'; // 수정

            await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });

            return fileUri;
        } catch (error) {
            console.error(error);
            return { text: error };
        }
        
    } catch (error) {
        console.log(error);
        return { text: error };
    }
}