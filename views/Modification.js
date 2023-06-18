import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, Image } from "react-native";
import formStyles from "../styles/formStyles";
import { useSelector } from "react-redux";
import ChatBot from "./ChatBot";
import axios from "axios";
import { RadioButton } from "react-native-paper";

function Modification({navigation}) {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState(true);
    const [email, setEmail] = useState("");
    const [btnStyle, setBtnStyle] = useState({});
    const userLoginInfo = useSelector((state) => {return state.userLoginInfo});

    const url = "http://192.168.0.177:8080/member/"+(userLoginInfo.id)+"/profile"

    const userInfo = {
        "child_name": name,
        "child_age": age,
        "child_gender": gender,
        "email": email,
    }

    const navigateToChatBot = () => {
        navigation.navigate('ChatBot')
    }

    let failAlert = () => {
        Alert.alert(                  
        "수정",                    // Title
        "수정에 실패하였습니다.",     // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false }
    )};
   
    let successAlert = () => {
        Alert.alert(                  
        "수정",                    // Title
        "수정이 완료되었습니다.",       // Sub-Title
        [{                           // Button
        
            text: "확인",
            style: "cancel"
        }],
    { cancelable: false },
    navigateToChatBot()
    )};

    const getInfo = () => { // 저장된 아이디를 통해 Info를 불러옵니다.
        axios.get(url)
        .then((res) => {
            setName(res.data.data.child_name);
            setAge(res.data.data.child_age);
            setGender(res.data.data.child_gender)
            setEmail(res.data.data.email);
        })
        .catch((error) => console.error(error))
    }

    const requestModification = () => {
        axios.put(url+"/setting", userInfo)
        .then((res) => {
            if(res.status === 200)
                successAlert();
            else   
                failAlert();
        })
        .catch((error) => console.error(error))
    }

    useEffect(() => {
        getInfo();
    }, [])

    useEffect(() => {
        (name !== "") && (age !== "") && (email !== "") ? setBtnStyle(formStyles.btnActive) : setBtnStyle(formStyles.btnDisabled)
    }, [name, age, email])

    return (
        <View style={formStyles.container}>
        <Image source={require('../assets/user_Icon.png')} style={{ width: 100, height: 100 }}/>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 20}}>프로필 수정</Text>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>아이 이름</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="아이 이름을 입력하세요"  
                    value={name} onChangeText={(text) => setName(text)}/>
        </View>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>나이</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="나이를 입력하세요"
                    value={age} onChangeText={(text) => setAge(text)}/>
        </View>
        <View style={formStyles.radioContainer}>
            <View style={formStyles.radioUnit}>
                <RadioButton
                        status={gender === true ? "checked" : "unchecked"}
                        onPress={() => setGender(true)} />
                <Text style={{color: "#212529"}}>남자</Text>
            </View>
            <View style={formStyles.radioUnit}>
                <RadioButton
                        status={gender == false ? "checked" : "unchecked"}
                        onPress={() => setGender(false)} />
                <Text style={{color: "#212529"}}>여자</Text>
            </View>
        </View>
        <View style={formStyles.inputContainer}>
            <View style={formStyles.labelContainer}>
                <Text style={formStyles.label}>이메일</Text>
                <Text style={formStyles.requiredInput}>*</Text>
            </View>
            <TextInput style={formStyles.input} placeholder="이메일을 입력하세요"
                   value={email} onChangeText={(text) => setEmail(text)}/>
        </View>
        <View style={formStyles.btnContainer}>
            <TouchableOpacity
                    style={[formStyles.btnLogin, btnStyle]}
                    onPress={ (e) => {
                        requestModification();
                    } }>
                <Text style={formStyles.btnText}>수정하기</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default Modification;