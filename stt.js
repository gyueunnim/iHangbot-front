import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { toByteArray } from 'base64-js';

const clientId = '9xqwkzpxel';
const clientSecret = 'zrYEtuW4TC3KM7PPopOuZVQo6gE3pY9Uuor6eN4G';
const url = 'https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor';

export default async function stt(fileUri) {
    try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (fileInfo.exists) {
            const fileContent = await FileSystem.readAsStringAsync(fileUri, {
                encoding: FileSystem.EncodingType.Base64
            });

            // 디코딩
            const binaryData = toByteArray(fileContent);

            axios.post(url, binaryData, {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-NCP-APIGW-API-KEY-ID': clientId,
                        'X-NCP-APIGW-API-KEY': clientSecret,
                    },
                })
                .then(response => {
                    console.log('Upload successful:', response.data);
                })
                .catch(error => {
                    console.log('Upload failed:', error);
                });
        }
    } catch (error) {
        console.log(error);
    }
}