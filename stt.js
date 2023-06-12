import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import axios from 'axios';
import { toByteArray } from 'base64-js';

const clientId = '9xqwkzpxel';
const clientSecret = 'zrYEtuW4TC3KM7PPopOuZVQo6gE3pY9Uuor6eN4G';
const sttUrl = 'ttps://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=Kor';

function stt(fileName) {
    try {
        const asset = Asset.fromModule(require(`./assets/${fileName}.wav`));
        await asset.downloadAsync();
        const fileUri = asset.localUri;
        if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
    
        // 디코딩
        const binaryData = toByteArray(fileContent);

        axios
        .post(url_stt, binaryData, {
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

export default stt;